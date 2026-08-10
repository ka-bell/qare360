const STATS = [
  {
    value: null as string | null,
    label: null as string | null,
    bg: 'bg-[var(--v2-purple)]',
    text: 'text-[var(--v2-ink)]',
    placeholder: true,
  },
  {
    value: '03',
    label: 'years of experience',
    bg: 'bg-[var(--v2-ink)]',
    text: 'text-white',
    placeholder: false,
  },
  {
    value: '360°',
    label: 'view of the customer',
    bg: 'bg-[var(--v2-blue)]',
    text: 'text-white',
    placeholder: false,
  },
  {
    value: '1',
    label: 'centralized research hub',
    bg: 'bg-[var(--v2-lime)]',
    text: 'text-[var(--v2-ink)]',
    placeholder: false,
  },
] as const;

export function Stats() {
  return (
    <section className="v2-shell pb-12 sm:pb-16 lg:pb-20">
      <div className="v2-frame grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {STATS.map((stat, i) => (
          <article
            key={i}
            className={`flex min-h-[12rem] flex-col justify-between rounded-2xl p-6 sm:min-h-[14rem] lg:min-h-[18rem] lg:p-8 ${stat.bg} ${stat.text}`}
          >
            {stat.placeholder ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="size-20 rounded-full border-4 border-white/40 sm:size-24" />
              </div>
            ) : (
              <p className="font-heading text-6xl font-medium leading-none tracking-tight sm:text-7xl lg:text-[6rem]">
                {stat.value}
              </p>
            )}
            {stat.label && (
              <p className="mt-6 border-t border-white/20 pt-4 text-sm sm:text-base">{stat.label}</p>
            )}
            {stat.placeholder && (
              <p className="mt-6 border-t border-white/20 pt-4 text-sm opacity-70">Visual placeholder</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
