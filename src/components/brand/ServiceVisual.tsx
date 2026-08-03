/**
 * Realistic Qare platform artefacts for service cards.
 * Philosophy: preview evidence the visitor will receive — not decorative charts.
 */

import type { ReactNode } from 'react';

export type ServiceVisualId =
  | 'concept'
  | 'brand'
  | 'campaign'
  | 'customer'
  | 'employee'
  | 'ux';

interface ServiceVisualProps {
  id: ServiceVisualId;
  className?: string;
}

function Panel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[10px] border border-[var(--border)] bg-white shadow-[0_8px_28px_rgba(11,21,39,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

function Meta({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.65rem] font-medium uppercase tracking-[0.04em] text-[var(--muted-foreground)]">
      {children}
    </p>
  );
}

function ConceptArtefact() {
  return (
    <div className="artefact-stage flex h-full items-center justify-center px-2 py-2">
      <Panel className="w-full max-w-[17rem] p-3.5">
        <div className="flex items-center justify-between">
          <Meta>Concept test · Live</Meta>
          <span className="rounded-full bg-[var(--tertiary)]/40 px-2 py-0.5 text-[0.6rem] font-semibold text-[var(--cta)]">
            n=412
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-2.5">
            <p className="text-[0.65rem] font-semibold text-[var(--muted-foreground)]">Concept A</p>
            <p className="mt-2 font-heading text-xl font-bold text-[var(--primary)]">38%</p>
            <p className="text-[0.65rem] text-[var(--muted-foreground)]">Purchase intent</p>
          </div>
          <div className="rounded-lg border border-[var(--cta-outline)] bg-[#f3f9fd] p-2.5">
            <p className="text-[0.65rem] font-semibold text-[var(--cta)]">Concept B</p>
            <p className="mt-2 font-heading text-xl font-bold text-[var(--cta)]">61%</p>
            <p className="text-[0.65rem] text-[var(--muted-foreground)]">Purchase intent</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--primary)] px-3 py-2">
          <p className="text-[0.7rem] font-semibold text-white">Recommendation</p>
          <p className="text-[0.7rem] font-bold text-[var(--tertiary)]">Go · Concept B</p>
        </div>
      </Panel>
    </div>
  );
}

function BrandArtefact() {
  return (
    <div className="artefact-stage flex h-full items-center justify-center px-2 py-2">
      <Panel className="w-full max-w-[17.5rem] p-3.5">
        <Meta>Brand perception map</Meta>
        <p className="mt-1 text-[0.7rem] text-[var(--muted-foreground)]">
          Relevance × Differentiation
        </p>
        <div className="relative mt-3 aspect-[5/4] overflow-hidden rounded-lg border border-[var(--border)] bg-[#f7fbfd]">
          <div className="absolute inset-x-3 top-1/2 h-px bg-[var(--border)]" />
          <div className="absolute inset-y-3 left-1/2 w-px bg-[var(--border)]" />
          <span className="absolute left-2 top-2 text-[0.55rem] text-[var(--muted-foreground)]">
            High relevance
          </span>
          <span className="absolute bottom-2 right-2 text-[0.55rem] text-[var(--muted-foreground)]">
            High differentiation
          </span>
          <span className="absolute left-[22%] top-[58%] flex h-7 w-7 items-center justify-center rounded-full bg-[var(--secondary)] text-[0.55rem] font-bold text-[var(--primary)]">
            You
          </span>
          <span className="absolute left-[58%] top-[28%] flex h-8 w-8 items-center justify-center rounded-full bg-[var(--cta)] text-[0.55rem] font-bold text-white shadow-sm">
            Ideal
          </span>
          <span className="absolute left-[68%] top-[62%] h-5 w-5 rounded-full bg-[var(--tertiary)]" />
          <span className="absolute left-[40%] top-[40%] h-4 w-4 rounded-full border-2 border-[var(--cta)] bg-white" />
        </div>
      </Panel>
    </div>
  );
}

