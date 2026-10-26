// Home tab: what kind of home you live in, then each room with its upgrade slots.
import { ROOMS } from '../data/upgrades.js';
import { levelOf, nextLevel, homeTier, nextTier, totalLevels } from '../home.js';
import { yen } from '../format.js';
import { pic } from './pics.js';

const pips = (lv, max) => `<span class="pips">${Array.from({ length: max }, (_, i) => `<i class="${i < lv ? 'on' : ''}"></i>`).join('')}</span>`;

function slotRow(sl, s) {
  const lv = levelOf(s, sl.id);
  const next = nextLevel(s, sl.id);
  const btn = next
    ? `<button class="up" data-act="upgrade" data-id="${sl.id}" ${s.money < next.cost ? 'disabled' : ''}>
         <b>${next.name}</b><span class="mono">${yen(next.cost)}</span></button>`
    : `<span class="maxed">★ Best</span>`;
  return `
    <div class="slot">
      <span class="sicon">${sl.icon}</span>
      <div class="sname"><b>${sl.levels[lv].name}</b><span>${sl.name} ${pips(lv, sl.levels.length - 1)}</span></div>
      ${btn}
    </div>`;
}

function roomPanel(r, s) {
  return `
    <section class="panel room">
      <div class="rhead">${pic(r.pic, 'ricon')}<h3>${r.name}</h3></div>
      ${r.slots.map(sl => slotRow(sl, s)).join('')}
    </section>`;
}

function homeCard(s) {
  const tier = homeTier(s), next = nextTier(s), n = totalLevels(s);
  const progress = next
    ? `<div class="hprog"><span>${next.minLevels - n} more upgrade${next.minLevels - n > 1 ? 's' : ''} to move to a <b>${next.name.toLowerCase()}</b></span>
         <div class="track"><div class="fill" style="width:${((n - tier.minLevels) / (next.minLevels - tier.minLevels)) * 100}%"></div></div></div>`
    : `<div class="hprog"><span>🎉 You live in the best home in Tokyo!</span></div>`;
  return `
    <section class="panel homecard">
      <div class="hpic">${pic(tier.pic)}</div>
      <div><div class="eyebrow">Your home</div><h3>${tier.name}</h3>${progress}</div>
    </section>`;
}

export function drawHome(s) {
  return homeCard(s) + ROOMS.map(r => roomPanel(r, s)).join('');
}
