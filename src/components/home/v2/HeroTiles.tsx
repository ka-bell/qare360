import type { CSSProperties } from 'react';

type TileMotion =
  | 'bars'
  | 'points'
  | 'blocks'
  | 'layers'
  | 'ribbons'
  | 'rings';

type HeroTileProps = {
  src: string;
  alt: string;
  motion: TileMotion;
};

/** Per-tile seamless loops (~5–7s), each with its own motion character. */
export function HeroTile({ src, alt, motion }: HeroTileProps) {
  return (
    <div className={`hero-tile hero-tile--${motion}`}>
      {motion === 'bars' && <BarsTile src={src} alt={alt} />}
      {motion === 'points' && <StreamTile src={src} alt={alt} />}
      {motion === 'blocks' && <BlocksTile src={src} alt={alt} />}
      {motion === 'layers' && <LayersTile src={src} alt={alt} />}
      {motion === 'ribbons' && <RibbonsTile src={src} alt={alt} />}
      {motion === 'rings' && <RingsTile src={src} alt={alt} />}
    </div>
  );
}

function BarsTile({ src, alt }: { src: string; alt: string }) {
  /* Whole-image soft vertical pulse — no strips (avoids flat-slice seams) */
  return (
    <div className="hero-tile__single">
      <img src={src} alt={alt} width={200} height={200} decoding="async" />
    </div>
  );
}

function StreamTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="hero-tile__stream">
      <img src={src} alt={alt} width={200} height={200} decoding="async" />
      <img src={src} alt="" width={200} height={200} decoding="async" aria-hidden />
    </div>
  );
}

function BlocksTile({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="hero-tile__band"
          style={{ '--i': i, '--n': 3 } as CSSProperties}
        >
          <img src={src} alt="" width={200} height={200} decoding="async" />
        </div>
      ))}
      <span className="sr-only">{alt}</span>
    </>
  );
}

function LayersTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="hero-tile__layers">
      <img
        src={src}
        alt={alt}
        width={200}
        height={200}
        decoding="async"
        className="hero-tile__layer hero-tile__layer--a"
      />
      <img
        src={src}
        alt=""
        width={200}
        height={200}
        decoding="async"
        className="hero-tile__layer hero-tile__layer--b"
        aria-hidden
      />
      <img
        src={src}
        alt=""
        width={200}
        height={200}
        decoding="async"
        className="hero-tile__layer hero-tile__layer--c"
        aria-hidden
      />
    </div>
  );
}

function RibbonsTile({ src, alt }: { src: string; alt: string }) {
  /* Whole-image diagonal drift — no duplicated marquee (avoids center seam) */
  return (
    <div className="hero-tile__single hero-tile__single--ribbons">
      <img src={src} alt={alt} width={200} height={200} decoding="async" />
    </div>
  );
}

function RingsTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="hero-tile__rings">
      <img
        src={src}
        alt={alt}
        width={200}
        height={200}
        decoding="async"
        className="hero-tile__ring hero-tile__ring--a"
      />
      <img
        src={src}
        alt=""
        width={200}
        height={200}
        decoding="async"
        className="hero-tile__ring hero-tile__ring--b"
        aria-hidden
      />
    </div>
  );
}
