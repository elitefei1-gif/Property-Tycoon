// Tenant events: turns the data in data/events.js into an offer-style pop-up ({ title, pic, text, choices }).
import { EVENTS, EVENT_CHANCE } from './data/events.js';
import { building } from './city.js';
import { yen } from './format.js';

const pick = list => list[Math.floor(Math.random() * list.length)];
const round = n => Math.round(n / 1000) * 1000;

function rollOutcome(outcomes) {
  let r = Math.random();
  for (const o of outcomes) { if ((r -= o.chance) < 0) return o; }
  return outcomes.at(-1);
}

// Called each month. Returns an event for a random tenant, or null.
export function tenantEvent(s) {
  const homes = Object.entries(s.owned).filter(([, o]) => o.stage === 'rented');
  if (!homes.length || Math.random() >= EVENT_CHANCE) return null;
  const [id, o] = pick(homes);
  const b = building(id), t = o.tenant, ev = pick(EVENTS);
  const fill = (str, cost = 0) => str
    .replaceAll('{tenant}', `${t.name}-san`).replaceAll('{building}', b.name).replaceAll('{cost}', yen(cost));

  return {
    tag: 'Tenant', title: ev.title, pic: ev.pic, face: t.pic, text: fill(ev.text),
    choices: ev.choices.map(c => {
      const price = c.refund ? b.rent : round(b.rent * c.cost);
      const short = price > s.money;
      return {
        label: fill(c.label, price),
        hint: short ? `You need ${yen(price - s.money)} more.` : fill(c.hint, price),
        enabled: !short,
        run: s => {
          s.money -= price;
          const out = rollOutcome(c.outcomes);
          // Only change things if the tenant still lives there.
          if (s.owned[id]?.tenant === t) {
            if (out.stay === 'leave') t.leaves = s.month + 1;
            else t.leaves += out.stay;
          }
          return fill(out.text);
        },
      };
    }),
  };
}
