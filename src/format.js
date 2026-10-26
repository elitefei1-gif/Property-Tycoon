// Small helpers for showing numbers and dates.
const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

export const yen = n => '¥' + Math.round(n).toLocaleString('en-US');
export const monthName = m => MONTHS[m % 12];
export const yearOf = m => Math.floor(m / 12) + 1;
