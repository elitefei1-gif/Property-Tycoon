// Home upgrades turn into business bonuses.
import { ROOMS } from './data/upgrades.js';
import { BASE_PROPERTIES, PROPERTIES_PER_LEVEL, DISCOUNT_PER_LEVEL, INVESTOR_PER_LEVEL } from './data/bonuses.js';

export const roomLevel = (s, roomId) =>
  ROOMS.find(r => r.id === roomId).slots.reduce((n, sl) => n + (s.home[sl.id] ?? 0), 0);

// Home office: how many properties you can own.
export const maxProperties = s => BASE_PROPERTIES + PROPERTIES_PER_LEVEL * roomLevel(s, 'office');
// Bedroom: well rested = better deals.
export const dealDiscount = s => DISCOUNT_PER_LEVEL * roomLevel(s, 'bedroom');
// Living room: chance each month an investor drops by.
export const investorChance = s => INVESTOR_PER_LEVEL * roomLevel(s, 'living');

// Prices after the bedroom discount, rounded to ¥1,000.
const off = (s, n) => Math.round(n * (1 - dealDiscount(s)) / 1000) * 1000;
export const buyPrice = (s, b) => off(s, b.price);
export const renoCost = (s, b) => off(s, b.reno);
