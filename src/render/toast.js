// Small news cards that slide in above the bottom bar and disappear after a few seconds.
import { building } from '../city.js';
import { pic } from './pics.js';

let box;

export function toast(html, picKey) {
  box ??= Object.assign(document.body.appendChild(document.createElement('div')), { id: 'toasts' });
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `${picKey ? pic(picKey, 'tpic') : ''}<span>${html}</span>`;
  box.append(t);
  while (box.children.length > 3) box.firstChild.remove();
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, 3500);
}

// Turns the city's monthly news into toasts.
export function cityNews(news) {
  for (const n of news) {
    const b = building(n.id);
    const who = n.tenant && `${n.tenant.name}-san`;
    if (n.type === 'renovated') toast(`🔨 <b>${b.name}</b> is renovated and ready to rent!`, b.pic);
    if (n.type === 'movein') toast(`🧳 <b>${who}</b> (${n.tenant.kind.toLowerCase()}) moved into <b>${b.name}</b>`, n.tenant.pic);
    if (n.type === 'moveout') toast(`👋 <b>${who}</b> moved out of <b>${b.name}</b>. Looking for new tenants…`, n.tenant.pic);
  }
}
