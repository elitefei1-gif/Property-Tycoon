// Picture files (borrowed from Malaysian Life Simulator). Keys are used in the render code and data.
export const PICS = {
  player: 'img/av_player.webp',
  city: 'img/h_units.webp',
  home: 'img/a_rest.webp',
  // buildings
  apt: 'img/h_apt.webp',
  terrace: 'img/h_terrace.webp',
  shoplot: 'img/h_shoplot.webp',
  afford: 'img/h_afford.webp',
  semid: 'img/h_semid.webp',
  flat: 'img/h_flat.webp',
};

export const pic = (key, cls = '') => `<img class="${cls}" src="${PICS[key]}" alt="">`;
