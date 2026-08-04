import { FEATURED_TESTIMONIAL } from '../../data/trust';

export function Cases() {
  return (
    <section id="testimonial" className="bg-[var(--background)] section-pad scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        <p className="section-eyebrow">What clients say</p>
        <figure className="card-interactive mt-6 rounded-[4px] p-8 lg:p-12">
          <blockquote className="font-heading text-xl font-medium leading-snug text-[var(--primary)] sm:text-2xl lg:text-[1.75rem] lg:leading-snug">
            “{FEATURED_TESTIMONIAL.quote}”
          </blockquote>
          <figcaption className="mt-8 flex flex-col gap-1 text-sm text-[var(--muted-foreground)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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
