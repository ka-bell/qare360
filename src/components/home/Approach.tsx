import { Icon } from '@iconify/react';
import { HeroFlow } from '../brand/HeroFlow';
import { ServiceVisual } from '../brand/ServiceVisual';
import { SERVICES } from '../../data/services';

interface ApproachProps {
  onServiceSelect: (service: string) => void;
}

const PILLARS = [
  {
    id: 'validate',
    step: '01',
    label: 'Before you invest',
    title: 'Validate',
    body: 'Test ideas before you invest: concepts, propositions, products, brands and audiences.',
  },
  {
    id: 'measure',
    step: '02',
    label: 'After launch',
    title: 'Measure',
    body: 'Understand what happened: campaign impact, brand lift, customer experience and tracking.',
  },
  {
    id: 'intelligence',
    step: '03',
    label: 'Over time',
    title: 'Intelligence',
    body: 'Build an accessible evidence capability through live reporting, dashboards and tailored platforms.',
  },
] as const;

/** Per-service backdrop: mix animated network + static blue gradients */
const SERVICE_BACKDROPS: Record<
  string,
  { kind: 'flow' | 'gradient'; zoom?: number; seed?: number; gradient: string }
> = {
  'Concept Testing': { kind: 'flow', zoom: 1.85, seed: 11, gradient: 'stripe-gradient-concept' },
  'Brand Research': { kind: 'gradient', gradient: 'stripe-gradient-brand' },
  'Campaign Effectiveness': { kind: 'flow', zoom: 1.25, seed: 22, gradient: 'stripe-gradient-campaign' },
  'Customer Research': { kind: 'gradient', gradient: 'stripe-gradient-customer' },
  'Employee Research': { kind: 'flow', zoom: 2.15, seed: 33, gradient: 'stripe-gradient-employee' },
  'UX & Product Research': { kind: 'gradient', gradient: 'stripe-gradient-ux' },
};

function ExpandHint() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-white/70 text-[var(--muted-foreground)] shadow-sm backdrop-blur-sm">
      <Icon icon="lucide:maximize-2" className="text-base" />
    </span>
  );
}

