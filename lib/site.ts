/**
 * All portfolio content lives here. Edit this file to update the site.
 *
 * Rule of thumb: only add things that are true and verifiable.
 * Any list left empty hides its section (and its nav link) automatically.
 *
 * Sources used so far: Aryan's resume, Techkisan internship certificate (06 Jan 2026),
 * SIH 2026 deck + public Sahyog repo, MMCOE's AESA page, and the essay PDF.
 */

export const site = {
  name: "Aryan Rinayat",
  shortName: "Aryan",
  initials: "AR",
  role: "AI & Data Science Student",
  title: "Aryan Rinayat — AI & Data Science Student, MMCOE Pune",
  description:
    "Aryan Rinayat is a third-year AI & Data Science student at MMCOE, Pune. He built the backend of Sahyog, a multilingual voice-first civic platform for Smart India Hackathon 2026, and completed a 6-month AI & Data Science internship at Techkisan Automation.",
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
  headline: { lead: "Building AI systems for real people —", accent: "in the languages they actually speak." },
  intro:
    "I'm Aryan, a third-year Artificial Intelligence & Data Science student at MMCOE, Pune. For Smart India Hackathon 2026 I built the backend of Sahyog, a voice-first platform that turns citizens' spoken complaints into routed, trackable tickets. I've also completed a six-month AI & Data Science internship at Techkisan Automation, and I'm looking for internships in data analytics, machine learning and AI.",
  highlights: [
    { value: "9", label: "backend services built for Sahyog" },
    { value: "6 mo", label: "AI & Data Science internship" },
    { value: "8", label: "languages with speech or translation support in Sahyog" },
  ],
};

export const about = {
  paragraphs: [
    "I'm studying for a Bachelor of Engineering in Artificial Intelligence & Data Science at MMCOE, Pune (Savitribai Phule Pune University), graduating in 2028. The parts of the degree I enjoy most are the practical ones: data analytics, machine learning, and getting AI to do something useful outside a notebook.",
    "My biggest build so far is Sahyog, our Smart India Hackathon 2026 entry with team Toofan+. Rural citizens in Jharkhand struggle to report civic problems — low literacy gets in the way, complaints get lost, and real ones rarely reach anyone who can fix the root cause. I built the backend: a pipeline of nine Python services that takes a voice, text or photo report in a local language, structures it with an LLM, filters spam and duplicates, and routes it either to the right government department or to a university as a research problem. One principle runs through it: AI assists, humans decide.",
    "Before that, a six-month internship at Techkisan Automation introduced me to AI and automation inside a working firm, where I helped with documentation and collaborated on projects. I also write — “Convinced, Not Hacked” looks at why online financial fraud in India succeeds by manipulating people rather than breaking systems.",
    "Outside the classroom I've worked on AESA's Activity Planner committee, coordinated HR at Forengers Foundation, led design for the MicDrop Club and volunteered with NSS. I'm looking for internships and hackathon teams where I can keep building.",
  ],
  facts: [
    { label: "Studying", value: "B.E. Artificial Intelligence & Data Science" },
    { label: "College", value: "MMCOE, Pune · SPPU" },
    { label: "Graduating", value: "2028 (expected)" },
    { label: "Based in", value: "Pune, India" },
    { label: "Languages", value: "English · Hindi · Marathi" },
    { label: "Open to", value: "Internships · Hackathons · Collaborations" },
  ],
  interests: [
    "Machine learning",
    "Data analytics",
    "Speech & language AI",
    "Civic tech",
    "AI for fraud detection",
    "Human-in-the-loop systems",
  ],
};

export type EducationItem = {
  institution: string;
  short?: string;
  degree: string;
  field: string;
  status: string;
  location: string;
  period?: string;
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
    period: "Expected 2028",
    notes: [
      "Affiliated to Savitribai Phule Pune University (SPPU)",
      "AESA (AI & DS Engineering Student Association) — Activity Planner committee, Marketing, 2024–25",
      "Smart India Hackathon 2026 — team Toofan+, problem statement 26043",
    ],
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
  /** Short line shown above the title, e.g. the event. */
  context?: string;
  description: string;
  problem?: string;
  contribution?: string;
  /** Optional ordered stages, drawn as a small flow diagram. */
  pipeline?: string[];
  features?: string[];
  tech: string[];
  github?: string;
  demo?: string;
  video?: string;
};

