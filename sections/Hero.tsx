import { ClusterCanvas } from "@/components/ClusterCanvas";
import { ArrowRight, Download, GitHub, LinkedIn, Mail } from "@/components/Icons";
import { hero, site } from "@/lib/site";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export function Hero({ hasResume }: { hasResume: boolean }) {
  const socials = [
    { href: site.links.linkedin, label: "LinkedIn", icon: <LinkedIn /> },
    { href: site.links.github, label: "GitHub", icon: <GitHub /> },
    site.email ? { href: `mailto:${site.email}`, label: "Email", icon: <Mail /> } : null,
  ].filter((s) => s !== null);

  return (
    <section id="home" className="relative isolate overflow-x-clip pt-28 pb-20 sm:pt-36 md:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 65%)" }}
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl items-stretch gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-elev px-3.5 py-1.5 text-xs text-ink-2" style={d(0)}>
            <span className="pulse-dot inline-block size-2 rounded-full bg-accent" aria-hidden />
            Open to internships &amp; hackathon teams
          </p>

          <h1 className="rise mt-7 font-serif text-[clamp(3.1rem,10vw,6.4rem)] leading-[0.92] tracking-[-0.02em] text-ink" style={d(80)}>
            Aryan <span className="italic text-accent">Rinayat</span>
          </h1>

          <p className="rise label mt-6 leading-relaxed" style={d(160)}>
            {hero.eyebrow}
          </p>

          <p className="rise mt-6 max-w-2xl text-[clamp(1.35rem,2.6vw,1.75rem)] leading-snug text-ink" style={d(240)}>
            {hero.headline.lead} <span className="font-serif italic text-ink-2">{hero.headline.accent}</span>
          </p>

          <p className="rise mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-[1.05rem]" style={d(320)}>
            {hero.intro}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={d(400)}>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              View My Work
              <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            {hasResume && (
              <a
                href={site.resumePath}
                download="Aryan-Rinayat-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-elev px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Download width={16} height={16} /> Download Resume
              </a>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Let&apos;s Connect
            </a>
          </div>

          <ul className="rise mt-9 flex items-center gap-2" style={d(480)} aria-label="Profiles">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>

          <ul className="rise mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6" style={d(560)} aria-label="Highlights">
            {hero.highlights.map((h) => (
              <li key={h.label}>
                <span className="block font-serif text-[clamp(1.9rem,4vw,2.6rem)] leading-none text-ink">{h.value}</span>
                <span className="mt-2 block text-xs leading-snug text-ink-3">{h.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rise h-[340px] sm:h-[400px] lg:col-span-5 lg:h-auto lg:min-h-[460px]" style={d(300)}>
          <ClusterCanvas />
        </div>
      </div>
    </section>
  );
}
