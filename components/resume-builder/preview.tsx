"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import type { ResumeData } from "./types"

export function Preview({ data }: { data: ResumeData }) {
  const c = palette()
  return (
    <div className="p-8 font-sans text-[12px] leading-relaxed text-[#111827]">
      {/* Header */}
      <header className="flex gap-6 items-start border-b pb-4" style={{ borderColor: c.border }}>
        {/* Photo */}
        {data.personal.photoUrl ? (
          <img
            src={data.personal.photoUrl || "/placeholder.svg"}
            alt="Profile photo"
            className="w-20 h-20 object-cover rounded-sm border"
            style={{ borderColor: c.border }}
          />
        ) : (
          <div className="w-20 h-20 bg-[#F3F4F6] border rounded-sm" style={{ borderColor: c.border }} aria-hidden />
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-semibold">
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-sm text-[#374151]">{data.personal.title}</p>

          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-[11px]">
            <div className="text-[#374151]">
              <div>{data.personal.address}</div>
              <div>{[data.personal.city, data.personal.country].filter(Boolean).join(", ")}</div>
            </div>
            <div className="text-[#1f2937]">
              <div>{data.personal.email}</div>
              <div>{data.personal.phone}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.personal.summary?.trim() && (
        <Section title="Personal statement" c={c}>
          <p className="text-[12px] whitespace-pre-line">{data.personal.summary}</p>
        </Section>
      )}

      {/* Work experience */}
      {data.work.length > 0 && (
        <Section title="Work experience" c={c}>
          <div className="flex flex-col gap-4">
            {data.work.map((w) => (
              <div key={w.id} className="grid grid-cols-[140px_1fr] gap-4">
                <div className="text-[11px] text-[#374151]">
                  <div>{formatDuration(w.start, w.end, w.current)}</div>
                  {(w.city || w.country) && <div>{[w.city, w.country].filter(Boolean).join(", ")}</div>}
                </div>
                <div>
                  <div className="font-semibold text-[13px]">{w.role}</div>
                  <div className="text-[12px] text-[#374151]">{w.employer}</div>
                  {w.description && <p className="mt-1 whitespace-pre-line text-[12px]">{w.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <Section title="Education and training" c={c}>
          <div className="flex flex-col gap-4">
            {data.education.map((ed) => (
              <div key={ed.id} className="grid grid-cols-[140px_1fr] gap-4">
                <div className="text-[11px] text-[#374151]">
                  <div>{formatRange(ed.start, ed.end)}</div>
                  {(ed.city || ed.country) && <div>{[ed.city, ed.country].filter(Boolean).join(", ")}</div>}
                </div>
                <div>
                  <div className="font-semibold text-[13px]">{ed.program}</div>
                  <div className="text-[12px] text-[#374151]">{ed.institution}</div>
                  {ed.description && <p className="mt-1 whitespace-pre-line text-[12px]">{ed.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <Section title="Skills" c={c}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {data.skills.map((sk) => (
              <li
                key={sk.id}
                className="flex items-center justify-between border-b py-1"
                style={{ borderColor: c.border }}
              >
                <span>{sk.name}</span>
                <Stars level={sk.level} c={c} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <Section title="Languages" c={c}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {data.languages.map((la) => (
              <li
                key={la.id}
                className="flex items-center justify-between border-b py-1"
                style={{ borderColor: c.border }}
              >
                <span>{la.name}</span>
                <span className="font-medium text-[#1f2937]">{la.cefr}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Links */}
      {data.links.length > 0 && (
        <Section title="Links" c={c}>
          <ul className="list-disc list-inside">
            {data.links.map((li) => (
              <li key={li.id}>
                <span className="font-medium">{li.label}:</span> <span className="text-blue-700">{li.url}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  )
}

function Section({ title, c, children }: { title: string; c: ReturnType<typeof palette>; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5" style={{ background: c.primary }} aria-hidden />
        <h2 className="text-[14px] font-semibold uppercase tracking-wide" style={{ color: c.primary }}>
          {title}
        </h2>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function Stars({ level, c }: { level: number; c: ReturnType<typeof palette> }) {
  const arr = Array.from({ length: 5 })
  return (
    <div className="flex items-center gap-1" aria-label={`Skill level ${level} out of 5`}>
      {arr.map((_, i) => (
        <span
          key={i}
          className={cn("inline-block w-3 h-3 border rounded-[2px]")}
          style={{ background: i < level ? c.primary : "transparent", borderColor: c.border }}
          aria-hidden
        />
      ))}
    </div>
  )
}

function formatDuration(start: string, end: string, current: boolean) {
  if (!start && !end && !current) return ""
  if (current) return `${start || ""} — Present`.trim()
  if (start && end) return `${start} — ${end}`
  if (start && !end) return `${start} —`
  return `— ${end}`
}

function formatRange(start: string, end: string) {
  if (start && end) return `${start} — ${end}`
  if (start && !end) return `${start} —`
  if (!start && end) return `— ${end}`
  return ""
}

function palette() {
  // Color system (max 5):
  // Primary brand: Blue #0A53B5
  // Neutrals: White #ffffff, Text #111827, Mid gray #374151, Border #E5E7EB
  return { primary: "#0A53B5", border: "#E5E7EB" }
}
