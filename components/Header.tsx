"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { navItems } from "@/lib/nav";
import { Logo } from "./Logo";
import { Close, Menu, Moon, Search, Sun } from "./Icons";
import { currentTheme, subscribeTheme, toggleTheme, type Theme } from "./theme";

const noopSubscribe = () => () => {};

/** `base` is "" on the home page and "/" elsewhere, so anchors resolve to the home sections. */
export function Header({ base = "" }: { base?: string }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useSyncExternalStore<Theme>(subscribeTheme, currentTheme, () => "dark");
  const shortcut = useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K"),
    () => "Ctrl K",
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: whichever section crosses a line ~35% down the viewport.
  useEffect(() => {
    if (base) return;
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [base]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const openPalette = () => window.dispatchEvent(new Event("open-palette"));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "glass border-b border-line" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`${base}#home`} aria-label="Aryan Rinayat — home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`${base}#${n.id}`}
                aria-current={!base && active === n.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  !base && active === n.id ? "text-ink" : "text-ink-3 hover:text-ink"
                }`}
              >
                {!base && active === n.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-accent-soft" aria-hidden />
                )}
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-ink-3 transition-colors hover:border-line-strong hover:text-ink sm:inline-flex"
            aria-label="Open command menu"
          >
            <Search width={14} height={14} />
            <kbd className="font-mono">{shortcut}</kbd>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-10 place-items-center rounded-full text-ink-2 transition-colors hover:bg-accent-soft hover:text-ink"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-accent-soft lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-bg border-t border-line px-4 pb-10 pt-6 sm:px-6 lg:hidden"
      >
        <ul className="mx-auto max-w-6xl">
          {navItems.map((n, i) => (
            <li key={n.id} className="rise" style={{ "--delay": `${i * 40}ms` } as React.CSSProperties}>
              <a
                href={`${base}#${n.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-line py-4 font-serif text-3xl text-ink"
              >
                {n.label}
                <span className="label">{String(i).padStart(2, "0")}</span>
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            openPalette();
          }}
          className="mt-8 inline-flex items-center gap-2 text-sm text-ink-3"
        >
          <Search width={14} height={14} /> Quick actions
        </button>
      </div>
    </header>
  );
}
