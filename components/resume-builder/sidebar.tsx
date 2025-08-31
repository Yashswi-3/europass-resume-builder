"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ResumeData, WorkEntry, EducationEntry, SkillEntry, LanguageEntry, LinkEntry } from "./types"

type Props = {
  data: ResumeData
  onChange: (d: ResumeData) => void
  activeSection: "personal" | "work" | "education" | "skills" | "languages" | "links"
  onActiveSectionChange: (s: Props["activeSection"]) => void
}

export function Sidebar({ data, onChange, activeSection, onActiveSectionChange }: Props) {
  const tab = (key: Props["activeSection"]) =>
    cn(
      "px-3 py-2 rounded text-sm cursor-pointer",
      activeSection === key ? "bg-blue-700 text-white" : "bg-muted hover:bg-muted/80",
    )

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex flex-wrap gap-2">
        <button className={tab("personal")} onClick={() => onActiveSectionChange("personal")}>
          Personal
        </button>
        <button className={tab("work")} onClick={() => onActiveSectionChange("work")}>
          Work
        </button>
        <button className={tab("education")} onClick={() => onActiveSectionChange("education")}>
          Education
        </button>
        <button className={tab("skills")} onClick={() => onActiveSectionChange("skills")}>
          Skills
        </button>
        <button className={tab("languages")} onClick={() => onActiveSectionChange("languages")}>
          Languages
        </button>
        <button className={tab("links")} onClick={() => onActiveSectionChange("links")}>
          Links
        </button>
      </nav>

      <div className="bg-card border rounded p-4">
        {activeSection === "personal" && (
          <PersonalForm value={data.personal} onChange={(v) => onChange({ ...data, personal: v })} />
        )}
        {activeSection === "work" && (
          <WorkForm items={data.work} onChange={(items) => onChange({ ...data, work: items })} />
        )}
        {activeSection === "education" && (
          <EducationForm items={data.education} onChange={(items) => onChange({ ...data, education: items })} />
        )}
        {activeSection === "skills" && (
          <SkillsForm items={data.skills} onChange={(items) => onChange({ ...data, skills: items })} />
        )}
        {activeSection === "languages" && (
          <LanguagesForm items={data.languages} onChange={(items) => onChange({ ...data, languages: items })} />
        )}
        {activeSection === "links" && (
          <LinksForm items={data.links} onChange={(items) => onChange({ ...data, links: items })} />
        )}
      </div>
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm text-foreground/80 mb-1 block">
      {children}
    </label>
  )
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border rounded p-3">
      <legend className="text-sm font-medium px-1">{title}</legend>
      <div className="mt-2">{children}</div>
    </fieldset>
  )
}

