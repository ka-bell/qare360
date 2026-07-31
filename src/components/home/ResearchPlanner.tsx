import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { BLUEPRINTS, detectServiceFromChallenge } from '../../data/blueprints';
import { SERVICES } from '../../data/services';
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
  'Tell me what you want to understand or decide. I’ll outline a Research Blueprint with an indicative investment, timeline and expected outcome—before any conversation with our team.';

function buildBlueprint(challenge: string, serviceHint?: string | null): Blueprint {
  const serviceKey = serviceHint || detectServiceFromChallenge(challenge);
  const template = BLUEPRINTS[serviceKey] || BLUEPRINTS['Concept Testing'];
  return { challenge, ...template };
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ResearchPlanner({ initialService = null, onStartProject }: ResearchPlannerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', text: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [serviceHint, setServiceHint] = useState<string | null>(initialService);
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
  }, [messages, isGenerating]);

  const hasBlueprint = messages.some((m) => m.blueprint);

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
        text: `Based on what you shared, I’d start with a ${blueprint.recommendedResearch}. Here’s a first indication of scope, investment and outcome.`,
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      runPlanner(input);
    }
  };

  return (
    <section
      id="planner"
      className="scroll-mt-24 bg-[var(--background)] px-6 pb-10 lg:px-16 lg:pb-14"
    >
      <div className="mx-auto max-w-7xl">
        <article className="feature-card overflow-hidden">
          <div className="feature-card-body flex flex-col lg:min-h-[36rem]">
            <div className="border-b border-[var(--border)] px-8 py-8 lg:px-12 lg:py-10">
              <p className="section-eyebrow">AI Research Planner</p>
              <h2 className="section-title max-w-3xl">
                Start planning your research in a conversation.
              </h2>
              <p className="section-lead max-w-2xl">
                Describe the decision you need to make. Get an instant indication of investment,
                timeline and end result—then talk to a strategist when you’re ready.
              </p>
            </div>

            <div className="grid flex-1 grid-cols-1 lg:grid-cols-12">
              <div className="flex min-h-[28rem] flex-col lg:col-span-7 lg:border-r lg:border-[var(--border)]">
                <div
                  ref={listRef}
                  className="flex-1 space-y-4 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[92%] rounded-[4px] px-4 py-3 text-sm leading-snug sm:max-w-[85%] ${
                          message.role === 'user'
                            ? 'bg-[var(--cta)] text-white'
                            : 'border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--cta)]">
                            <Icon icon="lucide:sparkles" className="text-sm" />
                            Qare Planner
                          </p>
                        )}
                        <p>{message.text}</p>

                        {message.blueprint && (
                          <div className="mt-4 grid gap-3 border-t border-[var(--border)] pt-4 sm:grid-cols-3">
                            <div className="rounded-[4px] border border-[var(--border)] bg-white p-3">
                              <p className="field-label">Investment</p>
                              <p className="mt-1 font-semibold text-[var(--cta)]">
                                {message.blueprint.investment}
                              </p>
                            </div>
                            <div className="rounded-[4px] border border-[var(--border)] bg-white p-3">
                              <p className="field-label">Timeline</p>
                              <p className="mt-1 font-semibold text-[var(--primary)]">
                                {message.blueprint.timeline}
                              </p>
                            </div>
                            <div className="rounded-[4px] border border-[var(--border)] bg-white p-3 sm:col-span-1">
                              <p className="field-label">End result</p>
                              <p className="mt-1 text-xs font-medium leading-snug text-[var(--primary)]">
                                {message.blueprint.deliverables[0]}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="rounded-[4px] border border-[var(--border)] bg-[var(--background)] px-4 py-3">
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--cta)]">
                          <Icon icon="lucide:sparkles" className="text-sm" />
                          Qare Planner
                        </p>
                        <p className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                          <Icon icon="lucide:loader-2" className="animate-spin text-base" />
                          Building your indication…
                        </p>
                      </div>
                    </div>
                  )}

                  {!hasBlueprint && !isGenerating && (
                    <div className="pt-2">
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
                  className="border-t border-[var(--border)] bg-white px-4 py-4 lg:px-8"
                >
                  {serviceHint && (
                    <div className="mb-3 flex items-center gap-2">
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
                      placeholder="What do you want to understand or decide?"
                      className="focus-cta min-h-[3rem] flex-1 resize-none rounded-[4px] border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)]"
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
                  <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                    Press Enter to send · Indicative only — every project is scoped with a strategist
                  </p>
                </form>
              </div>

              <aside className="flex flex-col bg-[var(--background)]/60 lg:col-span-5">
                <div className="flex-1 px-6 py-6 lg:px-8 lg:py-8">
                  <p className="field-label">Live indication</p>
                  <h3 className="mt-1 font-heading text-lg font-bold uppercase text-[var(--primary)]">
                    {hasBlueprint ? 'Your Research Blueprint' : 'What you’ll get'}
                  </h3>

                  {(() => {
                    const latest = [...messages].reverse().find((m) => m.blueprint)?.blueprint;
                    if (!latest) {
                      return (
                        <div className="mt-6 space-y-4">
                          <p className="text-sm leading-snug text-[var(--muted-foreground)]">
                            After one message, you’ll see a first-pass blueprint with:
                          </p>
                          <ul className="space-y-3 text-sm text-[var(--foreground)]">
                            <li className="flex gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[var(--tertiary)] text-[var(--cta)]">
                                <Icon icon="lucide:wallet" />
                              </span>
                              <span>
                                <strong className="text-[var(--primary)]">Investment</strong>
                                <br />
                                <span className="text-[var(--muted-foreground)]">
                                  Indicative cost range for typical scope
                                </span>
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[var(--tertiary)] text-[var(--cta)]">
                                <Icon icon="lucide:clock" />
                              </span>
                              <span>
                                <strong className="text-[var(--primary)]">Timeline</strong>
                                <br />
                                <span className="text-[var(--muted-foreground)]">
                                  Expected turnaround in working days
                                </span>
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[var(--tertiary)] text-[var(--cta)]">
                                <Icon icon="lucide:flag" />
                              </span>
                              <span>
                                <strong className="text-[var(--primary)]">End result</strong>
                                <br />
                                <span className="text-[var(--muted-foreground)]">
                                  Deliverables you can act on
                                </span>
                              </span>
                            </li>
                          </ul>

                          <div className="pt-2">
                            <p className="field-label mb-2">Or start from a service</p>
                            <div className="flex flex-wrap gap-2">
                              {SERVICES.slice(0, 4).map((service) => (
                                <button
                                  key={service.name}
                                  type="button"
                                  onClick={() => {
                                    setServiceHint(service.name);
                                    inputRef.current?.focus();
                                  }}
                                  className={`chip rounded-[4px] px-2.5 py-1.5 text-xs font-semibold ${
                                    serviceHint === service.name ? 'chip-active' : ''
                                  }`}
                                >
                                  {service.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="mt-6 space-y-5 animate-fade-in">
                        <div>
                          <p className="field-label">Recommended research</p>
                          <p className="mt-1 font-semibold text-[var(--primary)]">
                            {latest.recommendedResearch}
                          </p>
                          <p className="mt-1 text-sm leading-snug text-[var(--muted-foreground)]">
                            {latest.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <div className="rounded-[4px] border border-[var(--border)] bg-white p-4">
                            <p className="field-label">Indicative investment</p>
                            <p className="mt-1 text-xl font-bold text-[var(--cta)]">
                              {latest.investment}
                            </p>
                          </div>
                          <div className="rounded-[4px] border border-[var(--border)] bg-white p-4">
                            <p className="field-label">Timeline</p>
                            <p className="mt-1 text-lg font-bold text-[var(--primary)]">
                              {latest.timeline}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="field-label">Expected end result</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {latest.deliverables.map((item) => (
                              <span
                                key={item}
                                className="rounded-[4px] border border-[var(--border)] bg-white px-3 py-2 text-xs font-medium text-[var(--foreground)]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="field-label">Methodology</p>
                          <p className="mt-1 text-sm text-[var(--foreground)]">{latest.methodology}</p>
                          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                            Audience: {latest.audience}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-5 sm:flex-row">
                          <button type="button" onClick={onStartProject} className="btn btn-primary">
                            Discuss this blueprint
                            <Icon icon="lucide:arrow-right" className="text-base" />
                          </button>
                          <button type="button" onClick={handleReset} className="btn btn-secondary">
                            Start over
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </aside>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
