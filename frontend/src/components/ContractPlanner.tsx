'use client';

import { usePlan } from '@/context/PlanContext';
import { Segmented } from '@/components/ui/Segmented';
import { MAX_VISITS, formatArea, summarize } from '@/lib/planner';
import type { PropertyType, Scope, Term } from '@/types';

const PROPERTY_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: 'shopping-center', label: 'Shopping center' },
  { value: 'office-complex', label: 'Office complex' },
  { value: 'factory', label: 'Factory' },
];
const TERM_OPTIONS: { value: Term; label: string }[] = [
  { value: 1, label: '1 yr' },
  { value: 3, label: '3 yr' },
  { value: 5, label: '5 yr' },
  { value: 10, label: '10 yr' },
];
const SCOPE_OPTIONS: { value: Scope; label: string }[] = [
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'replacement', label: 'Replacement' },
  { value: 'both', label: 'Both' },
];

export function ContractPlanner() {
  const { plan, update, setRequested } = usePlan();
  const { propertyType, area, term, scope } = plan;
  const { withService, perYear, swaps, total, note } = summarize(propertyType, term, scope);
  const dense = term > 5;
  const years = Array.from({ length: term }, (_, i) => i + 1);

  return (
    <section id="planner" aria-labelledby="planner-title" className="rounded-[10px] bg-white p-[18px] text-ink ring-1 ring-white/10 sm:p-[26px]">
      <h2 id="planner-title" className="mb-[18px] text-[1.15rem] font-extrabold font-wide">
        Contract planner
      </h2>

      <Segmented name="propertyType" legend="Property" options={PROPERTY_OPTIONS} value={propertyType} onChange={(v) => update({ propertyType: v })} />

      <div className="mb-4">
        <label htmlFor="area" className="mb-1.5 flex justify-between text-sm font-semibold text-muted">
          Floor area <output className="font-bold text-ink">{formatArea(area)}</output>
        </label>
        <input
          id="area"
          type="range"
          min={20000}
          max={1000000}
          step={10000}
          value={Math.min(Math.max(area, 20000), 1000000)}
          onChange={(e) => update({ area: Number(e.target.value) })}
          className="w-full accent-chill"
        />
      </div>

      <Segmented name="term" legend="Contract term" options={TERM_OPTIONS} value={term} onChange={(v) => update({ term: v })} />
      <Segmented name="scope" legend="Scope" options={SCOPE_OPTIONS} value={scope} onChange={(v) => update({ scope: v })} />

      <div className="mb-3.5 mt-5 border-t-[1.5px] border-line pt-4">
        {/* key remounts the timeline so the draw-in animation replays when the plan changes */}
        <div key={`${propertyType}-${term}-${scope}`} role="img" aria-label={`${term}-year contract: ${perYear} visits per year, ${swaps.length} replacement phases`} className="flex h-[92px] gap-1">
          {years.map((y) => (
            <div key={y} className="relative flex min-w-0 flex-1 flex-col justify-end rounded-[3px] bg-[#eef3f6] px-[3px] pb-1">
              {swaps.includes(y) && (
                <span
                  className="absolute inset-x-0 top-1 flex h-[22px] origin-left animate-grow items-center justify-center rounded-[3px] bg-flame text-[0.68rem] font-bold text-white motion-reduce:animate-none"
                  style={{ animationDelay: `${y * 50}ms` }}
                >
                  {!dense && 'Replace'}
                </span>
              )}
              {withService && <span className="absolute right-[5px] top-1.5 size-[9px] rounded-full border-2 border-ink bg-white" title={`Year ${y} review`} />}
              <div className="flex h-11 items-end justify-between gap-px">
                {dense
                  ? perYear > 0 && (
                      <i
                        className="block w-full origin-bottom animate-tick rounded-t-sm bg-chill motion-reduce:animate-none"
                        style={{ height: `${Math.round((perYear / MAX_VISITS) * 100)}%`, animationDelay: `${(y - 1) * 40}ms` }}
                      />
                    )
                  : Array.from({ length: perYear }, (_, i) => (
                      <i
                        key={i}
                        className="block h-full min-w-px max-w-[3px] flex-1 origin-bottom animate-tick bg-chill motion-reduce:animate-none"
                        style={{ animationDelay: `${(y - 1) * 40 + i * 6}ms` }}
                      />
                    ))}
              </div>
              <div className="mt-1 text-center text-[0.7rem] font-semibold text-muted">{dense ? y : `Year ${y}`}</div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-muted">
          <span className="inline-flex items-center gap-1.5"><i className="inline-block h-3 w-[3px] bg-chill" />Service visit</span>
          <span className="inline-flex items-center gap-1.5"><i className="inline-block size-[9px] rounded-full border-2 border-ink" />Annual review</span>
          <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2 w-3.5 rounded-sm bg-flame" />Replacement phase</span>
        </div>
      </div>

      <dl aria-live="polite" className="mb-2 grid grid-cols-3 gap-2.5">
        {[
          ['Visits per year', perYear],
          ['Visits over the term', total],
          ['Replacement phases', swaps.length],
        ].map(([label, value]) => (
          <div key={label} className="border-t-[3px] border-ink pt-1.5">
            <dt className="text-xs leading-tight text-muted">{label}</dt>
            <dd className="mt-0.5 text-[1.9rem] font-extrabold leading-[1.1] font-wide">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mb-4 mt-2 text-[0.8rem] text-muted">{note}</p>

      <a
        href="#quote"
        onClick={() => setRequested(true)}
        className="block w-full rounded-md bg-flame px-6 py-3.5 text-center font-bold text-white transition-colors hover:bg-flame-deep"
      >
        Request a quote for this plan
      </a>
    </section>
  );
}
