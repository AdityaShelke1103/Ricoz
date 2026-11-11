import { ContractPlanner } from './ContractPlanner';

export function Hero() {
  return (
    <section className="bg-ink px-[18px] pb-12 pt-10 text-white sm:px-6 sm:pb-[72px] sm:pt-16">
      <div className="mx-auto grid max-w-[1160px] items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-14">
        <div>
          <h1 className="mb-6 mt-2 text-[clamp(2.3rem,5.2vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.02em] font-wider">
            Your plant room, planned for the next ten years.
          </h1>
          <p className="mb-[18px] max-w-[34em] text-[1.2rem] text-[#cfdce5]">
            We sign multi-year maintenance and replacement contracts for shopping centers, office complexes and factories.
            One agreement covers every service visit and every equipment swap.
          </p>
          <p className="max-w-[30em] text-[#8fb4c6]">
            Build a sample contract in the planner. See how many visits you&apos;d get and when replacements would land.
          </p>
        </div>
        <ContractPlanner />
      </div>
    </section>
  );
}
