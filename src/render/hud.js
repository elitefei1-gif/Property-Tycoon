// Header card: who you are, the date, and your money.
import { yen, monthName, yearOf } from '../format.js';

export function drawHud(el, s) {
  el.innerHTML = `
    <div class="card">
      <div class="card-top"><span>Landlord card</span><span>Tokyo</span></div>
      <div class="card-body">
        <div class="avatar">🧑‍💼</div>
        <div><div class="name">You</div><div class="sub">Rookie landlord · tiny rented room</div></div>
        <div class="date"><b>${monthName(s.month)}</b><span>Year ${yearOf(s.month)}</span></div>
      </div>
      <div class="figures">
        <span>Cash<b>${yen(s.money)}</b></span>
        <span>Rent / month<b>${yen(0)}</b></span>
        <span>Properties<b>0</b></span>
      </div>
    </div>`;
}
