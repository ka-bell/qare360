import { useEffect, useRef, useState } from 'react';

/** Rotating network globe — qare-stats-animated / qare-global-card */
function GlobalGlobe({ active }: { active: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !active) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const CX = 100;
    const CY = 100;
    const R = 78;
    const N = 26;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const outline = document.createElementNS(svgNS, 'circle');
    outline.setAttribute('class', 'global-globe-outline');
    outline.setAttribute('cx', String(CX));
    outline.setAttribute('cy', String(CY));
    outline.setAttribute('r', String(R));
    svg.appendChild(outline);

    const EQ = 40;
    const equatorPts = Array.from({ length: EQ }, (_, i) => {
      const t = (i / EQ) * Math.PI * 2;
      return { x0: Math.cos(t), y0: 0, z0: Math.sin(t) };
    });
    const equatorPath = document.createElementNS(svgNS, 'path');
    equatorPath.setAttribute('class', 'global-globe-equator');
    svg.appendChild(equatorPath);

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const points = Array.from({ length: N }, (_, i) => {
      const y0 = 1 - (i / (N - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y0 * y0));
      const theta = goldenAngle * i;
      return {
        x0: Math.cos(theta) * radiusAtY,
        y0,
        z0: Math.sin(theta) * radiusAtY,
      };
    });

    const edges: [number, number][] = [];
    const edgeSeen = new Set<string>();
    points.forEach((p, i) => {
      const dists = points
        .map((q, j) => {
          if (j === i) return { j, d: Infinity };
          const dx = p.x0 - q.x0;
          const dy = p.y0 - q.y0;
          const dz = p.z0 - q.z0;
          return { j, d: dx * dx + dy * dy + dz * dz };
        })
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      dists.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSeen.has(key)) {
          edgeSeen.add(key);
          edges.push([i, j]);
        }
      });
    });

    const lineEls = edges.map(() => {
      const l = document.createElementNS(svgNS, 'line');
      svg.appendChild(l);
      return l;
    });
    const dotEls = points.map(() => {
      const c = document.createElementNS(svgNS, 'circle');
      svg.appendChild(c);
      return c;
    });

    const DOT_STAGGER = 20;
    const DOT_DUR = 350;
    const EDGE_START = N * DOT_STAGGER + 150;
    const EDGE_STAGGER = 45;
    const EDGE_DUR = 450;
    const INTRO_TOTAL = EDGE_START + edges.length * EDGE_STAGGER + EDGE_DUR + 200;
    const GLOBE_FADE_DUR = 500;
    const ROT_SPEED = 0.00036;
    const ROTATE_DURATION = 6000;
    const FADE_OUT_DUR = 500;
    const CYCLE_TOTAL = INTRO_TOTAL + ROTATE_DURATION;

    const ease = (t: number) => {
      const x = Math.min(1, Math.max(0, t));
      return 1 - Math.pow(1 - x, 3);
    };

    let introStart: number | null = null;
    let frame = 0;
    let cancelled = false;

    const renderGlobe = (now: number) => {
      if (cancelled) return;
      if (introStart === null) introStart = now;
      const elapsed = (now - introStart) % CYCLE_TOTAL;
      const rotating = elapsed > INTRO_TOTAL;
      const rot = rotating ? ROT_SPEED * (elapsed - INTRO_TOTAL) : 0;

      const outFactor =
        elapsed > CYCLE_TOTAL - FADE_OUT_DUR
          ? 1 - ease((elapsed - (CYCLE_TOTAL - FADE_OUT_DUR)) / FADE_OUT_DUR)
          : 1;

      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const projected = points.map((p) => {
        const x = p.x0 * cosR + p.z0 * sinR;
        const z = -p.x0 * sinR + p.z0 * cosR;
        return { sx: CX + x * R, sy: CY - p.y0 * R, z };
      });

      projected.forEach((pt, i) => {
        const depth = (pt.z + 1) / 2;
        const bold = Math.pow(depth, 1.4);
        const targetR = 1.4 + bold * 3.4;
        const targetO = 0.12 + bold * 0.88;
        const reveal = ease((elapsed - i * DOT_STAGGER) / DOT_DUR);
        const el = dotEls[i];
        el.setAttribute('cx', pt.sx.toFixed(2));
        el.setAttribute('cy', pt.sy.toFixed(2));
        el.setAttribute('r', targetR.toFixed(2));
        el.style.opacity = (targetO * reveal * outFactor).toFixed(2);
      });

      edges.forEach(([a, b], idx) => {
        const pa = projected[a];
        const pb = projected[b];
        const avgDepth = ((pa.z + 1) / 2 + (pb.z + 1) / 2) / 2;
        const bold = Math.pow(avgDepth, 1.4);
        const l = lineEls[idx];
        l.setAttribute('x1', pa.sx.toFixed(2));
        l.setAttribute('y1', pa.sy.toFixed(2));
        l.setAttribute('x2', pb.sx.toFixed(2));
        l.setAttribute('y2', pb.sy.toFixed(2));
        const targetO = 0.04 + bold * 0.46;
        const targetSW = 0.4 + bold * 1.7;
        const delay = EDGE_START + idx * EDGE_STAGGER;
        const drawReveal = ease((elapsed - delay) / EDGE_DUR);
        const settle = ease((elapsed - (delay + EDGE_DUR)) / 300);

        if (drawReveal < 1) {
          const len = Math.hypot(pb.sx - pa.sx, pb.sy - pa.sy);
          l.style.strokeDasharray = len.toFixed(2);
          l.style.strokeDashoffset = (len * (1 - drawReveal)).toFixed(2);
          l.style.opacity = (0.85 * drawReveal * outFactor).toFixed(2);
          l.style.strokeWidth = '1.8';
        } else {
          l.style.strokeDasharray = 'none';
          l.style.opacity = ((0.85 + (targetO - 0.85) * settle) * outFactor).toFixed(2);
          l.style.strokeWidth = (1.8 + (targetSW - 1.8) * settle).toFixed(2);
        }
      });

      const globeReveal = ease((elapsed - INTRO_TOTAL) / GLOBE_FADE_DUR);
      outline.style.opacity = (0.22 * globeReveal * outFactor).toFixed(2);

      if (rotating) {
        const eqProjected = equatorPts.map((p) => {
          const x = p.x0 * cosR + p.z0 * sinR;
          const z = -p.x0 * sinR + p.z0 * cosR;
          return { sx: CX + x * R, sy: CY, z };
        });
        const d =
          eqProjected
            .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.sx.toFixed(2)},${p.sy.toFixed(2)}`)
            .join(' ') + ' Z';
        equatorPath.setAttribute('d', d);
        const eqFrontDepth = Math.max(...eqProjected.map((p) => (p.z + 1) / 2));
        equatorPath.style.opacity = (
          globeReveal *
          (0.1 + eqFrontDepth * 0.28) *
          outFactor
        ).toFixed(2);
        equatorPath.style.strokeWidth = (0.6 + eqFrontDepth * 0.9).toFixed(2);
      }

      frame = requestAnimationFrame(renderGlobe);
    };

    frame = requestAnimationFrame(renderGlobe);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
    };
  }, [active]);

  return (
    <div className="relative mx-auto aspect-square w-[58%]">
      <svg
        ref={svgRef}
        className="global-globe-svg size-full overflow-visible"
        viewBox="0 0 200 200"
        aria-hidden
      />
    </div>
  );
}

function LoyaltyCard() {
  const rootRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const smileyRef = useRef<SVGGElement>(null);
  const [inView, setInView] = useState(false);
  const C = 326.7;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const numEl = numRef.current;
    const ringEl = ringRef.current;
    const figureEl = figureRef.current;
    const smileyEl = smileyRef.current;
    if (!numEl || !ringEl || !figureEl || !smileyEl) return;

    let frame = 0;
    let morphTimer = 0;
    let loopTimer = 0;
    let cancelled = false;

    const reset = () => {
      numEl.textContent = '0%';
      figureEl.style.opacity = '1';
      ringEl.classList.remove('loyalty-ring-morph');
      ringEl.style.transition = 'none';
      ringEl.style.strokeDasharray = String(C);
      ringEl.style.strokeDashoffset = String(C);
      ringEl.style.strokeWidth = '3';
      smileyEl.classList.remove('loyalty-smile-show');
      void ringEl.getBoundingClientRect();
    };

    if (!inView) {
      reset();
      return;
    }

    const run = () => {
      if (cancelled) return;
      reset();
      const start = performance.now();
      const duration = 1400;
      const target = 92;

      const tick = (now: number) => {
        if (cancelled) return;
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        numEl.textContent = `${Math.round(target * eased)}%`;
        ringEl.style.strokeDashoffset = String(C - C * 0.92 * eased);
        if (p < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          morphTimer = window.setTimeout(() => {
            if (cancelled) return;
            figureEl.style.opacity = '0';
            const arcLen = C * 0.34;
            const gap = C - arcLen;
            const s1 = C * 0.5 - arcLen / 2;
            ringEl.classList.add('loyalty-ring-morph');
            ringEl.style.strokeDasharray = `${arcLen.toFixed(2)} ${gap.toFixed(2)}`;
            ringEl.style.strokeDashoffset = (C - s1).toFixed(2);
            smileyEl.classList.add('loyalty-smile-show');
            loopTimer = window.setTimeout(run, 2400);
          }, 200);
        }
      };
      frame = requestAnimationFrame(tick);
    };

    run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(morphTimer);
      window.clearTimeout(loopTimer);
    };
  }, [inView]);

  return (
    <article
      ref={rootRef}
      className="stat-card flex aspect-square flex-col justify-between overflow-hidden rounded bg-[#2E63F2] p-6 text-white sm:p-7 lg:p-8"
    >
      <p className="font-mono text-[13px] uppercase tracking-[0.02em]">Loyalty</p>
      <div className="relative mx-auto flex flex-1 items-center justify-center">
        <div className="relative aspect-square w-[58%]">
          <svg className="size-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="3"
            />
            <circle
              ref={ringRef}
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C}
            />
            <g
              ref={smileyRef}
              className="loyalty-smiley opacity-0"
              style={{ transformOrigin: '60px 60px' }}
            >
              <circle cx="80" cy="40" r="7" fill="currentColor" />
              <circle cx="80" cy="80" r="7" fill="currentColor" />
            </g>
          </svg>
          <div
            ref={figureRef}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-[400ms]"
          >
            <span
              ref={numRef}
              className="font-heading text-[40px] font-semibold tabular-nums tracking-[-0.02em]"
            >
              0%
            </span>
          </div>
        </div>
      </div>
      <p className="border-t border-white/22 pt-3.5 text-sm">of clients come back, happily</p>
    </article>
  );
}

function GlobalCard() {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={rootRef}
      className="stat-card flex aspect-square flex-col justify-between overflow-hidden rounded bg-[#D8FB6B] p-6 text-[var(--v2-ink)] sm:p-7 lg:p-8"
    >
      <p className="font-mono text-[13px] uppercase tracking-[0.02em]">GLOBAL</p>
      <div className="flex flex-1 items-center justify-center">
        <GlobalGlobe active={inView} />
      </div>
      <p className="border-t border-black/12 pt-3.5 text-sm">international panel access</p>
    </article>
  );
}

const MATCHES = [
  { name: 'Lina M.', role: 'Brand strategy', hasPhoto: true, seed: 1 },
  { name: 'Noah K.', role: 'Media research', hasPhoto: false, seed: 0 },
  { name: 'Sara P.', role: 'UX research', hasPhoto: true, seed: 2 },
  { name: 'Tom R.', role: 'Pricing & conjoint', hasPhoto: false, seed: 0 },
  { name: 'Amira Z.', role: 'Panel & sampling', hasPhoto: true, seed: 3 },
] as const;

const PHOTO_PALETTES = [
  ['#2E63F2', '#7CA3FF', '#141414'],
  ['#D8FB6B', '#F3FFAE', '#141414'],
  ['#FFDE59', '#FFF3B8', '#141414'],
] as const;

function PhotoAvatar({ seed }: { seed: number }) {
  const [a, b, c] = PHOTO_PALETTES[seed % PHOTO_PALETTES.length]!;
  return (
    <svg viewBox="0 0 48 48" className="size-full" aria-hidden>
      <defs>
        <radialGradient id={`match-g-${seed}`} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor={b} />
          <stop offset="100%" stopColor={a} />
        </radialGradient>
      </defs>
      <rect width="48" height="48" fill={`url(#match-g-${seed})`} />
      <circle cx="24" cy="20" r="9" fill={c} opacity="0.55" />
      <ellipse cx="24" cy="42" rx="16" ry="12" fill={c} opacity="0.55" />
    </svg>
  );
}

