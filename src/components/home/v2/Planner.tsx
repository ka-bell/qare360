import { PlannerScreen } from './PlannerScreen';

const CARD_TAGS = [
  { label: '3–5 min', tone: 'outline' },
  { label: 'No commitment', tone: 'outline' },
  { label: 'No account needed', tone: 'lime' },
] as const;

/**
 * Figma 4040:492 — Research Planner
 * Above: explain the tool. In the card: sell the outcome.
 * Laptop screen runs the live planner HTML UI.
 */
export function Planner() {
  return (
    <section
      id="planner"
      className="v2-shell scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20"
      data-node-id="4040:492"
    >
      <div className="v2-frame flex flex-col gap-10 lg:gap-12">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex max-w-3xl flex-col gap-6 sm:gap-8">
            <div className="flex h-8 items-center gap-4">
              <img
                src="/planner/eyebrow.svg"
                alt=""
                width={34}
                height={34}
                className="size-[34px] shrink-0"
              />
              <p className="font-mono text-[14px] uppercase leading-[1.1] tracking-[0.7px] text-[var(--v2-ink)]">
                Not sure where to start?
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              <h2 className="font-heading text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[var(--v2-ink)] sm:text-4xl lg:text-[3.5rem] lg:tracking-[-0.03em]">
                Meet the Research Planner.
              </h2>
              <p className="max-w-2xl text-base leading-[1.3] tracking-[-0.02em] text-[var(--v2-muted)] sm:text-lg lg:text-[1.25rem]">
                Tell us what you need to know. We’ll turn your challenge into a recommended research
                approach, timeline and indicative investment—in just a few minutes.
              </p>
            </div>
          </div>

          <a
            href="#planner-card"
            className="inline-flex h-[55px] shrink-0 items-center justify-center rounded-full border border-[#d9d9d9] px-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[var(--v2-ink)] transition-colors hover:border-[var(--v2-ink)]"
          >
            Start planning
          </a>
        </header>

        <div
          id="planner-card"
          className="relative overflow-hidden rounded-2xl bg-[#ececee]"
          data-node-id="4040:493"
        >
          <img
            src="/planner/laptop.png"
            alt=""
            className="block h-auto w-full"
            width={1024}
            height={702}
          />

          {/* Screen rect measured on laptop.png — live planner UI */}
          <div
            className="absolute overflow-hidden rounded-[2px]"
            style={{
              top: '19.23%',
              left: '28.32%',
              width: '43.26%',
              height: '41.45%',
            }}
            aria-hidden
          >
            <PlannerScreen />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-black via-black/80 to-transparent px-6 pb-6 pt-24 sm:gap-4 sm:px-10 sm:pb-10 sm:pt-32 lg:px-16 lg:pb-16 lg:pt-40">
            <div className="flex flex-wrap gap-2.5">
              {CARD_TAGS.map((tag) => (
                <span
                  key={tag.label}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-[0.7px] sm:text-[14px] ${
                    tag.tone === 'lime'
                      ? 'bg-[var(--v2-lime)] text-[var(--v2-ink)]'
                      : 'border border-white/20 text-white'
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <h3 className="max-w-3xl font-heading text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl lg:text-[3rem]">
              Know what to research next.
            </h3>

            <p className="max-w-3xl text-base leading-[1.28] tracking-[-0.02em] text-white/90 sm:text-lg lg:text-2xl">
              Answer a few focused questions and discover the right research approach for your
              challenge—before speaking with our team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
