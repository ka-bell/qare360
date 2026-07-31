import { Icon } from '@iconify/react';
import { HeroFlow } from '../brand/HeroFlow';
import { CLIENT_LOGOS } from '../../data/trust';

interface HeroProps {
  onStartProject: () => void;
}

export function Hero({ onStartProject }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-[4.5rem]">
      {/* Full-bleed background animation — may extend past content width */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <HeroFlow variant="hero" className="h-full w-full" />
      </div>

      <div className="relative z-10 px-6 pb-10 pt-10 lg:px-16 lg:pb-14 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8 xl:col-span-7">
              <p className="section-eyebrow">
                Professional research. Made accessible.
              </p>

              <h1 className="section-title max-w-3xl">
                Make better decisions with research that
                <br className="hidden sm:block" />
                {' '}
                moves as fast as your business.
              </h1>

              <p className="section-lead max-w-xl">
                Validate ideas, measure impact and build smarter decisions through professional
                research, strategy and technology—without traditional agency complexity.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button type="button" onClick={onStartProject} className="btn btn-primary">
                  Start a Project <Icon icon="lucide:chevron-right" className="text-base" />
                </button>
                <a href="#planner" className="btn btn-secondary">
                  Find the Right Research
                </a>
              </div>
            </div>

            <div className="relative -mx-2 h-64 sm:h-80 lg:hidden">
              <HeroFlow variant="framed" className="h-full w-full ring-1 ring-[var(--border)]" />
            </div>
          </div>

          <div className="mt-16 border-t border-[var(--border)]/80 pt-8 lg:mt-24">
            <p className="field-label mb-5">Trusted by</p>
            <div className="trusted-marquee relative overflow-hidden">
              <div className="trusted-marquee-track flex w-max items-center gap-12 py-1 lg:gap-16">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                  <span
                    key={`${logo.name}-${i}`}
                    className="shrink-0 text-sm font-semibold tracking-wide text-[var(--muted-foreground)]/55 whitespace-nowrap"
                  >
                    {logo.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
