import { ContactForm } from "@/components/ContactForm";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { sectionIndex } from "@/lib/nav";
import { site } from "@/lib/site";

export function Contact() {
  const channels = [
    site.email ? { href: `mailto:${site.email}`, label: "Email", value: site.email, icon: <Mail /> } : null,
    { href: site.links.linkedin, label: "LinkedIn", value: "in/aryanrinayat", icon: <LinkedIn /> },
    { href: site.links.github, label: "GitHub", value: `@${site.githubUser}`, icon: <GitHub /> },
  ].filter((c) => c !== null);

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line">
      <div
        className="pointer-events-none absolute bottom-[-30%] left-[-10%] -z-10 h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 65%)" }}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        <SectionHeading
          index={sectionIndex("contact")}
          label="Contact"
          title={
            <>
              Let&apos;s build something <span className="italic text-accent">together.</span>
            </>
          }
          lead="Internship openings, project ideas, hackathon teams, or a question about something I wrote — I read every message."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ul className="space-y-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="card group flex items-center gap-4 p-4 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent sm:p-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">{c.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="label block">{c.label}</span>
                      <span className="mt-0.5 block truncate text-ink">{c.value}</span>
                    </span>
                    <ArrowUpRight className="shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-3">Based in {site.location}.</p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            {site.email ? (
              <ContactForm />
            ) : (
              <div className="card p-8 text-ink-2">The quickest way to reach me is a message on LinkedIn.</div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