function CampaignArtefact() {
  const bars = [28, 42, 36, 58, 64, 72, 68, 81];
  return (
    <div className="artefact-stage flex h-full items-center justify-center px-2 py-2">
      <div className="flex w-full max-w-[18rem] flex-col gap-2.5">
        <Panel className="p-3">
          <div className="flex items-center justify-between">
            <Meta>Brand lift</Meta>
            <span className="text-[0.65rem] font-semibold text-[var(--cta)]">+14 pts</span>
          </div>
          <p className="mt-1 font-heading text-2xl font-bold text-[var(--primary)]">Aided awareness</p>
          <div className="mt-3 flex h-16 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-[var(--cta)]/80"
                style={{ height: `${h}%`, opacity: 0.45 + i * 0.07 }}
              />
            ))}
          </div>
        </Panel>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Recall', value: '47%' },
            { label: 'Message', value: '62%' },
            { label: 'Intent', value: '+9' },
          ].map((m) => (
            <Panel key={m.label} className="px-2.5 py-2">
              <p className="text-[0.6rem] text-[var(--muted-foreground)]">{m.label}</p>
              <p className="mt-0.5 text-sm font-bold text-[var(--primary)]">{m.value}</p>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomerArtefact() {
  const stages = [
    { name: 'Discover', tone: 'ok' },
    { name: 'Onboard', tone: 'warn' },
    { name: 'Use', tone: 'bad' },
    { name: 'Renew', tone: 'ok' },
  ] as const;
  return (
    <div className="artefact-stage flex h-full items-center justify-center px-2 py-2">
      <Panel className="w-full max-w-[18rem] p-3.5">
        <Meta>Journey friction map</Meta>
        <p className="mt-1 text-[0.7rem] text-[var(--muted-foreground)]">Where customers drop</p>
        <div className="mt-4 flex items-center gap-1">
          {stages.map((s) => (
            <div key={s.name} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={`flex h-10 w-full items-center justify-center rounded-lg text-[0.6rem] font-semibold ${
                  s.tone === 'bad'
                    ? 'bg-[#fde8e8] text-[var(--destructive)]'
                    : s.tone === 'warn'
                      ? 'bg-[#fff4e5] text-[#9a6700]'
                      : 'bg-[var(--secondary)] text-[var(--cta)]'
                }`}
              >
                {s.tone === 'bad' ? 'High' : s.tone === 'warn' ? 'Med' : 'Low'}
              </div>
              <p className="text-[0.6rem] font-medium text-[var(--muted-foreground)]">{s.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2">
          <p className="text-[0.7rem] font-semibold text-[var(--primary)]">Top friction</p>
          <p className="mt-0.5 text-[0.7rem] text-[var(--muted-foreground)]">
            Support wait time during first week of use
          </p>
        </div>
      </Panel>
    </div>
  );
}

function EmployeeArtefact() {
  return (
    <div className="artefact-stage flex h-full items-center justify-center px-2 py-2">
      <div className="flex w-full max-w-[17.5rem] flex-col gap-2.5">
        <Panel className="flex items-center gap-3 p-3.5">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx="32" cy="32" r="26" fill="none" stroke="#e6eef3" strokeWidth="7" />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#0c6ecf"
                strokeWidth="7"
                strokeDasharray="120 164"
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
              />
            </svg>
            <span className="relative font-heading text-lg font-bold text-[var(--primary)]">+42</span>
          </div>
          <div>
            <Meta>eNPS</Meta>
            <p className="mt-0.5 text-sm font-bold text-[var(--primary)]">Engagement score</p>
            <p className="text-[0.65rem] text-[var(--muted-foreground)]">Across 6 departments</p>
          </div>
        </Panel>
        <Panel className="space-y-2 p-3">
          {[
            { name: 'Product', value: 86 },
            { name: 'Sales', value: 71 },
            { name: 'Support', value: 54 },
          ].map((row) => (
            <div key={row.name}>
              <div className="mb-1 flex justify-between text-[0.65rem]">
                <span className="text-[var(--muted-foreground)]">{row.name}</span>
                <span className="font-semibold text-[var(--primary)]">{row.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--secondary)]">
                <div
                  className="h-full rounded-full bg-[var(--cta)]"
                  style={{ width: `${row.value}%` }}
                />
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}

function UxArtefact() {
  return (
    <div className="artefact-stage flex h-full items-center justify-center px-2 py-2">
      <Panel className="w-full max-w-[17.5rem] overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
          <Meta>Click heatmap · Checkout</Meta>
          <span className="text-[0.6rem] font-semibold text-[var(--destructive)]">Friction</span>
        </div>
        <div className="relative bg-[#f4f7fa] px-3 py-3">
          <div className="rounded-lg border border-[var(--border)] bg-white p-3">
            <div className="h-2 w-2/3 rounded bg-[var(--secondary)]" />
            <div className="mt-2 h-2 w-1/2 rounded bg-[var(--secondary)]" />
            <div className="relative mt-3 h-14 overflow-hidden rounded-md bg-[var(--background)]">
              <span className="absolute left-[18%] top-[30%] h-10 w-10 rounded-full bg-[var(--tertiary)]/50" />
              <span className="absolute left-[38%] top-[18%] h-14 w-14 rounded-full bg-[var(--cta)]/25" />
              <span className="absolute left-[48%] top-[28%] h-8 w-8 rounded-full bg-[var(--destructive)]/35" />
              <span className="absolute left-[52%] top-[40%] h-3 w-3 rounded-full bg-[var(--destructive)]" />
            </div>
            <div className="mt-3 h-7 rounded-md bg-[var(--cta)]/90" />
          </div>
          <p className="mt-2 text-[0.65rem] text-[var(--muted-foreground)]">
            Task completion 54% · Drop-off at payment step
          </p>
        </div>
      </Panel>
    </div>
  );
}

const ARTEFACTS: Record<ServiceVisualId, () => JSX.Element> = {
  concept: ConceptArtefact,
  brand: BrandArtefact,
  campaign: CampaignArtefact,
  customer: CustomerArtefact,
  employee: EmployeeArtefact,
  ux: UxArtefact,
};

export function ServiceVisual({ id, className = '' }: ServiceVisualProps) {
  const Artefact = ARTEFACTS[id];
  return (
    <div className={`service-artefact relative h-full w-full overflow-hidden ${className}`}>
      <Artefact />
    </div>
  );
}
