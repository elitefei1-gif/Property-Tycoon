// Start-up, the game loop, and button clicks.
import { createState } from './state.js';
import { buy, renovate, rentOut, cityMonth, collectRent, building } from './city.js';
import { drawHud } from './render/hud.js';
import { drawTabs } from './render/tabs.js';
import { drawPanel } from './render/panel.js';
import { drawSheet } from './render/sheet.js';
import { createTimebar } from './render/timebar.js';
import { rentFx, spendFx } from './render/fx.js';
import { cityNews } from './render/toast.js';

// Real seconds per in-game month.
const SECONDS_PER_MONTH = 10;

const s = createState();
// Screen-only state that isn't part of the game (not saved).
const ui = { sheet: null };
const $ = id => document.getElementById(id);
const updateTimebar = createTimebar($('timebar'));

// Redraw the cards. Called when something changes, not every frame.
function render() {
  drawHud($('hud'), s);
  drawTabs($('tabs'), s);
  drawPanel($('panel'), s);
  drawSheet($('modal'), s, ui.sheet);
}

function nextMonth() {
  s.month += 1;
  const before = s.money;
  const paid = collectRent(s);
  const news = cityMonth(s);
  render();
  rentFx(paid, before, s.money);
  cityNews(news);
}

function update(dt) {
  // Time stops while you're paused or looking at a pop-up.
  if (s.paused || ui.sheet) return;
  s.monthTimer += dt;
  if (s.monthTimer >= SECONDS_PER_MONTH) {
    s.monthTimer -= SECONDS_PER_MONTH;
    nextMonth();
  }
}

// Button handlers, keyed by data-act. id comes from data-id.
const ACT = {
  pause: () => { s.paused = !s.paused; },
  open: id => { ui.sheet = id; },
  close: () => { ui.sheet = null; },
  buy: id => buy(s, id) && spendFx(building(id).price),
  renovate: id => renovate(s, id) && spendFx(building(id).reno),
  rent: id => rentOut(s, id),
};

document.addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]');
  if (tab) { s.view = tab.dataset.tab; render(); return; }
  // Tapping the dark area around a sheet closes it.
  if (e.target.id === 'modal') { ACT.close(); render(); return; }
  const btn = e.target.closest('[data-act]');
  if (!btn || btn.disabled) return;
  ACT[btn.dataset.act]?.(btn.dataset.id);
  render();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && ui.sheet) { ACT.close(); render(); }
});

let last = performance.now();
function loop(now) {
  // Cap dt so a backgrounded tab doesn't skip many months at once.
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  update(dt);
  updateTimebar(s, s.monthTimer / SECONDS_PER_MONTH, !!ui.sheet);
  requestAnimationFrame(loop);
}

render();
requestAnimationFrame(loop);
