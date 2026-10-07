import { achievements, experience, projects, skills } from "./site";

export type NavItem = { id: string; label: string };

/** Sections without content are dropped, so the nav never points at an empty section. */
export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  skills.length ? { id: "skills", label: "Skills" } : null,
  { id: "work", label: projects.length ? "Projects" : "Work" },
  experience.length ? { id: "experience", label: "Experience" } : null,
  achievements.length ? { id: "achievements", label: "Achievements" } : null,
  { id: "contact", label: "Contact" },
].filter((x): x is NavItem => x !== null);

/** Two-digit index of a section in the nav (Home is 00), so numbering stays consecutive. */
export const sectionIndex = (id: string) => String(navItems.findIndex((n) => n.id === id)).padStart(2, "0");
