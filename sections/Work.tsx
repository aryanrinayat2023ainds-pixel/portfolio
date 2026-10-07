import Image from "next/image";
import Link from "next/link";
import { GitHubRepos } from "@/components/GitHubRepos";
import { ArrowRight, ArrowUpRight, Download, GitHub, Play } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sectionIndex } from "@/lib/nav";
import { essayStats, projects, writing, type Project } from "@/lib/site";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function PipelineFlow({ steps }: { steps: string[] }) {
  return (
    <figure>
      <figcaption className="label">How it flows</figcaption>
      <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            <span
              className={`rounded-full border px-2.5 py-1 ${
                i === 0 ? "border-accent bg-accent-soft text-ink" : "border-line-strong text-ink-2"
              }`}
            >
              <span className="mr-1.5 font-mono text-[0.65rem] text-ink-3">{i}</span>
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="text-ink-3" aria-hidden>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function ProjectCard({ p, i, featured, wide }: { p: Project; i: number; featured: boolean; wide: boolean }) {
  const links = (
    <div className="flex flex-wrap gap-2">
      {p.demo && (
        <a href={p.demo} {...ext} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5">
          Live demo <ArrowUpRight width={15} height={15} />
        </a>
      )}
      {p.video && (
        <a href={p.video} {...ext} className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent">
          <Play width={14} height={14} /> Watch video
        </a>
      )}
      {p.github && (
        <a href={p.github} {...ext} className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent">
          <GitHub width={15} height={15} /> Code
        </a>
      )}
    </div>
  );

  const techList = (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {p.tech.map((t) => (
        <li key={t} className="rounded-md bg-accent-soft px-2 py-1 font-mono text-[0.7rem] text-ink">
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <Reveal as="li" delay={i * 70} className={`h-full ${featured || wide ? "md:col-span-2" : ""}`}>
      <article className="card group h-full overflow-hidden transition-[border-color] duration-300 hover:border-line-strong">
        <div className={featured || (wide && p.image) ? "grid lg:grid-cols-12" : "flex h-full flex-col"}>
          {!featured && p.image && (
            <figure className={`relative overflow-hidden border-line bg-bg ${wide ? "aspect-[4/3] border-b lg:order-2 lg:col-span-5 lg:aspect-auto lg:border-b-0 lg:border-l" : "aspect-[16/10] border-b"}`}>
              <Image
                src={p.image.src}
                alt={p.image.alt}
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </figure>
          )}
          <div className={`p-6 sm:p-9 ${featured ? "lg:col-span-7" : wide && p.image ? "flex flex-col lg:col-span-7" : "flex flex-1 flex-col"}`}>
            <p className="label flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-accent">{featured ? "Featured project" : `Project ${String(i + 1).padStart(2, "0")}`}</span>
              {p.context && <span>{p.context}</span>}
            </p>
            <h3 className={`mt-4 font-serif leading-[0.95] text-ink ${featured ? "text-[clamp(2.4rem,6vw,4rem)]" : "text-3xl"}`}>{p.name}</h3>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{p.description}</p>

            {p.problem && (
              <div className="mt-6 border-l-2 border-line-strong pl-4">
                <p className="label">The problem</p>
                <p className="mt-1.5 leading-relaxed text-ink-2">{p.problem}</p>
              </div>
            )}
            {p.contribution && (
              <div className="mt-4 border-l-2 border-accent pl-4">
                <p className="label text-accent">{p.team ? "How we built it" : "What I built"}</p>
                <p className="mt-1.5 leading-relaxed text-ink">{p.contribution}</p>
              </div>
            )}
            {!featured && <div className="mt-6">{techList}</div>}
            <div className={featured ? "mt-8" : "mt-auto pt-6"}>{links}</div>
          </div>

          {featured && (
            <aside className="flex flex-col gap-8 border-t border-line bg-bg/60 p-6 sm:p-9 lg:col-span-5 lg:border-t-0 lg:border-l">
              {p.pipeline && <PipelineFlow steps={p.pipeline} />}
              {p.features && p.features.length > 0 && (
                <div>
                  <p className="label">Key features</p>
                  <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="label mb-3">Stack</p>
                {techList}
              </div>
            </aside>
          )}
        </div>
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
            <ProjectCard key={p.name} p={p} i={i} featured={i === 0}
              // after the featured card, a trailing project with no partner spans the full row
              wide={i > 0 && i === projects.length - 1 && (projects.length - 1) % 2 === 1}
            />
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