export const projects: Project[] = [
  {
    name: "Sahyog — सहयोग",
    context: "Smart India Hackathon 2026 · Team Toofan+ · Smart Education · PS 26043",
    description:
      "A voice-first civic grievance platform for Jharkhand. Citizens report a problem by voice, text or photo in their own language; a nine-service pipeline turns it into either a routed, tracked civic ticket or a university research project when the problem needs deeper work.",
    problem:
      "Rural citizens can't reliably report civic problems — low literacy limits reporting, complaints get lost or faked, and real ones rarely reach the people who can fix the root cause.",
    contribution:
      "Built the backend pipeline: the nine Python/FastAPI services, Docker and object-storage setup, the self-hosted Santali voice service, and the “Ask Sahyog” RAG Q&A.",
    pipeline: ["Voice / text / photo", "Language", "Evidence", "Triage", "Civic fix or research", "Partners", "Lifecycle", "Transparency"],
    features: [
      "Speech-to-text, translation and spoken replies through Bhashini for Hindi, Bengali, Odia and English",
      "Santali support with self-hosted open models — Meta MMS, NLLB-200 and Indic Parler-TTS",
      "LLM structuring with spam, duplicate and priority checks, plus a human validation gate before any ticket ships",
      "“Ask Sahyog”: retrieval-augmented Q&A so citizens can ask how the system works or whether their issue is already tracked",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "PostGIS", "pgvector", "Ollama", "faster-whisper", "Bhashini", "MinIO", "Docker", "Next.js", "Tailwind CSS", "OpenStreetMap", "pytest"],
    github: "https://github.com/omdchoudhari33-beep/Sahyog_SIH-2026",
    demo: "https://prismatic-chebakia-3bfad9.netlify.app/",
    video: "https://youtu.be/KHkfO09CqQo",
  },
];

export type Experience = {
  organization: string;
  role: string;
  period?: string;
  location?: string;
  points?: string[];
  skills?: string[];
  /** Link to a certificate or source that backs this entry. */
  proof?: { label: string; href: string };
  kind: "work" | "leadership";
};

export const experience: Experience[] = [
  {
    kind: "work",
    organization: "Techkisan Automation, Gondia",
    role: "AI & Data Science Intern",
    period: "6 months · completed Jan 2026",
    location: "Hybrid",
    points: [
      "Learned AI and automation concepts under the guidance of the firm's senior executives.",
      "Assisted with documentation and collaborated with the team on projects.",
      "Described in the completion certificate as “diligent, hardworking and inquisitive”.",
    ],
    skills: ["AI fundamentals", "Automation", "Documentation", "Teamwork"],
    proof: { label: "Internship certificate", href: "/certificates/techkisan-internship-certificate.pdf" },
  },
  {
    kind: "leadership",
    // Source: https://mmcoe.edu.in/departments/ai-ds/professional-associations/students-association/
    organization: "AESA, MMCOE",
    role: "Marketing — Activity Planner Committee",
    period: "2024–25",
    points: ["Marketed events for the AI & DS student association, which runs workshops, hackathons and industry-exposure sessions."],
    proof: {
      label: "Listed on MMCOE's site",
      href: "https://mmcoe.edu.in/departments/ai-ds/professional-associations/students-association/",
    },
  },
  { kind: "leadership", organization: "Forengers Foundation", role: "HR Coordinator" },
  { kind: "leadership", organization: "MicDrop Club", role: "Design Head" },
  { kind: "leadership", organization: "National Service Scheme (NSS)", role: "Volunteer" },
];

export type Achievement = {
  title: string;
  issuer: string;
  date?: string;
  kind: "Certification" | "Hackathon" | "Award" | "Competition" | "Leadership" | "Publication";
  url?: string;
};

export const achievements: Achievement[] = [
  {
    kind: "Hackathon",
    title: "Smart India Hackathon 2026 — Sahyog",
    issuer: "Team Toofan+ · PS 26043, Smart Education",
    date: "2026",
    url: "https://youtu.be/KHkfO09CqQo",
  },
  {
    kind: "Certification",
    title: "AI & Data Science Internship (6 months)",
    issuer: "Techkisan Automation",
    date: "Jan 2026",
    url: "/certificates/techkisan-internship-certificate.pdf",
  },
  { kind: "Certification", title: "NSS Participation Certificate", issuer: "National Service Scheme" },
  { kind: "Publication", title: "Convinced, Not Hacked", issuer: "Essay on online financial fraud in India", url: "/writing/convinced-not-hacked" },
];

export type SkillGroup = { group: string; items: string[] };

/** From the resume, plus the stack used in Sahyog. */
export const skills: SkillGroup[] = [
  { group: "Programming & data", items: ["Python", "SQL", "Data analysis", "Microsoft Excel"] },
  { group: "AI & ML", items: ["Machine learning fundamentals", "LLMs with Ollama", "RAG", "Speech-to-text (faster-whisper)", "Bhashini APIs"] },
  { group: "Backend & data stores", items: ["FastAPI", "PostgreSQL", "PostGIS", "pgvector", "MinIO", "Docker"] },
  { group: "Web & tools", items: ["Next.js", "Tailwind CSS", "Git & GitHub", "pytest"] },
  { group: "Working style", items: ["Communication", "Leadership", "Teamwork", "Time management", "Adaptability"] },
  { group: "Languages", items: ["English", "Hindi", "Marathi"] },
];
