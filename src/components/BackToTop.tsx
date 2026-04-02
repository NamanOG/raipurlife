import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 320);

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-2xl border border-border bg-card p-0 text-foreground shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:bg-muted md:bottom-6 md:right-6"
      size="sm"
      aria-label="Back to top"
    >
      <ArrowUpRight className="h-5 w-5" />
    </Button>
  );
};

export default BackToTop;
