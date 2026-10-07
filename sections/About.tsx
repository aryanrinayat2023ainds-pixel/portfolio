import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sectionIndex } from "@/lib/nav";
import { about } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading
        index={sectionIndex("about")}
        label="About"
        title={
          <>
            Models, data, <span className="italic text-ink-2">and the humans in the loop.</span>
          </>
        }
      />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="text-lg leading-relaxed text-ink-2">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="lg:col-span-5" delay={120}>
          <div className="card p-6 sm:p-7">
            <p className="label">At a glance</p>
            <dl className="mt-4 divide-y divide-line">
              {about.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5 text-sm">
                  <dt className="text-ink-3">{f.label}</dt>
                  <dd className="text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="label mt-7">Interested in</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {about.interests.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-2">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
