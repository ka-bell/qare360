import {
  Hero,
  Clients,
  Stats,
  Modules,
  Cases,
  SiteFooter,
} from '../components/home/v2';

/**
 * Homepage v2 skeleton — Figma 4040:231
 * Pass 1: structure + copy + responsive layout; imagery as placeholders.
 */
export default function Homepage() {
  return (
    <div id="top" className="relative min-h-screen w-full bg-[var(--v2-surface)] text-[var(--v2-ink)]">
      <main className="flex flex-col pb-0">
        <Hero />
        <Clients />
        <Stats />
        <Modules />
        <Cases />
      </main>
      <SiteFooter />
    </div>
  );
}
