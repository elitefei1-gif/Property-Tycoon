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
  // home
  room_bed: 'img/a_rest.webp',
  room_office: 'img/a_overtime.webp',
  room_living: 'img/a_social.webp',
  home_room: 'img/ev_u_hostel.webp',
  home_apt: 'img/h_apt.webp',
  home_house: 'img/h_jb.webp',
  home_mansion: 'img/h_bungalow.webp',
  // investor offers
  inv_buyer: 'img/ev_biz_buyer.webp',
  inv_tip: 'img/a_invest.webp',
  inv_gift: 'img/m_money.webp',
  // tenant events
  ev_leak: 'img/ev_t_roof.webp',
  ev_noise: 'img/ev_gaming.webp',
  ev_late: 'img/ev_debt.webp',
  ev_pet: 'img/ev_stray.webp',
  ev_food: 'img/ev_cooking.webp',
  // tenants
  ten_office: 'img/partner_f__japanese.webp',
  ten_student_m: 'img/partner_m__korean.webp',
  ten_student_f: 'img/partner_f__korean.webp',
  ten_musician: 'img/playboy__japanese.webp',
  ten_designer: 'img/playgirl__japanese.webp',
  ten_newlyweds: 'img/spouse_m__japanese.webp',
};

export const pic = (key, cls = '') => `<img class="${cls}" src="${PICS[key]}" alt="">`;
