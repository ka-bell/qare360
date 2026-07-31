import { Icon } from '@iconify/react';
import { ServiceVisual } from '../brand/ServiceVisual';
import { SERVICES } from '../../data/services';

interface ServicesProps {
  onServiceSelect: (service: string) => void;
}

export function Services({ onServiceSelect }: ServicesProps) {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-[var(--background)] px-6 pb-10 lg:px-16 lg:pb-14"
    >
      <div className="mx-auto max-w-7xl">
        <article className="feature-card">
          <div className="feature-card-body flex flex-col gap-10 p-8 lg:gap-12 lg:p-12">
            <div className="max-w-2xl">
              <p className="section-eyebrow">Research services</p>
              <h2 className="section-title">
                Start with the decision. We will find the right evidence.
              </h2>
              <p className="section-lead">
                Each service is built around a business challenge—not a methodology catalogue.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => onServiceSelect(service.name)}
                  className="group card-interactive flex cursor-pointer flex-col overflow-hidden rounded-[4px] bg-white p-0 text-left"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border)]">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <ServiceVisual
                        id={service.visual}
                        className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-[4px] bg-white/90 text-[var(--muted-foreground)] shadow-sm backdrop-blur-sm transition-colors group-hover:text-[var(--cta)]">
                      <Icon icon="lucide:arrow-up-right" className="text-lg" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[var(--secondary)] text-[var(--cta)]">
                        <Icon icon={service.icon} className="text-lg" />
                      </span>
                      <h3 className="font-heading text-base font-bold uppercase leading-tight text-[var(--primary)] lg:text-lg">
                        {service.name}
                      </h3>
                    </div>
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
                  </div>
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
