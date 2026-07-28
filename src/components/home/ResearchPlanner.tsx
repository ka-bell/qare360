import { Icon } from '@iconify/react';
import { SERVICES } from '../../data/services';
import type { Blueprint } from '../../types';

interface ResearchPlannerProps {
  businessChallengeInput: string;
  setBusinessChallengeInput: (val: string) => void;
  selectedServiceFilter: string | null;
  setSelectedServiceFilter: (val: string | null) => void;
  generatedBlueprint: Blueprint | null;
  isGenerating: boolean;
  onGenerate: (e: React.FormEvent) => void;
  onReset: () => void;
}

export function ResearchPlanner({
  businessChallengeInput,
  setBusinessChallengeInput,
  selectedServiceFilter,
  setSelectedServiceFilter,
  generatedBlueprint,
  isGenerating,
  onGenerate,
  onReset,
}: ResearchPlannerProps) {
  return (
    <section
      id="planner"
      className="bg-[var(--secondary)] section-pad scroll-mt-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="section-eyebrow">Research Planner</p>
          <h2 className="section-title">
            Not sure where to start?
          </h2>
          <p className="section-lead">
            Describe the decision you need to make. We&apos;ll outline a personalised Research
            Blueprint—approach, timeline and an indicative investment—before your first
            conversation.
          </p>

          <form
            onSubmit={onGenerate}
            className="card-interactive mt-8 space-y-5 rounded-[4px] p-6"
          >
            <div>
              <label className="field-label mb-2 block">
                1. Research area (optional)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map((service) => (
                  <button
                    key={service.name}
                    type="button"
                    onClick={() =>
                      setSelectedServiceFilter(
                        selectedServiceFilter === service.name ? null : service.name,
                      )
                    }
                    className={`chip flex cursor-pointer items-center gap-2 rounded-[4px] p-2.5 text-left text-xs font-semibold ${
                      selectedServiceFilter === service.name ? 'chip-active' : ''
                    }`}
                  >
                    <Icon icon={service.icon} className="text-sm" />
                    <span className="truncate">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="challenge-input"
                className="field-label mb-2 block"
              >
                2. What decision are you trying to make?
              </label>
              <textarea
                id="challenge-input"
                rows={3}
                value={businessChallengeInput}
                onChange={(e) => setBusinessChallengeInput(e.target.value)}
                placeholder="e.g., We are launching a new campaign and want to know which message performs best."
                className="focus-cta w-full resize-none rounded-[4px] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Icon icon="lucide:loader-2" className="animate-spin text-lg" />
                  Preparing your blueprint…
                </>
              ) : (
                <>
                  Get your Research Blueprint{' '}
                  <Icon icon="lucide:arrow-right" className="text-lg" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7">
          <article className="card-interactive relative flex min-h-[480px] flex-col justify-between overflow-hidden rounded-[4px] p-6">
            {isGenerating && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[var(--card)]/95 animate-fade-in">
                <Icon
                  icon="lucide:loader-2"
                  className="mb-4 animate-spin text-4xl text-[var(--cta)]"
                />
                <p className="text-sm font-semibold text-[var(--primary)]">
                  Matching the right approach…
                </p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Audience, timeline and indicative investment
                </p>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-[var(--border)] pb-5">
              <div>
                <p className="field-label">
                  {generatedBlueprint ? 'Your Research Blueprint' : 'Example blueprint'}
                </p>
                <h3 className="mt-1 font-heading text-xl font-bold uppercase leading-tight text-[var(--primary)]">
                  Research Blueprint
                </h3>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[var(--tertiary)] text-[var(--cta)]">
                <Icon icon="lucide:file-text" className="text-xl" />
              </span>
            </div>

            <div className="grid flex-grow grid-cols-1 gap-5 py-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <p className="field-label">
                  Business challenge
                </p>
                <p className="mt-2 text-sm italic leading-relaxed text-[var(--foreground)]">
                  {generatedBlueprint
                    ? `“${generatedBlueprint.challenge}”`
                    : '“We are launching a campaign and want to know which message performs best.”'}
                </p>
              </div>

              <div>
                <p className="field-label">
                  Recommended research
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--primary)]">
                  {generatedBlueprint
                    ? generatedBlueprint.recommendedResearch
                    : 'Campaign Message Test'}
                </p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {generatedBlueprint
                    ? generatedBlueprint.description
                    : 'Compare relevance, credibility and intent across creative routes.'}
                </p>
              </div>

              <div>
                <p className="field-label">
                  Suggested methodology
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]">
                  {generatedBlueprint
                    ? generatedBlueprint.methodology
                    : 'Creative diagnostic with message and intent metrics'}
                </p>
              </div>

              <div>
                <p className="field-label">
                  Audience recommendation
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]">
                  {generatedBlueprint
                    ? generatedBlueprint.audience
                    : 'Target audience segments (typically n=250)'}
                </p>
              </div>

              <div>
                <p className="field-label">
                  Estimated timeline
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]">
                  {generatedBlueprint
                    ? generatedBlueprint.timeline
                    : 'Typically 4–6 working days'}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="field-label">
                  Indicative investment
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]">
                  <span className="font-semibold text-[var(--cta)]">
                    {generatedBlueprint
                      ? generatedBlueprint.investment
                      : '€3,000 – €4,500'}
                  </span>
                  <span className="text-[var(--muted-foreground)]">
                    {' '}
                    · Estimate based on typical scope. Every project is custom.
                  </span>
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-5">
              <p className="field-label">
                Expected deliverables
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {generatedBlueprint ? (
                  generatedBlueprint.deliverables.map((item) => (
                    <span
                      key={item}
                      className="rounded-[4px] border border-[var(--border)] bg-transparent px-3 py-2 text-xs font-medium text-[var(--foreground)]"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="rounded-[4px] border border-[var(--border)] bg-transparent px-3 py-2 text-xs font-medium text-[var(--foreground)]">
                      Creative diagnostic report
                    </span>
                    <span className="rounded-[4px] border border-[var(--border)] bg-transparent px-3 py-2 text-xs font-medium text-[var(--foreground)]">
                      Message recall metrics
                    </span>
                    <span className="rounded-[4px] border border-[var(--border)] bg-transparent px-3 py-2 text-xs font-medium text-[var(--foreground)]">
                      Optimisation recommendations
                    </span>
                  </>
                )}
              </div>
            </div>

            {generatedBlueprint && (
              <div className="mt-5 border-t border-[var(--border)] pt-5">
                <p className="field-label">
                  Recommended next steps
                </p>
                <ol className="mt-3 list-decimal space-y-1 pl-4 text-sm text-[var(--foreground)]">
                  {generatedBlueprint.nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={onReset}
                    className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[var(--muted-foreground)] transition-colors hover:text-[var(--cta)]"
                  >
                    <Icon icon="lucide:rotate-ccw" /> Reset Planner
                  </button>
                  <a
                    href="#contact"
                    className="btn btn-primary"
                  >
                    Discuss this Blueprint <Icon icon="lucide:arrow-right" />
                  </a>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
