
import React, { useState } from "react";
import { Search, MapPin, Heart, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/ThemeProvider";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
      <>
        <header className="sticky top-0 z-50 w-full border-b bg-[#101624] shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-white/10 p-2 shadow-md">
                <MapPin className="h-6 w-6 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold text-white ml-2 tracking-wide">Raipur.life</h1>
            </div>
            
            {/* Center: Navigation links on desktop */}
            <nav className="hidden md:flex items-center justify-center">
              <div className="rounded-xl bg-white/10 px-4 py-1 shadow flex gap-1">
                {[
                  { href: "/history", label: "History" },
                  { href: "/tourism", label: "Tourism" },
                  { href: "/food", label: "Food" },
                  { href: "/events", label: "Events" },
                  { href: "/shopping", label: "Shopping" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/plan-trip", label: "Plan Trip" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-white px-2 py-1 rounded-lg transition-all duration-150 hover:bg-blue-500/20 hover:text-blue-400 hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
  
            {/* Right: Favorites, Theme Toggle, Hamburger */}
            <div className="flex items-center space-x-4">
              <Button className="hidden md:flex items-center space-x-2 glass">
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </Button>
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="glass"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              {/* Hamburger only on mobile */}
              <Button className="md:hidden glass" onClick={() => setDrawerOpen(true)}>
                <span className="text-2xl">&#9776;</span>
              </Button>
            </div>
          </div>
          {/* Drawer for navigation links only on mobile */}
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <nav className="flex flex-col gap-3 p-6 md:hidden bg-[#101624] rounded-xl shadow-2xl">
              {[
                { href: "/history", label: "History" },
                { href: "/tourism", label: "Tourism" },
                { href: "/food", label: "Food" },
                { href: "/events", label: "Events" },
                { href: "/shopping", label: "Shopping" },
                { href: "/gallery", label: "Gallery" },
                { href: "/plan-trip", label: "Plan Trip" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-white px-3 py-2 rounded-lg transition-all duration-150 hover:bg-blue-500/20 hover:text-blue-400 hover:underline"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </Drawer>
        </header>
      </>
  );
};

export default Header;