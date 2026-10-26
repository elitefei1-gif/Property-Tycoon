// Buildings you own: buying, renovating, renting out.
// Stages: 'rundown' (just bought) -> 'renovating' -> 'ready' -> 'rented'.
import { BUILDINGS } from './data/buildings.js';

// Months a renovation takes.
export const RENO_MONTHS = 1;

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

export function rentOut(s, id) {
  if (stageOf(s, id) !== 'ready') return false;
  s.owned[id].stage = 'rented';
  return true;
}

// Pays rent for every rented building. Returns [{ id, amount }] for the money effects.
export function collectRent(s) {
  const paid = Object.entries(s.owned)
    .filter(([, o]) => o.stage === 'rented')
    .map(([id]) => ({ id, amount: building(id).rent }));
  for (const p of paid) s.money += p.amount;
  return paid;
}

// Called at the start of each month. Returns names of buildings that finished renovating.
export function cityMonth(s) {
  const done = [];
  for (const [id, o] of Object.entries(s.owned)) {
    if (o.stage === 'renovating' && --o.renoLeft <= 0) {
      o.stage = 'ready';
      delete o.renoLeft;
      done.push(building(id).name);
    }
  }
  return done;
}
