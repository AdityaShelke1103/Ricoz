import type { Service } from '@/types';
import { Section } from './Section';

const kindLabel: Record<Service['category'], string> = {
  maintenance: 'Maintenance',
  replacement: 'Replacement',
  mechanical: 'Mechanical works',
};

export function Services({ services }: { services: Service[] }) {
  return (
    <Section id="services" title="What each contract covers" tint>
      <div className="border-t-2 border-ink">
        {services.map((s) => (
          <article key={s.slug ?? s.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[280px_minmax(0,1fr)_150px] md:gap-8">
            <div>
              <h3 className="mb-1 text-xl font-bold font-wide">{s.title}</h3>
              <span className={`text-sm font-bold ${s.category === 'replacement' ? 'text-flame-deep' : 'text-chill-deep'}`}>
                {kindLabel[s.category] ?? s.category}
              </span>
            </div>
            <div>
              <p className="mb-2.5 max-w-[40em] text-muted">{s.summary}</p>
              <ul className="max-w-[40em] list-disc pl-[18px]">
                {s.features.map((f) => (
                  <li key={f} className="mb-0.5">{f}</li>
                ))}
              </ul>
            </div>
            <div className="text-[0.9rem] font-semibold md:text-right">{s.termOptionsYears.map((y) => `${y} yr`).join(', ')}</div>
          </article>
        ))}
      </div>
    </Section>
  );
}
