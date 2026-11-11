import type { Service, Testimonial } from '@/types';

// Shown when the backend or database is unavailable, so the page is never empty.
export const fallbackServices: Service[] = [
  { title: 'Planned preventive maintenance', category: 'maintenance', summary: 'Scheduled inspection, cleaning and tuning of chillers, air handlers and VRF systems across the whole property.', features: ['Monthly or fortnightly visits', 'Digital service report after each visit', 'Fixed annual pricing'], termOptionsYears: [1, 3, 5] },
  { title: 'Breakdown and emergency response', category: 'maintenance', summary: 'Priority response for tenants and production lines that cannot lose cooling.', features: ['24/7 helpline', 'Response times written into the contract', 'Critical spares held for you'], termOptionsYears: [1, 3, 5] },
  { title: 'Equipment replacement programs', category: 'replacement', summary: 'Ageing chillers, rooftop units and VRF systems replaced in phases, so capital cost is spread across the term.', features: ['Lifecycle and energy audit', 'Phased replacement roadmap', 'Warranty on new equipment'], termOptionsYears: [3, 5, 10] },
  { title: 'Mechanical installation and retrofit', category: 'mechanical', summary: 'Ducting, piping, ventilation and plant-room works for new builds, fit-outs and factory expansions.', features: ['Design-and-build or build-to-spec', 'Testing and commissioning', 'As-built drawings at handover'], termOptionsYears: [1] },
];

export const fallbackTestimonials: Testimonial[] = [
  { quote: 'Tenants stopped calling about temperature once we moved to a three-year contract. Our budget is now predictable.', author: 'Sample name', role: 'Centre manager', company: 'Sample shopping centre' },
  { quote: 'The response times in the agreement are actually met. The phased chiller replacement saved us a large one-time spend.', author: 'Sample name', role: 'Facilities head', company: 'Sample office park' },
  { quote: 'Production lines stay at temperature. The fortnightly visits catch faults before they turn into shutdowns.', author: 'Sample name', role: 'Plant engineer', company: 'Sample manufacturing plant' },
];