function SilhouetteAvatar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[26px] opacity-55" aria-hidden>
      <circle cx="12" cy="8.5" r="4" stroke="white" strokeWidth="1.6" />
      <path
        d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExpertMatchCard() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let fadeTimer = 0;
    const id = window.setInterval(() => {
      setFading(true);
      fadeTimer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % MATCHES.length);
        setFading(false);
      }, 350);
    }, 2600);
    return () => {
      clearInterval(id);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  const m = MATCHES[index]!;

  return (
    <article className="stat-card flex aspect-square flex-col justify-between overflow-hidden rounded bg-[#141414] p-6 text-white sm:p-7 lg:p-8">
      <p className="font-mono text-[13px] uppercase tracking-[0.02em]">Expert ↔ Match</p>
      <div className="flex flex-1 items-center justify-center">
        <div
          className={`flex min-h-14 w-full flex-col items-center justify-center gap-2 rounded-[10px] border border-white/14 bg-white/[0.08] px-[18px] py-4 transition-[opacity,transform] duration-[350ms] ease-in-out ${
            fading ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <div
            className={`flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full ${
              m.hasPhoto ? 'text-[#141414]' : 'border border-white/22 bg-white/10'
            }`}
          >
            {m.hasPhoto ? <PhotoAvatar seed={m.seed} /> : <SilhouetteAvatar />}
          </div>
          <div className="text-center">
            <div className="text-[15px] font-medium">{m.name}</div>
            <div className="mt-0.5 font-mono text-xs text-white/50">{m.role}</div>
          </div>
        </div>
      </div>
      <p className="border-t border-white/22 pt-3.5 text-sm">
        the right specialist for every project
      </p>
    </article>
  );
}

function ExperienceCard() {
  const rootRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [showVenn, setShowVenn] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const numEl = numRef.current;
    if (!numEl) return;

    let frame = 0;
    let vennTimer = 0;
    let loopTimer = 0;
    let cancelled = false;

    const reset = () => {
      numEl.textContent = '00+';
      setShowVenn(false);
    };

    if (!inView) {
      reset();
      return;
    }

    const run = () => {
      if (cancelled) return;
      reset();
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const p = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(5 * eased);
        numEl.textContent = `${String(val).padStart(2, '0')}+`;
        if (p < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          vennTimer = window.setTimeout(() => {
            if (cancelled) return;
            setShowVenn(true);
            loopTimer = window.setTimeout(run, 2800);
          }, 200);
        }
      };
      frame = requestAnimationFrame(tick);
    };

    run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(vennTimer);
      window.clearTimeout(loopTimer);
    };
  }, [inView]);

  return (
    <article
      ref={rootRef}
      className="stat-card flex aspect-square flex-col justify-between overflow-hidden rounded bg-[#FFDE59] p-6 text-[var(--v2-ink)] sm:p-7 lg:p-8"
    >
      <p className="font-mono text-[13px] uppercase tracking-[0.02em]">Experience</p>
      <div className="flex flex-1 flex-col items-start justify-start gap-4 pt-2">
        <div className="font-heading text-[clamp(2.75rem,8vw,4rem)] font-semibold leading-none tracking-[-0.02em] tabular-nums">
          <span ref={numRef}>00+</span>
        </div>
        <svg
          viewBox="0 0 170 66"
          className={`w-[70%] transition-all duration-500 ${
            showVenn
              ? 'translate-y-0 opacity-100'
              : 'translate-y-2 opacity-0'
          }`}
          style={{
            transitionTimingFunction: showVenn
              ? 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              : undefined,
          }}
          aria-hidden
        >
          <circle
            cx="55"
            cy="33"
            r="32"
            fill="none"
            stroke="#141414"
            strokeWidth="1.4"
            opacity="0.6"
          />
          <circle
            cx="107"
            cy="33"
            r="32"
            fill="none"
            stroke="#141414"
            strokeWidth="1.4"
            opacity="0.6"
          />
          <text
            x="28"
            y="37"
            className="fill-[#141414] font-mono text-[9px] uppercase tracking-[0.03em]"
          >
            Creative
          </text>
          <text
            x="142"
            y="37"
            textAnchor="end"
            className="fill-[#141414] font-mono text-[9px] uppercase tracking-[0.03em]"
          >
            Commerce
          </text>
        </svg>
      </div>
      <p className="border-t border-black/12 pt-3.5 text-sm">
        years across creative and commerce — not just marketing
      </p>
    </article>
  );
}

/** Proof strip — full site width (same outer pad as hero) */
export function Stats() {
  return (
    <section
      className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
      aria-label="QARE proof points"
    >
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        <LoyaltyCard />
        <GlobalCard />
        <ExpertMatchCard />
        <ExperienceCard />
      </div>
    </section>
  );
}
