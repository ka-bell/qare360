import type { Service } from '../types';

export const SERVICES: Service[] = [
  {
    name: 'Concept Testing',
    icon: 'lucide:lightbulb',
    visual: 'concept',
    challenge: 'Will this idea, proposition or feature earn attention before you invest?',
    approach: 'Test concepts with the people who matter—before development or launch.',
    outcome: 'A clear go / iterate / stop decision grounded in evidence.',
  },
  {
    name: 'Brand Research',
    icon: 'lucide:award',
    visual: 'brand',
    challenge: 'How is your brand perceived—and where can it win?',
    approach: 'Measure awareness, associations and competitive position in your market.',
    outcome: 'A sharper positioning you can act on with confidence.',
  },
  {
    name: 'Campaign Effectiveness',
    icon: 'lucide:megaphone',
    visual: 'campaign',
    challenge: 'Which message or creative will move your audience?',
    approach: 'Evaluate clarity, relevance and intent before or after launch.',
    outcome: 'Campaign decisions that improve impact, not just reach.',
  },
  {
    name: 'Customer Research',
    icon: 'lucide:users',
    visual: 'customer',
    challenge: 'What drives loyalty—and what causes customers to leave?',
    approach: 'Map journeys, friction and satisfaction across key moments.',
    outcome: 'Prioritised actions that improve retention and experience.',
  },
  {
    name: 'Employee Research',
    icon: 'lucide:briefcase',
    visual: 'employee',
    challenge: 'Is your organisation aligned on culture, engagement and direction?',
    approach: 'Listen across teams with surveys and structured conversations.',
    outcome: 'Clear internal priorities leaders can act on.',
  },
  {
    name: 'UX & Product Research',
    icon: 'lucide:smartphone',
    visual: 'ux',
    challenge: 'Where do users struggle in your product or digital experience?',
    approach: 'Observe real people completing real tasks in your product.',
    outcome: 'Specific fixes that improve usability and conversion.',
  },
];
