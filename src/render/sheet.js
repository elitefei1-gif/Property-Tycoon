// Pop-up sheet for one building: picture, details and the next action.
import { building, stageOf, RENO_MONTHS } from '../city.js';
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
    case 'forsale':
      return choice('buy', b.id, `Buy for ${yen(b.price)}`,
        s.money >= b.price ? 'It\'s run-down. You\'ll need to renovate before renting it out.'
                           : `You need ${yen(b.price - s.money)} more.`, s.money >= b.price);
    case 'rundown':
      return choice('renovate', b.id, `Renovate for ${yen(b.reno)}`,
        s.money >= b.reno ? `Takes ${RENO_MONTHS} month. Then it's ready for tenants.`
                          : `You need ${yen(b.reno - s.money)} more.`, s.money >= b.reno);
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
        <span>Price<b>${yen(b.price)}</b></span>
        <span>Renovation<b>${yen(b.reno)}</b></span>
        <span>Rent / month<b>${yen(b.rent)}</b></span>
      </div>
      <div class="choices">${actions(b, stage, s)}</div>
    </div>`;
}
