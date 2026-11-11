const links = [
  { href: '#coverage', label: 'Coverage' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-ink text-white">
      <div className="mx-auto flex h-[60px] max-w-[1160px] items-center justify-between px-[18px] sm:px-6">
        <a href="#top" aria-label="CoolBridge Mechanical, home" className="flex items-center gap-2 text-[1.1rem] font-extrabold tracking-[0.01em] font-wide">
          <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" className="text-[#5ec4e0]">
            <path d="M2 20h8l4-10 4 14 4-8h8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          CoolBridge
        </a>
        <nav aria-label="Main" className="flex items-center gap-[22px]">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hidden text-[0.95rem] text-[#cfdce5] hover:text-white sm:inline">
              {l.label}
            </a>
          ))}
          <a href="#quote" className="rounded-md bg-flame px-3.5 py-2 text-[0.92rem] font-bold text-white transition-colors hover:bg-flame-deep">
            Request a quote
          </a>
        </nav>
      </div>
    </header>
  );
}
