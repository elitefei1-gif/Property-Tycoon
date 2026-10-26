// Who can rent your buildings. Tweak chances here to balance the game.
export const TENANT_KINDS = [
  { kind: 'Office worker', pic: 'ten_office' },
  { kind: 'Student',       pic: 'ten_student_m' },
  { kind: 'Student',       pic: 'ten_student_f' },
  { kind: 'Musician',      pic: 'ten_musician' },
  { kind: 'Designer',      pic: 'ten_designer' },
  { kind: 'Newlyweds',     pic: 'ten_newlyweds' },
];

export const SURNAMES = ['Tanaka', 'Suzuki', 'Sato', 'Takahashi', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura',
  'Kobayashi', 'Kato', 'Yoshida', 'Yamada', 'Sasaki', 'Matsumoto', 'Inoue', 'Kimura', 'Hayashi', 'Shimizu'];

// Chance each month that an empty, listed building finds a tenant.
export const FIND_CHANCE = 0.6;
// How many months a tenant stays (picked at random in this range).
export const STAY_MIN = 6;
export const STAY_MAX = 24;
