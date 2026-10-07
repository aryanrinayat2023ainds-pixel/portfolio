import Link from "next/link";
import { GitHubRepos } from "@/components/GitHubRepos";
import { ArrowRight, ArrowUpRight, Download, GitHub } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sectionIndex } from "@/lib/nav";
import { essayStats, projects, writing, type Project } from "@/lib/site";

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal as="li" delay={i * 70} className="h-full">
      <article className="card group flex h-full flex-col p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-line-strong sm:p-7">
        <p className="label">{String(i + 1).padStart(2, "0")} · Project</p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink">{p.name}</h3>
        <p className="mt-3 leading-relaxed text-ink-2">{p.description}</p>
        {p.problem && (
          <p className="mt-4 text-sm text-ink-2">
            <span className="text-ink">Problem — </span>
            {p.problem}
          </p>
        )}
        {p.contribution && (
          <p className="mt-2 text-sm text-ink-2">
            <span className="text-ink">My role — </span>
            {p.contribution}
          </p>
        )}
        {p.features && p.features.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-ink-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tech.map((t) => (
            <li key={t} className="rounded-md bg-accent-soft px-2 py-1 font-mono text-[0.7rem] text-ink">
              {t}
            </li>
          ))}
        </ul>
        {(p.github || p.demo) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent">
                <GitHub width={15} height={15} /> Code
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm text-accent-ink transition-transform hover:-translate-y-0.5">
                Live demo <ArrowUpRight width={15} height={15} />
              </a>
            )}
          </div>
        )}
      </article>
    </Reveal>
  );
}

function ComplaintsBars() {
  const { before, after, unit, beforeLabel, afterLabel } = essayStats.complaints;
  const rows = [
    { label: beforeLabel, value: before, current: false },
    { label: afterLabel, value: after, current: true },
  ];
  return (
    <figure>
      <figcaption className="label">Financial-fraud complaints on NCRP</figcaption>
      <dl className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[3rem_1fr] items-center gap-3">
            <dt className="font-mono text-xs text-ink-3">{r.label}</dt>
            <dd className="flex items-center gap-3">
              <span
                className={`h-2.5 rounded-r ${r.current ? "bg-accent" : "bg-line-strong"}`}
                style={{ width: `${(r.value / after) * 72}%` }}
                aria-hidden
              />
              <span className="shrink-0 text-sm text-ink tabular-nums">
                ~{r.value} {unit}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export function Work() {
  const essay = writing[0];
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading
        index={sectionIndex("work")}
        label={projects.length ? "Projects" : "Work"}
        title={
          <>
            Things I&apos;ve <span className="italic text-accent">made</span>
          </>
        }
        lead="Work I can point to: researched, written and built. New projects land here as they ship."
      />

      {projects.length > 0 && (
        <ul className="mb-16 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </ul>
      )}

      {essay && (
        <Reveal>
          <article className="card relative overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="p-6 sm:p-10 lg:col-span-7">
                <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-accent">Featured</span>
                  <span>{essay.kicker}</span>
                  <span>· {essay.readingMinutes} min read</span>
                </p>
                <h3 className="mt-5 font-serif text-[clamp(2.4rem,6vw,4rem)] leading-[0.95] text-ink">
                  <Link href={`/writing/${essay.slug}`} className="transition-colors hover:text-accent">
                    {essay.title}
                  </Link>
                </h3>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{essay.summary}</p>
                <ul className="mt-7 space-y-3">
                  {essay.takeaways.map((t, i) => (
                    <li key={t} className="flex gap-4 text-ink-2">
                      <span className="font-mono text-xs leading-7 text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href={`/writing/${essay.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
                  >
                    Read the essay
                    <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={essay.pdf}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    <Download width={16} height={16} /> PDF
                  </a>
                </div>
              </div>

              <aside
                aria-label="Figures cited in the essay"
                className="flex flex-col gap-8 border-t border-line bg-bg/60 p-6 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l"
              >
                <ComplaintsBars />
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-serif text-[2.4rem] leading-none text-ink">{essayStats.losses}</p>
                    <p className="mt-2 text-sm leading-snug text-ink-3">reported losses in 2024 — nearly 3× the year before</p>
                  </div>
                  <div>
                    <p className="font-serif text-[2.4rem] leading-none text-ink">{essayStats.digitalArrest}</p>
                    <p className="mt-2 text-sm leading-snug text-ink-3">lost to “digital arrest” scams in 2024</p>
                  </div>
                </div>
                <p className="mt-auto text-xs leading-relaxed text-ink-3">
                  Figures as cited in the essay, from the National Cyber Crime Reporting Portal and government data placed before Parliament.
                </p>
              </aside>
            </div>
          </article>
        </Reveal>
      )}

      <Reveal className="mt-16">
        <GitHubRepos />
      </Reveal>
    </section>
  );
}
