const COLUMNS = [
  {
    title: 'Solutions',
    links: ['Validate', 'Measure', 'Understand', 'Research Planner'],
  },
  {
    title: 'Company',
    links: ['About', 'How it works', 'Careers', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookies'],
  },
] as const;

export function SiteFooter() {
  return (
    <footer id="contact" className="v2-shell border-t border-[var(--v2-ink)]/10 bg-[var(--v2-ink)] pt-12 text-white sm:pt-16 lg:pt-20">
      <div className="v2-frame">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p className="font-heading text-xl font-bold tracking-tight">QARE 360°</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              Professional research, made accessible. For teams that need clarity — not another
              agency deck.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-white/80 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          className="mt-16 select-none overflow-hidden font-heading text-[clamp(3.5rem,18vw,12rem)] font-bold leading-none tracking-[-0.04em] text-white/[0.08] sm:mt-20 lg:mt-24"
          aria-hidden
        >
          QARE 360°
        </p>
      </div>
    </footer>
  );
}
