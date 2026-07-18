export type ResumeData = {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    photo: string;
  };
  objective: string;
  education: Array<{ id: string; school: string; degree: string; period: string; description: string }>;
  experience: Array<{ id: string; company: string; role: string; period: string; description: string }>;
  skills: string[];
  projects: Array<{ id: string; name: string; description: string; link: string }>;
  certifications: Array<{ id: string; name: string; issuer: string; year: string }>;
  languages: Array<{ id: string; name: string; level: string }>;
  hobbies: string[];
  references: Array<{ id: string; name: string; role: string; contact: string }>;
};

export const defaultResume: ResumeData = {
  personal: {
    fullName: "Ava Martinez",
    title: "Senior Product Designer",
    email: "ava.martinez@email.com",
    phone: "+1 (415) 555-0142",
    location: "San Francisco, CA",
    website: "avadesigns.io",
    photo: "",
  },
  objective:
    "Product designer with 7+ years crafting human-centered digital experiences for fintech and SaaS. Passionate about turning ambiguity into delightful, accessible products.",
  education: [
    {
      id: "e1",
      school: "Rhode Island School of Design",
      degree: "BFA, Graphic Design",
      period: "2014 — 2018",
      description: "Graduated with honors. Thesis on inclusive design systems.",
    },
  ],
  experience: [
    {
      id: "x1",
      company: "Nimbus Labs",
      role: "Senior Product Designer",
      period: "2021 — Present",
      description:
        "Lead designer for a 0→1 fintech app. Shipped onboarding that lifted activation by 38%. Built a scalable design system used across 4 squads.",
    },
    {
      id: "x2",
      company: "Northwind Studio",
      role: "Product Designer",
      period: "2018 — 2021",
      description:
        "Designed dashboards and growth surfaces for B2B SaaS clients. Partnered with PMs and engineers from discovery through launch.",
    },
  ],
  skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Webflow", "HTML/CSS", "Accessibility"],
  projects: [
    {
      id: "p1",
      name: "Pocket — Personal Finance App",
      description: "Reimagined budgeting for Gen Z. Featured on Product Hunt #2 of the day.",
      link: "pocket.app",
    },
  ],
  certifications: [
    { id: "c1", name: "Nielsen Norman UX Certification", issuer: "NN/g", year: "2022" },
  ],
  languages: [
    { id: "l1", name: "English", level: "Native" },
    { id: "l2", name: "Spanish", level: "Fluent" },
  ],
  hobbies: ["Pottery", "Trail running", "Film photography"],
  references: [
    { id: "r1", name: "Jordan Lee", role: "Director of Design, Nimbus Labs", contact: "jordan@nimbus.co" },
  ],
};

export const mockResumes = [
  { id: "1", title: "Senior Product Designer", template: "modern", updated: "2 hours ago", status: "Published" as const },
  { id: "2", title: "UX Lead Application", template: "minimal", updated: "Yesterday", status: "Draft" as const },
  { id: "3", title: "Freelance Portfolio Resume", template: "creative", updated: "3 days ago", status: "Published" as const },
];

export const templates = [
  { id: "modern", name: "Modern Professional", tag: "Most popular", color: "from-orange-200 to-rose-200" },
  { id: "minimal", name: "Minimal Elegant", tag: "Clean", color: "from-stone-100 to-stone-200" },
  { id: "corporate", name: "Corporate Blue", tag: "Classic", color: "from-sky-100 to-blue-200" },
  { id: "creative", name: "Creative Designer", tag: "Bold", color: "from-fuchsia-200 to-amber-200" },
  { id: "ats", name: "ATS Friendly", tag: "Recruiter approved", color: "from-emerald-100 to-teal-200" },
  { id: "classic", name: "Classic Formal", tag: "Timeless", color: "from-amber-100 to-yellow-200" },
];
