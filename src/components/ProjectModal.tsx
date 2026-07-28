import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { ProjectFormData } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    email: '',
    company: '',
    challenge: '',
    budget: '€3,000 - €5,000',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-[4px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-md animate-fade-up">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-[4px] border border-transparent p-2 text-[var(--muted-foreground)] transition-colors hover:border-[var(--cta-outline)] hover:bg-transparent hover:text-[var(--cta)]"
        >
          <Icon icon="lucide:x" className="text-xl" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[4px] bg-[var(--tertiary)] text-[var(--cta)]">
              <Icon icon="lucide:check" className="text-2xl" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[var(--primary)]">
              Project request received
            </h3>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Thank you for reaching out. A research strategist will review your challenge and
              contact you within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="btn btn-primary mt-6"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 font-heading text-xl font-bold text-[var(--primary)]">
              Start your research project
            </h3>
            <p className="mb-6 text-sm text-[var(--muted-foreground)]">
              Tell us about the decision you need to make, and we&apos;ll help design the right
              research approach.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="field-label mb-1 block">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="focus-cta w-full rounded-[4px] border border-[var(--border)] bg-[var(--background)] p-2.5 text-sm text-[var(--foreground)]"
                  />
                </div>
                <div>
                  <label className="field-label mb-1 block">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="focus-cta w-full rounded-[4px] border border-[var(--border)] bg-[var(--background)] p-2.5 text-sm text-[var(--foreground)]"
                  />
                </div>
              </div>

              <div>
                <label className="field-label mb-1 block">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="focus-cta w-full rounded-[4px] border border-[var(--border)] bg-[var(--background)] p-2.5 text-sm text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="field-label mb-1 block">
                  What decision are you trying to make?
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="Describe what you need to validate, measure or understand..."
                  className="focus-cta w-full resize-none rounded-[4px] border border-[var(--border)] bg-[var(--background)] p-2.5 text-sm text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="field-label mb-1 block">Indicative investment range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="focus-cta w-full rounded-[4px] border border-[var(--border)] bg-[var(--background)] p-2.5 text-sm text-[var(--foreground)]"
                >
                  <option>Under €3,000</option>
                  <option>€3,000 - €5,000</option>
                  <option>€5,000 - €10,000</option>
                  <option>€10,000+</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary mt-2 w-full disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="lucide:loader-2" className="animate-spin text-lg" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit project request <Icon icon="lucide:send" className="text-sm" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
