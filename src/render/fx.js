// Money effects: coins fly from rented buildings into your cash, the cash counts up,
// and "+¥" / "−¥" amounts float up.
import { yen } from '../format.js';
import { coinSound } from './sound.js';

const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const cashBox = () => document.getElementById('cash');
const center = el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };

// Text that rises and fades, e.g. "+¥90,000". kind: 'gain' or 'loss'.
export function floatText(el, text, kind = 'gain', delay = 0) {
  if (!el) return;
  const { x, y } = center(el);
  const t = document.createElement('div');
  t.className = `float ${kind}`;
  t.textContent = text;
  t.style.left = `${x}px`;
  t.style.top = `${y}px`;
  document.body.append(t);
  t.animate(
    [{ transform: 'translate(-50%, -50%) scale(.6)', opacity: 0 },
     { transform: 'translate(-50%, -110%) scale(1.1)', opacity: 1, offset: .2 },
     { transform: 'translate(-50%, -260%) scale(1)', opacity: 0 }],
    { duration: 1400, delay, easing: 'ease-out', fill: 'both' },
  ).finished.then(() => t.remove());
}

// One coin flying in an arc from (a) to (b).
function flyCoin(a, b, delay) {
  const c = document.createElement('div');
  c.className = 'coin';
  c.textContent = '¥';
  document.body.append(c);
  const mid = { x: (a.x + b.x) / 2 + (Math.random() - .5) * 80, y: Math.min(a.y, b.y) - 60 - Math.random() * 40 };
  const at = (p, s = 1) => `translate(${p.x - 11}px, ${p.y - 11}px) scale(${s})`;
  return c.animate(
    [{ transform: at(a, .4), opacity: 0 },
     { transform: at(a, 1.1), opacity: 1, offset: .12 },
     { transform: at(mid, 1), offset: .55 },
     { transform: at(b, .6), opacity: .9 }],
    { duration: 800, delay, easing: 'cubic-bezier(.45,0,.55,1)', fill: 'both' },
  ).finished.then(() => c.remove());
}

// Cash number rolls from `from` to `to`, and the box glows.
function countUp(from, to) {
  const box = cashBox();
  const num = box?.querySelector('b');
  if (!num) return;
  box.classList.remove('glow');
  void box.offsetWidth; // restart the glow animation
  box.classList.add('glow');
  const start = performance.now(), ms = 700;
  const step = now => {
    const k = Math.min((now - start) / ms, 1);
    // Stop if the header was redrawn in the meantime (it then already shows the final amount).
    if (!num.isConnected) return;
    num.textContent = yen(from + (to - from) * (1 - (1 - k) ** 3));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// payments: [{ id, amount }]. Coins start at each building's card, or the City tab if it isn't on screen.
export function rentFx(payments, before, after) {
  const box = cashBox();
  if (!payments.length || !box) return;
  const total = payments.reduce((n, p) => n + p.amount, 0);
  const num = box.querySelector('b');
  if (calm()) { floatText(box, `+${yen(total)}`); return; }

  num.textContent = yen(before); // hold the old amount until the coins land
  const flights = payments.flatMap((p, i) => {
    const card = document.querySelector(`.bcard[data-id="${p.id}"]`);
    const from = card ? card.querySelector('.bpic') : document.querySelector('[data-tab="city"]');
    if (card) floatText(card.querySelector('.bpic'), `+${yen(p.amount)}`, 'gain', i * 150);
    const a = center(from), b = center(box);
    return Array.from({ length: 5 }, (_, k) => flyCoin(a, b, i * 150 + k * 70));
  });
  setTimeout(coinSound, 750);
  Promise.race(flights).then(() => {
    countUp(before, after);
    floatText(box, `+${yen(total)}`, 'gain');
  });
}

// Spending: "−¥…" in red rises from the button you tapped (or the cash box).
export function spendFx(amount, from = cashBox()) {
  floatText(from, `−${yen(amount)}`, 'loss');
}
