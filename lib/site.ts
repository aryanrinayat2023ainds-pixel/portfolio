/**
 * All portfolio content lives here. Edit this file to update the site.
 *
 * Rule of thumb: only add things that are true and verifiable.
 * Any list left empty hides its section (and its nav link) automatically.
 */

export const site = {
  name: "Aryan Rinayat",
  shortName: "Aryan",
  initials: "AR",
  role: "AI & Data Science Student",
  title: "Aryan Rinayat — AI & Data Science Student, MMCOE Pune",
  description:
    "Aryan Rinayat is a third-year Artificial Intelligence & Data Science engineering student at Marathwada Mitra Mandal College of Engineering (MMCOE), Pune, open to internships in AI, data science and software development.",
  location: "Pune, India",
  // Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aryan-rinayat.vercel.app",

  // Shown on the site and used by the contact form (FormSubmit sends messages here).
  email: "aryanrinayat2023.ainds@mmcoe.edu.in",

  links: {
    linkedin: "https://www.linkedin.com/in/aryanrinayat/",
    github: "https://github.com/aryanrinayat2023ainds-pixel",
  },
  githubUser: "aryanrinayat2023ainds-pixel",

  // Drop a file at public/resume.pdf and the "Download Resume" button appears automatically.
  resumePath: "/resume.pdf",
} as const;

export const hero = {
  eyebrow: "Third-year · AI & Data Science · MMCOE Pune",
  // Rendered as: lead + <em>accent</em>
  headline: { lead: "Learning to build intelligent systems —", accent: "and to understand the people who use them." },
  intro:
    "I'm Aryan, an engineering student in Artificial Intelligence & Data Science at Marathwada Mitra Mandal College of Engineering, Pune. I'm interested in machine learning, working with real data, and the human side of technology — where most systems actually fail. I'm looking for internships where I can learn by building alongside people who ship.",
};

export const about = {
  paragraphs: [
    "I'm in the third year of a Bachelor of Engineering in Artificial Intelligence & Data Science at MMCOE, Pune, a programme that sits where programming, statistics and machine learning meet. I like that mix: the maths tells you what a model can do, and the data tells you whether it should.",
    "That question pulled me toward fraud and trust. In “Convinced, Not Hacked”, I looked at why India's online financial fraud keeps growing even as security improves, and found that the weak point is rarely the device; it's a person under pressure. AI sits on both sides of that story: it powers voice clones and personalised scam messages, and it also powers the transaction-pattern analysis that catches mule accounts before money disappears.",
    "Right now I'm focused on getting better at turning ideas into working software and data projects, and I'm looking for internships and hackathons where I can contribute, get feedback, and learn quickly.",
  ],
  facts: [
    { label: "Studying", value: "B.E. Artificial Intelligence & Data Science" },
    { label: "College", value: "MMCOE, Pune" },
    { label: "Year", value: "Third year" },
    { label: "Based in", value: "Pune, India" },
    { label: "Student body", value: "AESA, MMCOE — Marketing (2024–25)" },
    { label: "Open to", value: "Internships · Hackathons · Collaborations" },
  ],
  interests: [
    "Machine learning",
    "Data science",
    "AI for fraud detection",
    "Social engineering & human factors",
    "Digital payments & trust",
    "Technical writing",
  ],
};

export type EducationItem = {
  institution: string;
  short?: string;
  degree: string;
  field: string;
  status: string;
  location: string;
  period?: string; // add "2023 – 2027" style dates once confirmed
  notes?: string[];
};

export const education: EducationItem[] = [
  {
    institution: "Marathwada Mitra Mandal College of Engineering",
    short: "MMCOE",
    degree: "Bachelor of Engineering",
    field: "Artificial Intelligence & Data Science",
    status: "Third year · In progress",
    location: "Pune, Maharashtra",
  },
];

export type Writing = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  pdf: string;
  readingMinutes: number;
  takeaways: string[];
};

export const writing: Writing[] = [
  {
    slug: "convinced-not-hacked",
    title: "Convinced, Not Hacked",
    kicker: "Essay · Online financial fraud in India",
    summary:
      "An essay on why most online financial fraud in India succeeds without breaking any system, how generative AI raises the stakes on both sides, and why prevention should be treated as a design problem in human decision-making.",
    pdf: "/writing/convinced-not-hacked-aryan-rinayat.pdf",
    readingMinutes: 7,
    takeaways: [
      "Victims are usually out-reasoned, not out-hacked: scripts exploit authority, scarcity and fear.",
      "Generative AI multiplies attackers' reach — and powers the pattern analysis that flags mule accounts.",
      "Deliberate friction, like cooling-off windows on unusual transfers, is a feature, not a failure.",
    ],
  },
];

/** Figures cited in the essay (source: National Cyber Crime Reporting Portal / government data in Parliament). */
export const essayStats = {
  complaints: { before: 24, after: 36, unit: "lakh", beforeLabel: "2023", afterLabel: "2024" },
  losses: "₹22,845 cr",
  digitalArrest: "₹1,935 cr",
};

export type Project = {
  name: string;
  description: string;
  problem?: string;
  contribution?: string;
  features?: string[];
  tech: string[];
  github?: string;
  demo?: string;
  tags?: string[];
};

/** Add real projects here. Leave empty to hide the section. */
export const projects: Project[] = [];

export type Experience = {
  organization: string;
  role: string;
  period: string;
  location?: string;
  points: string[];
  skills?: string[];
};

/** Internships, volunteering, clubs, leadership. Leave empty to hide the section. */
export const experience: Experience[] = [
  {
    // Source: https://mmcoe.edu.in/departments/ai-ds/professional-associations/students-association/
    organization: "AESA — AI & Data Science Engineering Student Association, MMCOE",
    role: "Marketing, Activity Planner Committee",
    period: "2024 – 25 · Second year",
    location: "Pune",
    points: [
      "Served in the Marketing role on AESA's Activity Planner committee — the department association that brings AI & DS students together through workshops, hackathons and industry exposure.",
      "Responsible for marketing the committee's events to fellow students.",
    ],
    skills: ["Event marketing", "Teamwork", "Student leadership"],
  },
];

export type Achievement = {
  title: string;
  issuer: string;
  date?: string;
  kind: "Certification" | "Hackathon" | "Award" | "Competition" | "Leadership" | "Publication";
  url?: string;
};

/** Certifications, hackathons, awards. Leave empty to hide the section. */
export const achievements: Achievement[] = [];

export type SkillGroup = { group: string; items: string[] };

/** Only list skills you can talk about in an interview. Leave empty to hide the section. */
export const skills: SkillGroup[] = [];
