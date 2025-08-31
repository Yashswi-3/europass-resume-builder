export type Personal = {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  summary: string
  photoUrl?: string
}

export type WorkEntry = {
  id: string
  role: string
  employer: string
  city: string
  country: string
  start: string // YYYY or YYYY-MM
  end: string // YYYY or YYYY-MM or empty for current
  current: boolean
  description: string
}

export type EducationEntry = {
  id: string
  program: string
  institution: string
  city: string
  country: string
  start: string
  end: string
  description: string
}

export type SkillEntry = { id: string; name: string; level: number } // 1..5
export type LanguageEntry = { id: string; name: string; cefr: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" }
export type LinkEntry = { id: string; label: string; url: string }

export type ResumeData = {
  personal: Personal
  work: WorkEntry[]
  education: EducationEntry[]
  skills: SkillEntry[]
  languages: LanguageEntry[]
  links: LinkEntry[]
}

export const defaultResume: ResumeData = {
  personal: {
    firstName: "Alex",
    lastName: "Doe",
    title: "Product Designer",
    email: "alex.doe@example.com",
    phone: "+1 555 123 4567",
    address: "123 Main St",
    city: "Berlin",
    country: "Germany",
    summary:
      "User-centered designer with 6+ years of experience in multi-platform products. Passionate about accessibility and elegant systems.",
    photoUrl: "",
  },
  work: [
    {
      id: "w1",
      role: "Senior Product Designer",
      employer: "Acme Inc.",
      city: "Berlin",
      country: "Germany",
      start: "2022-02",
      end: "",
      current: true,
      description:
        "Lead end-to-end product design for a B2B analytics platform. Collaborated with PM and Eng, grew adoption by 35%.",
    },
    {
      id: "w2",
      role: "Product Designer",
      employer: "Globex",
      city: "Munich",
      country: "Germany",
      start: "2019-01",
      end: "2022-01",
      current: false,
      description: "Owned mobile design system, improved task success rate by 20%.",
    },
  ],
  education: [
    {
      id: "e1",
      program: "B.Sc. Human-Computer Interaction",
      institution: "Technical University",
      city: "Munich",
      country: "Germany",
      start: "2014",
      end: "2018",
      description: "Graduated with honors. Focus on UX research and interaction design.",
    },
  ],
  skills: [
    { id: "s1", name: "Figma", level: 5 },
    { id: "s2", name: "Prototyping", level: 4 },
    { id: "s3", name: "Accessibility (WCAG)", level: 4 },
  ],
  languages: [
    { id: "l1", name: "English", cefr: "C1" },
    { id: "l2", name: "German", cefr: "B2" },
  ],
  links: [
    { id: "u1", label: "Portfolio", url: "https://alexdoe.design" },
    { id: "u2", label: "LinkedIn", url: "https://linkedin.com/in/alexdoe" },
  ],
}
