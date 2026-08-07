/**
 * Research Planner section:
 * - Left: marketing intro
 * - Right: compact Figma preview
 * - Click / start → full planner popup over darkened site
 * https://www.figma.com/design/Bsdpr5LVtzrm4xv8B8yLnb/Qare-360?node-id=4023-8
 */

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { HeroFlow } from '../brand/HeroFlow';
import { QareLogo } from '../brand/QareLogo';

interface ResearchPlannerProps {
  initialService?: string | null;
  onStartProject: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type RouteMode = 'decide' | 'know';

const TRUST = [
  { icon: 'lucide:clock', label: '3–5 minutes' },
  { icon: 'lucide:lock', label: 'No account needed' },
  { icon: 'lucide:check-circle', label: 'No obligation' },
] as const;

const EXAMPLES = [
  'Validate an idea',
  'Measure campaign impact',
  'Understand an audience',
] as const;

const COPY: Record<RouteMode, { title: string; lead: string; placeholder: string }> = {
  decide: {
    title: 'What would you like to find out?',
    lead: 'Tell us what you’re working on. We’ll help you shape the right research approach, timeline and cost indication.',
    placeholder: 'Describe what you’re trying to understand…',
  },
  know: {
    title: 'What research do you need?',
    lead: 'Share the method or outcome you already have in mind. We’ll confirm scope, timeline and an indicative investment.',
    placeholder: 'Describe the research you already have in mind…',
  },
};

interface PlannerSurfaceProps {
  size: 'preview' | 'modal';
  route: RouteMode;
  value: string;
  onRouteChange: (route: RouteMode) => void;
  onValueChange: (value: string) => void;
  onReset: () => void;
  onSaveAndExit: () => void;
  onSubmit: (text: string) => void;
  onOpen?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

function PlannerSurface({
  size,
  route,
  value,
  onRouteChange,
  onValueChange,
  onReset,
  onSaveAndExit,
  onSubmit,
  onOpen,
  inputRef,
}: PlannerSurfaceProps) {
  const isModal = size === 'modal';
  const copy = COPY[route];

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white">
      {/* Network only in bottom-right */}
      <div
        className={`pointer-events-none absolute bottom-0 right-0 z-0 overflow-hidden ${
          isModal ? 'h-[55%] w-[55%] max-w-[520px]' : 'h-[48%] w-[52%] max-w-[320px]'
        }`}
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            maskImage:
              'radial-gradient(ellipse 90% 90% at 100% 100%, #000 20%, transparent 72%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 90% at 100% 100%, #000 20%, transparent 72%)',
          }}
        >
          <HeroFlow
            variant="backdrop"
            zoom={1.2}
            seed={isModal ? 19 : 11}
            interactive={false}
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <header
          className={`flex items-center justify-between gap-3 border-b border-[var(--border)]/80 bg-white/80 ${
            isModal ? 'h-[72px] px-5 sm:h-[88px] sm:px-10 lg:px-12' : 'px-4 py-3 sm:px-5'
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <QareLogo
              variant="navy"
              className={isModal ? '[&_img]:h-7 sm:[&_img]:h-8' : '[&_img]:h-6'}
            />
            <div
              className={`flex items-center gap-2.5 rounded-full bg-[var(--secondary)]/90 ${
                isModal ? 'px-3.5 py-2' : 'hidden px-3 py-1.5 sm:flex'
              }`}
            >
              <span className="size-2 shrink-0 rounded-full bg-[var(--tertiary)]" aria-hidden />
              <span className={`text-[var(--primary)] ${isModal ? 'text-[13px]' : 'text-[12px]'}`}>
                Research planner
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className={`rounded-full border border-[var(--border)] bg-white/90 font-bold text-[var(--primary)] ${
                isModal ? 'px-[18px] py-3 text-sm' : 'px-3 py-1.5 text-xs'
              }`}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSaveAndExit();
              }}
              className={`rounded-full border border-[var(--border)] bg-white/90 font-bold text-[var(--primary)] ${
                isModal ? 'px-[18px] py-3 text-sm' : 'px-3 py-1.5 text-xs'
              }`}
            >
              Save &amp; exit
            </button>
          </div>
        </header>

        <div
          className={`flex flex-1 flex-col items-center justify-center ${
            isModal ? 'gap-7 px-4 py-10 sm:px-8 lg:py-16' : 'gap-5 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12'
          }`}
        >
          <div
            className={`flex w-full gap-1 rounded-full border border-white/50 bg-[color-mix(in_srgb,var(--secondary)_35%,transparent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md ${
              isModal ? 'h-14 max-w-[420px] p-1.5' : 'h-11 max-w-[340px] p-1'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRouteChange('decide');
                onOpen?.();
              }}
              className={`flex flex-1 items-center justify-center rounded-full px-2 font-bold transition-colors ${
                isModal ? 'h-11 text-sm' : 'h-9 text-[12px]'
              } ${
                route === 'decide' ? 'bg-[var(--cta)] text-white' : 'text-[var(--muted-foreground)]'
              }`}
            >
              Help Me Decide
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRouteChange('know');
                onOpen?.();
              }}
              className={`flex flex-1 items-center justify-center rounded-full px-2 font-bold transition-colors ${
                isModal ? 'h-11 text-sm' : 'h-9 text-[12px]'
              } ${
                route === 'know' ? 'bg-[var(--cta)] text-white' : 'text-[var(--muted-foreground)]'
              }`}
            >
              I Know What I Need
            </button>
          </div>

