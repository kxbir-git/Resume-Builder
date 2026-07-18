import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Camera, Sparkles } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile Settings — Resumecraft" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-10">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Profile & settings</h1>
          <p className="mt-1.5 text-muted-foreground">Manage your account and preferences.</p>

          <div className="mt-8 space-y-6">
            <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold">Profile</h2>
              <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row">
                <div className="relative">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-warm font-display text-3xl font-bold text-primary-foreground">AM</div>
                  <button className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border-2 border-background bg-card shadow-soft hover:bg-muted">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div><Label htmlFor="fname">First name</Label><Input id="fname" defaultValue="Ava" className="mt-1.5" /></div>
                    <div><Label htmlFor="lname">Last name</Label><Input id="lname" defaultValue="Martinez" className="mt-1.5" /></div>
                  </div>
                  <div><Label htmlFor="email">Email</Label><Input id="email" type="email" defaultValue="ava.martinez@email.com" className="mt-1.5" /></div>
                  <div><Label htmlFor="bio">Short bio</Label><Textarea id="bio" defaultValue="Senior product designer based in SF." className="mt-1.5" rows={2} /></div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold">Preferences</h2>
              <div className="mt-4 divide-y divide-border">
                {[
                  { t: "Email notifications", d: "Updates about your resumes and interview tips" },
                  { t: "AI suggestions", d: "Show AI-powered improvements while editing" },
                  { t: "Auto-save drafts", d: "Save your work automatically as you type" },
                  { t: "Public profile link", d: "Let recruiters find your resume by link" },
                ].map((p, i) => (
                  <div key={p.t} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">{p.t}</p>
                      <p className="text-sm text-muted-foreground">{p.d}</p>
                    </div>
                    <Switch defaultChecked={i < 3} />
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border/60 bg-gradient-sunset p-6 text-primary-foreground shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Free plan</span>
                  </div>
                  <h2 className="mt-2 font-display text-xl font-bold">Upgrade to Pro</h2>
                  <p className="mt-1 text-sm text-primary-foreground/90">Unlimited AI rewrites, premium templates, priority support.</p>
                </div>
                <Button className="rounded-full bg-white text-primary hover:bg-white/90">See plans</Button>
              </div>
            </section>

            <section className="rounded-2xl border border-destructive/30 bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-destructive">Danger zone</h2>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Permanently delete your account and all resumes.</p>
                <Button variant="outline" className="rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">Delete account</Button>
              </div>
            </section>

            <div className="flex justify-end gap-2 pt-2">
              <Button asChild variant="outline" className="rounded-full"><Link to="/dashboard">Cancel</Link></Button>
              <Button className="rounded-full bg-gradient-sunset">Save changes</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
