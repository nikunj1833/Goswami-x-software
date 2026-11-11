"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("in-view");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 50px 0px" }
    );

    const observeElements = () => {
      const revealEls = document.querySelectorAll(".reveal:not(.in-view)");
      revealEls.forEach((el) => io.observe(el));
    };

    observeElements();

    // Re-check shortly after initial render in case of dynamic layout settling
    const timer = setTimeout(observeElements, 400);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
