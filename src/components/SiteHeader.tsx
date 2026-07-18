import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/templates" className="hover:text-foreground transition-colors">Templates</Link>
          <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full bg-gradient-sunset shadow-soft hover:shadow-glow">
            <Link to="/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
