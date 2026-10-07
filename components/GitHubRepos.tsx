"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { ArrowUpRight, GitHub, Star } from "./Icons";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
};

type State = { status: "loading" } | { status: "ok"; repos: Repo[] } | { status: "error" };

/** Lists public, non-fork repositories live from the GitHub API, so new work shows up without a redeploy. */
export function GitHubRepos() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    // GitHub sends cache headers, so repeat visits are served from the browser's HTTP cache.
    const load = (user: string) =>
      fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=12`, {
        headers: { Accept: "application/vnd.github+json" },
      }).then((r) => (r.ok ? (r.json() as Promise<Repo[]>) : Promise.reject(r.status)));

    // One account being unreachable shouldn't hide the other's repos.
    Promise.allSettled(site.githubUsers.map(load)).then((results) => {
      if (cancelled) return;
      const ok = results.filter((r): r is PromiseFulfilledResult<Repo[]> => r.status === "fulfilled");
      if (!ok.length) return setState({ status: "error" });
      const repos = ok
        .flatMap((r) => r.value)
        .filter((r) => !r.fork)
        .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
        .slice(0, 6);
      setState({ status: "ok", repos });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const header = (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="label">From GitHub · live</p>
        <h3 className="mt-2 text-xl font-medium text-ink">Code &amp; repositories</h3>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {site.githubUsers.map((u) => (
          <a
            key={u}
            href={`https://github.com/${u}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-accent"
          >
            <GitHub width={16} height={16} /> @{u}
            <ArrowUpRight width={14} height={14} />
          </a>
        ))}
      </div>
    </div>
  );

  if (state.status === "loading") {
    return (
      <div aria-busy="true">
        {header}
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="card h-32 animate-pulse opacity-60" />
          ))}
        </div>
      </div>
    );
  }

  if (state.status === "error" || state.repos.length === 0) {
    return (
      <div>
        {header}
        <div className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-ink-2">
            {state.status === "error"
              ? "GitHub couldn't be reached just now. You can browse the profile directly."
              : "Public repositories will appear here automatically as they're published."}
          </p>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <GitHub width={16} height={16} /> Follow on GitHub
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {header}
      <ul className="grid gap-4 sm:grid-cols-2">
        {state.repos.map((r) => (
          <li key={r.id} className="card group relative flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-mono text-[0.95rem] text-ink">
                <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                  {r.name}
                </a>
              </h4>
              <ArrowUpRight className="shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
            </div>
            {r.description && <p className="mt-2 line-clamp-2 text-sm text-ink-2">{r.description}</p>}
            <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-ink-3">
              {r.language && <span>{r.language}</span>}
              {r.stargazers_count > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star width={12} height={12} /> {r.stargazers_count}
                </span>
              )}
              <span>Updated {new Date(r.pushed_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
