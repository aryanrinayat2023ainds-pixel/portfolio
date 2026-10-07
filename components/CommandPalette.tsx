"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { navItems } from "@/lib/nav";
import { site, writing } from "@/lib/site";
import { ArrowRight, Copy, Download, FileText, GitHub, LinkedIn, Moon, Search } from "./Icons";
import { toggleTheme } from "./theme";

type Action = { id: string; label: string; hint: string; icon: ReactNode; run: () => void };

export function CommandPalette({ base = "", hasResume }: { base?: string; hasResume: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);

  const actions = useMemo<Action[]>(() => {
    const go = (id: string) => () => {
      if (base) router.push(`/#${id}`);
      else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    const external = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    const list: Action[] = navItems.map((n) => ({
      id: `go-${n.id}`,
      label: `Go to ${n.label}`,
      hint: "Section",
      icon: <ArrowRight width={16} height={16} />,
      run: go(n.id),
    }));
    for (const w of writing) {
      list.push({
        id: `read-${w.slug}`,
        label: `Read “${w.title}”`,
        hint: "Essay",
        icon: <FileText width={16} height={16} />,
        run: () => router.push(`/writing/${w.slug}`),
      });
    }
    if (hasResume) {
      list.push({
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        icon: <Download width={16} height={16} />,
        run: external(site.resumePath),
      });
    }
    if (site.email) {
      list.push({
        id: "copy-email",
        label: "Copy email address",
        hint: site.email,
        icon: <Copy width={16} height={16} />,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => setToast("Email copied"),
            () => setToast(site.email),
          );
        },
      });
    }
    list.push(
      { id: "linkedin", label: "Open LinkedIn", hint: "External", icon: <LinkedIn width={16} height={16} />, run: external(site.links.linkedin) },
      { id: "github", label: "Open GitHub", hint: "External", icon: <GitHub width={16} height={16} />, run: external(site.links.github) },
      { id: "theme", label: "Toggle light / dark theme", hint: "Appearance", icon: <Moon width={16} height={16} />, run: toggleTheme },
    );
    return list;
  }, [base, hasResume, router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? actions.filter((a) => `${a.label} ${a.hint}`.toLowerCase().includes(q)) : actions;
  }, [actions, query]);

  useEffect(() => {
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setIndex(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) setOpen(false);
        else show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    openRef.current = open;
    if (open) requestAnimationFrame(() => input.current?.focus());
    else returnFocus.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (a: Action | undefined) => {
    if (!a) return;
    setOpen(false);
    a.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[index]);
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]" onKeyDown={onKeyDown}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="rise card relative w-full max-w-lg overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="text-ink-3" />
              <input
                ref={input}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder="Jump to a section or run an action…"
                className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[index] ? `pal-${results[index].id}` : undefined}
              />
              <kbd className="label rounded border border-line px-1.5 py-0.5">Esc</kbd>
            </div>
            <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-3">No matches</li>}
              {results.map((a, i) => (
                <li
                  key={a.id}
                  id={`pal-${a.id}`}
                  role="option"
                  aria-selected={i === index}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => run(a)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                    i === index ? "bg-accent-soft text-ink" : "text-ink-2"
                  }`}
                >
                  <span className={i === index ? "text-accent" : "text-ink-3"}>{a.icon}</span>
                  <span className="flex-1 truncate">{a.label}</span>
                  <span className="label truncate normal-case tracking-normal">{a.hint}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-bg transition-opacity ${
          toast ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {toast}
      </div>
    </>
  );
}
