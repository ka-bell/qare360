const CASES = [
  {
    id: 'campaign-impact',
    image: '/cases/case-1.jpg',
    imageAlt: 'Mobile check-in product screens for a live campaign',
    imageTags: ['Campaign', 'Brand lift'],
    kind: 'Case study',
    kindTone: 'lime' as const,
    readTime: '8 min read',
    title: 'Campaign impact',
    body: 'Measure what people noticed, remembered and felt — before and after the campaign.',
    study: 'Effect study',
    href: '#',
  },
  {
    id: 'creative-testing',
    image: '/cases/case-2.jpg',
    imageAlt: 'Person holding a MET AMS creative poster against a red wall',
    imageTags: ['Concept', 'Validation'],
    kind: 'Insights',
    kindTone: 'blue' as const,
    readTime: '8 min read',
    title: 'Creative testing',
    body: 'Find the strongest direction before production begins.',
    study: 'Concept study',
    href: '#',
  },
  {
    id: 'customer-understanding',
    image: '/cases/case-3.jpg',
    imageAlt: 'Snipes Demographic Intelligence Hub on mobile screens',
    imageTags: ['Experience', 'Insight'],
    kind: 'Case study',
    kindTone: 'lime' as const,
    readTime: '8 min read',
    title: 'Customer understanding',
    body: 'Turn behaviour, feedback and experience into focused opportunities for the next move.',
    study: 'Insight study',
    href: '#',
  },
] as const;

/**
 * Figma 4040:504 — Cases / blogs overview
 */
export function Cases() {
  return (
    <section
      id="cases"
      className="v2-shell scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20"
      data-node-id="4040:504"
    >
      <div className="v2-frame flex flex-col gap-12 lg:gap-[4.5rem]">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex max-w-3xl flex-col gap-6 sm:gap-8">
            <div className="flex h-8 items-center gap-4">
              <img
                src="/cases/eyebrow.svg"
                alt=""
                width={34}
                height={34}
                className="size-[34px] shrink-0"
              />
              <p className="font-mono text-[14px] uppercase leading-[1.1] tracking-[0.7px] text-[var(--v2-ink)]">
                Proof in practice
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              <h2 className="font-heading text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[var(--v2-ink)] sm:text-4xl lg:text-[3.5rem] lg:tracking-[-0.03em]">
                Research made tangible.
              </h2>
              <p className="max-w-2xl text-base leading-[1.3] tracking-[-0.02em] text-[var(--v2-muted)] sm:text-lg lg:text-[1.25rem]">
                Every project ends with clear evidence: what changed, why it matters and what to do
                next.
              </p>
            </div>
          </div>

          <a
            href="#cases-grid"
            className="inline-flex h-[55px] shrink-0 items-center justify-center rounded-full border border-[#d9d9d9] px-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[var(--v2-ink)] transition-colors hover:border-[var(--v2-ink)]"
          >
            View our work
          </a>
        </header>

        <div
          id="cases-grid"
          className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-[21px]"
          data-node-id="4040:523"
        >
          {CASES.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-5"
              data-name="Custom Blog Card"
            >
              <div className="relative h-[min(68vw,28rem)] overflow-hidden rounded-[28px] sm:h-[32rem] lg:h-[33.75rem]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="absolute inset-0 size-full object-cover"
                  width={826}
                  height={1080}
                />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  {item.imageTags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase text-white backdrop-blur-[25px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`inline-flex items-center justify-center p-2 font-mono text-[10px] uppercase leading-[1.1] ${
                        item.kindTone === 'blue'
                          ? 'bg-[var(--v2-blue)] text-white'
                          : 'bg-[var(--v2-lime)] text-[var(--v2-ink)]'
                      }`}
                    >
                      {item.kind}
                    </span>
                    <span className="h-px w-4 bg-[var(--v2-muted)]/50" aria-hidden />
                    <span className="text-sm tracking-[-0.05em] text-[var(--v2-muted)]">
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-normal leading-[1.1] tracking-[-0.03em] text-[var(--v2-ink)]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-base leading-[1.3] tracking-[-0.02em] text-[var(--v2-muted)]">
                  {item.body}
                </p>

                <div className="flex flex-col gap-3.5">
                  <div className="h-px w-full bg-[rgba(0,0,0,0.08)]" />
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[-0.01em] text-[var(--v2-muted)]">
                      {item.study}
                    </p>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.6px] text-[var(--v2-muted)] transition-colors hover:text-[var(--v2-ink)]"
                    >
                      Read more
                      <span className="relative size-6 shrink-0 overflow-hidden opacity-60">
                        <span className="absolute left-0.5 top-0.5 size-5">
                          <img
                            src="/cases/arrow-outward.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="block size-5 max-w-none"
                          />
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
