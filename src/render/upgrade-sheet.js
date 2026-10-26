// Pop-up for one furniture slot: what you have now, what's next, and the upgrade button.
import { ROOMS } from '../data/upgrades.js';
import { slot, levelOf, nextLevel } from '../home.js';
import { yen } from '../format.js';
import { furniture, bonusLine } from './home.js';

const pips = (lv, max) => `<span class="pips">${Array.from({ length: max }, (_, i) => `<i class="${i < lv ? 'on' : ''}"></i>`).join('')}</span>`;

function itemBox(sl, lv, label) {
  return `
    <div class="item">
      <div class="item-pic">${lv.img ? furniture(sl, lv) : `<span class="ph"><span>${sl.icon}</span>Nothing yet</span>`}</div>
      <span class="eyebrow">${label}</span><b>${lv.name}</b>
    </div>`;
}

export function drawSlotSheet(el, s, id) {
  const sl = slot(id);
  const r = ROOMS.find(x => x.slots.includes(sl));
  const lv = levelOf(s, id), next = nextLevel(s, id);
  const button = next
    ? `<button class="choice" data-act="upgrade" data-id="${id}" ${s.money < next.cost ? 'disabled' : ''}>
         <b>Upgrade for ${yen(next.cost)}</b>
         <span>${s.money < next.cost ? `You need ${yen(next.cost - s.money)} more.` : 'Your room gets better right away.'}</span>
       </button>`
    : `<p class="note">★ This is the best ${sl.name.toLowerCase()} there is.</p>`;
  el.hidden = false;
  el.innerHTML = `
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-title">
      <button class="close" data-act="close" aria-label="Close">✕</button>
      <span class="tag ready">${r.name}</span>
      <h2 id="sh-title">${sl.icon} ${sl.name} ${pips(lv, sl.levels.length - 1)}</h2>
      <div class="items">
        ${itemBox(sl, sl.levels[lv], 'Now')}
        ${next ? `<span class="arrow">➜</span>${itemBox(sl, next, 'Next')}` : ''}
      </div>
      <p class="perk">${bonusLine(r, s)}</p>
      <div class="choices">${button}</div>
    </div>`;
}
