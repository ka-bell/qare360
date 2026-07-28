import { Icon } from '@iconify/react';

interface ContactCTAProps {
  onStartProject: () => void;
}

export function ContactCTA({ onStartProject }: ContactCTAProps) {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-[var(--border)] bg-white section-pad">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-eyebrow">
          Professional research. Made accessible.
        </p>
        <h2 className="section-title mx-auto">
          Every important decision deserves better evidence.
        </h2>
        <p className="section-lead mx-auto">
          Whether you are validating an idea, measuring impact or building a longer-term research
          capability, getting started with Qare is straightforward.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={onStartProject} className="btn btn-primary">
            Start a Project <Icon icon="lucide:chevron-right" className="text-base" />
          </button>
          <a href="#planner" className="btn btn-secondary">
            Get Your Research Blueprint
          </a>
        </div>
      </div>
    </section>
  );
}
