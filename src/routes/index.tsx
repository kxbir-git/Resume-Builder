import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Heart, Star, Download } from "lucide-react";
import heroImg from "@/assets/hero-illustration.jpg";
import { templates } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resumecraft — Resumes that get you hired" },
      { name: "description", content: "Build a beautiful, ATS-friendly resume in minutes. Friendly templates, live preview, AI suggestions." },
      { property: "og:title", content: "Resumecraft — Resumes that get you hired" },
      { property: "og:description", content: "Build a beautiful, ATS-friendly resume in minutes." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-mesh">
        <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:gap-6 md:px-8 md:py-24 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered resume builder
            </span>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Resumes that <span className="text-gradient">feel like you</span>.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Craft a beautiful, professional resume in minutes — with playful templates,
              live preview, and friendly suggestions that help you stand out.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-gradient-sunset px-7 shadow-glow">
                <Link to="/signup">Start for free <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link to="/templates">Browse templates</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {["bg-rose-300", "bg-amber-300", "bg-teal-300", "bg-indigo-300"].map((c, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full border-2 border-background ${c}`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-xs">Loved by 40,000+ job seekers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-accent/40 blur-3xl" />
            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
            <img
              src={heroImg}
              alt="People crafting a resume together"
              width={1280}
              height={960}
              className="relative rounded-3xl shadow-glow"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Everything you need, nothing you don't</h2>
          <p className="mt-3 text-muted-foreground">A delightful resume experience from blank page to interview.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Zap, title: "Live preview", text: "Watch your resume come together as you type. No surprises." },
            { icon: Sparkles, title: "AI suggestions", text: "Smarter wording, stronger bullets, instant grammar fixes." },
            { icon: Shield, title: "ATS friendly", text: "Pass automated screening with templates built for recruiters." },
            { icon: Heart, title: "6 friendly templates", text: "From minimal to bold — designs that actually feel human." },
            { icon: Download, title: "Pixel-perfect PDF", text: "Export beautiful, print-ready PDFs in one click." },
            { icon: Star, title: "Resume score", text: "Get a personal score and tips to improve your chances." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-3xl border border-border/60 bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-warm text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates preview */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-4xl font-bold md:text-5xl">Pick a template, make it yours</h2>
              <p className="mt-2 text-muted-foreground">Switch designs anytime — your content stays put.</p>
            </div>
            <Button asChild variant="outline" className="hidden rounded-full md:inline-flex">
              <Link to="/templates">View all <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {templates.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${t.color} p-2 shadow-card transition-transform hover:-translate-y-1 hover:shadow-glow`}
              >
                <div className="flex h-full flex-col rounded-xl bg-white p-3">
                  <div className="mb-2 h-2 w-12 rounded bg-neutral-300" />
                  <div className="mb-3 h-1.5 w-20 rounded bg-neutral-200" />
                  <div className="space-y-1">
                    {[...Array(8)].map((_, j) => <div key={j} className="h-1 rounded bg-neutral-100" />)}
                  </div>
                  <p className="mt-auto text-[10px] font-semibold text-neutral-700">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 md:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-sunset p-10 text-center text-primary-foreground shadow-glow md:p-16">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Your next role is one resume away</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
            Join thousands who landed interviews with Resumecraft. Free to start, no credit card.
          </p>
          <Button asChild size="lg" className="mt-7 rounded-full bg-white px-8 text-primary hover:bg-white/90">
            <Link to="/signup">Build my resume <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
