const CASES = [
  {
    client: 'Telecom',
    title: 'From guesswork to greenlight in two weeks.',
    color: 'bg-[var(--v2-blue)]',
  },
  {
    client: 'Retail',
    title: 'A brand tracker that leadership actually reads.',
    color: 'bg-[var(--v2-purple)]',
  },
  {
    client: 'Public sector',
    title: 'Understanding citizens before the campaign launches.',
    color: 'bg-[var(--v2-lime)]',
  },
] as const;

export function Cases() {
  return (
    <section id="cases" className="v2-shell py-12 sm:py-16 lg:py-20">
      <div className="v2-frame">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.07em] text-[var(--v2-muted)]">
              Cases
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-[-0.02em] text-[var(--v2-ink)] sm:text-4xl lg:text-5xl">
              Research made tangible.
            </h2>
          </div>
          <p className="max-w-sm text-base text-[var(--v2-muted)]">
            Real decisions, shaped by research that landed with the people who needed it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {CASES.map((c) => (
            <article key={c.title} className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
              <div className={`aspect-[4/3] ${c.color}`}>
                <div className="flex h-full items-center justify-center">
                  <div className="size-16 rounded-2xl bg-white/30 backdrop-blur-sm" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--v2-muted)]">
                  {c.client}
                </p>
                <h3 className="font-heading text-lg font-medium leading-snug tracking-tight text-[var(--v2-ink)] sm:text-xl">
                  {c.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
