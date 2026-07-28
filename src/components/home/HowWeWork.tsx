import { PROCESS_STEPS } from '../../data/process';

export function HowWeWork() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--card)] section-pad">
      <div className="mx-auto max-w-7xl">
        <p className="section-eyebrow">How we work</p>
        <h2 className="section-title">Simple from day one.</h2>
        <p className="section-lead">
          A clear path from first conversation to actionable evidence—without agency complexity.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number}>
              <span className="text-xs font-bold text-[var(--cta)]">{step.number}</span>
              <p className="mt-3 font-heading text-xl font-bold uppercase leading-tight text-[var(--primary)] lg:text-[1.375rem]">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-snug text-[var(--muted-foreground)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
