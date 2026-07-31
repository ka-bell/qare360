export interface Blueprint {
  challenge: string;
  recommendedResearch: string;
  methodology: string;
  description: string;
  audience: string;
  timeline: string;
  deliverables: string[];
  investment: string;
  nextSteps: string[];
}

export interface BlueprintTemplate {
  recommendedResearch: string;
  methodology: string;
  description: string;
  audience: string;
  timeline: string;
  deliverables: string[];
  investment: string;
  nextSteps: string[];
}

export interface Service {
  name: string;
  icon: string;
  visual: 'concept' | 'brand' | 'campaign' | 'customer' | 'employee' | 'ux';
  /** Optional photo path — when set, replaces the illustrated visual */
  image?: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export interface CaseStudy {
  tag: string;
  title: string;
  challenge: string;
  research: string;
  insight: string;
  impact: string;
  kpi: string;
  variant: 'primary' | 'card';
}

export interface TrustMetric {
  value: string;
  label: string;
}

export interface ClientLogo {
  name: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  caseRef: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProjectFormData {
  name: string;
  email: string;
  company: string;
  challenge: string;
  budget: string;
}
