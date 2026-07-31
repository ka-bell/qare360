import { HeroFlow } from '../brand/HeroFlow';

export function WhyQare() {
  return (
    <section className="bg-[var(--background)] px-6 pb-6 pt-10 lg:px-16 lg:pb-8 lg:pt-14">
      <div className="mx-auto max-w-7xl">
        <article className="feature-card min-h-[28rem] lg:min-h-[32rem]">
          <div className="feature-card-media hidden sm:block">
            <HeroFlow variant="card" className="h-full w-full" />
          </div>

          <div className="feature-card-body grid grid-cols-1 gap-8 p-8 lg:grid-cols-12 lg:gap-10 lg:p-12">
            <div className="lg:col-span-6 xl:col-span-5">
              <p className="section-eyebrow">Why Qare</p>
              <h2 className="section-title">
                Professional research should be accessible—not reserved for a few.
              </h2>
              <p className="section-lead">
                For too long, high-quality research has been expensive, slow and difficult to reach.
                Qare combines experienced researchers, strategic thinking and technology so
                organisations can make evidence-led decisions with confidence.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="chip rounded-[4px] bg-white/90 px-3 py-2 text-sm font-medium backdrop-blur-sm">
                  Research expertise
                </span>
                <span className="chip rounded-[4px] bg-white/90 px-3 py-2 text-sm font-medium backdrop-blur-sm">
                  Strategic thinking
                </span>
                <span className="chip rounded-[4px] bg-white/90 px-3 py-2 text-sm font-medium backdrop-blur-sm">
                  Technology enabled
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
