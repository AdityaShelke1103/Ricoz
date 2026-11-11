import type { PropertyType, Scope, Term } from '@/types';

// Starting-point assumptions for the sample planner. Adjust to match your real service levels.
export const SCHEDULE: Record<PropertyType, { visits: number; label: string }> = {
  'shopping-center': { visits: 12, label: 'monthly' },
  'office-complex': { visits: 12, label: 'monthly' },
  factory: { visits: 26, label: 'every two weeks' },
  other: { visits: 12, label: 'monthly' },
};
export const MAX_VISITS = 26;

export const PROPERTY_NAME: Record<PropertyType, string> = {
  'shopping-center': 'Shopping center',
  'office-complex': 'Office complex',
  factory: 'Factory',
  other: 'Other property',
};
export const PROPERTY_PLURAL: Record<PropertyType, string> = {
  'shopping-center': 'Shopping centers',
  'office-complex': 'Office complexes',
  factory: 'Factories',
  other: 'Other properties',
};
export const SCOPE_NAME: Record<Scope, string> = {
  maintenance: 'Maintenance',
  replacement: 'Replacement',
  both: 'Maintenance and replacement',
};

export const formatArea = (n: number) => `${n.toLocaleString('en-IN')} sq ft`;

/** Contract years in which a replacement phase lands, spread evenly across the term. */
export function swapYears(term: Term): number[] {
  const phases = term >= 10 ? 3 : term >= 5 ? 2 : term >= 3 ? 1 : 0;
  return Array.from({ length: phases }, (_, i) => Math.min(term, Math.ceil(((i + 1) / (phases + 1)) * term)));
}

export function summarize(propertyType: PropertyType, term: Term, scope: Scope) {
  const withService = scope !== 'replacement';
  const withSwap = scope !== 'maintenance';
  const perYear = withService ? SCHEDULE[propertyType].visits : 0;
  const swaps = withSwap ? swapYears(term) : [];

  let note = 'Typical starting schedule. We set the final plan after a site survey.';
  if (withService) {
    note = `${PROPERTY_PLURAL[propertyType]} typically start with visits ${SCHEDULE[propertyType].label}, plus a yearly review. We set the final plan after a site survey.`;
  }
  if (withSwap && term === 1) {
    note = 'A one-year term covers an equipment survey and a replacement plan. Choose 3 years or more to schedule replacement phases.';
  }
  return { withService, withSwap, perYear, swaps, total: perYear * term, note };
}
