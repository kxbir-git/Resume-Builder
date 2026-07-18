import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">Resumes that feel as good as they look.</p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Templates</li><li>AI Suggestions</li><li>Cover letters</li><li>Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Career blog</li><li>Resume guides</li><li>Examples</li><li>Help center</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li><li>Careers</li><li>Privacy</li><li>Terms</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Resumecraft. Crafted with care.
      </div>
    </footer>
  );
}
