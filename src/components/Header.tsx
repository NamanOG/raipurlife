import { useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Compass, Menu, Moon, Sparkles, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { NAV_LINKS } from "@/utils/constants";

type HeaderProps = {
  overlay?: boolean;
};

const Header = ({ overlay = false }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPage = useMemo(() => NAV_LINKS.find((link) => link.href === location.pathname), [location.pathname]);

  const handleSurpriseMe = () => {
    const candidates = NAV_LINKS.filter((link) => link.href !== location.pathname);
    if (candidates.length === 0) {
      toast({
        title: "No destination found",
        description: "You are already on the only available page.",
      });
      return;
    }

    const next = candidates[Math.floor(Math.random() * candidates.length)];
    navigate(next.href);
    toast({
      title: "Surprise route ready",
      description: `Taking you to ${next.label}.`,
    });
  };

  const headerClass = overlay
    ? "absolute inset-x-0 top-0 z-50 bg-transparent"
    : "sticky top-0 z-50 border-b border-border/80 bg-card/90 backdrop-blur-xl dark:border-slate-800/55 dark:bg-slate-950/52";

  const frameClass = overlay
    ? "flex items-center justify-between gap-4 rounded-[1.4rem] border border-slate-700/55 bg-slate-950/42 px-3 py-2 shadow-[0_14px_30px_hsl(217_30%_6%_/_0.26)] backdrop-blur-xl"
    : "flex items-center justify-between gap-4 rounded-[1.4rem] border border-border/75 bg-background/84 px-3 py-2 shadow-[0_12px_28px_hsl(220_18%_10%_/_0.1)] backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/56 dark:shadow-[0_14px_28px_hsl(213_24%_6%_/_0.24)]";

  const brandTitleClass = overlay ? "text-lg font-bold leading-none text-white" : "text-lg font-bold leading-none text-foreground";
  const brandSubtitleClass = overlay ? "text-xs text-slate-200/85" : "text-xs text-muted-foreground";
  const navIdleClass = overlay
    ? "rounded-lg !text-white hover:bg-white/8 hover:!text-white"
    : "rounded-lg text-foreground/82 hover:bg-muted/70 hover:text-foreground";
  const actionButtonClass = overlay
    ? "rounded-lg border border-slate-600/55 bg-white/8 text-white hover:bg-white/14"
    : "rounded-lg border border-border bg-background/92 text-foreground hover:bg-muted";

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 py-3">
        <div className={frameClass}>
          <Link to="/" className="group flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-xl shadow-md transition-transform duration-300 group-hover:-rotate-6">
              <img src="/rpr_logo.png" alt="Raipur.life logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className={brandTitleClass}>Raipur.life</p>
              <p className={brandSubtitleClass}>City stories, food, and travel</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-semibold tracking-wide transition-[background-color,color,transform,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 ${
                    isActive
                      ? overlay
                        ? "rounded-lg bg-white/8 !text-white shadow-sm after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:bg-gradient-to-r after:from-secondary after:to-primary"
                        : "rounded-lg bg-muted/70 text-foreground shadow-sm after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:bg-gradient-to-r after:from-secondary after:to-primary"
                      : navIdleClass
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSurpriseMe}
              className={`hidden px-3 md:inline-flex ${actionButtonClass}`}
              aria-label="Surprise me with a random section"
            >
              <Compass className="mr-2 h-4 w-4" />
              {currentPage ? "Surprise Me" : "Explore"}
            </Button>
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={actionButtonClass}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button className={`lg:hidden ${actionButtonClass}`} aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l border-border bg-card/95 backdrop-blur-xl">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    Explore Raipur
                  </SheetTitle>
                  <SheetDescription className="text-left">
                    Navigate city guides, local food, shopping, events, and more.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 grid gap-2">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                            isActive
                              ? "border border-border bg-muted text-foreground"
                              : "border border-border bg-background text-foreground hover:bg-muted"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
