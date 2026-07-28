import type { ClientLogo, Testimonial, TrustMetric } from '../types';

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Thuisbezorgd' },
  { name: 'Stanley' },
  { name: 'Ziggo' },
  { name: 'Vodafone' },
  { name: 'De Speld' },
  { name: 'Just' },
  { name: 'United Nations' },
  { name: 'DELTA' },
  { name: 'Marie Stella Maris' },
];

export const TRUST_METRICS: TrustMetric[] = [
  { value: '12+', label: 'Years of research experience' },
  { value: '350+', label: 'Research projects delivered' },
  { value: '18', label: 'Industries served' },
  { value: '92%', label: 'Clients return for a next study' },
];

export const FEATURED_TESTIMONIAL: Testimonial = {
  quote:
    'Qare helped us decide what to launch—and what to leave behind—before we spent the marketing budget. The process felt clear from day one.',
  name: 'Sarah Vermeulen',
  role: 'Brand Director',
  company: 'Helix Foods',
  caseRef: 'German market proposition',
};
