import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { LayoutDashboard, FileText, Palette, Settings, Sparkles, LogOut, Plus, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useState } from "react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/builder", label: "Resume Builder", icon: FileText },
  { to: "/templates", label: "Templates", icon: Palette },
  { to: "/preview", label: "Preview", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  return (
    <nav className="flex-1 space-y-1 px-3">
      {items.map(item => {
        const active = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="border-b border-border/60 p-5">
        <Logo />
      </div>
      <div className="p-4">
        <Button asChild className="w-full rounded-full bg-gradient-sunset shadow-soft hover:shadow-glow">
          <Link to="/builder" onClick={onNavigate}><Plus className="mr-1.5 h-4 w-4" /> New resume</Link>
        </Button>
      </div>
      <NavList onNavigate={onNavigate} />
      <div className="border-t border-border/60 p-3">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-warm font-semibold text-primary-foreground">
            AM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Ava Martinez</p>
            <p className="truncate text-xs text-muted-foreground">Free plan</p>
          </div>
          <Link to="/login" onClick={onNavigate} className="text-muted-foreground hover:text-foreground"><LogOut className="h-4 w-4" /></Link>
        </div>
      </div>
    </>
  );
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur md:hidden">
        <Logo />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-72 flex-col p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarBody onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      {/* Spacer so content isn't under the fixed mobile bar */}
      <div className="h-14 md:hidden" aria-hidden />

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border/60 bg-sidebar md:flex md:flex-col">
        <SidebarBody />
      </aside>
    </>
  );
}
