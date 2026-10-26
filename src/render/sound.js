// Tiny sound effects made with Web Audio (no sound files).
let ctx;

function tone(freq, start, len, vol = .08) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'triangle';
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + start + len);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime + start);
  o.stop(ctx.currentTime + start + len);
}

// "Cha-ching": two quick high notes.
export function coinSound() {
  try {
    ctx ??= new AudioContext();
    if (ctx.state !== 'running') return; // browsers allow sound only after you've tapped something
    tone(1320, 0, .12);
    tone(1760, .08, .25);
  } catch { /* no sound is fine */ }
}

// Browsers need one tap before sound can play.
addEventListener('pointerdown', () => { try { (ctx ??= new AudioContext()).resume(); } catch {} }, { once: true });
