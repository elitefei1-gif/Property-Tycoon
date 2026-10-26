import { createScreen, drawFrame } from './render/screen.js';

// Real seconds per in-game month.
const SECONDS_PER_MONTH = 10;

const game = {
  month: 1,
  monthTimer: 0, // seconds into the current month
};

const screen = createScreen(document.getElementById('game'));

function update(dt) {
  game.monthTimer += dt;
  if (game.monthTimer >= SECONDS_PER_MONTH) {
    game.monthTimer -= SECONDS_PER_MONTH;
    game.month += 1;
  }
}

function render() {
  drawFrame(screen, game, game.monthTimer / SECONDS_PER_MONTH);
}

let last = performance.now();
function loop(now) {
  // Cap dt so a backgrounded tab doesn't skip many months at once.
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  update(dt);
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
