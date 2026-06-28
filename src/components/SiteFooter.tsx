import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-muted/40">
      <div className="container-prose py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="font-serif text-2xl">Craig · Handpan</div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Live handpan music for soulful weddings, ceremonies, and intimate
            celebrations across Kent, London, Sussex, Surrey, and beyond.
          </p>
        </div>

        <div>
          <div className="eyebrow">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/weddings", "Weddings"],
              ["/packages", "Packages"],
              ["/listen", "Listen & Watch"],
              ["/about", "About"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link to={href} className="text-foreground/75 hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow">Enquiries</div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Available for weddings across Kent, Canterbury, London, Sussex &amp;
            Surrey. Further travel by arrangement.
          </p>
          <Link to="/contact" className="btn-outline mt-5 !py-2.5 !px-5 text-sm">
            Check My Wedding Date
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-prose py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Craig Handpan. All rights reserved.</span>
          <span>Handpan wedding musician · United Kingdom</span>
        </div>
      </div>
    </footer>
  );
}
