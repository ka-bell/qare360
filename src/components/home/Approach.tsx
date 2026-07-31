import { HeroFlow } from '../brand/HeroFlow';

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
    <section id="approach" className="bg-[var(--background)] px-6 pb-10 lg:px-16 lg:pb-14">
      <div className="mx-auto max-w-7xl">
        <article className="feature-card min-h-[32rem] lg:min-h-[36rem]">
          <div className="feature-card-media hidden sm:block">
            <HeroFlow variant="card" className="h-full w-full" />
          </div>

          <div className="feature-card-body flex flex-col gap-10 p-8 lg:gap-14 lg:p-12">
            <div className="max-w-2xl">
              <p className="section-eyebrow">The Qare 360 model</p>
              <h2 className="section-title">
                Research across the entire decision lifecycle.
              </h2>
              <p className="section-lead">
                Whether you are making a decision before launch or learning from impact afterwards,
                Qare brings the right evidence into focus.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-[var(--border)]/80 pt-8 lg:grid-cols-3 lg:gap-8">
              {PILLARS.map((pillar, index) => (
                <div
                  key={pillar.id}
                  id={pillar.id}
                  className={`scroll-mt-28 rounded-[4px] bg-white/80 p-5 backdrop-blur-sm lg:bg-white/70 ${
                    index < PILLARS.length - 1 ? 'lg:border-r lg:border-[var(--border)]/60 lg:pr-8' : ''
                  }`}
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
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
