import type { Service } from '../types';

export const SERVICES: Service[] = [
  {
    name: 'Concept Testing',
    icon: 'lucide:lightbulb',
    visual: 'concept',
    challenge: 'Will people actually buy this?',
    approach: 'Compare concepts before you invest—and leave with a clear go, iterate, or stop call.',
    outcome: 'Launch with evidence, not opinion.',
  },
  {
    name: 'Brand Research',
    icon: 'lucide:award',
    visual: 'brand',
    challenge: 'How is our brand really perceived?',
    approach: 'See where you sit on relevance and differentiation against the brands that matter.',
    outcome: 'Decide where to push—and where to protect.',
  },
  {
    name: 'Campaign Effectiveness',
    icon: 'lucide:megaphone',
    visual: 'campaign',
    challenge: 'Did our campaign actually move people?',
    approach: 'Track lift, recall and message impact so you know what worked—and what to cut.',
    outcome: 'Put the next euro where it moves the needle.',
  },
  {
    name: 'Customer Research',
    icon: 'lucide:users',
    visual: 'customer',
    challenge: 'Why are customers leaving?',
    approach: 'Map the journey, surface friction, and pinpoint the moments that break loyalty.',
    outcome: 'Fix the drop-offs that cost you growth.',
  },
  {
    name: 'Employee Research',
    icon: 'lucide:briefcase',
    visual: 'employee',
    challenge: 'Are our teams actually engaged?',
    approach: 'Read engagement, culture and department gaps before they show up in turnover.',
    outcome: 'Act on the signals leaders usually miss.',
  },
  {
    name: 'UX & Product Research',
    icon: 'lucide:smartphone',
    visual: 'ux',
    challenge: 'Where are users getting stuck?',
    approach: 'See heatmaps, funnels and drop-offs as product evidence—not anecdotal feedback.',
    outcome: 'Ship the fix that improves conversion.',
  },
];
