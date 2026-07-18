import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/mock-data";
import { useResume, useTemplate, useAccent, accentMap } from "@/lib/resume-store";
import { Check, Eye } from "lucide-react";

export const Route = createFileRoute("/templates")({
  head: () => ({ meta: [{ title: "Templates — Resumecraft" }] }),
  component: TemplatesPage,
});

const accents = [
  { id: "coral", name: "Coral" },
  { id: "amber", name: "Amber" },
  { id: "teal", name: "Teal" },
  { id: "indigo", name: "Indigo" },
  { id: "rose", name: "Rose" },
  { id: "slate", name: "Slate" },
];

function TemplatesPage() {
  const [data] = useResume();
  const [template, setTemplate] = useTemplate();
  const [accent, setAccent] = useAccent();

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Step 2 of 3</p>
              <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Choose your template</h1>
              <p className="mt-1.5 text-muted-foreground">Switch designs instantly — your content stays put.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="rounded-full"><Link to="/builder">Back to editor</Link></Button>
              <Button asChild className="rounded-full bg-gradient-sunset"><Link to="/preview"><Eye className="mr-1.5 h-4 w-4" /> Preview</Link></Button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border/60 bg-card p-4 shadow-card">
            <p className="mb-3 text-sm font-semibold">Accent color</p>
            <div className="flex flex-wrap gap-2">
              {accents.map(a => (
                <button
                  key={a.id}
                  onClick={() => setAccent(a.id)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${accent === a.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted"}`}
                >
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: accentMap[a.id] }} />
                  {a.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t, i) => {
              const selected = template === t.id;
              return (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => setTemplate(t.id)}
                  className={`group relative overflow-hidden rounded-2xl border-2 bg-card p-3 text-left shadow-card transition-all ${selected ? "border-primary shadow-glow" : "border-transparent hover:-translate-y-1 hover:shadow-glow"}`}
                >
                  {selected && (
                    <div className="absolute right-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`aspect-[210/297] overflow-hidden rounded-xl bg-gradient-to-br ${t.color} p-1`}>
                    <div className="h-full w-full overflow-hidden rounded-lg bg-white">
                      <div className="origin-top-left scale-[0.42] sm:scale-[0.36] md:scale-[0.42]" style={{ width: "238%", height: "238%" }}>
                        <ResumePreview data={data} template={t.id} accent={accentMap[accent]} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between px-1">
                    <div>
                      <p className="font-display text-base font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.tag}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {selected ? "Selected" : "Choose"}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
