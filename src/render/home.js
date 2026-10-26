// Home tab: what kind of home you live in, then one room at a time drawn as a picture
// with its furniture in place. Tap a piece of furniture to upgrade it.
import { ROOMS } from '../data/upgrades.js';
import { levelOf, nextLevel, homeTier, nextTier, totalLevels } from '../home.js';
import { roomLevel, maxProperties, dealDiscount, investorChance } from '../bonus.js';
import { PROPERTIES_PER_LEVEL, DISCOUNT_PER_LEVEL, INVESTOR_PER_LEVEL } from '../data/bonuses.js';
import { pic } from './pics.js';

const pct = n => `${Math.round(n * 100)}%`;

// What this room does for your business, and what the next upgrade adds.
export function bonusLine(r, s) {
  const maxed = roomLevel(s, r.id) >= r.slots.reduce((n, sl) => n + sl.levels.length - 1, 0);
  const more = text => maxed ? '' : `<span class="next">Each upgrade: ${text}</span>`;
  if (r.id === 'bedroom') return `😴 <b>Well rested:</b> ${pct(dealDiscount(s))} off buying and renovating${more(`+${pct(DISCOUNT_PER_LEVEL)}`)}`;
  if (r.id === 'office') return `💼 <b>Business:</b> you can manage ${maxProperties(s)} properties${more(`+${PROPERTIES_PER_LEVEL}`)}`;
  if (r.id === 'living') return investorChance(s) > 0
    ? `🤝 <b>Hosting:</b> ${pct(investorChance(s))} chance an investor visits each month${more(`+${pct(INVESTOR_PER_LEVEL)}`)}`
    : `🤝 <b>Hosting:</b> upgrade to invite investors with special offers`;
}

// A picture that falls back to a placeholder (the next element) if its file doesn't exist yet.
export const artImg = (src, cls = '') =>
  `<img class="${cls}" src="${src}" alt="" onerror="this.hidden=true;this.nextElementSibling.hidden=false">`;

// A level's furniture picture, or a dashed placeholder box with its emoji and name.
export const furniture = (sl, lv) => `
  ${artImg(lv.img)}<span class="ph" hidden><span>${sl.icon}</span>${lv.name}</span>`;

function furniturePiece(sl, s) {
  const lv = sl.levels[levelOf(s, sl.id)];
  const { x, y, w, h } = sl.box;
  const canUp = !!nextLevel(s, sl.id);
  const inner = lv.img ? furniture(sl, lv) : `<span class="spot">＋<small>${sl.name}</small></span>`;
  return `
    <button class="piece ${canUp ? 'can-up' : ''}" data-act="slot" data-id="${sl.id}"
      style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;--size:${lv.size ?? 1};--skew:${sl.skew ?? 0}deg" aria-label="${sl.name}: ${lv.name}">
      ${inner}
    </button>`;
}

function roomStage(r, s) {
  return `
    <div class="stage">
      ${artImg(r.bg, 'bg')}<div class="bg-ph" hidden></div>
      ${r.slots.map(sl => furniturePiece(sl, s)).join('')}
    </div>`;
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

export function drawHome(s, roomId) {
  const r = ROOMS.find(x => x.id === roomId) ?? ROOMS[0];
  return homeCard(s) + `
    <section class="panel">
      <div class="seg" role="tablist">${ROOMS.map(x => `
        <button role="tab" data-act="room" data-id="${x.id}" aria-selected="${x.id === r.id}">${pic(x.pic)}${x.name}</button>`).join('')}
      </div>
      ${roomStage(r, s)}
      <p class="hint">Tap furniture to upgrade it. ✨ means an upgrade is available.</p>
      <p class="perk">${bonusLine(r, s)}</p>
    </section>`;
}