          <div
            className={`flex flex-col items-center gap-2 text-center ${
              isModal ? 'max-w-[860px] gap-2.5' : 'max-w-[34rem]'
            }`}
          >
            <h3
              className={`font-heading font-bold leading-snug text-[var(--primary)] ${
                isModal
                  ? 'text-[1.75rem] sm:text-[2.25rem] lg:text-[2.375rem]'
                  : 'text-xl sm:text-[1.5rem]'
              }`}
            >
              {copy.title}
            </h3>
            <p
              className={`leading-snug text-[var(--muted-foreground)] ${
                isModal ? 'max-w-[760px] text-base sm:text-[17px]' : 'text-sm'
              }`}
            >
              {copy.lead}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(value);
            }}
            onClick={(e) => e.stopPropagation()}
            className={`flex w-full items-center gap-2 border border-[var(--tertiary)] bg-white shadow-[0_8px_24px_rgba(11,21,39,0.08)] ${
              isModal
                ? 'h-[76px] max-w-[900px] gap-3 rounded-[24px] py-2.5 pl-[26px] pr-3'
                : 'h-[60px] max-w-[34rem] rounded-[20px] py-2 pl-3 pr-2 sm:pl-4'
            }`}
          >
            <button
              type="button"
              className={`flex shrink-0 items-center justify-center rounded-full text-[var(--muted-foreground)] ${
                isModal ? 'size-11' : 'size-9'
              }`}
              aria-label="Attach documents"
            >
              <Icon icon="lucide:paperclip" className={isModal ? 'size-5' : 'size-[18px]'} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onFocus={() => onOpen?.()}
              onChange={(e) => {
                onValueChange(e.target.value);
                onOpen?.();
              }}
              onClick={() => onOpen?.()}
              placeholder={copy.placeholder}
              readOnly={!isModal}
              className={`min-w-0 flex-1 cursor-text border-0 bg-transparent text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] ${
                isModal ? 'text-base' : 'text-sm'
              }`}
            />
            <button
              type={isModal ? 'submit' : 'button'}
              onClick={(e) => {
                if (!isModal) {
                  e.preventDefault();
                  onOpen?.();
                }
              }}
              disabled={isModal && !value.trim()}
              className={`flex shrink-0 items-center justify-center rounded-full bg-[var(--cta)] font-bold leading-none text-white transition-colors hover:bg-[var(--cta-hover)] disabled:opacity-40 ${
                isModal ? 'size-[52px] text-[22px]' : 'size-10 text-lg'
              }`}
              aria-label={isModal ? 'Submit' : 'Open research planner'}
            >
              ↑
            </button>
          </form>

          <div
            className={`flex w-full flex-wrap items-center justify-center gap-2 ${
              isModal ? 'max-w-[900px] gap-2.5' : 'max-w-[34rem]'
            }`}
          >
            <p className={`text-[var(--muted-foreground)] ${isModal ? 'text-[13px]' : 'text-[12px]'}`}>
              For example:
            </p>
            {EXAMPLES.map((label) => (
              <button
                key={label}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isModal) onSubmit(label);
                  else onOpen?.();
                }}
                className={`rounded-full border border-[var(--border)] bg-white/95 text-[#425466] transition-colors hover:border-[var(--cta-outline)] hover:text-[var(--cta)] ${
                  isModal ? 'px-4 py-2.5 text-[13px]' : 'px-3 py-1.5 text-[12px]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResearchPlanner({
  initialService = null,
  isOpen: controlledOpen,
  onOpenChange,
}: ResearchPlannerProps) {
  const [route, setRoute] = useState<RouteMode>('decide');
  const [value, setValue] = useState('');
  const [internalOpen, setInternalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = (open: boolean) => {
    if (!isControlled) setInternalOpen(open);
    onOpenChange?.(open);
  };

  useEffect(() => {
    if (initialService) {
      setValue(`I’d like help with ${initialService.toLowerCase()}.`);
    }
  }, [initialService]);

  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    const t = window.setTimeout(() => modalInputRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [isOpen]);

  const reset = () => {
    setRoute('decide');
    setValue(initialService ? `I’d like help with ${initialService.toLowerCase()}.` : '');
  };

  const close = () => setOpen(false);

  const open = () => setOpen(true);

  const submit = (text: string) => {
    const next = text.trim();
    if (!next) return;
    setValue(next);
  };

  const surfaceProps = {
    route,
    value,
    onRouteChange: setRoute,
    onValueChange: setValue,
    onReset: reset,
    onSaveAndExit: close,
    onSubmit: submit,
  };

  return (
    <section
      id="planner"
      className="scroll-mt-24 bg-[var(--background)] px-6 py-12 lg:px-16 lg:py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="section-eyebrow">Qare Research Planner</p>
          <h2 className="section-intro mt-3">
            <span className="section-intro-title">Professional research. Made accessible.</span>{' '}
            <span className="section-intro-lead">
              Describe your business challenge and get a strategy, timeline and investment
              indication—before you speak with our team.
            </span>
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={open} className="btn btn-primary">
              Start Now
              <Icon icon="lucide:chevron-right" className="text-base" />
            </button>
            <button type="button" onClick={open} className="btn btn-secondary">
              Help Me Decide
            </button>
          </div>

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {TRUST.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]"
              >
                <Icon icon={item.icon} className="text-base text-[var(--cta)]" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div id="planner-widget" className="lg:col-span-7">
          <div
            role="button"
            tabIndex={0}
            onClick={open}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
              }
            }}
            className="block w-full cursor-pointer overflow-hidden rounded-[1.25rem] border border-[rgba(11,21,39,0.06)] text-left shadow-[0_1px_2px_rgba(11,21,39,0.04),0_18px_48px_rgba(11,21,39,0.07)] transition-shadow hover:shadow-[0_1px_2px_rgba(11,21,39,0.04),0_22px_56px_rgba(11,21,39,0.12)]"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-label="Open research planner"
          >
            <PlannerSurface
              size="preview"
              {...surfaceProps}
              onOpen={open}
              onSaveAndExit={open}
              inputRef={inputRef}
            />
          </div>
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-stretch justify-center p-0 sm:items-center sm:p-4 lg:p-8"
            role="presentation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-[var(--primary)]/55 backdrop-blur-[2px] animate-fade-in"
              aria-label="Close research planner"
              onClick={close}
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-10 flex h-full w-full max-w-[1100px] flex-col overflow-hidden bg-white shadow-[0_24px_80px_rgba(11,21,39,0.28)] animate-fade-up sm:h-[min(900px,calc(100vh-2rem))] sm:rounded-[1.35rem]"
            >
              <h2 id={titleId} className="sr-only">
                Research planner
              </h2>
              <PlannerSurface
                size="modal"
                {...surfaceProps}
                onSaveAndExit={close}
                inputRef={modalInputRef}
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
