import { Icon } from '@iconify/react';
import { SERVICES } from '../../data/services';

interface ServicesProps {
  onServiceSelect: (service: string) => void;
}

export function Services({ onServiceSelect }: ServicesProps) {
  return (
    <section id="services" className="bg-[var(--secondary)] section-pad scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-eyebrow">Research services</p>
          <h2 className="section-title">
            Start with the decision. We will find the right evidence.
          </h2>
          <p className="section-lead">
            Each service is built around a business challenge—not a methodology catalogue.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <button
              key={service.name}
              type="button"
              onClick={() => onServiceSelect(service.name)}
              className="group card-interactive flex cursor-pointer flex-col rounded-[4px] p-6 text-left"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[var(--secondary)] text-[var(--cta)] transition-colors group-hover:bg-[var(--tertiary)]">
                  <Icon icon={service.icon} className="text-xl" />
                </span>
                <Icon
                  icon="lucide:arrow-up-right"
                  className="text-xl text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--cta)]"
                />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold uppercase leading-tight text-[var(--primary)]">
                {service.name}
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-snug">
                <div>
                  <p className="field-label">Challenge</p>
                  <p className="mt-1 text-[var(--foreground)]">{service.challenge}</p>
                </div>
                <div>
                  <p className="field-label">Approach</p>
                  <p className="mt-1 text-[var(--muted-foreground)]">{service.approach}</p>
                </div>
                <div>
                  <p className="field-label">Outcome</p>
                  <p className="mt-1 font-medium text-[var(--primary)]">{service.outcome}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
