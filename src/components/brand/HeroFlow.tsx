import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  hue: number;
  sat: number;
  light: number;
}

interface Arc {
  a: number;
  b: number;
  progress: number;
  speed: number;
}

interface HeroFlowProps {
  className?: string;
  variant?: 'hero' | 'framed' | 'card' | 'backdrop';
  /** >1 zooms in (crops), <1 zooms out (more field of view). Default 1. */
  zoom?: number;
  /** Optional seed offset so multiple backdrops feel distinct */
  seed?: number;
  /** When false, dots ignore mouse proximity (no “follow” effect). Default true. */
  interactive?: boolean;
}

/** Blue tones only — cyan → electric blue */
const PALETTE = [
  { h: 195, s: 95, l: 58 },
  { h: 185, s: 92, l: 55 },
  { h: 200, s: 90, l: 52 },
  { h: 210, s: 85, l: 48 },
  { h: 175, s: 88, l: 52 },
  { h: 190, s: 100, l: 62 },
];

/** Left clear zones by variant — keep copy readable */
const CLEAR_BY_VARIANT = {
  hero: 0.5,
  framed: 0.05,
  card: 0.4,
  backdrop: 0,
} as const;

/** Mouse influence radius (px) — dots grow / part as you move through */
const MOUSE_RADIUS = 160;
const MOUSE_GROW = 2.4;
const MOUSE_PUSH = 18;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hsl(h: number, s: number, l: number, a = 1) {
  return `hsla(${((h % 360) + 360) % 360}, ${s}%, ${l}%, ${a})`;
}

function spawnX(rand: () => number, leftClear: number) {
  return leftClear + 0.02 + rand() * (1 - leftClear - 0.04);
}

function buildDots(count: number, leftClear: number, seed: number): Dot[] {
  const rand = seededRandom(seed);
  const dots: Dot[] = [];

  for (let i = 0; i < count; i++) {
    const swatch = PALETTE[Math.floor(rand() * PALETTE.length)];
    dots.push({
      x: spawnX(rand, leftClear),
      y: -0.05 + rand() * 1.15,
      vx: (rand() - 0.5) * 0.01,
      vy: 0.012 + rand() * 0.022,
      r: 1.6 + rand() * 2.8,
      phase: rand() * Math.PI * 2,
      hue: swatch.h + (rand() - 0.5) * 8,
      sat: swatch.s,
      light: swatch.l + (rand() > 0.85 ? 8 : 0),
    });
  }

  return dots;
}

function buildArcs(dotCount: number, n: number, seed: number): Arc[] {
  const rand = seededRandom(seed);
  const arcs: Arc[] = [];
  for (let i = 0; i < n; i++) {
    const a = Math.floor(rand() * dotCount);
    let b = Math.floor(rand() * dotCount);
    while (b === a) b = Math.floor(rand() * dotCount);
    arcs.push({ a, b, progress: rand(), speed: 0.04 + rand() * 0.06 });
  }
  return arcs;
}

function proximityStrength(dist: number, radius: number) {
  if (dist >= radius) return 0;
  const t = 1 - dist / radius;
  return t * t;
}

/**
 * Network stream: clear left zone for copy, flow downward.
 * Mouse proximity grows nearby dots — navigating through the web.
 */
