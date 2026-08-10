import { useCallback, useEffect, useRef, useState } from 'react';

const LOGOS = [
  { src: '/clients/ziggo.png', alt: 'Ziggo' },
  { src: '/clients/vodafone.png', alt: 'Vodafone' },
  { src: '/clients/snipes.png', alt: 'Snipes' },
  { src: '/clients/un.png', alt: 'United Nations' },
  { src: '/clients/stanley.png', alt: 'Stanley' },
  { src: '/clients/delta.png', alt: 'DELTA' },
  { src: '/clients/despeld.png', alt: 'De Speld' },
  { src: '/clients/nav.png', alt: 'Just Eat Takeaway' },
] as const;

/** Figma 4040:337 — always-on CSS marquee; scrubber seeks & briefly pauses */
export function Clients() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const pauseBriefly = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 2000);
  }, []);

  const seekTo = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      const strip = stripRef.current;
      const fill = fillRef.current;
      if (!track || !strip) return;

      // Pause CSS animation and jump via negative delay equivalent (transform)
      const half = strip.scrollWidth / 2;
      if (half <= 0) return;
      const rect = track.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const offset = x * half;

      strip.style.animation = 'none';
      strip.style.transform = `translate3d(${-offset}px, 0, 0)`;
      if (fill) fill.style.width = `${Math.max(6, x * 100)}%`;

      pauseBriefly();

      // Restart seamless CSS animation from this offset after resume
      window.setTimeout(() => {
        if (!stripRef.current) return;
        const duration = 45; // seconds — must match CSS
        const delay = -(x * duration);
        stripRef.current.style.transform = '';
        stripRef.current.style.animation = '';
        stripRef.current.style.animationDelay = `${delay}s`;
      }, 50);
    },
    [pauseBriefly],
  );

  useEffect(() => {
    const dragging = { current: false };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      seekTo(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    const track = trackRef.current;
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      seekTo(e.clientX);
    };
    track?.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      track?.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, [seekTo]);

  /* Drive progress fill from animation — approximate via rAF reading computed transform */
  useEffect(() => {
    const strip = stripRef.current;
    const fill = fillRef.current;
    if (!strip || !fill) return;

    let raf = 0;
    const tick = () => {
      if (!paused) {
        const style = window.getComputedStyle(strip);
        const matrix = style.transform;
        let x = 0;
        if (matrix && matrix !== 'none') {
          const m = matrix.match(/matrix.*\((.+)\)/);
          if (m) x = Math.abs(parseFloat(m[1].split(',')[4] ?? '0'));
        }
        const half = strip.scrollWidth / 2 || 1;
        fill.style.width = `${Math.max(6, Math.min(100, (x / half) * 100))}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const sequence = [...LOGOS, ...LOGOS];

  return (
    <section className="v2-shell bg-white py-12 sm:py-16 lg:py-20" data-node-id="4040:337">
      <div className="v2-frame flex flex-col gap-10 lg:gap-12">
        <header className="flex flex-col gap-6 sm:gap-8">
          <div className="flex h-8 items-center gap-4">
            <img
              src="/clients/eyebrow.svg"
              alt=""
              width={34}
              height={34}
              className="size-[34px] shrink-0"
            />
            <p className="font-mono text-[14px] uppercase leading-[1.1] tracking-[0.7px] text-[var(--v2-ink)]">
              In good company
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <h2 className="max-w-md font-heading text-3xl font-medium leading-[1.2] tracking-[-0.02em] text-[var(--v2-ink)] sm:text-4xl lg:text-[3rem] lg:tracking-[-0.02em]">
              Trusted by
            </h2>
            <p className="max-w-md text-base leading-[1.2] tracking-[-0.02em] text-[var(--v2-muted)] sm:text-lg lg:max-w-[27rem] lg:text-right lg:text-[1.25rem]">
              From global brands to international organisations, QARE helps teams turn important
              questions into evidence they can act on.
            </p>
          </div>
        </header>

        <div
          ref={trackRef}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Logo carousel position"
          tabIndex={0}
          className="relative h-3 w-full cursor-pointer touch-none outline-none"
        >
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[rgba(0,20,60,0.1)]" />
          <div
            ref={fillRef}
            className="absolute left-0 top-1/2 h-px w-[8%] -translate-y-1/2 bg-[var(--v2-ink)]"
          />
          <div className="absolute right-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-[var(--v2-ink)]" />
        </div>

        <div className="clients-logo-viewport">
          <ul
            ref={stripRef}
            className={`clients-logo-scroller${paused ? ' is-paused' : ''}`}
            id="clients-logo-scroller"
          >
            {sequence.map((logo, i) => (
              <li key={`${logo.src}-${i}`} aria-hidden={i >= LOGOS.length}>
                <img
                  src={logo.src}
                  alt={i < LOGOS.length ? logo.alt : ''}
                  width={128}
                  height={40}
                  decoding="async"
                  draggable={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
