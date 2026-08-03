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
          {/* Left — Why Qare: title, then side-by-side mockups */}
          <article className="feature-card stripe-panel why-qare-panel relative flex min-h-[32rem] flex-col lg:min-h-[36rem]">
            <div className="feature-card-media bg-white">
              <HeroFlow
                variant="card"
                zoom={1.15}
                seed={7}
                interactive={false}
                className="hidden h-full w-full opacity-80 sm:block"
              />
            </div>

            <div className="feature-card-body relative z-10 flex flex-1 flex-col overflow-visible">
              <div className="relative z-20 flex items-start justify-between gap-4 px-8 pt-8 lg:px-10 lg:pt-10">
                <div className="max-w-lg">
                  <p className="section-eyebrow">Why Qare</p>
                  <h2 className="mt-3 font-heading text-[1.65rem] font-bold leading-[1.12] text-[var(--primary)] sm:text-[1.85rem] lg:text-[2rem]">
                    Professional research should be accessible—not reserved for a few.
                  </h2>
                </div>
                <ExpandHint />
              </div>

              {/* Mockups raised; desktop shown in full (no crop) */}
              <div className="relative mt-8 flex flex-1 items-end gap-4 overflow-visible pl-8 pr-4 lg:mt-10 lg:gap-5 lg:pl-10 lg:pr-6">
                <img
                  src="/mockups/survey-mobile.png"
                  alt="Mobile survey experience"
                  className="relative z-10 w-[7.5rem] shrink-0 translate-x-[50px] -translate-y-[150px] sm:w-[9rem] lg:w-[10rem]"
                />
                <img
                  src="/mockups/survey-desktop.png"
                  alt="Desktop survey experience"
                  className="relative z-0 h-auto w-auto max-w-[min(100%,36rem)] shrink-0 -translate-y-[150px] object-contain"
                />
              </div>
            </div>
          </article>

          {/* Right — title top, white inner cards on rich gradient */}
          <article className="feature-card stripe-panel relative flex min-h-[32rem] flex-col overflow-hidden lg:min-h-[38rem]">
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

        {/* Services — business problems with platform evidence previews */}
        <div id="services" className="scroll-mt-24 pt-2 lg:pt-4">
          <div className="max-w-3xl px-1">
            <h2 className="section-intro">
              <span className="section-intro-title">
                Every business question deserves clear evidence.
              </span>{' '}
              <span className="section-intro-lead">
                Explore how each research approach helps answer a different kind of business question.
              </span>
            </h2>
          </div>
        </div>

        <div className="services-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service) => (
            <button
              key={service.name}
              type="button"
              onClick={() => onServiceSelect(service.name)}
              className="service-card feature-card stripe-panel group relative flex cursor-pointer flex-col overflow-hidden text-left"
            >
              <div className="service-card-wash stripe-gradient-panel" aria-hidden />

              <div className="relative z-10 flex flex-1 flex-col p-6 lg:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 max-w-[16rem]">
                    <p className="section-eyebrow">{service.name}</p>
                    <h3 className="mt-2 font-heading text-[1.25rem] font-bold leading-snug tracking-tight text-[var(--primary)] lg:text-[1.4rem]">
                      {service.challenge}
                    </h3>
                  </div>
                  <ExpandHint />
                </div>

                <div className="service-card-media relative my-4 min-h-0 flex-1 overflow-hidden">
                  <ServiceVisual
                    id={service.visual}
                    className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="stripe-inner-card shrink-0">
                  <p className="text-sm leading-snug text-[var(--muted-foreground)]">
                    {service.approach}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-snug text-[var(--primary)]">
                    {service.outcome}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
