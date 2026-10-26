// City tab: your properties, then buildings for sale, as cards. Tapping a card opens its sheet.
import { BUILDINGS } from '../data/buildings.js';
import { stageOf } from '../city.js';
import { yen } from '../format.js';
import { pic } from './pics.js';

// Label and colour class for the tag on each card.
export const STAGES = {
  forsale:    { tag: 'Run-down',      cls: 'old' },
  rundown:    { tag: 'Needs work',    cls: 'old' },
  renovating: { tag: 'Renovating…',   cls: 'busy' },
  ready:      { tag: 'Ready to rent', cls: 'ready' },
  rented:     { tag: 'Rented',        cls: 'rented' },
};

function buildingCard(b, s) {
  const stage = stageOf(s, b.id);
  const st = STAGES[stage];
  const fixed = stage === 'ready' || stage === 'rented';
  const line = stage === 'forsale'
    ? `<div class="bprice mono ${s.money < b.price ? 'short' : ''}">${yen(b.price)}</div>
       <div class="sub">Rent after renovation <b class="mono">${yen(b.rent)}</b>/mo</div>`
    : `<div class="sub">Rent <b class="mono">${yen(b.rent)}</b>/mo</div>`;
  return `
    <button class="bcard" data-act="open" data-id="${b.id}">
      <div class="bpic ${fixed ? '' : 'faded'}">${pic(b.pic)}<span class="tag ${st.cls}">${st.tag}</span></div>
      <div class="binfo">
        <div class="bname">${b.name}</div>
        <div class="sub">${b.area} · ${b.type}</div>
        ${line}
      </div>
    </button>`;
}

function section(title, list, s, empty) {
  return `
    <section class="panel">
      <div class="phead"><h3>${title}</h3><span class="pill">${list.length}</span></div>
      ${list.length ? `<div class="bgrid">${list.map(b => buildingCard(b, s)).join('')}</div>`
                    : `<div class="empty small">${empty}</div>`}
    </section>`;
}

export function drawCity(s) {
  const mine = BUILDINGS.filter(b => stageOf(s, b.id) !== 'forsale');
  const forSale = BUILDINGS.filter(b => stageOf(s, b.id) === 'forsale');
  return section('Your properties', mine, s, 'You don\'t own anything yet. Tap a building below to buy it.')
       + section('For sale', forSale, s, 'You\'ve bought every building in town!');
}
