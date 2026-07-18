import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account — Resumecraft" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 md:p-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm">
          <div className="md:hidden mb-6"><Logo /></div>
          <h1 className="font-display text-3xl font-bold">Create your account</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Already have one? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link></p>

          <form
            onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => navigate({ to: "/dashboard" }), 600); }}
            className="mt-7 space-y-4"
          >
            <div>
              <Label htmlFor="name">Full name</Label>
              <div className="relative mt-1.5">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" placeholder="Ava Martinez" className="pl-9" required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@email.com" className="pl-9" required />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="At least 8 characters" className="pl-9" required minLength={8} />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="h-11 w-full rounded-full bg-gradient-sunset shadow-soft hover:shadow-glow">
              {loading ? "Creating account…" : <>Create account <ArrowRight className="ml-1.5 h-4 w-4" /></>}
            </Button>
            <p className="text-center text-xs text-muted-foreground">By continuing you agree to our Terms and Privacy Policy.</p>
          </form>
        </motion.div>
      </div>

      <div className="hidden flex-col justify-between bg-gradient-sunset p-10 text-primary-foreground md:flex">
        <div className="flex justify-end"><Logo className="text-primary-foreground" /></div>
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">Start free. Stay forever.</h2>
          <p className="mt-3 text-primary-foreground/90">Everything you need to land your next role.</p>
          <ul className="mt-8 space-y-3">
            {["6 professional templates", "Unlimited resumes", "AI bullet rewriter", "Pixel-perfect PDF export", "ATS-friendly designs"].map(f => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25"><Check className="h-3 w-3" /></span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/70">No credit card required</p>
      </div>
    </div>
  );
}
