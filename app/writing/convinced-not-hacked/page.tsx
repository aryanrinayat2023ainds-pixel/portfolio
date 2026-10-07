import type { Metadata } from "next";
import Link from "next/link";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowLeft, Download, LinkedIn } from "@/components/Icons";
import { ScrollProgress } from "@/components/ScrollProgress";
import { convincedNotHacked } from "@/lib/essays/convinced-not-hacked";
import { hasResume } from "@/lib/resume";
import { site, writing } from "@/lib/site";

const essay = writing.find((w) => w.slug === "convinced-not-hacked")!;

export const metadata: Metadata = {
  title: essay.title,
  description: essay.summary,
  alternates: { canonical: `/writing/${essay.slug}` },
  openGraph: {
    type: "article",
    url: `/writing/${essay.slug}`,
    title: `${essay.title} — ${site.name}`,
    description: essay.summary,
    authors: [site.name],
  },
  twitter: { card: "summary_large_image", title: `${essay.title} — ${site.name}`, description: essay.summary },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: essay.title,
  description: essay.summary,
  author: { "@type": "Person", name: site.name, url: site.url },
  url: `${site.url}/writing/${essay.slug}`,
};

export default function EssayPage() {
  return (
    <>
      <ScrollProgress />
      <Header base="/" />
      <main id="main" className="px-4 pt-28 pb-24 sm:px-6 sm:pt-36">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <article className="mx-auto max-w-[44rem]">
          <Link href="/#work" className="rise inline-flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-accent">
            <ArrowLeft width={16} height={16} /> Back to portfolio
          </Link>

          <header className="mt-10 border-b border-line pb-10">
            <p className="rise label" style={{ "--delay": "60ms" } as React.CSSProperties}>
              {essay.kicker} · {essay.readingMinutes} min read
            </p>
            <h1
              className="rise mt-5 font-serif text-[clamp(3rem,10vw,5.5rem)] leading-[0.92] tracking-[-0.02em] text-ink"
              style={{ "--delay": "120ms" } as React.CSSProperties}
            >
              Convinced, <span className="italic text-accent">Not Hacked</span>
            </h1>
            <p className="rise mt-6 text-lg leading-relaxed text-ink-2" style={{ "--delay": "180ms" } as React.CSSProperties}>
              {essay.summary}
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" style={{ "--delay": "240ms" } as React.CSSProperties}>
              <span className="text-ink">
                {site.name}
                <span className="text-ink-3"> · Third year, AI &amp; Data Science, MMCOE Pune</span>
              </span>
              <a href={essay.pdf} download className="inline-flex items-center gap-2 text-accent underline-offset-4 hover:underline">
                <Download width={15} height={15} /> Download PDF
              </a>
            </div>
          </header>

          <div className="prose-essay">
            {convincedNotHacked.map((b, i) =>
              b.type === "h2" ? <h2 key={i}>{b.text}</h2> : <p key={i}>{b.text}</p>,
            )}
          </div>

          <aside className="card mt-16 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="label">Written by</p>
              <p className="mt-2 font-serif text-2xl text-ink">{site.name}</p>
              <p className="mt-1 text-sm text-ink-3">AI &amp; Data Science student at MMCOE, Pune</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedIn width={15} height={15} /> LinkedIn
              </a>
              <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm text-accent-ink">
                Get in touch
              </Link>
            </div>
          </aside>
        </article>
      </main>
      <Footer base="/" />
      <CommandPalette base="/" hasResume={hasResume} />
    </>
  );
}
