"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/resume-builder/sidebar"
import { Preview } from "@/components/resume-builder/preview"
import { type ResumeData, defaultResume } from "@/components/resume-builder/types"
import { cn } from "@/lib/utils"

export default function ResumeBuilderPage() {
  const [data, setData] = useState<ResumeData>(defaultResume)
  const [activeSection, setActiveSection] = useState<
    "personal" | "work" | "education" | "skills" | "languages" | "links"
  >("personal")

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("resume-data-v1")
      if (raw) setData({ ...defaultResume, ...JSON.parse(raw) })
    } catch {}
  }, [])
  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("resume-data-v1", JSON.stringify(data))
    } catch {}
  }, [data])

  const onPrint = () => window.print()

  const onExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "resume.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const onImportJSON = async (file: File) => {
    const text = await file.text()
    try {
      setData({ ...defaultResume, ...JSON.parse(text) })
    } catch {
      alert("Invalid JSON file")
    }
  }

  // Keep preview at A4 size for screen and print
  const a4 = useMemo(() => ({ width: "210mm", minHeight: "297mm" }), [])

  return (
    <main className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 bg-background text-foreground">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-balance">Resume Builder (Europass style)</h1>
          <p className="text-sm text-muted-foreground">
            Edit on the left, preview on the right. Use Print to export an A4 PDF.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="resume-import"
            className="hidden"
            type="file"
            accept="application/json"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onImportJSON(f)
            }}
          />
          <Button variant="outline" onClick={() => document.getElementById("resume-import")?.click()}>
            Import JSON
          </Button>
          <Button variant="outline" onClick={onExportJSON}>
            Export JSON
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800 text-white" onClick={onPrint}>
            Print / Export PDF
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="order-2 lg:order-1">
          <Sidebar
            data={data}
            onChange={setData}
            activeSection={activeSection}
            onActiveSectionChange={setActiveSection}
          />
        </div>

        {/* Preview */}
        <div className="order-1 lg:order-2">
          <div
            id="resume-preview"
            className={cn("bg-white border rounded-sm shadow-sm mx-auto print:shadow-none print:border-0")}
            style={a4}
          >
            <Preview data={data} />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            The preview is sized to A4. Printing will export the same layout.
          </p>
        </div>
      </section>

      {/* Print styles */}
      <style>{`
        @page { size: A4; margin: 12mm; }
        @media print {
          body { background: white !important; }
          main, header, section { padding: 0 !important; }
          #resume-preview { box-shadow: none !important; border: none !important; margin: 0 auto !important; }
          header button, header input { display: none !important; }
          nav, form, .shy { display: none !important; }
        }
      `}</style>
    </main>
  )
}
