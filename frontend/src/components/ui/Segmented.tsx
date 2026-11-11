'use client';

interface Option<T> {
  value: T;
  label: string;
}

interface Props<T extends string | number> {
  name: string;
  legend: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Accessible segmented control built on real radio inputs. */
export function Segmented<T extends string | number>({ name, legend, options, value, onChange }: Props<T>) {
  return (
    <fieldset className="mb-4 min-w-0 border-0 p-0">
      <legend className="mb-1.5 text-sm font-semibold text-muted">{legend}</legend>
      <div
        role="radiogroup"
        className="grid overflow-hidden rounded-md border-[1.5px] border-line"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      >
        {options.map((o) => (
          <label key={String(o.value)} className="block cursor-pointer first:[&>span]:border-l-0">
            <input
              type="radio"
              name={name}
              value={String(o.value)}
              checked={o.value === value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className="flex h-full items-center justify-center border-l-[1.5px] border-line px-1 py-2.5 text-center text-sm font-semibold text-muted transition-colors hover:bg-[#eef3f6] peer-checked:bg-chill peer-checked:text-white peer-checked:hover:bg-chill peer-focus-visible:ring-2 peer-focus-visible:ring-inset peer-focus-visible:ring-flame max-sm:text-[0.84rem]">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
