// Bottom bar: progress through the month and the pause button.
// Built once; only the fill width and labels change each frame.
import { monthName } from '../format.js';

export function createTimebar(el) {
  el.innerHTML = `
    <div class="month-progress">
      <span id="tb-label"></span>
      <div class="track"><div class="fill" id="tb-fill"></div></div>
    </div>
    <button class="btn go" data-act="pause" id="tb-pause"></button>`;
  const label = el.querySelector('#tb-label');
  const fill = el.querySelector('#tb-fill');
  const pause = el.querySelector('#tb-pause');

  return function update(s, progress, sheetOpen) {
    fill.style.width = `${(progress * 100).toFixed(1)}%`;
    label.textContent = s.paused ? 'Paused' : sheetOpen ? 'Time stops while you look' : `${monthName(s.month + 1)} starts soon…`;
    pause.textContent = s.paused ? '▶ Play' : '⏸ Pause';
  };
}
