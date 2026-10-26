// How home upgrades help your business. A room's level = total upgrade levels of its slots (0-6).
export const BASE_PROPERTIES = 2;     // properties you can manage with a bare home office
export const PROPERTIES_PER_LEVEL = 1; // + per home office level
export const DISCOUNT_PER_LEVEL = 0.03; // bedroom: 3% off buying and renovating per level
export const INVESTOR_PER_LEVEL = 0.05; // living room: 5% chance per level each month that an investor visits

// Investor offers
export const SALE_MULTIPLIER = [1.3, 1.7]; // a buyer offers this much × (price + renovation)
export const TIP_DISCOUNT = 0.3;           // a tip-off: buy a building 30% cheaper
export const GIFT_PER_LEVEL = 150_000;     // an investor invests this × living room level
