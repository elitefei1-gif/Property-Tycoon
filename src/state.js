// The whole game state in one object, and saving it in the browser (localStorage).
const SAVE_KEY = 'property-tycoon-save';

export function createState() {
  return {
    money: 3_000_000, // yen
    month: 0,         // months since the start; 0 = April, Year 1
    monthTimer: 0,    // seconds into the current month
    view: 'city',     // which tab is open: 'city' or 'home'
    paused: false,
    owned: {},        // building id -> { stage, renoLeft, tenant }
    home: {},         // home slot id -> upgrade level (missing = 0)
  };
}

// The saved game, or a new one. Missing fields (from older saves) get their starting values.
export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (saved) return { ...createState(), ...saved };
  } catch { /* no storage or a broken save: start fresh */ }
  return createState();
}

export function save(s) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch { /* storage full or blocked */ }
}

export function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch {}
}
