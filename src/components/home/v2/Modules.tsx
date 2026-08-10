import type { CSSProperties } from 'react';

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
  tagClass: string;
  graphic: GraphicVariant;
  graphicBg: string;
  accent: string;
  href: string;
};

/**
 * Six unique palettes — no repeated card/graphic combo.
 * Drawn from brand tokens + complementary accents.
 */
const SERVICES: ServiceCard[] = [
  {
    id: 'concept-testing',
    title: 'Concept testing',
    question: 'Will this idea actually work?',
    body: 'Test concepts before you commit. Discover what resonates, what creates doubt and what needs to improve before launch.',
    tags: ['Concept testing', 'Message validation', 'Creative pre-testing', 'Concept optimisation'],
    cardBg: 'bg-[var(--v2-blue)]',
    titleClass: 'text-white',
    bodyClass: 'text-white',
    tagClass: 'bg-[var(--v2-lime)] text-[var(--v2-ink)]',
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
    tagClass: 'bg-[var(--v2-purple)] text-[var(--v2-ink)]',
    graphic: 'measure',
    graphicBg: 'bg-[var(--v2-ink)]',
    accent: 'bg-[var(--v2-lime)]',
    href: '#brand-research',
  },
  {
    id: 'campaign-effectiveness',
    title: 'Campaign effectiveness',
    question: 'Did our campaign actually move people?',
    body: 'Measure whether your campaign was noticed, understood and remembered—and whether it changed how people think or act.',
    tags: ['Brand lift', 'Campaign impact', 'Message recall', 'Pre- and post-testing'],
    cardBg: 'bg-[var(--v2-lime)]',
    titleClass: 'text-[var(--v2-ink)]',
    bodyClass: 'text-[var(--v2-ink)]',
    tagClass: 'bg-[var(--v2-ink)] text-white',
    graphic: 'understand',
    graphicBg: 'bg-[var(--v2-blue)]',
    accent: 'bg-[var(--v2-yellow)]',
    href: '#campaign-effectiveness',
  },
  {
    id: 'audience-research',
    title: 'Audience research',
    question: 'Who are we really talking to?',
    body: 'Build a clearer picture of your audience, including their needs, motivations, behaviours and meaningful differences.',
    tags: ['Audience segmentation', 'Needs and motivations', 'Usage and attitudes', 'Target group profiling'],
    cardBg: 'bg-[var(--v2-ink)]',
    titleClass: 'text-white',
    bodyClass: 'text-white/90',
    tagClass: 'bg-[var(--v2-yellow)] text-[var(--v2-ink)]',
    graphic: 'validate',
    graphicBg: 'bg-[var(--v2-orange)]',
    accent: 'bg-white',
    href: '#audience-research',
  },
  {
    id: 'proposition-testing',
    title: 'Proposition testing',
    question: 'What will make people choose us?',
    body: 'Test your promise, benefits and value before investing. Find out what drives preference and where your proposition needs sharpening.',
    tags: ['Proposition testing', 'Purchase intent', 'Choice drivers', 'Value perception'],
    cardBg: 'bg-[var(--v2-yellow)]',
    titleClass: 'text-[var(--v2-ink)]',
    bodyClass: 'text-[var(--v2-ink)]',
    tagClass: 'bg-[var(--v2-blue)] text-white',
    graphic: 'measure',
    graphicBg: 'bg-[#ff1c77]',
    accent: 'bg-[var(--v2-lime)]',
    href: '#proposition-testing',
  },
  {
    id: 'customer-experience',
    title: 'Customer experience',
    question: 'Where are we winning—or losing—people?',
    body: 'Understand how customers experience each stage of their journey. Identify friction, unmet expectations and opportunities to improve.',
    tags: ['Customer journey', 'Satisfaction research', 'Touchpoint evaluation', 'Loyalty drivers'],
    cardBg: 'bg-[var(--v2-purple)]',
    titleClass: 'text-[var(--v2-ink)]',
    bodyClass: 'text-[#222]',
    tagClass: 'bg-white text-[var(--v2-ink)]',
    graphic: 'understand',
    graphicBg: 'bg-[var(--v2-orange)]',
    accent: 'bg-[var(--v2-ink)]',
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
    <section id="solutions" className="v2-shell bg-white py-12 sm:py-16 lg:py-20" data-node-id="4040:385">
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
              className={`services-stack__card flex flex-col gap-8 p-7 sm:p-9 lg:min-h-[32rem] lg:flex-row lg:items-stretch lg:gap-14 lg:p-10 ${service.cardBg}`}
              style={
                {
                  zIndex: index + 1,
                  ['--stack-i']: index,
                } as CSSProperties
              }
            >
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4 lg:min-h-[4.5rem]">
                  <div className="min-w-0">
                    <h3
                      className={`font-heading text-3xl font-medium leading-none tracking-[-0.02em] sm:text-4xl lg:text-[3.5rem] lg:tracking-[-0.03em] ${service.titleClass}`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-3 font-heading text-base font-medium leading-snug tracking-[-0.01em] sm:text-lg lg:mt-4 lg:text-xl ${service.titleClass} opacity-90`}
                    >
                      {service.question}
                    </p>
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

                <div className="mt-auto flex flex-col gap-6 pt-12 sm:flex-row sm:gap-8 lg:pt-20">
                  <p
                    className={`flex-1 text-base leading-[1.3] tracking-[-0.01em] ${service.bodyClass}`}
                  >
                    {service.body}
                  </p>
                  <div className="flex flex-1 flex-wrap content-start gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex h-8 items-center px-5 text-sm tracking-[-0.02em] ${service.tagClass}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full shrink-0 lg:w-[min(100%,24rem)]">
                <ServiceGraphic
                  variant={service.graphic}
                  bg={service.graphicBg}
                  accent={service.accent}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
