export function WhyQare() {
  return (
    <section className="border-y border-[var(--border)] bg-white section-pad">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7 xl:col-span-6">
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
            <span className="chip rounded-[4px] px-3 py-2 text-sm font-medium">
              Research expertise
            </span>
            <span className="chip rounded-[4px] px-3 py-2 text-sm font-medium">
              Strategic thinking
            </span>
            <span className="chip rounded-[4px] px-3 py-2 text-sm font-medium">
              Technology enabled
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
