import type { CSSProperties } from 'react';
import { ConceptTestVisual } from './ConceptTestVisual';
import { BrandPerceptionVisual } from './BrandPerceptionVisual';
import { BrandLiftVisual } from './BrandLiftVisual';
import { JourneyFrictionVisual } from './JourneyFrictionVisual';
import { EngagementScoreVisual } from './EngagementScoreVisual';
import { ClickHeatmapVisual } from './ClickHeatmapVisual';

type GraphicVariant = 'validate' | 'measure' | 'understand';

type ServiceCard = {
  id: string;
  title: string;
  question: string;
  body: string;
  tags: string[];
  cardBg: string;
  titleClass: string;
  bodyClass: string;
  graphic: GraphicVariant;
  graphicBg: string;
  accent: string;
  href: string;
};

/** Figma 4040:401 — tags are always lime on ink, sharp corners, 14px. */
const TAG_CLASS =
  'rounded-none bg-[var(--v2-lime)] px-5 text-[14px] font-normal leading-[21px] tracking-[-0.02em] text-[var(--v2-ink)]';

/**
 * Colour schemes from Figma 4040:401:
 * blue → white → purple → dark → pink → yellow
 * Tags: always #c9ff6e / #1e1e1e
 */
const SERVICES: ServiceCard[] = [
  {
    id: 'concept-testing',
    title: 'Concept testing',
    question: 'Will this idea actually work?',
    body: 'Test concepts before you commit. Discover what resonates, what creates doubt and what needs to improve before launch.',
    tags: ['Concept testing', 'Message validation', 'Proposition testing', 'Creative pre-testing'],
    cardBg: 'bg-[var(--v2-blue)]',
    titleClass: 'text-white',
    bodyClass: 'text-white',
    graphic: 'validate',
    graphicBg: 'bg-[var(--v2-yellow)]',
    accent: 'bg-[var(--v2-orange)]',
    href: '#concept-testing',
  },
  {
    id: 'brand-research',
    title: 'Brand research',
    question: 'How is our brand really perceived?',
    body: 'Understand what people associate with your brand, how you compare to competitors and where your strongest opportunities lie.',
    tags: ['Brand awareness', 'Brand perception', 'Brand positioning', 'Competitor analysis'],
    cardBg: 'bg-white ring-1 ring-black/5',
    titleClass: 'text-[var(--v2-ink)]',
    bodyClass: 'text-[#222]',
    graphic: 'measure',
    graphicBg: 'bg-[var(--v2-blue)]',
    accent: 'bg-[var(--v2-lime)]',
    href: '#brand-research',
  },
  {
    id: 'campaign-effectiveness',
    title: 'Campaign effectiveness',
    question: 'Did our campaign actually move people?',
    body: 'Measure whether your campaign was noticed, understood and remembered—and whether it changed how people think or act.',
    tags: ['Campaign effect', 'Brand lift', 'Pre- and post-measurement', 'Audience response'],
    cardBg: 'bg-[var(--v2-purple)]',
    titleClass: 'text-[var(--v2-ink)]',
    bodyClass: 'text-[#222]',
    graphic: 'understand',
    graphicBg: 'bg-[var(--v2-pink)]',
    accent: 'bg-white',
    href: '#campaign-effectiveness',
  },
  {
    id: 'audience-research',
    title: 'Audience research',
    question: 'Who are we really talking to?',
    body: 'Build a clearer picture of your audience, including their needs, motivations, behaviours and meaningful differences.',
    tags: ['Customer insight', 'Brand intelligence', 'UX and product research', 'Strategic recommendations'],
    cardBg: 'bg-[var(--v2-ink)]',
    titleClass: 'text-white',
    bodyClass: 'text-white',
    graphic: 'understand',
    graphicBg: 'bg-[var(--v2-pink)]',
    accent: 'bg-white',
    href: '#audience-research',
  },
  {
    id: 'proposition-testing',
    title: 'Proposition testing',
    question: 'What will make people choose us?',
    body: 'Test your promise, benefits and value before investing. Find out what drives preference and where your proposition needs sharpening.',
    tags: ['Customer insight', 'Brand intelligence', 'UX and product research', 'Strategic recommendations'],
    cardBg: 'bg-[var(--v2-pink)]',
    titleClass: 'text-white',
    bodyClass: 'text-white',
    graphic: 'understand',
    graphicBg: 'bg-[var(--v2-pink)]',
    accent: 'bg-white',
    href: '#proposition-testing',
  },
  {
    id: 'customer-experience',
    title: 'Customer experience',
    question: 'Where are we winning—or losing—people?',
    body: 'Understand how customers experience each stage of their journey. Identify friction, unmet expectations and opportunities to improve.',
    tags: ['Customer insight', 'Brand intelligence', 'UX and product research', 'Strategic recommendations'],
    cardBg: 'bg-[var(--v2-yellow)]',
    titleClass: 'text-[var(--v2-ink)]',
    bodyClass: 'text-[#222]',
    graphic: 'understand',
    graphicBg: 'bg-[var(--v2-pink)]',
    accent: 'bg-white',
    href: '#customer-experience',
  },
];

function Quarter({
  color,
  className = '',
}: {
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`size-full ${color} ${className}`}
      style={{ borderBottomRightRadius: '100%' }}
    />
  );
}