function PersonalForm({
  value,
  onChange,
}: {
  value: ResumeData["personal"]
  onChange: (v: ResumeData["personal"]) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label htmlFor="first">First name</Label>
        <Input id="first" value={value.firstName} onChange={(e) => onChange({ ...value, firstName: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="last">Last name</Label>
        <Input id="last" value={value.lastName} onChange={(e) => onChange({ ...value, lastName: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="addr">Address</Label>
        <Input id="addr" value={value.address} onChange={(e) => onChange({ ...value, address: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" value={value.city} onChange={(e) => onChange({ ...value, city: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input id="country" value={value.country} onChange={(e) => onChange({ ...value, country: e.target.value })} />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="photo">Photo URL (optional)</Label>
        <Input
          id="photo"
          value={value.photoUrl || ""}
          onChange={(e) => onChange({ ...value, photoUrl: e.target.value })}
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="summary">Profile summary</Label>
        <Textarea
          id="summary"
          rows={5}
          value={value.summary}
          onChange={(e) => onChange({ ...value, summary: e.target.value })}
        />
      </div>
    </div>
  )
}

function WorkForm({ items, onChange }: { items: WorkEntry[]; onChange: (v: WorkEntry[]) => void }) {
  const add = () =>
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        role: "",
        employer: "",
        city: "",
        country: "",
        start: "",
        end: "",
        current: false,
        description: "",
      },
    ])
  const update = (id: string, patch: Partial<WorkEntry>) =>
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const remove = (id: string) => onChange(items.filter((it) => it.id !== id))
  const move = (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((it) => it.id === id)
    if (idx < 0) return
    const dest = idx + dir
    if (dest < 0 || dest >= items.length) return
    const copy = items.slice()
    const [moved] = copy.splice(idx, 1)
    copy.splice(dest, 0, moved)
    onChange(copy)
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((w, i) => (
        <Fieldset key={w.id} title={`Position ${i + 1}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Role</Label>
              <Input value={w.role} onChange={(e) => update(w.id, { role: e.target.value })} />
            </div>
            <div>
              <Label>Employer</Label>
              <Input value={w.employer} onChange={(e) => update(w.id, { employer: e.target.value })} />
            </div>
            <div>
              <Label>City</Label>
              <Input value={w.city} onChange={(e) => update(w.id, { city: e.target.value })} />
            </div>
            <div>
              <Label>Country</Label>
              <Input value={w.country} onChange={(e) => update(w.id, { country: e.target.value })} />
            </div>
            <div>
              <Label>Start (YYYY or YYYY-MM)</Label>
              <Input value={w.start} onChange={(e) => update(w.id, { start: e.target.value })} />
            </div>
            <div>
              <Label>End (blank if current)</Label>
              <Input value={w.end} onChange={(e) => update(w.id, { end: e.target.value })} />
            </div>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={w.current}
                onChange={(e) => update(w.id, { current: e.target.checked, end: e.target.checked ? "" : w.end })}
              />
              <span className="text-sm">I currently work here</span>
            </label>
            <div />
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={w.description}
                onChange={(e) => update(w.id, { description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" onClick={() => move(w.id, -1)} disabled={i === 0}>
              Move up
            </Button>
            <Button variant="outline" onClick={() => move(w.id, 1)} disabled={i === items.length - 1}>
              Move down
            </Button>
            <Button variant="destructive" onClick={() => remove(w.id)}>
              Remove
            </Button>
          </div>
        </Fieldset>
      ))}
      <Button className="bg-blue-700 hover:bg-blue-800 text-white" onClick={add}>
        Add Experience
      </Button>
    </div>
  )
}

function EducationForm({ items, onChange }: { items: EducationEntry[]; onChange: (v: EducationEntry[]) => void }) {
  const add = () =>
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        program: "",
        institution: "",
        city: "",
        country: "",
        start: "",
        end: "",
        description: "",
      },
    ])
  const update = (id: string, patch: Partial<EducationEntry>) =>
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const remove = (id: string) => onChange(items.filter((it) => it.id !== id))
  const move = (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((it) => it.id === id)
    if (idx < 0) return
    const dest = idx + dir
    if (dest < 0 || dest >= items.length) return
    const copy = items.slice()
    const [moved] = copy.splice(idx, 1)
    copy.splice(dest, 0, moved)
    onChange(copy)
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((ed, i) => (
        <Fieldset key={ed.id} title={`Education ${i + 1}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Programme</Label>
              <Input value={ed.program} onChange={(e) => update(ed.id, { program: e.target.value })} />
            </div>
            <div>
              <Label>Institution</Label>
              <Input value={ed.institution} onChange={(e) => update(ed.id, { institution: e.target.value })} />
            </div>
            <div>
              <Label>City</Label>
              <Input value={ed.city} onChange={(e) => update(ed.id, { city: e.target.value })} />
            </div>
            <div>
              <Label>Country</Label>
              <Input value={ed.country} onChange={(e) => update(ed.id, { country: e.target.value })} />
            </div>
            <div>
              <Label>Start</Label>
              <Input value={ed.start} onChange={(e) => update(ed.id, { start: e.target.value })} />
            </div>
            <div>
              <Label>End</Label>
              <Input value={ed.end} onChange={(e) => update(ed.id, { end: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={ed.description}
                onChange={(e) => update(ed.id, { description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" onClick={() => move(ed.id, -1)} disabled={i === 0}>
              Move up
            </Button>
            <Button variant="outline" onClick={() => move(ed.id, 1)} disabled={i === items.length - 1}>
              Move down
            </Button>
            <Button variant="destructive" onClick={() => remove(ed.id)}>
              Remove
            </Button>
          </div>
        </Fieldset>
      ))}
      <Button className="bg-blue-700 hover:bg-blue-800 text-white" onClick={add}>
        Add Education
      </Button>
    </div>
  )
}

function SkillsForm({ items, onChange }: { items: SkillEntry[]; onChange: (v: SkillEntry[]) => void }) {
  const add = () => onChange([...items, { id: crypto.randomUUID(), name: "", level: 3 }])
  const update = (id: string, patch: Partial<SkillEntry>) =>
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const remove = (id: string) => onChange(items.filter((it) => it.id !== id))

  return (
    <div className="flex flex-col gap-3">
      {items.map((sk, i) => (
        <div key={sk.id} className="grid grid-cols-1 md:grid-cols-8 gap-3 items-end">
          <div className="md:col-span-5">
            <Label>Skill {i + 1}</Label>
            <Input value={sk.name} onChange={(e) => update(sk.id, { name: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Label>Level (1-5)</Label>
            <Input
              type="number"
              min={1}
              max={5}
              value={sk.level}
              onChange={(e) => update(sk.id, { level: Number(e.target.value) })}
            />
          </div>
          <div className="md:col-span-1">
            <Button variant="destructive" onClick={() => remove(sk.id)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button className="bg-blue-700 hover:bg-blue-800 text-white" onClick={add}>
        Add Skill
      </Button>
    </div>
  )
}

function LanguagesForm({ items, onChange }: { items: LanguageEntry[]; onChange: (v: LanguageEntry[]) => void }) {
  const add = () => onChange([...items, { id: crypto.randomUUID(), name: "", cefr: "B1" }])
  const update = (id: string, patch: Partial<LanguageEntry>) =>
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const remove = (id: string) => onChange(items.filter((it) => it.id !== id))

  const levels: LanguageEntry["cefr"][] = ["A1", "A2", "B1", "B2", "C1", "C2"]

  return (
    <div className="flex flex-col gap-3">
      {items.map((la, i) => (
        <div key={la.id} className="grid grid-cols-1 md:grid-cols-8 gap-3 items-end">
          <div className="md:col-span-5">
            <Label>Language {i + 1}</Label>
            <Input value={la.name} onChange={(e) => update(la.id, { name: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Label>CEFR level</Label>
            <select
              className="w-full border rounded px-3 py-2 text-sm bg-background"
              value={la.cefr}
              onChange={(e) => update(la.id, { cefr: e.target.value as LanguageEntry["cefr"] })}
            >
              {levels.map((lv) => (
                <option key={lv} value={lv}>
                  {lv}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-1">
            <Button variant="destructive" onClick={() => remove(la.id)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button className="bg-blue-700 hover:bg-blue-800 text-white" onClick={add}>
        Add Language
      </Button>
    </div>
  )
}

function LinksForm({ items, onChange }: { items: LinkEntry[]; onChange: (v: LinkEntry[]) => void }) {
  const add = () => onChange([...items, { id: crypto.randomUUID(), label: "", url: "" }])
  const update = (id: string, patch: Partial<LinkEntry>) =>
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const remove = (id: string) => onChange(items.filter((it) => it.id !== id))

  return (
    <div className="flex flex-col gap-3">
      {items.map((li, i) => (
        <div key={li.id} className="grid grid-cols-1 md:grid-cols-8 gap-3 items-end">
          <div className="md:col-span-3">
            <Label>Label {i + 1}</Label>
            <Input value={li.label} onChange={(e) => update(li.id, { label: e.target.value })} />
          </div>
          <div className="md:col-span-4">
            <Label>URL</Label>
            <Input value={li.url} onChange={(e) => update(li.id, { url: e.target.value })} />
          </div>
          <div className="md:col-span-1">
            <Button variant="destructive" onClick={() => remove(li.id)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button className="bg-blue-700 hover:bg-blue-800 text-white" onClick={add}>
        Add Link
      </Button>
    </div>
  )
}
