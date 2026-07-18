import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-sunset text-primary-foreground shadow-soft transition-transform group-hover:rotate-[-6deg]">
        <FileText className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        resume<span className="text-primary">craft</span>
      </span>
    </Link>
  );
}
