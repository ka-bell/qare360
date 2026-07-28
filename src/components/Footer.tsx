import { QareLogo } from './brand/QareLogo';

export function Footer() {
  return (
    <footer className="bg-[var(--primary)] px-6 py-8 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-[var(--secondary)]/40 pt-6 text-sm text-[var(--secondary)] sm:flex-row sm:items-center sm:justify-between">
        <QareLogo variant="cyan" />
        <p>Professional research. Made accessible.</p>
      </div>
    </footer>
  );
}
