// Content of the open tab.
import { pic } from './pics.js';
import { drawCity } from './city.js';

const drawHome = () => `
  <section class="panel"><h3>Your home</h3>
    <div class="empty">${pic('home', 'pic')}Your tiny rented room. Upgrades will appear here.</div></section>`;

export function drawPanel(el, s) {
  el.innerHTML = s.view === 'city' ? drawCity(s) : drawHome();
}
