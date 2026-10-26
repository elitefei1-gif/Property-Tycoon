// Content of the open tab. Placeholders until the City and Home features are built.
import { pic } from './pics.js';

export function drawPanel(el, s) {
  el.innerHTML = s.view === 'city'
    ? `<section class="panel"><h3>Your properties</h3>
        <div class="empty">${pic('rundown', 'pic')}Run-down buildings for sale will appear here.</div></section>`
    : `<section class="panel"><h3>Your home</h3>
        <div class="empty">${pic('home', 'pic')}Your tiny rented room. Upgrades will appear here.</div></section>`;
}
