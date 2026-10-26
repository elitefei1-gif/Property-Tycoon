// The whole game state in one object. Save/load comes later.
export function createState() {
  return {
    money: 3_000_000, // yen
    month: 0,         // months since the start; 0 = April, Year 1
    monthTimer: 0,    // seconds into the current month
    view: 'city',     // which tab is open: 'city' or 'home'
    paused: false,
  };
}
