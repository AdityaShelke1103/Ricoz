import { Section } from './Section';

const steps = [
  { title: 'Site survey', text: 'We walk the plant, tag every asset and record its age and condition.' },
  { title: 'Proposal', text: 'You receive a visit schedule, response-time terms and a replacement roadmap.' },
  { title: 'Start-up', text: 'A dedicated team, asset tags and reporting are in place within weeks.' },
  { title: 'Reviews', text: 'Every year you get a performance review and an energy and lifecycle report.' },
];

export function Process() {
  return (
    <Section id="process" title="From survey to signed contract">
      <ol className="grid gap-x-6 gap-y-2 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="pr-5 pt-5">
            <span aria-hidden="true" className="mb-2 block text-[2.6rem] font-extrabold leading-none text-chill font-wider">{i + 1}</span>
            <h3 className="mb-1 text-[1.1rem] font-bold">{s.title}</h3>
            <p className="max-w-[20em] text-[0.98rem] text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
