// Pop-up sheet for one building: picture, details and the next action.
import { building, stageOf, RENO_MONTHS, isFull } from '../city.js';
import { buyPrice, renoCost, dealDiscount, maxProperties } from '../bonus.js';
import { yen, monthName, yearOf } from '../format.js';
import { pic } from './pics.js';
import { STAGES, isFixed } from './city.js';

// A choice card. hint is the small grey line; enabled=false greys it out.
const choice = (act, id, label, hint, enabled = true) => `
  <button class="choice" data-act="${act}" data-id="${id}" ${enabled ? '' : 'disabled'}>
    <b>${label}</b><span>${hint}</span>
  </button>`;

function actions(b, stage, s) {
  switch (stage) {
    case 'forsale': {
      const price = buyPrice(s, b);
      const hint = isFull(s) ? `Your home office can only manage ${maxProperties(s)} properties. Upgrade it in the Home tab.`
        : s.money < price ? `You need ${yen(price - s.money)} more.`
        : 'It\'s run-down. You\'ll need to renovate before renting it out.';
      return choice('buy', b.id, `Buy for ${yen(price)}`, hint, s.money >= price && !isFull(s));
    }
    case 'rundown': {
      const cost = renoCost(s, b);
      return choice('renovate', b.id, `Renovate for ${yen(cost)}`,
        s.money >= cost ? `Takes ${RENO_MONTHS} month. Then it's ready for tenants.`
                        : `You need ${yen(cost - s.money)} more.`, s.money >= cost);
    }
    case 'renovating':
      return `<p class="note">🔨 The builders are working. Ready next month.</p>`;
    case 'ready':
      return choice('rent', b.id, `Rent out for ${yen(b.rent)}/mo`, 'List it. Tenants will find it on their own, usually within a month or two.');
    case 'listed':
      return `<p class="note">🔎 Listed for ${yen(b.rent)}/mo. Waiting for someone to move in…</p>`;
    case 'rented': {
      const t = s.owned[b.id].tenant;
      return `<div class="tcard">${pic(t.pic)}<div><b>${t.name}-san</b><span>${t.kind} · living here since ${monthName(t.since)}, Year ${yearOf(t.since)}</span>
        <span>Pays <b class="mono">${yen(b.rent)}</b> a month</span></div></div>`;
    }
  }
}

export function drawSheet(el, s, id) {
  if (!id) { el.hidden = true; el.innerHTML = ''; return; }
  const b = building(id);
  const stage = stageOf(s, id);
  const fixed = isFixed(stage);
  el.hidden = false;
  el.innerHTML = `
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-title">
      <button class="close" data-act="close" aria-label="Close">✕</button>
      <span class="tag ${STAGES[stage].cls}">${STAGES[stage].tag}</span>
      <div class="sh-pic ${fixed ? '' : 'faded'}">${pic(b.pic)}</div>
      <h2 id="sh-title">${b.name}</h2>
      <p class="sub">${b.area} · ${b.type}</p>
      <div class="figures">
        <span>Price<b>${yen(buyPrice(s, b))}</b></span>
        <span>Renovation<b>${yen(renoCost(s, b))}</b></span>
        <span>Rent / month<b>${yen(b.rent)}</b></span>
      </div>
      ${dealDiscount(s) > 0 && stage !== 'renovating' && !isFixed(stage) ? `<p class="perk">😴 Well rested: ${Math.round(dealDiscount(s) * 100)}% off thanks to your bedroom</p>` : ''}
      <div class="choices">${actions(b, stage, s)}</div>
    </div>`;
}
