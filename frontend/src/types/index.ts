export type PropertyType = 'shopping-center' | 'office-complex' | 'factory' | 'other';
export type Scope = 'maintenance' | 'replacement' | 'both';
export type Term = 1 | 3 | 5 | 10;

export interface Service {
  _id?: string;
  title: string;
  slug?: string;
  category: 'maintenance' | 'replacement' | 'mechanical';
  summary: string;
  features: string[];
  termOptionsYears: number[];
}

export interface Testimonial {
  _id?: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
}

export interface Plan {
  propertyType: PropertyType;
  area: number;
  term: Term;
  scope: Scope;
}
