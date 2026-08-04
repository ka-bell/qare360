import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { BLUEPRINTS, detectServiceFromChallenge } from '../../data/blueprints';
import type { Blueprint } from '../../types';

interface ResearchPlannerProps {
  initialService?: string | null;
  onStartProject: () => void;
}

type ChatRole = 'assistant' | 'user';

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  blueprint?: Blueprint;
}

const SUGGESTIONS = [
  'We are launching a campaign and need to know which message works best.',
  'We want to test a new product concept before we invest in development.',
  'How is our brand perceived compared to competitors?',
  'Where do customers drop off in our journey?',
] as const;

const WELCOME =
  'Hi! What do you want to understand or decide? Share your business challenge and I’ll outline a first Research Blueprint.';

const DELIVERABLES = [
  {
    icon: 'lucide:target',
    title: 'Recommended strategy',
    body: 'A clear research approach matched to the decision you need to make.',
  },
  {
    icon: 'lucide:calendar',
    title: 'Transparent timeline',
    body: 'An indicative turnaround so you know when evidence can land.',
  },
  {
    icon: 'lucide:euro',
    title: 'Indicative investment',
    body: 'A realistic cost range before you speak with a strategist.',
  },
  {
    icon: 'lucide:file-text',
    title: 'Research Blueprint',
    body: 'Scope, methodology and expected outcomes you can act on next.',
  },
] as const;

const TRUST_CHIPS = [
  { icon: 'lucide:clock', label: '3–5 minutes' },
  { icon: 'lucide:lock', label: 'No account needed' },
  { icon: 'lucide:check-circle', label: 'No obligation' },
] as const;

