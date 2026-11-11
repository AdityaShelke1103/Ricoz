import { PlanProvider } from '@/context/PlanContext';
import { getServices, getTestimonials } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Coverage } from '@/components/Coverage';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { QuoteSection } from '@/components/QuoteSection';
import { Footer } from '@/components/Footer';

// Re-fetch services and testimonials from the backend at most once a minute.
export const revalidate = 60;

export default async function HomePage() {
  const [services, testimonials] = await Promise.all([getServices(), getTestimonials()]);

  return (
    <PlanProvider>
      <Navbar />
      <main id="top">
        <Hero />
        <Coverage />
        <Services services={services} />
        <Process />
        <Testimonials items={testimonials} />
        <QuoteSection />
      </main>
      <Footer />
    </PlanProvider>
  );
}
