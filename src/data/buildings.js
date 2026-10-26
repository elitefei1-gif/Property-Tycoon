// Buildings for sale in the city. Tweak numbers here to balance the game.
// price: to buy it run-down. reno: renovation cost. rent: monthly rent once renovated.
export const BUILDINGS = [
  { id: 'koenji',   name: 'Sakura-sō',      area: 'Kōenji',        type: 'Old apartment', pic: 'apt',     price: 1_800_000,  reno: 600_000,   rent: 90_000 },
  { id: 'shimokita', name: 'Kitazawa Row',  area: 'Shimokitazawa', type: 'Row houses',    pic: 'terrace', price: 2_800_000,  reno: 900_000,   rent: 140_000 },
  { id: 'asakusa',  name: 'Kaminari Shops', area: 'Asakusa',       type: 'Shophouse',     pic: 'shoplot', price: 4_200_000,  reno: 1_200_000, rent: 210_000 },
  { id: 'nakano',   name: 'Maple Houses',   area: 'Nakano',        type: 'Family homes',  pic: 'afford',  price: 6_500_000,  reno: 1_800_000, rent: 320_000 },
  { id: 'kichijoji', name: 'Inokashira Duplex', area: 'Kichijōji', type: 'Duplex',        pic: 'semid',   price: 9_800_000,  reno: 2_500_000, rent: 480_000 },
  { id: 'ikebukuro', name: 'Sunshine Heights', area: 'Ikebukuro',  type: 'Apartment block', pic: 'flat',  price: 15_000_000, reno: 4_000_000, rent: 750_000 },
];
