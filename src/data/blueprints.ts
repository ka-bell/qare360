import type { BlueprintTemplate } from '../types';

const DEFAULT_NEXT_STEPS = [
  'Review this blueprint with a Qare strategist',
  'Confirm audience, markets and decision timeline',
  'Receive a tailored proposal for your project',
];

export const BLUEPRINTS: Record<string, BlueprintTemplate> = {
  'Concept Testing': {
    recommendedResearch: 'Concept Validation Study',
    methodology: 'Online concept test with structured follow-up questions',
    description:
      'Test product concepts, value propositions or new features with your target audience before development.',
    audience: 'Target consumers / category buyers (typically n=300)',
    timeline: 'Typically 5–7 working days',
    deliverables: [
      'Concept performance scorecard',
      'Key driver analysis',
      'Qualitative feedback summary',
    ],
    investment: '€3,500 – €5,000',
    nextSteps: DEFAULT_NEXT_STEPS,
  },
  'Brand Research': {
    recommendedResearch: 'Brand Health & Positioning Assessment',
    methodology: 'Brand funnel survey with competitive benchmarks',
    description:
      'Measure brand awareness, associations and competitive positioning in your core market.',
    audience: 'General population or specific niche (typically n=500)',
    timeline: 'Typically 8–10 working days',
    deliverables: ['Brand funnel analysis', 'Competitor matrix', 'Positioning map'],
    investment: '€4,800 – €7,000',
    nextSteps: DEFAULT_NEXT_STEPS,
  },
  'Campaign Effectiveness': {
    recommendedResearch: 'Campaign Message & Creative Test',
    methodology: 'Creative diagnostic with message and intent metrics',
    description:
      'Evaluate creative routes, message clarity and purchase intent before or after campaign launch.',
    audience: 'Target audience segments (typically n=250)',
    timeline: 'Typically 4–6 working days',
    deliverables: [
      'Creative diagnostic report',
      'Message recall metrics',
      'Optimisation recommendations',
    ],
    investment: '€3,000 – €4,500',
    nextSteps: DEFAULT_NEXT_STEPS,
  },
  'Customer Research': {
    recommendedResearch: 'Customer Journey & Churn Analysis',
    methodology: 'Mixed-method: survey plus qualitative interviews',
    description:
      'Identify friction points, satisfaction drivers and key reasons for customer drop-off.',
    audience: 'Active and lapsed customers (typically n=400 + 10 interviews)',
    timeline: 'Typically 10–12 working days',
    deliverables: [
      'Customer journey map',
      'NPS & CSAT driver analysis',
      'Actionable retention playbook',
    ],
    investment: '€6,000 – €8,500',
    nextSteps: DEFAULT_NEXT_STEPS,
  },
  'Employee Research': {
    recommendedResearch: 'Employee Engagement & Culture Audit',
    methodology: 'Anonymous survey with optional focus groups',
    description:
      'Understand internal alignment, satisfaction and cultural health across departments.',
    audience: 'All internal staff (anonymous survey + focus groups)',
    timeline: 'Typically 6–8 working days',
    deliverables: [
      'Engagement index',
      'Departmental breakdown',
      'Key recommendations report',
    ],
    investment: '€2,500 – €4,000',
    nextSteps: DEFAULT_NEXT_STEPS,
  },
  'UX & Product Research': {
    recommendedResearch: 'Usability & UX Diagnostic',
    methodology: 'Moderated usability sessions with task analysis',
    description:
      'Observe real users interacting with your digital product to uncover usability issues and flow bottlenecks.',
    audience: 'Target users (typically 15 moderated sessions)',
    timeline: 'Typically 7–9 working days',
    deliverables: [
      'UX friction video highlights',
      'Task success rate report',
      'Prioritised UI recommendations',
    ],
    investment: '€4,000 – €5,500',
    nextSteps: DEFAULT_NEXT_STEPS,
  },
};

export function detectServiceFromChallenge(challenge: string): string {
  const lower = challenge.toLowerCase();
  if (
    lower.includes('campaign') ||
    lower.includes('ad') ||
    lower.includes('message') ||
    lower.includes('marketing')
  ) {
    return 'Campaign Effectiveness';
  }
  if (
    lower.includes('brand') ||
    lower.includes('logo') ||
    lower.includes('competitor') ||
    lower.includes('reputation')
  ) {
    return 'Brand Research';
  }
  if (
    lower.includes('customer') ||
    lower.includes('churn') ||
    lower.includes('satisfaction') ||
    lower.includes('nps')
  ) {
    return 'Customer Research';
  }
  if (
    lower.includes('employee') ||
    lower.includes('culture') ||
    lower.includes('staff') ||
    lower.includes('team')
  ) {
    return 'Employee Research';
  }
  if (
    lower.includes('ux') ||
    lower.includes('product') ||
    lower.includes('app') ||
    lower.includes('website') ||
    lower.includes('usability')
  ) {
    return 'UX & Product Research';
  }
  return 'Concept Testing';
}
