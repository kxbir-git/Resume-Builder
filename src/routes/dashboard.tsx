import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { mockResumes, templates } from "@/lib/mock-data";
import { FileText, Plus, MoreVertical, Sparkles, TrendingUp, Eye, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Resumecraft" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const stats = [
    { label: "Active resumes", value: "3", icon: FileText, accent: "bg-primary/10 text-primary" },
    { label: "Profile views", value: "284", icon: Eye, accent: "bg-accent/30 text-accent-foreground" },
    { label: "Downloads", value: "47", icon: Download, accent: "bg-secondary text-secondary-foreground" },
    { label: "Resume score", value: "92", icon: TrendingUp, accent: "bg-success/15 text-success" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back, Ava 👋</p>
              <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Your resume workspace</h1>
            </div>
            <Button asChild className="rounded-full bg-gradient-sunset shadow-soft hover:shadow-glow">
              <Link to="/builder"><Plus className="mr-1.5 h-4 w-4" /> New resume</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-card"
              >
                <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${s.accent}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="font-display text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-display text-xl font-semibold">Your resumes</h2>
              <div className="space-y-3">
                {mockResumes.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow"
                  >
                    <div className="grid h-14 w-12 shrink-0 place-items-center rounded-lg bg-gradient-warm text-primary-foreground">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-semibold">{r.title}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${r.status === "Published" ? "bg-success/15 text-success" : "bg-warning/20 text-warning-foreground"}`}>
                          {r.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Updated {r.updated} · {r.template} template</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button asChild size="sm" variant="outline" className="rounded-full">
                        <Link to="/builder">Edit</Link>
                      </Button>
                      <Button asChild size="sm" variant="ghost" className="rounded-full">
                        <Link to="/preview">Preview</Link>
                      </Button>
                      <Button size="icon" variant="ghost" className="rounded-full"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                  </motion.div>
                ))}
                <Link
                  to="/builder"
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card/40 p-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Plus className="h-4 w-4" /> Create another resume
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border/60 bg-gradient-sunset p-5 text-primary-foreground shadow-card">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">AI Boost</span>
                </div>
                <h3 className="font-display text-xl font-bold">Polish your resume in 30 seconds</h3>
                <p className="mt-2 text-sm text-primary-foreground/90">Let AI rewrite weak bullets and suggest stronger keywords.</p>
                <Button className="mt-4 rounded-full bg-white text-primary hover:bg-white/90">Try AI suggestions</Button>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold">Quick start templates</h3>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {templates.slice(0, 6).map(t => (
                    <Link
                      key={t.id}
                      to="/templates"
                      className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${t.color} p-1.5 transition-transform hover:scale-105`}
                    >
                      <div className="flex h-full flex-col rounded bg-white p-1.5">
                        <div className="mb-1 h-1 w-6 rounded bg-neutral-300" />
                        <div className="space-y-0.5">
                          {[...Array(5)].map((_, i) => <div key={i} className="h-0.5 rounded bg-neutral-100" />)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
