import type { Testimonial } from '@/types';
import { Section } from './Section';

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <Section id="clients" title="From facilities managers" tint>
      <div className="grid gap-9 lg:grid-cols-3">
        {items.map((t) => (
          <blockquote key={t._id ?? t.quote} className="border-l-4 border-chill pl-[18px] text-[1.08rem]">
            <p className="mb-2.5">{t.quote}</p>
            <cite className="block text-[0.88rem] not-italic text-muted">
              {t.author}
              {t.role ? `, ${t.role}` : ''}
              {t.company ? `, ${t.company}` : ''}
            </cite>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
