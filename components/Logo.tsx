/**
 * AR monogram: the letters sit on a baseline, with a single accent "data point"
 * standing in for the dot of an i — a quiet nod to data and signals.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden className="shrink-0">
        <rect x="1.5" y="1.5" width="61" height="61" rx="16" fill="none" stroke="var(--line-strong)" strokeWidth="2" />
        <text
          x="30"
          y="43"
          textAnchor="middle"
          fontFamily="var(--font-instrument), Georgia, serif"
          fontStyle="italic"
          fontSize="34"
          fill="var(--ink)"
        >
          ar
        </text>
        <circle cx="49" cy="18" r="4.5" fill="var(--accent)" />
      </svg>
      <span className="font-mono text-[0.8rem] tracking-[0.14em] text-ink uppercase">
        Aryan<span className="text-ink-3">.</span>Rinayat
      </span>
    </span>
  );
}
