import { QuoteForm } from './QuoteForm';

export function QuoteSection() {
  return (
    <section id="quote" className="px-[18px] py-[52px] sm:px-6 sm:py-[76px]">
      <div className="mx-auto grid max-w-[1160px] items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)] lg:gap-14">
        <div>
          <h2 className="mb-6 max-w-[18em] text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[1.1] tracking-[-0.015em] font-wide">
            Request a quote
          </h2>
          <p className="max-w-[34em] text-[1.2rem] text-muted">
            Tell us about the property. We reply within one business day to arrange a site survey.
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
