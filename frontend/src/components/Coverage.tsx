import { Section } from './Section';

const sites = [
  { name: 'Shopping centers', text: 'Tenants and shoppers notice a warm store in minutes. We service plant outside trading hours and keep common-area cooling steady, with monthly visits and a named site engineer.' },
  { name: 'Office complexes', text: 'Multiple towers, one contract. Response times are written into the agreement, and your facilities team gets a service report after every visit.' },
  { name: 'Factories', text: 'Process cooling and industrial ventilation need tighter intervals, so we visit every two weeks and keep critical spares on site to avoid line stoppages.' },
];

export function Coverage() {
  return (
    <Section id="coverage" title="Three kinds of site, three different schedules">
      <ul className="border-t-2 border-ink">
        {sites.map((s) => (
          <li key={s.name} className="grid gap-2 border-b border-line py-6 md:grid-cols-[280px_minmax(0,1fr)] md:gap-8">
            <h3 className="text-[1.35rem] font-bold font-wide">{s.name}</h3>
            <p className="max-w-[40em] text-muted">{s.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
