// Your home: rooms, their furniture slots, and what each level costs. Level 0 is what you start with (free).
//
// Each room is drawn as a picture (bg) with furniture pictures placed on top.
// box = where a slot's furniture sits, in % of the room picture: x/y = top-left corner, w/h = size.
// The furniture picture is fitted inside the box, standing on its bottom edge.
// img = the furniture picture for that level (null = nothing there). Missing files show a placeholder.
// size = how wide the picture is, as a share of the box width (default 1 = full width), so bigger
// furniture looks bigger. Pictures stand on the bottom of the box and may poke out of its top.
// skew = extra slant in degrees for a slot's pictures, to line them up with a wall (+ = right side goes down).
// See ART.md for the list of pictures and how to make them.
const room = name => `img/room/${name}.webp`;

export const ROOMS = [
  { id: 'bedroom', name: 'Bedroom', pic: 'room_bed', bg: room('bedroom_bg'), slots: [
    { id: 'bed', name: 'Bed', icon: '🛏️', box: { x: 42, y: 36, w: 44, h: 46 }, levels: [
      { name: 'Thin futon', cost: 0, img: room('bed_0'), size: 0.72 },
      { name: 'Thick futon', cost: 120_000, img: room('bed_1'), size: 0.8 },
      { name: 'Wooden bed', cost: 450_000, img: room('bed_2'), size: 0.78 },
      { name: 'King-size bed', cost: 1_500_000, img: room('bed_3'), size: 1 } ] },
    { id: 'bdeco', name: 'Wall art', icon: '🖼️', skew: 13, box: { x: 62, y: 16, w: 17, h: 26 }, levels: [
      { name: 'Bare wall', cost: 0, img: null },
      { name: 'Cute poster', cost: 60_000, img: room('bdeco_1'), size: 0.8 },
      { name: 'Framed photo', cost: 250_000, img: room('bdeco_2') },
      { name: 'Ukiyo-e print', cost: 900_000, img: room('bdeco_3') } ] },
  ] },
  { id: 'office', name: 'Home office', pic: 'room_office', bg: room('office_bg'), slots: [
    { id: 'desk', name: 'Desk', icon: '🖥️', box: { x: 20, y: 38, w: 42, h: 48 }, levels: [
      { name: 'Low table', cost: 0, img: room('desk_0'), size: 0.86 },
      { name: 'Study desk', cost: 150_000, img: room('desk_1'), size: 0.86 },
      { name: 'Desk with PC', cost: 600_000, img: room('desk_2'), size: 0.95 },
      { name: 'Executive desk', cost: 2_000_000, img: room('desk_3') } ] },
    { id: 'odeco', name: 'Corner', icon: '📚', box: { x: 60, y: 22, w: 18, h: 48 }, levels: [
      { name: 'Empty corner', cost: 0, img: null },
      { name: 'Potted plant', cost: 40_000, img: room('odeco_1'), size: 0.7 },
      { name: 'Bookshelf', cost: 300_000, img: room('odeco_2') },
      { name: 'Bonsai display', cost: 1_200_000, img: room('odeco_3'), size: 0.8 } ] },
  ] },
  { id: 'living', name: 'Living room', pic: 'room_living', bg: room('living_bg'), slots: [
    { id: 'sofa', name: 'Seating', icon: '🛋️', box: { x: 30, y: 50, w: 44, h: 42 }, levels: [
      { name: 'Floor cushion', cost: 0, img: room('sofa_0') },
      { name: 'Kotatsu table', cost: 200_000, img: room('sofa_1') },
      { name: 'Comfy sofa', cost: 700_000, img: room('sofa_2') },
      { name: 'Leather sofa set', cost: 2_500_000, img: room('sofa_3') } ] },
    { id: 'ldeco', name: 'Feature', icon: '🐟', box: { x: 55, y: 22, w: 17, h: 44 }, levels: [
      { name: 'Empty corner', cost: 0, img: null },
      { name: 'Floor lamp', cost: 80_000, img: room('ldeco_1') },
      { name: 'Big TV', cost: 400_000, img: room('ldeco_2') },
      { name: 'Koi aquarium', cost: 1_500_000, img: room('ldeco_3') } ] },
  ] },
];

// Your home grows as you upgrade. minLevels = total upgrade levels across all slots.
export const HOME_TIERS = [
  { minLevels: 0,  name: 'Tiny rented room', pic: 'home_room' },
  { minLevels: 4,  name: 'Cozy apartment',   pic: 'home_apt' },
  { minLevels: 9,  name: 'Family house',     pic: 'home_house' },
  { minLevels: 15, name: 'Mansion',          pic: 'home_mansion' },
];
