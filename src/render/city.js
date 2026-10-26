// City tab: buildings for sale, shown as cards.
import { BUILDINGS } from '../data/buildings.js';
import { yen } from '../format.js';
import { pic } from './pics.js';

function buildingCard(b, s) {
  const short = s.money < b.price;
  return `
    <article class="bcard">
      <div class="bpic">${pic(b.pic)}<span class="tag">Run-down</span></div>
      <div class="binfo">
        <div class="bname">${b.name}</div>
        <div class="sub">${b.area} · ${b.type}</div>
        <div class="bprice mono ${short ? 'short' : ''}">${yen(b.price)}</div>
        <div class="sub">Rent after renovation <b class="mono">${yen(b.rent)}</b>/mo</div>
      </div>
    </article>`;
}

export function drawCity(s) {
  return `
    <section class="panel">
      <div class="phead"><h3>For sale</h3><span class="pill">${BUILDINGS.length} buildings</span></div>
      <div class="bgrid">${BUILDINGS.map(b => buildingCard(b, s)).join('')}</div>
    </section>`;
}
