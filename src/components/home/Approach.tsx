const PILLARS = [
  {
    id: 'validate',
    step: '01 · Before you invest',
    title: 'Validate',
    body: 'Test ideas before you invest: concepts, propositions, products, brands and audiences.',
  },
  {
    id: 'measure',
    step: '02 · After launch',
    title: 'Measure',
    body: 'Understand what happened: campaign impact, brand lift, customer experience and tracking.',
  },
  {
    id: 'intelligence',
    step: '03 · Over time',
    title: 'Intelligence',
    body: 'Build an accessible evidence capability through live reporting, dashboards and tailored platforms.',
  },
] as const;

export function Approach() {
  return (
    <section id="approach" className="bg-[var(--background)] section-pad">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-eyebrow">The Qare 360 model</p>
          <h2 className="section-title">
            Research across the entire decision lifecycle.
          </h2>
          <p className="section-lead">
            Whether you are making a decision before launch or learning from impact afterwards,
            Qare brings the right evidence into focus.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 border-t border-[var(--border)] lg:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <article
              key={pillar.id}
              id={pillar.id}
              className={`scroll-mt-28 py-8 ${
                index < PILLARS.length - 1
                  ? 'border-b border-[var(--border)] lg:border-b-0 lg:border-r'
                  : ''
              } ${index === 0 ? 'lg:pr-8' : index === 1 ? 'lg:px-8' : 'lg:pl-8'}`}
            >
              <p className="section-eyebrow">
                <span className="text-[var(--cta)]">{pillar.step.split(' · ')[0]}</span>
                {' · '}
                {pillar.step.split(' · ')[1]}
              </p>
              <h3 className="mt-3 font-heading text-xl font-bold uppercase leading-tight tracking-normal text-[var(--primary)] lg:text-[1.375rem]">
                {pillar.title}
              </h3>
              <p className="mt-2 max-w-sm text-base leading-snug text-[var(--muted-foreground)]">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
