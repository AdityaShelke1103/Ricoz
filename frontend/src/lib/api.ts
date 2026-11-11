import type { Service, Testimonial } from '@/types';
import { fallbackServices, fallbackTestimonials } from './fallback';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function fetchList<T>(path: string, fallback: T[]): Promise<T[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return fallback;
    const data = (await res.json()) as T[];
    return data.length ? data : fallback;
  } catch {
    return fallback;
  }
}

export const getServices = () => fetchList<Service>('services', fallbackServices);
export const getTestimonials = () => fetchList<Testimonial>('testimonials', fallbackTestimonials);