function buildBlueprint(challenge: string, serviceHint?: string | null): Blueprint {
  const serviceKey = serviceHint || detectServiceFromChallenge(challenge);
  const template = BLUEPRINTS[serviceKey] || BLUEPRINTS['Concept Testing'];
  return { challenge, ...template };
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function extractSample(audience: string): string {
  const match = audience.match(/n\s*=\s*\d+(?:\s*\+\s*\d+\s+\w+)?/i);
  return match ? match[0].replace(/\s+/g, ' ') : 'To be scoped';
}

export function ResearchPlanner({ initialService = null, onStartProject }: ResearchPlannerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', text: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [serviceHint, setServiceHint] = useState<string | null>(initialService);
  const [generatingStep, setGeneratingStep] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialService) {
      setServiceHint(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isGenerating, generatingStep]);

  useEffect(() => {
    if (!isGenerating) {
      setGeneratingStep(0);
      return;
    }
    setGeneratingStep(1);
    const t1 = window.setTimeout(() => setGeneratingStep(2), 350);
    const t2 = window.setTimeout(() => setGeneratingStep(3), 700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isGenerating]);

  const latestBlueprint = useMemo(
    () => [...messages].reverse().find((m) => m.blueprint)?.blueprint ?? null,
    [messages],
  );

  const userChallenge = useMemo(
    () => [...messages].reverse().find((m) => m.role === 'user')?.text ?? null,
    [messages],
  );

  const progress = latestBlueprint ? 100 : userChallenge ? 42 : 0;
  const progressLabel = latestBlueprint
    ? 'Blueprint ready'
    : userChallenge
      ? 'Progress 42% (~2 min remaining)'
      : 'Ready to start';

  const confidence = latestBlueprint ? 68 : 0;

  const runPlanner = (challenge: string) => {
    const trimmed = challenge.trim();
    if (!trimmed || isGenerating) return;

    const userMsg: ChatMessage = { id: uid(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);

    window.setTimeout(() => {
      const blueprint = buildBlueprint(trimmed, serviceHint);
      const reply: ChatMessage = {
        id: uid(),
        role: 'assistant',
        text: `Based on what you shared, I’d start with a ${blueprint.recommendedResearch}. Check the Live Strategy panel for scope, investment and timeline.`,
        blueprint,
      };
      setMessages((prev) => [...prev, reply]);
      setIsGenerating(false);
    }, 1100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runPlanner(input);
  };

  const handleReset = () => {
    setMessages([{ id: 'welcome', role: 'assistant', text: WELCOME }]);
    setInput('');
    setServiceHint(initialService);
    setIsGenerating(false);
    inputRef.current?.focus();
  };

  const startPlanning = () => {
    inputRef.current?.focus();
    document.getElementById('planner-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const viewBlueprint = () => {
    document.getElementById('planner-deliverables')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      runPlanner(input);
    }
  };

  const strategyRows = [
    {
      label: 'Business challenge',
      value: userChallenge ?? '—',
      ready: Boolean(userChallenge),
    },
    {
      label: 'Audience',
      value: latestBlueprint?.audience ?? 'Waiting…',
      ready: Boolean(latestBlueprint),
    },
    {
      label: 'Methodology',
      value: latestBlueprint?.recommendedResearch ?? 'Waiting…',
      ready: Boolean(latestBlueprint),
    },
    {
      label: 'Sample',
      value: latestBlueprint ? extractSample(latestBlueprint.audience) : 'Waiting…',
      ready: Boolean(latestBlueprint),
    },
    {
      label: 'Timeline',
      value: latestBlueprint?.timeline ?? 'Waiting…',
      ready: Boolean(latestBlueprint),
    },
    {
      label: 'Indicative investment',
      value: latestBlueprint?.investment ?? 'Waiting…',
      ready: Boolean(latestBlueprint),
    },
  ] as const;

  return (
    <section
      id="planner"
      className="scroll-mt-24 bg-[var(--background)] px-6 pb-12 pt-10 lg:px-16 lg:pb-16 lg:pt-14"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:gap-14">
        {/* Intro + widget */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:pt-2">
            <p className="section-eyebrow">Qare Research Planner</p>
            <h2 className="section-intro mt-3">
              <span className="section-intro-title">Professional research. Made accessible.</span>{' '}
              <span className="section-intro-lead">
                Describe your business challenge and get a strategy, timeline and investment
                indication—before you speak with our team.
              </span>
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={startPlanning} className="btn btn-primary">
                Start planning
                <Icon icon="lucide:arrow-right" className="text-base" />
              </button>
              <button type="button" onClick={viewBlueprint} className="btn btn-secondary">
                View a blueprint
              </button>
            </div>

            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
              {TRUST_CHIPS.map((chip) => (
                <li
                  key={chip.label}
                  className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]"
                >
                  <Icon icon={chip.icon} className="text-base text-[var(--cta)]" />
                  {chip.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Planner widget */}
          <div id="planner-widget" className="lg:col-span-7">
            <article className="feature-card overflow-hidden">
              <div className="feature-card-body flex flex-col">
                {/* Widget header */}
                <div className="flex flex-wrap items-center gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-[var(--tertiary)] text-[var(--cta)]">
                      <Icon icon="lucide:sparkles" className="text-sm" />
                    </span>
                    <p className="text-sm font-semibold text-[var(--primary)]">Research Planner</p>
                  </div>

                  <div className="mx-auto flex min-w-[10rem] max-w-[14rem] flex-1 flex-col gap-1 sm:mx-0">
                    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--secondary)]">
                      <div
                        className="h-full rounded-full bg-[var(--cta)] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-[0.65rem] text-[var(--muted-foreground)]">{progressLabel}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="ml-auto text-xs font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--cta)]"
                  >
                    Reset
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[26rem]">
                  {/* Chat */}
                  <div className="flex min-h-[22rem] flex-col lg:col-span-7 lg:border-r lg:border-[var(--border)]">
                    <div
                      ref={listRef}
                      className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5"
                    >
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[92%] rounded-[4px] px-3.5 py-2.5 text-sm leading-snug sm:max-w-[88%] ${
                              message.role === 'user'
                                ? 'bg-[var(--cta)] text-white'
                                : 'border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]'
                            }`}
                          >
                            {message.role === 'assistant' && (
                              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[var(--cta)]">
                                <Icon icon="lucide:sparkles" className="text-sm" />
                                Qare Planner
                              </p>
                            )}
                            <p>{message.text}</p>
                          </div>
                        </div>
                      ))}

                      {isGenerating && (
                        <div className="flex justify-start">
                          <div className="w-full max-w-[92%] rounded-[4px] border border-[var(--border)] bg-[var(--background)] px-3.5 py-3 sm:max-w-[88%]">
                            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--cta)]">
                              <Icon icon="lucide:sparkles" className="text-sm" />
                              Qare Planner
                            </p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2 text-[var(--foreground)]">
                                <Icon
                                  icon="lucide:check"
                                  className={`text-base ${generatingStep >= 1 ? 'text-[var(--cta)]' : 'text-[var(--muted-foreground)]'}`}
                                />
                                Objective recognised
                              </li>
                              <li className="flex items-center gap-2 text-[var(--foreground)]">
                                <Icon
                                  icon={generatingStep >= 2 ? 'lucide:check' : 'lucide:loader-2'}
                                  className={`text-base ${
                                    generatingStep >= 2
                                      ? 'text-[var(--cta)]'
                                      : 'animate-spin text-[var(--muted-foreground)]'
                                  }`}
                                />
                                Strategic context set
                              </li>
                              <li className="flex items-center gap-2 text-[var(--muted-foreground)]">
                                <Icon
                                  icon="lucide:loader-2"
                                  className={`text-base ${generatingStep >= 3 ? 'animate-spin text-[var(--cta)]' : 'text-[var(--muted-foreground)]'}`}
                                />
                                Analysing recommendation…
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {!latestBlueprint && !isGenerating && (
                        <div className="pt-1">
                          <p className="field-label mb-2">Try an example</p>
                          <div className="flex flex-wrap gap-2">
                            {SUGGESTIONS.map((suggestion) => (
                              <button
                                key={suggestion}
                                type="button"
                                onClick={() => runPlanner(suggestion)}
                                className="chip max-w-full rounded-[4px] px-3 py-2 text-left text-xs font-medium leading-snug"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="border-t border-[var(--border)] bg-white px-4 py-3 sm:px-5"
                    >
                      {serviceHint && (
                        <div className="mb-2 flex items-center gap-2">
                          <span className="chip-active rounded-[4px] px-2.5 py-1 text-xs font-semibold">
                            {serviceHint}
                          </span>
                          <button
                            type="button"
                            onClick={() => setServiceHint(null)}
                            className="text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--cta)]"
                          >
                            Clear focus
                          </button>
                        </div>
                      )}
                      <div className="flex items-end gap-2">
                        <textarea
                          ref={inputRef}
                          rows={2}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={onKeyDown}
                          placeholder="Type your challenge…"
                          className="focus-cta min-h-[2.75rem] flex-1 resize-none rounded-[4px] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]"
                          disabled={isGenerating}
                        />
                        <button
                          type="submit"
                          disabled={isGenerating || !input.trim()}
                          className="btn btn-primary shrink-0 disabled:opacity-50"
                          aria-label="Send message"
                        >
                          <Icon icon="lucide:send" className="text-base" />
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Live Strategy */}
                  <aside className="planner-live-strategy flex flex-col bg-[var(--primary)] px-4 py-5 text-white sm:px-5 lg:col-span-5">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-white/55">
                      Live Strategy
                    </p>

                    <dl className="mt-4 flex flex-1 flex-col gap-3.5">
                      {strategyRows.map((row) => (
                        <div key={row.label}>
                          <dt className="text-[0.65rem] font-medium uppercase tracking-[0.04em] text-white/45">
                            {row.label}
                          </dt>
                          <dd
                            className={`mt-0.5 text-sm leading-snug ${
                              row.ready ? 'text-white' : 'text-white/40'
                            }`}
                          >
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[0.65rem] font-medium uppercase tracking-[0.04em] text-white/45">
                          Confidence
                        </p>
                        <p
                          className={`font-heading text-lg font-bold ${
                            confidence > 0 ? 'text-[var(--tertiary)]' : 'text-white/35'
                          }`}
                        >
                          {confidence}%
                        </p>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[var(--tertiary)] transition-all duration-500"
                          style={{ width: `${confidence}%` }}
                        />
                      </div>

                      {latestBlueprint && (
                        <div className="mt-5 flex flex-col gap-2">
                          <button type="button" onClick={onStartProject} className="btn btn-primary w-full">
                            Discuss this blueprint
                            <Icon icon="lucide:arrow-right" className="text-base" />
                          </button>
                          <button
                            type="button"
                            onClick={handleReset}
                            className="btn w-full border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5"
                          >
                            Start over
                          </button>
                        </div>
                      )}
                    </div>
                  </aside>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Deliverables */}
        <div id="planner-deliverables" className="scroll-mt-24">
          <p className="section-eyebrow">What you receive</p>
          <h3 className="section-intro mt-3 max-w-2xl">
            <span className="section-intro-title">No conversation without direction.</span>
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {DELIVERABLES.map((item) => (
              <article
                key={item.title}
                className="rounded-[4px] border border-[var(--border)] bg-white p-5 lg:p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[var(--tertiary)] text-[var(--cta)]">
                  <Icon icon={item.icon} className="text-lg" />
                </span>
                <h4 className="mt-4 font-heading text-base font-bold text-[var(--primary)]">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-snug text-[var(--muted-foreground)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-[var(--muted-foreground)]">
            Based on 300+ research projects for brands, media &amp; organisations.
          </p>
        </div>
      </div>
    </section>
  );
}
