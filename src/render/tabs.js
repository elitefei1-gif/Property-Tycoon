// The two big picture tabs that switch between business (City) and Home.
import { pic } from './pics.js';

const TABS = [
  { id: 'city', label: 'City' },
  { id: 'home', label: 'Home' },
];

export function drawTabs(el, s) {
  el.innerHTML = TABS.map(t => `
    <button role="tab" data-tab="${t.id}" aria-selected="${s.view === t.id}">
      ${pic(t.id, 'pic')}${t.label}
    </button>`).join('');
}
