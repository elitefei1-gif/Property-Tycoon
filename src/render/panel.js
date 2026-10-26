// Content of the open tab.
import { drawCity } from './city.js';
import { drawHome } from './home.js';

export function drawPanel(el, s) {
  el.innerHTML = s.view === 'city' ? drawCity(s) : drawHome(s);
}