function ServiceGraphic({
  variant,
  bg,
  accent,
}: {
  variant: GraphicVariant;
  bg: string;
  accent: string;
}) {
  if (variant === 'validate') {
    return (
      <div className={`relative aspect-square w-full overflow-hidden ${bg}`}>
        <div className="absolute inset-[12%] grid grid-cols-2 grid-rows-2">
          <Quarter color={accent} />
          <div className="-scale-y-100 rotate-180">
            <Quarter color={accent} />
          </div>
          <div className="-scale-y-100">
            <Quarter color={accent} />
          </div>
          <div className="rotate-180">
            <Quarter color={accent} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'measure') {
    return (
      <div className={`relative aspect-square w-full overflow-hidden ${bg}`}>
        <div className="absolute inset-[12%] grid grid-cols-2 grid-rows-2 gap-0">
          <div className="rotate-180">
            <Quarter color={accent} />
          </div>
          <div className="-scale-y-100">
            <Quarter color={accent} />
          </div>
          <div className="rotate-180">
            <Quarter color={accent} />
          </div>
          <div className="-scale-y-100">
            <Quarter color={accent} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-square w-full overflow-hidden ${bg}`}>
      <div className="absolute inset-[12%] grid grid-cols-2 grid-rows-2">
        <div className="-scale-y-100">
          <Quarter color={accent} />
        </div>
        <div className="rotate-180">
          <Quarter color={accent} />
        </div>
        <div className="rotate-180">
          <Quarter color={accent} />
        </div>
        <div className="-scale-y-100">
          <Quarter color={accent} />
        </div>
      </div>
    </div>
  );
}

/** Figma 4040:385 — Services cards. Sticky stack scroll like serious.business. */
export function Modules() {
  return (
    <section
      id="solutions"
      className="v2-shell bg-white py-12 sm:py-16 lg:py-20"
      data-node-id="4040:385"
    >
      <div className="v2-frame flex flex-col gap-12 lg:gap-[4.5rem]">
        <header className="flex max-w-3xl flex-col gap-6 sm:gap-8">
          <div className="flex h-8 items-center gap-4">
            <img
              src="/services/eyebrow.svg"
              alt=""
              width={34}
              height={34}
              className="size-[34px] shrink-0"
            />
            <p className="font-mono text-[14px] uppercase leading-[1.1] tracking-[0.7px] text-[var(--v2-ink)]">
              Research expertise, without the complexity.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            <h2 className="font-heading text-3xl font-medium leading-[1.2] tracking-[-0.02em] text-[var(--v2-ink)] sm:text-4xl lg:text-[3rem] lg:tracking-[-0.02em]">
              Validate. Measure. Understand.
            </h2>
            <p className="max-w-2xl text-base leading-[1.2] tracking-[-0.02em] text-[var(--v2-muted)] sm:text-lg lg:text-[1.25rem]">
              What questions are on your mind? Explore real questions we’ve helped others answer.
            </p>
          </div>
        </header>

        <div className="services-stack">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className={`services-stack__card flex flex-col gap-8 p-7 sm:p-9 lg:min-h-[24rem] lg:flex-row lg:items-stretch lg:gap-12 lg:p-10 ${service.cardBg}`}
              style={
                {
                  zIndex: index + 1,
                  ['--stack-i']: index,
                } as CSSProperties
              }
            >
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-1 flex-col gap-2.5 pr-4">
                    <p
                      className={`text-base font-normal leading-[1.3] tracking-[-0.01em] ${service.titleClass}`}
                    >
                      {service.title}
                    </p>
                    <h3
                      className={`font-heading text-3xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem] lg:tracking-[-0.03em] ${service.titleClass}`}
                    >
                      {service.question}
                    </h3>
                  </div>
                  <a
                    href={service.href}
                    className="flex shrink-0 items-center justify-center rounded-full border border-[#dee3e7] bg-white p-3 sm:p-4"
                    aria-label={`Open ${service.title}`}
                  >
                    <span className="relative size-6 shrink-0 overflow-hidden">
                      <span className="absolute left-0.5 top-0.5 size-5">
                        <img
                          src="/services/arrow-outward.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="block size-5 max-w-none"
                        />
                      </span>
                    </span>
                  </a>
                </div>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:gap-8 lg:mt-10">
                  <p
                    className={`flex-1 text-base leading-[1.3] tracking-[-0.01em] sm:text-[15px] lg:text-base ${service.bodyClass}`}
                  >
                    {service.body}
                  </p>
                  <div className="flex flex-1 flex-wrap content-start gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className={`inline-flex h-8 items-center ${TAG_CLASS}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full shrink-0 self-center lg:w-[min(100%,22rem)] xl:w-[24rem]">
                {service.id === 'concept-testing' ? (
                  <div className="aspect-square w-full overflow-hidden rounded-2xl">
                    <ConceptTestVisual />
                  </div>
                ) : service.id === 'brand-research' ? (
                  <div className="aspect-square w-full overflow-hidden rounded-2xl">
                    <BrandPerceptionVisual />
                  </div>
                ) : service.id === 'campaign-effectiveness' ? (
                  <div className="aspect-square w-full overflow-hidden rounded-2xl">
                    <BrandLiftVisual />
                  </div>
                ) : service.id === 'audience-research' ? (
                  <div className="aspect-square w-full overflow-hidden rounded-2xl">
                    <JourneyFrictionVisual />
                  </div>
                ) : service.id === 'proposition-testing' ? (
                  <div className="aspect-square w-full overflow-hidden rounded-2xl">
                    <EngagementScoreVisual />
                  </div>
                ) : service.id === 'customer-experience' ? (
                  <div className="aspect-square w-full overflow-hidden rounded-2xl">
                    <ClickHeatmapVisual />
                  </div>
                ) : (
                  <ServiceGraphic
                    variant={service.graphic}
                    bg={service.graphicBg}
                    accent={service.accent}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