export function HeroFlow({
  className = '',
  variant = 'hero',
  zoom = 1,
  seed = 0,
  interactive = true,
}: HeroFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const arcsRef = useRef<Arc[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const isHero = variant === 'hero';
  const isCard = variant === 'card';
  const isBackdrop = variant === 'backdrop';
  const leftClear = CLEAR_BY_VARIANT[variant];
  const safeZoom = Math.min(2.8, Math.max(0.55, zoom));
  const canvasSizePct = `${safeZoom * 100}%`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseSeed = isBackdrop ? 2100 + seed : isCard ? 1440 : 999;
    const rand = seededRandom(baseSeed);
    const density = isBackdrop ? (safeZoom < 1 ? 1.35 : 0.85) : 1;
    const dotCount = Math.round(
      (isHero ? 180 : isCard ? 140 : isBackdrop ? 160 : 110) * density,
    );
    dotsRef.current = buildDots(
      dotCount,
      leftClear,
      (isBackdrop ? 900 : isCard ? 720 : 360) + seed,
    );
    arcsRef.current = buildArcs(
      dotsRef.current.length,
      isHero ? 8 : isCard || isBackdrop ? 6 : 5,
      (isBackdrop ? 1300 : isCard ? 1100 : 880) + seed,
    );

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouseRef.current = { x, y, active: inside };
    };

    const onPointerMove = (e: PointerEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener('resize', resize);
    if (interactive) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave);
    }

    let t = 0;

    const respawn = (d: Dot) => {
      d.y = -0.04 - rand() * 0.06;
      d.x = spawnX(rand, leftClear);
      d.vx = (rand() - 0.5) * 0.01;
      d.vy = 0.012 + rand() * 0.022;
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      t += reduceMotion ? 0 : 0.016;

      ctx.clearRect(0, 0, w, h);

      if (!isHero && !isBackdrop) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
      }

      const dots = dotsRef.current;
      const leftEdge = leftClear;
      const mouse = mouseRef.current;

      if (!reduceMotion) {
        for (const d of dots) {
          d.x += d.vx * 0.0012 + Math.sin(t * 0.2 + d.phase) * 0.00008;
          d.y += d.vy * 0.0012;
          if (d.x < leftEdge + 0.02) {
            d.x = leftEdge + 0.02;
            d.vx = Math.abs(d.vx);
          }
          if (d.x > 1.08) {
            d.x = 1.08;
            d.vx = -Math.abs(d.vx);
          }
          if (d.y > 1.12) respawn(d);
        }
      }

      const toScreen = (d: Dot) => ({
        x: d.x * w,
        y: d.y * h,
      });

      const projected = dots.map(toScreen);
      const cutX = w * leftClear;

      const prox = new Float32Array(dots.length);
      const drawX = new Float32Array(dots.length);
      const drawY = new Float32Array(dots.length);

      for (let i = 0; i < dots.length; i++) {
        const p = projected[i];
        let px = p.x;
        let py = p.y;
        let strength = 0;

        if (interactive && mouse.active && !reduceMotion) {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          strength = proximityStrength(dist, MOUSE_RADIUS);
          if (strength > 0 && dist > 0.5) {
            const nx = (p.x - mouse.x) / dist;
            const ny = (p.y - mouse.y) / dist;
            px += nx * strength * MOUSE_PUSH;
            py += ny * strength * MOUSE_PUSH;
          }
        }

        prox[i] = strength;
        drawX[i] = px;
        drawY[i] = py;
      }

      const linkDist = Math.min(w, h) * 0.15;
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        let links = 0;
        for (let j = i + 1; j < dots.length && links < 12; j++) {
          const ax = drawX[i];
          const ay = drawY[i];
          const bx = drawX[j];
          const by = drawY[j];
          if (ax < cutX || bx < cutX) continue;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist > linkDist || dist < 8) continue;
          links += 1;
          const near = Math.max(prox[i], prox[j]);
          const strength = (1 - dist / linkDist) * (0.55 + near * 0.45);
          const midH = (dots[i].hue + dots[j].hue) / 2;
          ctx.strokeStyle = hsl(midH, 90, 58 + near * 12, strength);
          ctx.lineWidth = 1 + near * 1.2;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
      ctx.lineWidth = 1;

      for (const arc of arcsRef.current) {
        if (!reduceMotion) arc.progress += arc.speed * 0.004;
        const da = dots[arc.a];
        const db = dots[arc.b];
        const ax = drawX[arc.a];
        const ay = drawY[arc.a];
        const bx = drawX[arc.b];
        const by = drawY[arc.b];
        if (ax < cutX || bx < cutX) continue;
        const dist = Math.hypot(ax - bx, ay - by);
        if (dist < 50 || dist > Math.min(w, h) * 0.65) continue;

        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2;
        const dx = bx - ax;
        const dy = by - ay;
        const cpx = mx + (dx / dist) * dist * 0.05;
        const cpy = my - Math.abs(dy) * 0.15;

        const grad = ctx.createLinearGradient(ax, ay, bx, by);
        grad.addColorStop(0, hsl(da.hue, da.sat, da.light, 0.55));
        grad.addColorStop(1, hsl(db.hue, db.sat, db.light, 0.55));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = hsl(190, 95, 55, 0.4);
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(cpx, cpy, bx, by);
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (!reduceMotion) {
          const u = arc.progress % 1;
          const px = (1 - u) * (1 - u) * ax + 2 * (1 - u) * u * cpx + u * u * bx;
          const py = (1 - u) * (1 - u) * ay + 2 * (1 - u) * u * cpy + u * u * by;
          if (px < cutX) continue;
          const hue = da.hue + (db.hue - da.hue) * u;
          const glow = ctx.createRadialGradient(px, py, 0, px, py, 14);
          glow.addColorStop(0, hsl(hue, 95, 70, 0.9));
          glow.addColorStop(0.4, hsl(hue, 90, 55, 0.3));
          glow.addColorStop(1, hsl(hue, 90, 55, 0));
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = 'rgba(255,255,255,0.95)';
          ctx.arc(px, py, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const px = drawX[i];
        const py = drawY[i];
        if (px < cutX) continue;
        if (py < -40 || py > h + 40) continue;

        let edgeFade = 1;
        if (py > h * 0.9) edgeFade = Math.max(0, (h - py) / (h * 0.1));

        const sideFade =
          px < cutX + w * 0.06 ? Math.max(0, (px - cutX) / (w * 0.06)) : 1;
        const alphaMul = edgeFade * sideFade;

        const near = prox[i];
        const pulse = reduceMotion ? 1 : 0.9 + Math.sin(t * 0.7 + d.phase) * 0.1;
        const radius = d.r * pulse * (1 + near * MOUSE_GROW);
        const glowR = radius * (d.r > 3.5 || near > 0.3 ? 5.5 : 4.2);

        const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        glow.addColorStop(
          0,
          hsl(d.hue, d.sat, Math.min(78, d.light + 10 + near * 14), (0.7 + near * 0.25) * pulse * alphaMul),
        );
        glow.addColorStop(0.4, hsl(d.hue, d.sat, d.light, (0.22 + near * 0.15) * pulse * alphaMul));
        glow.addColorStop(1, hsl(d.hue, d.sat, d.light, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = hsl(d.hue, d.sat, Math.min(80, d.light + 12 + near * 10), 0.92 * pulse * alphaMul);
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();

        if (d.r > 3 || near > 0.25) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${(0.9 + near * 0.1) * pulse * alphaMul})`;
          ctx.arc(px, py, Math.max(1.2, radius * 0.34), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isHero, isCard, isBackdrop, leftClear, safeZoom, seed, interactive]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: canvasSizePct,
          height: canvasSizePct,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          role="img"
          aria-label="Blue network flowing from top centre to bottom"
        />
      </div>
    </div>
  );
}
