/**
 * Lightweight canvas confetti — no external deps.
 * Call launchConfetti() to fire particles from the top of the viewport.
 */
export function launchConfetti(originY: 'top' | 'center' = 'top') {
  if (typeof window === 'undefined') return;

  const raw = localStorage.getItem('codlearn_experience');
  if (raw) {
    try {
      const settings = JSON.parse(raw);
      if (settings.animationsEnabled === false) return;
    } catch {
      // ignore parse errors
    }
  }

  const canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return; }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#f97316'];

  interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    color: string;
    w: number; h: number;
    rotation: number;
    rSpeed: number;
    opacity: number;
  }

  const particles: Particle[] = [];
  const count = 160;

  for (let i = 0; i < count; i++) {
    const startY = originY === 'center' ? canvas.height * 0.4 : -10;
    particles.push({
      x: Math.random() * canvas.width,
      y: startY,
      vx: (Math.random() - 0.5) * 7,
      vy: originY === 'center'
        ? (Math.random() - 0.5) * 12
        : Math.random() * 4 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: Math.random() * 10 + 5,
      h: Math.random() * 5 + 3,
      rotation: Math.random() * Math.PI * 2,
      rSpeed: (Math.random() - 0.5) * 0.25,
      opacity: 1,
    });
  }

  let raf: number;
  const startTime = performance.now();
  const maxDuration = 4500;

  function draw() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    const elapsed = performance.now() - startTime;
    let anyAlive = false;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gravity
      p.vx *= 0.99; // air drag
      p.rotation += p.rSpeed;

      // Fade out in the last 1 second
      if (elapsed > maxDuration - 1000) {
        p.opacity = Math.max(0, p.opacity - 0.02);
      }

      if (p.y < canvas.height + 20 && p.opacity > 0) anyAlive = true;

      ctx!.save();
      ctx!.globalAlpha = p.opacity;
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx!.restore();
    }

    if (anyAlive && elapsed < maxDuration) {
      raf = requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }

  raf = requestAnimationFrame(draw);

  // Safety cleanup
  setTimeout(() => {
    cancelAnimationFrame(raf);
    canvas.remove();
  }, maxDuration + 200);
}
