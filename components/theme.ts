export type Theme = "light" | "dark";

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // storage unavailable (private mode) — theme still applies for this visit
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

/** For useSyncExternalStore: re-render when the theme changes. */
export function subscribeTheme(cb: () => void) {
  window.addEventListener("themechange", cb);
  return () => window.removeEventListener("themechange", cb);
}

export function toggleTheme() {
  setTheme(currentTheme() === "dark" ? "light" : "dark");
}
