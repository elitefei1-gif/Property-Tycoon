// Buildings you own: buying, renovating, renting out, tenants.
// Stages: 'rundown' (just bought) -> 'renovating' -> 'ready' -> 'listed' (empty, looking for tenants)
//         <-> 'rented' (a tenant lives there and pays rent; when they leave it goes back to 'listed').
import { BUILDINGS } from './data/buildings.js';
import { TENANT_KINDS, SURNAMES, FIND_CHANCE, STAY_MIN, STAY_MAX } from './data/tenants.js';

// Months a renovation takes.
export const RENO_MONTHS = 1;

const pick = list => list[Math.floor(Math.random() * list.length)];
const between = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

export const building = id => BUILDINGS.find(b => b.id === id);
export const stageOf = (s, id) => s.owned[id]?.stage ?? 'forsale';
export const ownedCount = s => Object.keys(s.owned).length;

export function monthlyRent(s) {
  return Object.entries(s.owned)
    .filter(([, o]) => o.stage === 'rented')
    .reduce((sum, [id]) => sum + building(id).rent, 0);
}

export function buy(s, id) {
  const b = building(id);
  if (stageOf(s, id) !== 'forsale' || s.money < b.price) return false;
  s.money -= b.price;
  s.owned[id] = { stage: 'rundown' };
  return true;
}

export function renovate(s, id) {
  const b = building(id);
  if (stageOf(s, id) !== 'rundown' || s.money < b.reno) return false;
  s.money -= b.reno;
  s.owned[id] = { stage: 'renovating', renoLeft: RENO_MONTHS };
  return true;
}

// Put a renovated building on the rental market. Tenants find it on their own.
export function rentOut(s, id) {
  if (stageOf(s, id) !== 'ready') return false;
  s.owned[id].stage = 'listed';
  return true;
}

function newTenant(s) {
  const t = pick(TENANT_KINDS);
  return { name: pick(SURNAMES), kind: t.kind, pic: t.pic, since: s.month, leaves: s.month + between(STAY_MIN, STAY_MAX) };
}

// Pays rent for every occupied building. Returns [{ id, amount }] for the money effects.
export function collectRent(s) {
  const paid = Object.entries(s.owned)
    .filter(([, o]) => o.stage === 'rented')
    .map(([id]) => ({ id, amount: building(id).rent }));
  for (const p of paid) s.money += p.amount;
  return paid;
}

// Called at the start of each month, after rent. Finishes renovations and moves tenants in and out.
// Returns news for the toasts: [{ type: 'renovated' | 'movein' | 'moveout', id, tenant? }].
export function cityMonth(s) {
  const news = [];
  for (const [id, o] of Object.entries(s.owned)) {
    if (o.stage === 'renovating' && --o.renoLeft <= 0) {
      o.stage = 'ready';
      delete o.renoLeft;
      news.push({ type: 'renovated', id });
    } else if (o.stage === 'rented' && s.month >= o.tenant.leaves) {
      news.push({ type: 'moveout', id, tenant: o.tenant });
      o.stage = 'listed';
      delete o.tenant;
    } else if (o.stage === 'listed' && Math.random() < FIND_CHANCE) {
      o.tenant = newTenant(s);
      o.stage = 'rented';
      news.push({ type: 'movein', id, tenant: o.tenant });
    }
  }
  return news;
}
