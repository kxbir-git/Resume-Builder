import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Resumecraft" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-mesh p-6">
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 shadow-card">
        <Logo />
        <h1 className="mt-6 font-display text-2xl font-bold">Reset your password</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {sent ? "Check your inbox for a reset link." : "Enter your email and we'll send a magic reset link."}
        </p>
        {!sent ? (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@email.com" className="pl-9" required />
              </div>
            </div>
            <Button type="submit" className="h-11 w-full rounded-full bg-gradient-sunset">Send reset link</Button>
          </form>
        ) : (
          <div className="mt-6 rounded-2xl bg-success/10 p-4 text-sm text-success">
            ✓ Reset link sent. (This is a frontend demo — no email is actually delivered.)
          </div>
        )}
        <Link to="/login" className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
