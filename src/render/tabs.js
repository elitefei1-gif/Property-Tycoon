// The two big picture tabs that switch between business (City) and Home.
const TABS = [
  { id: 'city', pic: '🏙️', label: 'City' },
  { id: 'home', pic: '🏠', label: 'Home' },
];

export function drawTabs(el, s) {
  el.innerHTML = TABS.map(t => `
    <button role="tab" data-tab="${t.id}" aria-selected="${s.view === t.id}">
      <span class="pic">${t.pic}</span>${t.label}
    </button>`).join('');
}
