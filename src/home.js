// Your home: upgrade levels for each slot, and which kind of home that adds up to.
import { ROOMS, HOME_TIERS } from './data/upgrades.js';

export const SLOTS = ROOMS.flatMap(r => r.slots);
export const slot = id => SLOTS.find(sl => sl.id === id);
export const levelOf = (s, id) => s.home[id] ?? 0;
export const totalLevels = s => SLOTS.reduce((n, sl) => n + levelOf(s, sl.id), 0);

export function homeTier(s) {
  const n = totalLevels(s);
  return HOME_TIERS.findLast(t => n >= t.minLevels);
}
export const nextTier = s => HOME_TIERS.find(t => t.minLevels > totalLevels(s));

// The next level up for a slot, or undefined if it's maxed.
export const nextLevel = (s, id) => slot(id).levels[levelOf(s, id) + 1];

export function upgrade(s, id) {
  const next = nextLevel(s, id);
  if (!next || s.money < next.cost) return false;
  s.money -= next.cost;
  s.home[id] = levelOf(s, id) + 1;
  return next.cost;
}
