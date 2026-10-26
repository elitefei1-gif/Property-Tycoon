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
  // tenants
  ten_office: 'img/partner_f__japanese.webp',
  ten_student_m: 'img/partner_m__korean.webp',
  ten_student_f: 'img/partner_f__korean.webp',
  ten_musician: 'img/playboy__japanese.webp',
  ten_designer: 'img/playgirl__japanese.webp',
  ten_newlyweds: 'img/spouse_m__japanese.webp',
};

export const pic = (key, cls = '') => `<img class="${cls}" src="${PICS[key]}" alt="">`;
