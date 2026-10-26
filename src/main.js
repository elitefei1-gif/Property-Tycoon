// Start-up, the game loop, and button clicks.
import { createState } from './state.js';
import { drawHud } from './render/hud.js';
import { drawTabs } from './render/tabs.js';
import { drawPanel } from './render/panel.js';
import { createTimebar } from './render/timebar.js';

// Real seconds per in-game month.
const SECONDS_PER_MONTH = 10;

const s = createState();
const $ = id => document.getElementById(id);
const updateTimebar = createTimebar($('timebar'));

// Redraw the cards. Called when something changes, not every frame.
function render() {
  drawHud($('hud'), s);
  drawTabs($('tabs'), s);
  drawPanel($('panel'), s);
}

function nextMonth() {
  s.month += 1;
  render();
}

function update(dt) {
  if (s.paused) return;
  s.monthTimer += dt;
  if (s.monthTimer >= SECONDS_PER_MONTH) {
    s.monthTimer -= SECONDS_PER_MONTH;
    nextMonth();
  }
}

document.addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]');
  if (tab) { s.view = tab.dataset.tab; render(); return; }
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (act === 'pause') s.paused = !s.paused;
});

let last = performance.now();
function loop(now) {
  // Cap dt so a backgrounded tab doesn't skip many months at once.
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  update(dt);
  updateTimebar(s, s.monthTimer / SECONDS_PER_MONTH);
  requestAnimationFrame(loop);
}

render();
requestAnimationFrame(loop);
