import { useEffect, useRef } from "react";

type ScrollRevealOptions = IntersectionObserverInit;

export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => {
      element.classList.add("revealed");
    };

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -10% 0px",
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return ref;
};
