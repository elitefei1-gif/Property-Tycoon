// Pop-up for events and offers: picture, optional face (who it's about), story and choice cards (data-act="choose", data-id = choice number).
import { pic } from './pics.js';

export function drawEvent(el, ev) {
  el.hidden = false;
  el.innerHTML = `
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="ev-title">
      <span class="tag event">${ev.tag ?? 'Visitor'}</span>
      <div class="sh-pic wide">${pic(ev.pic)}</div>
      <h2 id="ev-title">${ev.face ? pic(ev.face, 'face') : ''}${ev.title}</h2>
      <p class="story">${ev.text}</p>
      <div class="choices">${ev.choices.map((c, i) => `
        <button class="choice" data-act="choose" data-id="${i}" ${c.enabled ? '' : 'disabled'}>
          <b>${c.label}</b><span>${c.hint}</span>
        </button>`).join('')}</div>
    </div>`;
}
