import { ArrowUpRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sectionIndex } from "@/lib/nav";
import { achievements, experience, skills } from "@/lib/site";

/** Each of these renders nothing until its list in lib/site.ts has entries. */

export function Skills() {
  if (!skills.length) return null;
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading index={sectionIndex("skills")} label="Skills" title={<>Tools I work with</>} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 60} className="card p-6">
            <h3 className="label text-accent">{g.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="rounded-lg border border-line bg-bg px-3 py-1.5 text-sm text-ink">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  if (!experience.length) return null;
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading index={sectionIndex("experience")} label="Experience" title={<>Where I&apos;ve contributed</>} />
      <ol className="relative ml-2 space-y-8 border-l border-line-strong sm:ml-3">
        {experience.map((x, i) => (
          <Reveal as="li" key={`${x.organization}-${x.role}`} delay={i * 70} className="relative pl-8 sm:pl-12">
            <span className="absolute -left-[6px] top-7 size-3 rounded-full border-2 border-bg bg-accent" aria-hidden />
            <article className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-medium text-ink">
                  {x.role} <span className="text-ink-3">· {x.organization}</span>
                </h3>
                <p className="font-mono text-xs text-ink-3">
                  {x.period}
                  {x.location && ` · ${x.location}`}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-ink-2">
                {x.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              {x.skills && (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {x.skills.map((s) => (
                    <li key={s} className="rounded-md bg-accent-soft px-2 py-1 font-mono text-[0.7rem] text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Achievements() {
  if (!achievements.length) return null;
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading index={sectionIndex("achievements")} label="Achievements" title={<>Certifications &amp; recognition</>} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 60}>
            <article className="card group relative flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1">
              <p className="label text-accent">{a.kind}</p>
              <h3 className="mt-3 text-lg font-medium text-ink">
                {a.url ? (
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                    {a.title}
                  </a>
                ) : (
                  a.title
                )}
              </h3>
              <p className="mt-auto flex items-center justify-between pt-4 text-sm text-ink-3">
                <span>
                  {a.issuer}
                  {a.date && ` · ${a.date}`}
                </span>
                {a.url && <ArrowUpRight className="text-ink-3 group-hover:text-accent" />}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
