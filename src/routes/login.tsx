import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Resumecraft" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-sunset p-10 text-primary-foreground md:flex">
        <Logo className="text-primary-foreground" />
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">Welcome back. Let's land that job.</h2>
          <p className="mt-3 text-primary-foreground/90">Pick up where you left off — your drafts are waiting.</p>
          <div className="mt-8 rounded-2xl bg-white/15 p-5 backdrop-blur">
            <p className="text-sm italic">"Resumecraft helped me get 3 interviews in two weeks. The templates feel premium without being stiff."</p>
            <p className="mt-3 text-sm font-semibold">— Priya R., Product Manager</p>
          </div>
        </div>
        <p className="text-xs text-primary-foreground/70">© Resumecraft 2025</p>
      </div>

      <div className="flex flex-col items-center justify-center p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="md:hidden mb-6"><Logo /></div>
          <h1 className="font-display text-3xl font-bold">Sign in</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">New here? <Link to="/signup" className="font-medium text-primary hover:underline">Create an account</Link></p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => navigate({ to: "/dashboard" }), 600);
            }}
            className="mt-7 space-y-4"
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@email.com" defaultValue="ava@email.com" className="pl-9" required />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" defaultValue="password" className="pl-9" required />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="h-11 w-full rounded-full bg-gradient-sunset shadow-soft hover:shadow-glow">
              {loading ? "Signing in…" : <>Sign in <ArrowRight className="ml-1.5 h-4 w-4" /></>}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or continue with <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 rounded-full">Google</Button>
            <Button variant="outline" className="h-11 rounded-full">LinkedIn</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
