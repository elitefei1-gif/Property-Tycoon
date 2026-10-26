// Low-res pixel canvas scaled up by whole numbers so pixels stay crisp.
export const WIDTH = 320;
export const HEIGHT = 180;

export function createScreen(canvas) {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  function fit() {
    const scale = Math.max(1, Math.floor(Math.min(innerWidth / WIDTH, innerHeight / HEIGHT)));
    canvas.style.width = `${WIDTH * scale}px`;
    canvas.style.height = `${HEIGHT * scale}px`;
  }
  addEventListener('resize', fit);
  fit();

  return { canvas, ctx };
}

export function drawFrame({ ctx }, game, monthProgress) {
  // Grass background
  ctx.fillStyle = '#7ec850';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Top bar
  ctx.fillStyle = '#3b2f4a';
  ctx.fillRect(0, 0, WIDTH, 14);

  ctx.fillStyle = '#fff6d5';
  ctx.font = '8px monospace';
  ctx.textBaseline = 'top';
  ctx.fillText(`Month ${game.month}`, 4, 3);

  // Progress through the current month
  const barX = 70, barY = 5, barW = 60, barH = 4;
  ctx.fillStyle = '#5c4b70';
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = '#ffd34e';
  ctx.fillRect(barX, barY, Math.floor(barW * monthProgress), barH);
}
