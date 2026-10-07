import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  lead,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <p className="label flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        {label}
      </p>
      <h2 className="mt-5 font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.01em] text-ink">
        {title}
      </h2>
      {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{lead}</p>}
    </Reveal>
  );
}
