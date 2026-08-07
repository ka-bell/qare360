import { Icon } from '@iconify/react';
import { QareLogo } from './brand/QareLogo';

interface HeaderProps {
  onStartProject: () => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const NAV_LINKS = [
  { href: '#validate', label: 'Validate' },
  { href: '#measure', label: 'Measure' },
  { href: '#intelligence', label: 'Intelligence' },
  { href: '#services', label: 'Services' },
  { href: '#testimonial', label: 'Clients' },
  { href: '#planner', label: 'Research Planner' },
] as const;

export function Header({ onStartProject, isMobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/55 px-6 py-3 backdrop-blur-md lg:px-16">
      <div className="mx-auto flex max-w-7xl items-center gap-8">
        <a href="#top" className="shrink-0" aria-label="Qare 360 home">
          <QareLogo variant="navy" />
        </a>

        <nav className="hidden flex-1 items-center gap-7 text-[0.9375rem] font-medium text-[#425466] xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[var(--cta)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a href="#planner" className="btn btn-secondary hidden sm:inline-flex">
            Help Me Decide
          </a>
          <button type="button" onClick={onStartProject} className="btn btn-primary hidden sm:inline-flex">
            Start Now
            <Icon icon="lucide:chevron-right" className="text-base opacity-80" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-[4px] border border-transparent p-2 text-[#0a2540] transition-colors hover:border-[var(--cta-outline)] hover:bg-transparent xl:hidden"
            aria-label="Toggle Menu"
          >
            <Icon icon={isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'} className="text-2xl" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full z-50 flex w-full animate-fade-in flex-col gap-1 border-b border-[var(--border)] bg-white px-6 py-6 shadow-lg xl:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#e6ebf1] py-2.5 text-base font-medium text-[#0a2540]"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onStartProject();
            }}
            className="btn btn-primary mt-3 w-full"
          >
            Start Now
            <Icon icon="lucide:chevron-right" className="text-base opacity-80" />
          </button>
        </div>
      )}
    </header>
  );
}
