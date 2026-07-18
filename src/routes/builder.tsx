import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useResume, useTemplate, useAccent, accentMap } from "@/lib/resume-store";
import { Plus, Trash2, Sparkles, Save, Eye } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/builder")({
  head: () => ({ meta: [{ title: "Resume Builder — Resumecraft" }] }),
  component: BuilderPage,
});

function BuilderPage() {
  const [data, setData] = useResume();
  const [template] = useTemplate();
  const [accent] = useAccent();
  const [saved, setSaved] = useState(false);

  const updatePersonal = (k: keyof typeof data.personal, v: string) =>
    setData({ ...data, personal: { ...data.personal, [k]: v } });

  const triggerSave = () => { setSaved(true); setTimeout(() => setSaved(false), 1800); };

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <DashboardSidebar />
      <main className="flex-1 overflow-hidden">
        <div className="flex h-screen flex-col">
          <header className="flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur md:px-6">
            <div>
              <p className="text-xs text-muted-foreground">Editing</p>
              <h1 className="font-display text-lg font-semibold">{data.personal.fullName || "Untitled resume"}</h1>
            </div>
            <div className="flex items-center gap-2">
              {saved && <span className="text-xs text-success">✓ Saved</span>}
              <Button variant="outline" size="sm" className="rounded-full" onClick={triggerSave}>
                <Save className="mr-1.5 h-3.5 w-3.5" /> Save draft
              </Button>
              <Button asChild size="sm" className="rounded-full bg-gradient-sunset">
                <Link to="/preview"><Eye className="mr-1.5 h-3.5 w-3.5" /> Preview</Link>
              </Button>
            </div>
          </header>

          <div className="grid flex-1 overflow-hidden lg:grid-cols-2">
            {/* Form */}
            <div className="overflow-auto border-r border-border/60 p-5 md:p-7">
              <Accordion type="multiple" defaultValue={["personal", "objective", "experience"]} className="space-y-3">
                <AccordionItem value="personal" className="rounded-2xl border bg-card px-4">
                  <AccordionTrigger className="font-display text-base font-semibold">Personal Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-3 pb-3 sm:grid-cols-2">
                      <Field label="Full name" value={data.personal.fullName} onChange={v => updatePersonal("fullName", v)} />
                      <Field label="Job title" value={data.personal.title} onChange={v => updatePersonal("title", v)} />
                      <Field label="Email" value={data.personal.email} onChange={v => updatePersonal("email", v)} />
                      <Field label="Phone" value={data.personal.phone} onChange={v => updatePersonal("phone", v)} />
                      <Field label="Location" value={data.personal.location} onChange={v => updatePersonal("location", v)} />
                      <Field label="Website" value={data.personal.website} onChange={v => updatePersonal("website", v)} />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="objective" className="rounded-2xl border bg-card px-4">
                  <AccordionTrigger className="font-display text-base font-semibold">
                    <span>Career Objective</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pb-3">
                      <Textarea
                        rows={4}
                        value={data.objective}
                        onChange={e => setData({ ...data, objective: e.target.value })}
                      />
                      <Button size="sm" variant="outline" className="rounded-full text-xs">
                        <Sparkles className="mr-1.5 h-3 w-3" /> Improve with AI
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="experience" className="rounded-2xl border bg-card px-4">
                  <AccordionTrigger className="font-display text-base font-semibold">Work Experience</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pb-3">
                      {data.experience.map((x, idx) => (
                        <div key={x.id} className="rounded-xl border border-border/60 bg-muted/30 p-3">
                          <div className="grid gap-2 sm:grid-cols-2">
                            <Field label="Role" value={x.role} onChange={v => {
                              const arr = [...data.experience]; arr[idx] = { ...x, role: v }; setData({ ...data, experience: arr });
                            }} />
                            <Field label="Company" value={x.company} onChange={v => {
                              const arr = [...data.experience]; arr[idx] = { ...x, company: v }; setData({ ...data, experience: arr });
                            }} />
                            <Field label="Period" value={x.period} onChange={v => {
                              const arr = [...data.experience]; arr[idx] = { ...x, period: v }; setData({ ...data, experience: arr });
                            }} />
                          </div>
                          <Label className="mt-2 block text-xs">Description</Label>
                          <Textarea rows={2} value={x.description} onChange={e => {
                            const arr = [...data.experience]; arr[idx] = { ...x, description: e.target.value }; setData({ ...data, experience: arr });
                          }} />
                          <Button size="sm" variant="ghost" className="mt-1.5 text-destructive" onClick={() =>
                            setData({ ...data, experience: data.experience.filter(e => e.id !== x.id) })
                          }><Trash2 className="mr-1 h-3 w-3" /> Remove</Button>
                        </div>
                      ))}
                      <Button size="sm" variant="outline" className="w-full rounded-full" onClick={() =>
                        setData({ ...data, experience: [...data.experience, { id: crypto.randomUUID(), role: "", company: "", period: "", description: "" }] })
                      }><Plus className="mr-1 h-3 w-3" /> Add experience</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="education" className="rounded-2xl border bg-card px-4">
                  <AccordionTrigger className="font-display text-base font-semibold">Education</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pb-3">
                      {data.education.map((e, idx) => (
                        <div key={e.id} className="rounded-xl border border-border/60 bg-muted/30 p-3">
                          <div className="grid gap-2 sm:grid-cols-2">
                            <Field label="Degree" value={e.degree} onChange={v => { const arr = [...data.education]; arr[idx] = { ...e, degree: v }; setData({ ...data, education: arr }); }} />
                            <Field label="School" value={e.school} onChange={v => { const arr = [...data.education]; arr[idx] = { ...e, school: v }; setData({ ...data, education: arr }); }} />
                            <Field label="Period" value={e.period} onChange={v => { const arr = [...data.education]; arr[idx] = { ...e, period: v }; setData({ ...data, education: arr }); }} />
                          </div>
                        </div>
                      ))}
                      <Button size="sm" variant="outline" className="w-full rounded-full" onClick={() =>
                        setData({ ...data, education: [...data.education, { id: crypto.randomUUID(), school: "", degree: "", period: "", description: "" }] })
                      }><Plus className="mr-1 h-3 w-3" /> Add education</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="skills" className="rounded-2xl border bg-card px-4">
                  <AccordionTrigger className="font-display text-base font-semibold">Skills</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pb-3">
                      <Input
                        placeholder="Add a skill and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.currentTarget.value.trim()) {
                            setData({ ...data, skills: [...data.skills, e.currentTarget.value.trim()] });
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {data.skills.map((s, i) => (
                          <span key={i} className="group inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
                            {s}
                            <button onClick={() => setData({ ...data, skills: data.skills.filter((_, j) => j !== i) })} className="opacity-60 hover:opacity-100">×</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="languages" className="rounded-2xl border bg-card px-4">
                  <AccordionTrigger className="font-display text-base font-semibold">Languages, Hobbies & References</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pb-3">
                      <div>
                        <Label className="text-xs">Hobbies (comma separated)</Label>
                        <Input value={data.hobbies.join(", ")} onChange={e => setData({ ...data, hobbies: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />
                      </div>
                      {data.languages.map((l, idx) => (
                        <div key={l.id} className="grid grid-cols-2 gap-2">
                          <Field label="Language" value={l.name} onChange={v => { const arr = [...data.languages]; arr[idx] = { ...l, name: v }; setData({ ...data, languages: arr }); }} />
                          <Field label="Level" value={l.level} onChange={v => { const arr = [...data.languages]; arr[idx] = { ...l, level: v }; setData({ ...data, languages: arr }); }} />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Live preview */}
            <div className="hidden overflow-auto bg-gradient-soft p-6 lg:block">
              <div className="mx-auto aspect-[210/297] max-w-md overflow-hidden rounded-xl bg-white shadow-glow ring-1 ring-border">
                <ResumePreview data={data} template={template} accent={accentMap[accent]} />
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">Live preview · {template} template</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input value={value} onChange={e => onChange(e.target.value)} className="mt-1" />
    </div>
  );
}
