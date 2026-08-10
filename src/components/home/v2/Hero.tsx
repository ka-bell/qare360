import { useEffect, useState } from 'react';
import { SiteNav } from './SiteNav';
import { HeroTile } from './HeroTiles';

/** Figma 4040:232 — 6× 3D tiles with per-tile motion loops */
const TILES = [
  { src: '/hero/tile-1.png', alt: 'Abstract cylinders', motion: 'bars' as const },
  { src: '/hero/tile-2.png', alt: 'Floating spheres and cubes', motion: 'points' as const },
  { src: '/hero/tile-3.png', alt: 'Stacked blocks', motion: 'blocks' as const },
  { src: '/hero/tile-4.png', alt: 'Overlapping slats', motion: 'layers' as const },
  { src: '/hero/tile-5.png', alt: 'Intertwined ribbons', motion: 'ribbons' as const },
  { src: '/hero/tile-6.png', alt: 'Concentric rings', motion: 'rings' as const },
] as const;

const PHRASES = [
  're-engineered.',
  'made accessible.',
  'powered by technology.',
  'guided by experts.',
  'built for clearer decisions.',
] as const;

const TYPE_MS = 48;
const DELETE_MS = 28;
const HOLD_MS = 2200;
const GAP_MS = 380;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function useTypewriter(phrases: readonly string[]) {
  const reducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState(phrases[0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [mode, setMode] = useState<'typing' | 'holding' | 'deleting' | 'gap'>('holding');

  useEffect(() => {
    if (reducedMotion) {
      setText(phrases[0]);
      return;
    }

    const phrase = phrases[phraseIndex];
    let timer: number;

    if (mode === 'holding') {
      timer = window.setTimeout(() => setMode('deleting'), HOLD_MS);
    } else if (mode === 'deleting') {
      if (text.length === 0) {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setMode('gap');
        return;
      }
      timer = window.setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
    } else if (mode === 'gap') {
      timer = window.setTimeout(() => setMode('typing'), GAP_MS);
    } else if (text === phrase) {
      setMode('holding');
    } else {
      timer = window.setTimeout(() => setText(phrase.slice(0, text.length + 1)), TYPE_MS);
    }

    return () => window.clearTimeout(timer);
  }, [mode, text, phraseIndex, phrases, reducedMotion]);

  return text;
}

export function Hero() {
  const line = useTypewriter(PHRASES);

  return (
    <section
      className="w-full bg-white px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8"
      data-node-id="4040:232"
    >
      <div
        className="relative flex w-full min-h-[32rem] flex-col justify-between overflow-hidden rounded-2xl bg-[var(--v2-ink)] px-5 pb-6 pt-5 sm:min-h-[40rem] sm:px-8 sm:pb-10 sm:pt-6 lg:min-h-[min(90vh,56.25rem)] lg:px-[clamp(2.5rem,5vw,5rem)] lg:pb-20 lg:pt-[7.5rem]"
        data-node-id="4040:233"
      >
        <div className="lg:absolute lg:inset-x-0 lg:top-5 lg:px-[clamp(2.5rem,5vw,5rem)] lg:py-4">
          <SiteNav variant="dark" />
        </div>

        <h1 className="relative z-10 max-w-4xl py-12 font-heading text-[2.125rem] font-medium leading-[1.2] tracking-[-0.02em] text-white sm:py-16 sm:text-5xl lg:max-w-5xl lg:py-0 lg:text-[4.5rem] lg:tracking-[-0.02em]">
          <span className="block">Professional research,</span>
          <span className="inline">
            {line}
            <span
              className="hero-caret ml-[0.12em] inline-block h-[0.85em] w-[2px] translate-y-[0.08em] bg-white align-baseline"
              aria-hidden
            />
          </span>
          <span className="sr-only">
            {' '}
            {PHRASES.join(' ')}
          </span>
        </h1>

        <div className="relative z-10 grid grid-cols-2 gap-[5px] sm:grid-cols-3 lg:grid-cols-6">
          {TILES.map((tile) => (
            <HeroTile key={tile.src} src={tile.src} alt={tile.alt} motion={tile.motion} />
          ))}
        </div>
      </div>
    </section>
  );
}
