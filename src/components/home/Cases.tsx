import { FEATURED_CASES } from '../../data/cases';
import { FEATURED_TESTIMONIAL } from '../../data/trust';

export function Cases() {
  return (
    <section id="cases" className="bg-[var(--background)] section-pad scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-eyebrow">Featured cases</p>
            <h2 className="section-title">
              Research that leads to action.
            </h2>
          </div>
          <p className="section-lead max-w-md lg:mt-0">
            We focus on the decision a team can make next—not on lengthy reports for their own sake.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {FEATURED_CASES.map((study) => (
            <article key={study.title} className="card-interactive rounded-[4px] p-8">
              <p className="field-label">{study.tag}</p>
              <h3 className="mt-4 font-heading text-xl font-bold uppercase leading-tight text-[var(--primary)] lg:text-[1.375rem]">
                {study.title}
              </h3>
              <div className="mt-6 grid gap-5 border-t border-[var(--border)] pt-6 text-sm">
                {(
                  [
                    ['Challenge', study.challenge],
                    ['Research', study.research],
                    ['Insight', study.insight],
                    ['Impact', study.impact],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <p className="field-label">{label}</p>
                    <p
                      className={`mt-1 ${
                        label === 'Impact'
                          ? 'font-semibold text-[var(--cta)]'
                          : 'text-[var(--foreground)]'
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
                <p className="mt-1 rounded-[4px] border border-[var(--border)] bg-transparent px-3 py-2 text-xs font-semibold text-[var(--cta)]">
                  {study.kpi}
                </p>
              </div>
            </article>
          ))}
        </div>

        <figure className="card-interactive mt-12 rounded-[4px] p-8 lg:p-10">
          <blockquote className="font-heading text-xl font-medium leading-snug text-[var(--primary)] lg:text-2xl">
            “{FEATURED_TESTIMONIAL.quote}”
          </blockquote>
          <figcaption className="mt-6 flex flex-col gap-1 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:gap-3">
            <span className="font-semibold text-[var(--foreground)]">
              {FEATURED_TESTIMONIAL.name}
            </span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>
              {FEATURED_TESTIMONIAL.role}, {FEATURED_TESTIMONIAL.company}
            </span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span className="text-[var(--cta)]">Case: {FEATURED_TESTIMONIAL.caseRef}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
