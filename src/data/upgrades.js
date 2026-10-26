// Your home: rooms, their upgrade slots, and what each level costs. Level 0 is what you start with (free).
export const ROOMS = [
  { id: 'bedroom', name: 'Bedroom', pic: 'room_bed', slots: [
    { id: 'bed', name: 'Bed', icon: '🛏️', levels: [
      { name: 'Thin futon', cost: 0 }, { name: 'Thick futon', cost: 120_000 },
      { name: 'Wooden bed', cost: 450_000 }, { name: 'King-size bed', cost: 1_500_000 } ] },
    { id: 'bdeco', name: 'Decoration', icon: '🪴', levels: [
      { name: 'Bare walls', cost: 0 }, { name: 'Potted plant', cost: 60_000 },
      { name: 'Paper lanterns', cost: 250_000 }, { name: 'Ukiyo-e print', cost: 900_000 } ] },
  ] },
  { id: 'office', name: 'Home office', pic: 'room_office', slots: [
    { id: 'desk', name: 'Desk', icon: '🖥️', levels: [
      { name: 'Low table', cost: 0 }, { name: 'Study desk', cost: 150_000 },
      { name: 'Desk with PC', cost: 600_000 }, { name: 'Executive desk', cost: 2_000_000 } ] },
    { id: 'odeco', name: 'Decoration', icon: '📚', levels: [
      { name: 'Nothing', cost: 0 }, { name: 'Wall calendar', cost: 40_000 },
      { name: 'Bookshelf', cost: 300_000 }, { name: 'Bonsai tree', cost: 1_200_000 } ] },
  ] },
  { id: 'living', name: 'Living room', pic: 'room_living', slots: [
    { id: 'sofa', name: 'Seating', icon: '🛋️', levels: [
      { name: 'Floor cushion', cost: 0 }, { name: 'Kotatsu table', cost: 200_000 },
      { name: 'Comfy sofa', cost: 700_000 }, { name: 'Leather sofa set', cost: 2_500_000 } ] },
    { id: 'ldeco', name: 'Decoration', icon: '🐟', levels: [
      { name: 'Nothing', cost: 0 }, { name: 'Soft rug', cost: 80_000 },
      { name: 'Big TV', cost: 400_000 }, { name: 'Koi aquarium', cost: 1_500_000 } ] },
  ] },
];

// Your home grows as you upgrade. minLevels = total upgrade levels across all slots.
export const HOME_TIERS = [
  { minLevels: 0,  name: 'Tiny rented room', pic: 'home_room' },
  { minLevels: 4,  name: 'Cozy apartment',   pic: 'home_apt' },
  { minLevels: 9,  name: 'Family house',     pic: 'home_house' },
  { minLevels: 15, name: 'Mansion',          pic: 'home_mansion' },
];
