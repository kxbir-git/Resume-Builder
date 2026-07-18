import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { useResume, useTemplate, useAccent, accentMap } from "@/lib/resume-store";
import { Download, Edit3, Palette, Share2, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/preview")({
  head: () => ({ meta: [{ title: "Preview & Download — Resumecraft" }] }),
  component: PreviewPage,
});

function PreviewPage() {
  const [data] = useResume();
  const [template] = useTemplate();
  const [accent] = useAccent();
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch("/api/resume-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, template, accent: accentMap[accent] }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Server returned ${res.status}: ${msg.slice(0, 120)}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const name = (data.personal.fullName || "resume").replace(/[^a-z0-9-_]+/gi, "_");
      a.download = `${name}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate PDF");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Step 3 of 3</p>
              <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Preview & download</h1>
              <p className="mt-1.5 text-muted-foreground">One last look before you wow recruiters.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="rounded-full"><Link to="/builder"><Edit3 className="mr-1.5 h-4 w-4" /> Edit</Link></Button>
              <Button asChild variant="outline" className="rounded-full"><Link to="/templates"><Palette className="mr-1.5 h-4 w-4" /> Change template</Link></Button>
              <Button onClick={handleDownload} disabled={downloading} className="rounded-full bg-gradient-sunset shadow-soft hover:shadow-glow">
                <Download className="mr-1.5 h-4 w-4" /> {downloading ? "Generating…" : "Download PDF"}
              </Button>
            </div>
          </div>

          {downloaded && (
            <div className="mt-6 flex items-center gap-2 rounded-2xl border border-success/30 bg-success/10 p-3 text-sm text-success">
              <CheckCircle2 className="h-4 w-4" /> Your PDF has been downloaded.
            </div>
          )}
          {error && (
            <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,280px]">
            <div className="mx-auto w-full max-w-3xl">
              <div className="aspect-[210/297] overflow-hidden rounded-2xl bg-white shadow-glow ring-1 ring-border print:rounded-none print:shadow-none print:ring-0">
                <ResumePreview data={data} template={template} accent={accentMap[accent]} />
              </div>
            </div>

            <aside className="space-y-4 print:hidden">
              <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-base font-semibold">Resume score</h3>
                </div>
                <div className="mt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-bold text-success">92</span>
                    <span className="text-sm text-muted-foreground">/ 100</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[92%] rounded-full bg-success" />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Excellent — recruiter-ready.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <h3 className="font-display text-base font-semibold">Quick checks</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    { ok: true, t: "Contact info complete" },
                    { ok: true, t: "Strong action verbs" },
                    { ok: true, t: "ATS-readable formatting" },
                    { ok: false, t: "Add measurable results" },
                  ].map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className={`grid h-5 w-5 place-items-center rounded-full ${c.ok ? "bg-success/15 text-success" : "bg-warning/20 text-warning-foreground"}`}>
                        {c.ok ? "✓" : "!"}
                      </span>
                      <span className={c.ok ? "text-foreground" : "text-muted-foreground"}>{c.t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="w-full rounded-full"><Share2 className="mr-1.5 h-4 w-4" /> Share link</Button>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
