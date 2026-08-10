import { useState } from 'react';
import { Icon } from '@iconify/react';

const NAV = [
  { href: '#solutions', label: 'Services', chevron: true },
  { href: '#cases', label: 'Cases', chevron: true },
  { href: '#planner', label: 'Research planner', chevron: false },
  { href: '#contact', label: 'Contact', chevron: false },
] as const;

interface SiteNavProps {
  variant?: 'dark' | 'light';
}

/** Figma 4040:292 — Navbar Content */
export function SiteNav({ variant = 'dark' }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const dark = variant === 'dark';

  return (
    <header
      className={`relative z-20 flex w-full items-center justify-between ${
        dark ? 'text-white' : 'text-[var(--v2-ink)]'
      }`}
      data-node-id="4040:292"
    >
      <a
        href="#top"
        className="shrink-0 font-heading text-[clamp(1.35rem,2.5vw,1.902rem)] font-medium leading-none tracking-[-0.03em]"
        data-node-id="4040:293"
      >
        QARE 360°
      </a>

      {/* Desktop: links + Start — Figma buttons container w≈653, gap 16 */}
      <div className="hidden items-center gap-4 lg:flex" data-node-id="4040:294">
        <nav className="flex items-center" data-node-id="4040:295">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center font-mono text-[12px] uppercase leading-[1.1] tracking-[0.6px] transition-opacity hover:opacity-70 ${
                item.chevron ? 'gap-1 py-3 pl-4 pr-3' : 'px-6 py-4'
              }`}
            >
              {item.label}
              {item.chevron && (
                <span className="relative size-6 shrink-0 overflow-hidden">
                  <img
                    src="/hero/chevron-down.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="absolute inset-0 size-6 max-w-none"
                  />
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Miyagami Custom Button — pl-24 pr-4 py-4, gap-12, icon circle p-8 + 24 box / 20 leaf */}
        <a
          href="#planner"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-white py-1 pl-6 pr-1 font-mono text-[12px] uppercase leading-[1.1] tracking-[0.6px] text-[var(--v2-ink)]"
          data-node-id="4040:300"
        >
          Start
          <span className="flex shrink-0 items-center justify-center rounded-full bg-[var(--v2-ink)] p-2">
            <span className="relative size-6 shrink-0 overflow-hidden">
              <span className="absolute left-0.5 top-0.5 size-5">
                <img
                  src="/hero/arrow-outward.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="block size-5 max-w-none"
                />
              </span>
            </span>
          </span>
        </a>
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <a
          href="#planner"
          className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-4 pr-1 font-mono text-[11px] uppercase tracking-[0.6px] text-[var(--v2-ink)]"
        >
          Start
          <span className="flex items-center justify-center rounded-full bg-[var(--v2-ink)] p-1.5">
            <img src="/hero/arrow-outward.svg" alt="" width={16} height={16} className="size-4" />
          </span>
        </a>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-white/25"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon icon={open ? 'lucide:x' : 'lucide:menu'} className="text-xl" />
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-3 flex flex-col gap-1 rounded-2xl bg-[#2a2a2a] p-4 shadow-lg lg:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-1 rounded-lg px-3 py-3 font-mono text-xs uppercase tracking-[0.6px]"
            >
              {item.label}
              {item.chevron && (
                <img src="/hero/chevron-down.svg" alt="" width={20} height={20} className="size-5" />
              )}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
