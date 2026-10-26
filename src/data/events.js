// Tenant events. Each month there's a chance one of your tenants has a little drama.
// In text: {tenant} = tenant's name, {building} = building name, {cost} = the choice's price.
//
// A choice can have:
//   cost: price as a multiple of that building's monthly rent (0 = free)
//   refund: true = you give back this month's rent
//   outcomes: picked at random by chance (they should add up to 1). Each has
//     stay: months the tenant stays longer (+) or 'leave' = they move out next month
//     text: the result shown afterwards
export const EVENT_CHANCE = 0.2; // per month, if at least one building has a tenant

export const EVENTS = [
  {
    id: 'leak', title: 'Leaking pipe!', pic: 'ev_leak',
    text: '{tenant} calls in a panic: a pipe under the sink in <b>{building}</b> is leaking all over the floor.',
    choices: [
      { label: 'Call a plumber ({cost})', hint: 'Fixed properly, today.', cost: 0.5,
        outcomes: [{ chance: 1, stay: 6, text: '🔧 Fixed in an hour. {tenant} is impressed and plans to stay longer.' }] },
      { label: 'Fix it yourself', hint: 'Free… if you know what you\'re doing.', cost: 0,
        outcomes: [
          { chance: 0.6, stay: 0, text: '🧰 A bit of tape and a lot of luck. It holds!' },
          { chance: 0.4, stay: 'leave', text: '💦 Oops, it got worse. {tenant} has had enough and will move out.' } ] },
      { label: 'Tell them to put a bucket under it', hint: 'Cheap. Not very kind.', cost: 0,
        outcomes: [{ chance: 1, stay: 'leave', text: '🪣 {tenant} isn\'t happy and gives notice to move out.' }] },
    ],
  },
  {
    id: 'noise', title: 'Noise complaint', pic: 'ev_noise',
    text: 'Neighbours of <b>{building}</b> say {tenant} plays games loudly until 3 a.m. every night.',
    choices: [
      { label: 'Have a polite chat', hint: 'Usually works.', cost: 0,
        outcomes: [
          { chance: 0.75, stay: 0, text: '🤫 {tenant} apologises and buys a headset.' },
          { chance: 0.25, stay: 'leave', text: '😤 {tenant} takes it badly and decides to move out.' } ] },
      { label: 'Add soundproofing ({cost})', hint: 'Everyone wins.', cost: 0.6,
        outcomes: [{ chance: 1, stay: 6, text: '🎧 Peace and quiet, and {tenant} loves the cosy new walls.' }] },
    ],
  },
  {
    id: 'late', title: 'Rent trouble', pic: 'ev_late',
    text: '{tenant} looks worried. Things are tight this month. Could you go easy on the rent for <b>{building}</b>?',
    choices: [
      { label: 'Let them off this month', hint: 'You give back this month\'s rent ({cost}).', cost: 0, refund: true,
        outcomes: [{ chance: 1, stay: 12, text: '🙏 {tenant} is so grateful they promise to stay for a long time.' }] },
      { label: 'Rent is rent', hint: 'Keep the money.', cost: 0,
        outcomes: [
          { chance: 0.7, stay: 0, text: '💴 {tenant} scrapes it together somehow.' },
          { chance: 0.3, stay: 'leave', text: '📦 {tenant} can\'t afford it and will move out.' } ] },
    ],
  },
  {
    id: 'pet', title: 'A new friend', pic: 'ev_pet',
    text: '{tenant} found a tiny stray kitten outside <b>{building}</b> and asks if they can keep it.',
    choices: [
      { label: 'Of course!', hint: 'Who could say no to that face?', cost: 0,
        outcomes: [{ chance: 1, stay: 12, text: '🐱 {tenant} and the kitten are very happy there. They\'ll stay a long while.' }] },
      { label: 'Sorry, no pets', hint: 'Keeps the place tidy.', cost: 0,
        outcomes: [
          { chance: 0.6, stay: 0, text: '😿 {tenant} finds the kitten another home.' },
          { chance: 0.4, stay: 'leave', text: '🐾 {tenant} decides to move somewhere pets are allowed.' } ] },
    ],
  },
  {
    id: 'food', title: 'A thank-you dinner', pic: 'ev_food',
    text: '{tenant} from <b>{building}</b> made too much curry and brings you a big pot as thanks for being a nice landlord.',
    choices: [
      { label: 'Say thank you', hint: 'Delicious.', cost: 0,
        outcomes: [{ chance: 1, stay: 6, text: '🍛 Best curry in Tokyo. {tenant} feels right at home.' }] },
    ],
  },
];
