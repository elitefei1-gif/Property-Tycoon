// Header card: who you are, the date, and your money.
import { yen, monthName, yearOf } from '../format.js';
import { pic } from './pics.js';
import { monthlyRent, ownedCount } from '../city.js';
import { homeTier } from '../home.js';

export function drawHud(el, s) {
  el.innerHTML = `
    <div class="card">
      <div class="card-top"><span>Landlord card</span><span>Tokyo</span></div>
      <div class="card-body">
        <div class="avatar">${pic('player')}</div>
        <div><div class="name">You</div><div class="sub">Rookie landlord · ${homeTier(s).name.toLowerCase()}</div></div>
        <div class="date"><b>${monthName(s.month)}</b><span>Year ${yearOf(s.month)}</span></div>
      </div>
      <div class="figures">
        <span id="cash">Cash<b>${yen(s.money)}</b></span>
        <span>Rent / month<b>${yen(monthlyRent(s))}</b></span>
        <span>Properties<b>${ownedCount(s)}</b></span>
      </div>
    </div>`;
}
