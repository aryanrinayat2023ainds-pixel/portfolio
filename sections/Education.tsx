import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sectionIndex } from "@/lib/nav";
import { education } from "@/lib/site";

export function Education() {
  return (
    <section id="education" className="border-y border-line bg-bg-elev/40">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        <SectionHeading index={sectionIndex("education")} label="Education" title={<>Where I&apos;m learning</>} />

        <ol className="relative ml-2 border-l border-line-strong sm:ml-3">
          {education.map((e, i) => (
            <Reveal as="li" key={e.institution} delay={i * 80} className="relative pb-2 pl-8 sm:pl-12">
              <span
                className="pulse-dot absolute -left-[7px] top-8 size-3.5 rounded-full border-2 border-bg bg-accent"
                aria-hidden
              />
              <article className="card group p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="label text-accent">{e.status}</p>
                    <h3 className="mt-3 font-serif text-[clamp(1.6rem,3.4vw,2.3rem)] leading-tight text-ink">
                      {e.institution}
                      {e.short && <span className="text-ink-3"> ({e.short})</span>}
                    </h3>
                    <p className="mt-3 text-lg text-ink-2">
                      {e.degree} — <span className="text-ink">{e.field}</span>
                    </p>
                  </div>
                  <div className="text-right text-sm text-ink-3">
                    <p>{e.location}</p>
                    {e.period && <p className="mt-1 font-mono">{e.period}</p>}
                  </div>
                </div>
                {e.notes && e.notes.length > 0 && (
                  <ul className="mt-6 space-y-2 text-ink-2">
                    {e.notes.map((n) => (
                      <li key={n} className="flex gap-3">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        {n}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
