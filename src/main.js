// Start-up, the game loop, and button clicks.
import { createState } from './state.js';
import { buy, renovate, rentOut, cityMonth, collectRent } from './city.js';
import { drawHud } from './render/hud.js';
import { drawTabs } from './render/tabs.js';
import { drawPanel } from './render/panel.js';
import { drawSheet } from './render/sheet.js';
import { createTimebar } from './render/timebar.js';
import { rentFx, spendFx } from './render/fx.js';
import { cityNews, toast } from './render/toast.js';
import { upgrade, homeTier } from './home.js';
import { investorVisit } from './investors.js';
import { drawEvent } from './render/event.js';
import { drawSlotSheet } from './render/upgrade-sheet.js';

// Real seconds per in-game month.
const SECONDS_PER_MONTH = 10;

const s = createState();
// Screen-only state that isn't part of the game (not saved).
// sheet = building id, slot = furniture slot id, room = which room the Home tab shows.
const ui = { sheet: null, slot: null, event: null, room: 'bedroom' };
const $ = id => document.getElementById(id);
const updateTimebar = createTimebar($('timebar'));

// Redraw the cards. Called when something changes, not every frame.
function render() {
  drawHud($('hud'), s);
  drawTabs($('tabs'), s);
  drawPanel($('panel'), s, ui);
  if (ui.event) drawEvent($('modal'), ui.event);
  else if (ui.slot) drawSlotSheet($('modal'), s, ui.slot);
  else drawSheet($('modal'), s, ui.sheet);
}

function nextMonth() {
  s.month += 1;
  const before = s.money;
  const paid = collectRent(s);
  const news = cityMonth(s);
  ui.event = investorVisit(s);
  if (ui.event) ui.sheet = ui.slot = null;
  render();
  rentFx(paid, before, s.money);
  cityNews(news);
}

const modalOpen = () => !!(ui.sheet || ui.slot || ui.event);

function update(dt) {
  // Time stops while you're paused or looking at a pop-up.
  if (s.paused || modalOpen()) return;
  s.monthTimer += dt;
  if (s.monthTimer >= SECONDS_PER_MONTH) {
    s.monthTimer -= SECONDS_PER_MONTH;
    nextMonth();
  }
}

// Button handlers, keyed by data-act. id comes from data-id; btn is the button tapped.
const ACT = {
  pause: () => { s.paused = !s.paused; },
  open: id => { ui.sheet = id; },
  close: () => { ui.sheet = ui.slot = ui.event = null; },
  room: id => { ui.room = id; },
  slot: id => { ui.slot = id; },
  choose: i => {
    const result = ui.event.choices[i].run(s);
    ui.event = null;
    if (result) toast(result);
  },
  buy: (id, btn) => { const paid = buy(s, id); if (paid) spendFx(paid, btn); },
  renovate: (id, btn) => { const paid = renovate(s, id); if (paid) spendFx(paid, btn); },
  rent: id => rentOut(s, id),
  upgrade: (id, btn) => {
    const tier = homeTier(s);
    const cost = upgrade(s, id);
    if (!cost) return;
    spendFx(cost, btn);
    const now = homeTier(s);
    if (now !== tier) toast(`🏠 You moved into a <b>${now.name.toLowerCase()}</b>!`, now.pic);
  },
};

document.addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]');
  if (tab) { s.view = tab.dataset.tab; render(); return; }
  // Tapping the dark area around a sheet closes it.
  if (e.target.id === 'modal') { ACT.close(); render(); return; }
  const btn = e.target.closest('[data-act]');
  if (!btn || btn.disabled) return;
  ACT[btn.dataset.act]?.(btn.dataset.id, btn);
  render();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOpen()) { ACT.close(); render(); }
});

let last = performance.now();
function loop(now) {
  // Cap dt so a backgrounded tab doesn't skip many months at once.
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  update(dt);
  updateTimebar(s, s.monthTimer / SECONDS_PER_MONTH, modalOpen());
  requestAnimationFrame(loop);
}

render();
requestAnimationFrame(loop);