export function Approach({ onServiceSelect }: ApproachProps) {
  return (
    <section
      id="approach"
      className="scroll-mt-24 bg-[var(--background)] px-6 pb-12 pt-12 lg:px-16 lg:pb-16 lg:pt-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-7">
        {/* Stripe 2-up: equal large panels */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[7fr_3fr] lg:gap-6">
          {/* Left — title top, mockups oversized & cropped like Stripe */}
          <article className="feature-card stripe-panel group relative flex min-h-[34rem] flex-col overflow-hidden transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.02] lg:min-h-[40rem]">
            <div className="feature-card-media bg-white">
              <HeroFlow
                variant="card"
                zoom={1.15}
                seed={7}
                interactive={false}
                className="hidden h-full w-full sm:block"
              />
            </div>

            <div className="feature-card-body relative z-20 flex flex-col p-8 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div className="relative z-20 max-w-md lg:max-w-sm xl:max-w-md">
                  <p className="section-eyebrow">Why Qare</p>
                  <h2 className="mt-3 font-heading text-[1.65rem] font-bold leading-[1.12] tracking-normal text-[var(--primary)] sm:text-[1.85rem] lg:text-[2rem]">
                    Professional research should be accessible—not reserved for a few.
                  </h2>
                </div>
                <ExpandHint />
              </div>
            </div>

            {/* Mockups bleed past card edges — 20% smaller, no borders */}
            <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
              {/* Desktop — large, cut off right + bottom, ~20% smaller */}
              <div className="absolute -bottom-[12%] -right-[8%] w-[84%] max-w-none sm:-right-[6%] sm:w-[80%] lg:-bottom-[14%] lg:-right-[8%] lg:w-[80%]">
                <img
                  src="/mockups/survey-desktop.png"
                  alt=""
                  className="block w-full rounded-none border-0 outline-none ring-0 shadow-none"
                />
              </div>

              {/* Mobile — front-left, overlapping desktop */}
              <div className="absolute bottom-[-2%] left-[6%] z-20 w-[34%] max-w-[11rem] sm:left-[8%] sm:w-[28%] sm:max-w-[12.5rem] lg:bottom-0 lg:left-[8%] lg:w-[24%] lg:max-w-[13rem]">
                <img
                  src="/mockups/survey-mobile.png"
                  alt=""
                  className="block w-full rounded-none border-0 outline-none ring-0 shadow-none"
                />
              </div>
            </div>

            <span className="sr-only">
              Product mockups of a mobile and desktop research survey experience
            </span>
          </article>

          {/* Right — title top, white inner cards on rich gradient */}
          <article className="feature-card stripe-panel relative flex min-h-[32rem] flex-col overflow-hidden transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.02] lg:min-h-[38rem]">
            <div className="feature-card-media stripe-gradient-panel" />

            <div className="feature-card-body relative z-10 flex flex-1 flex-col p-8 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-sm">
                  <p className="section-eyebrow section-eyebrow-on-wash">The Qare 360 model</p>
                  <h2 className="mt-3 font-heading text-[1.65rem] font-bold leading-[1.12] tracking-normal text-[var(--primary)] sm:text-[1.85rem] lg:text-[2rem]">
                    Start with the decision. Find the right evidence.
                  </h2>
                </div>
                <ExpandHint />
              </div>

              <div className="mx-auto mt-8 flex w-full max-w-[22rem] flex-1 flex-col justify-center gap-3.5 pb-2 lg:max-w-[24rem] lg:gap-4">
                {PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    id={pillar.id}
                    className="stripe-inner-card scroll-mt-28"
                  >
                    <p className="text-xs font-medium text-[var(--muted-foreground)]">
                      <span className="text-[var(--cta)]">{pillar.step}</span>
                      {' · '}
                      {pillar.label}
                    </p>
                    <h3 className="mt-2 font-heading text-lg font-bold leading-tight text-[var(--primary)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-snug text-[var(--muted-foreground)]">
                      {pillar.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>

        {/* Services */}
        <div id="services" className="scroll-mt-24 pt-4 lg:pt-6">
          <div className="max-w-2xl px-1">
            <p className="section-eyebrow">Research services</p>
            <h2 className="section-title">
              Built around your challenge—not a methodology catalogue.
            </h2>
            <p className="section-lead">
              Pick a starting point. We will shape the right research approach with you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service) => {
            const backdrop = SERVICE_BACKDROPS[service.name] ?? {
              kind: 'gradient' as const,
              gradient: 'stripe-gradient-brand',
            };

            return (
              <button
                key={service.name}
                type="button"
                onClick={() => onServiceSelect(service.name)}
                className="feature-card stripe-panel group flex min-h-[28rem] cursor-pointer flex-col overflow-hidden text-left transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(12,110,207,0.14)] lg:min-h-[30rem]"
              >
                <div
                  className={`relative min-h-[14rem] flex-1 overflow-hidden lg:min-h-[16rem] ${backdrop.gradient}`}
                >
                  {backdrop.kind === 'flow' ? (
                    <HeroFlow
                      variant="backdrop"
                      zoom={backdrop.zoom}
                      seed={backdrop.seed}
                      className="absolute inset-0 h-full w-full opacity-95"
                    />
                  ) : null}

                  {service.image ? (
                    <img
                      src={service.image}
                      alt=""
                      className="relative z-10 h-full w-full object-cover mix-blend-multiply opacity-90 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <ServiceVisual
                      id={service.visual}
                      transparent
                      className="absolute inset-0 z-10 h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  )}

                  <span className="absolute right-4 top-4 z-20">
                    <ExpandHint />
                  </span>
                </div>

                <div className="flex flex-col bg-white p-6 lg:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--cta)]">
                      <Icon icon={service.icon} className="text-lg" />
                    </span>
                    <h3 className="font-heading text-lg font-bold leading-tight text-[var(--primary)] lg:text-xl">
                      {service.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-snug text-[var(--muted-foreground)] lg:text-[0.9375rem]">
                    {service.challenge}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-snug text-[var(--primary)]">
                    {service.outcome}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
