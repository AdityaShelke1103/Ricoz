import type { ReactNode } from 'react';

interface Props {
  id?: string;
  title: string;
  tint?: boolean;
  children: ReactNode;
}

/** Consistent page section: width, padding, background and heading. */
export function Section({ id, title, tint, children }: Props) {
  return (
    <section id={id} className={`px-[18px] py-[52px] sm:px-6 sm:py-[76px] ${tint ? 'bg-tint' : ''}`}>
      <div className="mx-auto max-w-[1160px]">
        <h2 className="mb-8 max-w-[18em] text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[1.1] tracking-[-0.015em] font-wide">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
