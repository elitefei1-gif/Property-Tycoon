// City tab: your properties, then buildings for sale, as cards. Tapping a card opens its sheet.
import { BUILDINGS } from '../data/buildings.js';
import { stageOf, ownedCount } from '../city.js';
import { buyPrice, maxProperties } from '../bonus.js';
import { yen } from '../format.js';
import { pic } from './pics.js';

// Label and colour class for the tag on each card.
export const STAGES = {
  forsale:    { tag: 'Run-down',      cls: 'old' },
  rundown:    { tag: 'Needs work',    cls: 'old' },
  renovating: { tag: 'Renovating…',   cls: 'busy' },
  ready:      { tag: 'Ready to rent', cls: 'ready' },
  listed:     { tag: 'Vacant',        cls: 'busy' },
  rented:     { tag: 'Rented',        cls: 'rented' },
};

export const isFixed = stage => ['ready', 'listed', 'rented'].includes(stage);

function bottomLine(b, s, stage) {
  if (stage === 'forsale') return `
    <div class="bprice mono ${s.money < buyPrice(s, b) ? 'short' : ''}">${yen(buyPrice(s, b))}</div>
    <div class="sub">Rent after renovation <b class="mono">${yen(b.rent)}</b>/mo</div>`;
  const t = s.owned[b.id].tenant;
  if (t) return `<div class="tenant">${pic(t.pic)}<span><b>${t.name}-san</b><br>${t.kind}</span></div>`;
  if (stage === 'listed') return `<div class="tenant none">🔎 Looking for tenants…</div>`;
  return `<div class="sub">Rent <b class="mono">${yen(b.rent)}</b>/mo</div>`;
}

function buildingCard(b, s) {
  const stage = stageOf(s, b.id);
  const st = STAGES[stage];
  return `
    <button class="bcard" data-act="open" data-id="${b.id}">
      <div class="bpic ${isFixed(stage) ? '' : 'faded'}">${pic(b.pic)}<span class="tag ${st.cls}">${st.tag}</span></div>
      <div class="binfo">
        <div class="bname">${b.name}</div>
        <div class="sub">${b.area} · ${b.type}</div>
        ${bottomLine(b, s, stage)}
      </div>
    </button>`;
}

function section(title, list, s, empty, count = list.length) {
  return `
    <section class="panel">
      <div class="phead"><h3>${title}</h3><span class="pill">${count}</span></div>
      ${list.length ? `<div class="bgrid">${list.map(b => buildingCard(b, s)).join('')}</div>`
                    : `<div class="empty small">${empty}</div>`}
    </section>`;
}

export function drawCity(s) {
  const mine = BUILDINGS.filter(b => stageOf(s, b.id) !== 'forsale');
  const forSale = BUILDINGS.filter(b => stageOf(s, b.id) === 'forsale');
  return section('Your properties', mine, s, 'You don\'t own anything yet. Tap a building below to buy it.',
                 `${ownedCount(s)} / ${maxProperties(s)}`)
       + section('For sale', forSale, s, 'You\'ve bought every building in town!');
}
