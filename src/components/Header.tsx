import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, Moon, Sparkles, Sun } from "lucide-react";
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
import { NAV_LINKS } from "@/utils/constants";

type HeaderProps = {
  overlay?: boolean;
};

const Header = ({ overlay = false }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerClass = overlay
    ? "absolute inset-x-0 top-0 z-50 bg-transparent"
    : "sticky top-0 z-50 border-b border-slate-800/55 bg-slate-950/46 backdrop-blur-xl";

  const frameClass = overlay
    ? "flex items-center justify-between gap-4 rounded-2xl border border-slate-700/55 bg-slate-950/44 px-3 py-2 shadow-[0_12px_28px_hsl(217_44%_6%_/_0.28)] backdrop-blur-xl"
    : "flex items-center justify-between gap-4 rounded-2xl border border-slate-700/55 bg-slate-950/52 px-3 py-2 shadow-[0_10px_24px_hsl(213_34%_8%_/_0.24)] backdrop-blur-xl";

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 py-3">
        <div className={frameClass}>
          <Link to="/" className="group flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-xl shadow-md transition-transform duration-300 group-hover:-rotate-6">
              <img src="/rpr_logo.png" alt="Raipur.life logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-bold leading-none text-white">Raipur.life</p>
              <p className="text-xs text-slate-200/85">City stories, food, and travel</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "rounded-xl bg-gradient-to-r from-secondary/90 to-primary/90 text-white shadow-md"
                      : "rounded-xl text-white hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button className="hidden rounded-xl border border-slate-600/55 bg-white/8 px-3 text-white hover:bg-white/14 md:inline-flex">
              <Heart className="mr-2 h-4 w-4" />
              Saved
            </Button>
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl border border-slate-600/55 bg-white/8 text-white hover:bg-white/14"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button className="rounded-xl border border-slate-600/55 bg-white/8 text-white hover:bg-white/14 lg:hidden" aria-label="Open menu">
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
                          `rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-foreground text-background"
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
