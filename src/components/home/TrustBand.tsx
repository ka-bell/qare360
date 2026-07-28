import { TRUST_METRICS } from '../../data/trust';

/** Compact metrics row — logos live in the Stripe-style hero. */
export function TrustBand() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--card)] px-6 py-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
        {TRUST_METRICS.map((metric) => (
          <div key={metric.label}>
            <p className="font-heading text-2xl font-bold text-[var(--cta)] lg:text-3xl">
              {metric.value}
            </p>
            <p className="mt-1 text-sm leading-snug text-[var(--muted-foreground)]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
