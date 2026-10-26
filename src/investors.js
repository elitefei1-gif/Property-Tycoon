// Investor visits: the better your living room, the more often someone drops by with an offer.
// An offer is { title, pic, text, choices: [{ label, hint, enabled, run(s) -> result text }] }.
import { BUILDINGS } from './data/buildings.js';
import { SALE_MULTIPLIER, TIP_DISCOUNT, GIFT_PER_LEVEL } from './data/bonuses.js';
import { SURNAMES } from './data/tenants.js';
import { stageOf, ownedCount } from './city.js';
import { investorChance, maxProperties, roomLevel } from './bonus.js';
import { yen } from './format.js';

const pick = list => list[Math.floor(Math.random() * list.length)];
const round = n => Math.round(n / 10_000) * 10_000;
const no = label => ({ label, hint: 'Maybe another time.', enabled: true, run: () => '' });

function buyerOffer(s) {
  const mine = BUILDINGS.filter(b => ['ready', 'listed', 'rented'].includes(stageOf(s, b.id)));
  if (!mine.length) return null;
  const b = pick(mine);
  const [lo, hi] = SALE_MULTIPLIER;
  const price = round((b.price + b.reno) * (lo + Math.random() * (hi - lo)));
  const who = `${pick(SURNAMES)}-san`;
  return {
    title: 'A buyer at your door', pic: 'inv_buyer',
    text: `Over tea in your living room, ${who} says they love <b>${b.name}</b> and offers to buy it for <b>${yen(price)}</b>.`,
    choices: [
      { label: `Sell for ${yen(price)}`, hint: 'Its tenants stay with the new owner.', enabled: true,
        run: s => { delete s.owned[b.id]; s.money += price; return `🤝 You sold ${b.name} for ${yen(price)}!`; } },
      no('Keep it'),
    ],
  };
}

function tipOffer(s) {
  const forSale = BUILDINGS.filter(b => stageOf(s, b.id) === 'forsale');
  if (!forSale.length) return null;
  const b = pick(forSale);
  const price = round(b.price * (1 - TIP_DISCOUNT));
  const room = ownedCount(s) < maxProperties(s);
  return {
    title: 'An insider tip', pic: 'inv_tip',
    text: `A friendly investor whispers that the owner of <b>${b.name}</b> (${b.area}) needs to sell fast. You can have it for <b>${yen(price)}</b> instead of ${yen(b.price)}.`,
    choices: [
      { label: `Buy for ${yen(price)}`, enabled: room && s.money >= price,
        hint: !room ? 'Your home office can\'t manage another property.' : s.money < price ? `You need ${yen(price - s.money)} more.` : 'It\'s run-down, like the others.',
        run: s => { s.money -= price; s.owned[b.id] = { stage: 'rundown' }; return `🏚️ You bought ${b.name} for ${yen(price)}. A bargain!`; } },
      no('Pass'),
    ],
  };
}

function giftOffer(s) {
  const amount = GIFT_PER_LEVEL * roomLevel(s, 'living');
  return {
    title: 'An investor believes in you', pic: 'inv_gift',
    text: `After a cosy evening in your living room, ${pick(SURNAMES)}-san wants to back your business with <b>${yen(amount)}</b>.`,
    choices: [
      { label: `Accept ${yen(amount)}`, hint: 'No strings attached.', enabled: true,
        run: s => { s.money += amount; return `💴 ${yen(amount)} invested in your business!`; } },
    ],
  };
}

// Called each month. Returns an offer, or null if nobody visits.
export function investorVisit(s) {
  if (Math.random() >= investorChance(s)) return null;
  const offers = [buyerOffer(s), tipOffer(s), giftOffer(s)].filter(Boolean);
  return pick(offers);
}
