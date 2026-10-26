// Picture files (borrowed from Malaysian Life Simulator). Keys are used in the render code.
export const PICS = {
  player: 'img/av_player.webp',
  city: 'img/h_units.webp',
  home: 'img/a_rest.webp',
  rundown: 'img/h_flat.webp',
};

export const pic = (key, cls = '') => `<img class="${cls}" src="${PICS[key]}" alt="">`;
