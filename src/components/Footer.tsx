import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Code, Eye, Facebook, Github, Instagram, MessageCircle, Youtube } from "lucide-react";
import { NAV_LINKS } from "@/utils/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const footerRef = useScrollReveal();
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const key = "raipur-local-visit-count";

    const loadCounter = async () => {
      try {
        const response = await fetch("https://api.countapi.xyz/hit/raipur.life/website-visits");
        const data = (await response.json()) as { value?: number };

        if (typeof data.value === "number") {
          setVisits(data.value);
          return;
        }
      } catch {
        const current = Number(localStorage.getItem(key) || "0") + 1;
        localStorage.setItem(key, String(current));
        setVisits(current);
      }
    };

    void loadCounter();
  }, []);

  return (
    <footer ref={footerRef} className="scroll-reveal border-t border-border/80 bg-card/92 px-4 py-14">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 overflow-hidden rounded-md">
                <img src="/rpr_logo.png" alt="Raipur.life logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none">Raipur.life</p>
                <p className="text-xs text-muted-foreground">One-stop city guide</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Built to help people discover food, travel spots, shopping, and local experiences across Raipur, Chhattisgarh.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a href="https://instagram.com/raipur.life" className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground" aria-label="Community Chat">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Explore</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} to={link.href} className="text-foreground/80 transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Community</p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>Share your own reviews and recommend your favorite places.</p>
              <p>Help new visitors navigate Raipur better than ever.</p>
              <p>Contribute food, event, shopping places, and travel tips.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/70 pt-5 text-sm text-muted-foreground">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p>© 2026 Raipur.life. Built for the city, by the city.</p>
            <p className="inline-flex items-center gap-2 border border-border/70 bg-background/70 px-3 py-1 text-xs sm:text-sm">
              <Eye className="h-4 w-4 text-primary" />
              <span>Visitors:</span>
              <span className="font-semibold text-foreground">{visits ? visits.toLocaleString("en-IN") : "..."}</span>
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span>Explored by</span>
            <span className="font-semibold text-foreground">Naman</span>
            <a
              href="https://github.com/NamanOG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-muted-foreground transition-colors duration-300 hover:text-primary"
              aria-label="Naman GitHub"
            >
              <Code className="h-4 w-4" />
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
