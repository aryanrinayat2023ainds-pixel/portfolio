import { site } from "@/lib/site";
import { GitHub, LinkedIn } from "./Icons";
import { Logo } from "./Logo";

// Evaluated once at build time; the site is rebuilt on every deploy.
const year = new Date().getFullYear();

export function Footer({ base = "" }: { base?: string }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-ink-3">
            © {year} {site.name}. Designed &amp; built in Pune.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full text-ink-3 transition-colors hover:text-accent">
            <LinkedIn />
          </a>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-full text-ink-3 transition-colors hover:text-accent">
            <GitHub />
          </a>
          <a href={`${base}#home`} className="ml-2 rounded-full border border-line px-4 py-2 text-sm text-ink-2 transition-colors hover:border-accent hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
