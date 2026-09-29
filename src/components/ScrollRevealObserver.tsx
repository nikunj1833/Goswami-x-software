"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const observeElements = () => {
      const revealEls = document.querySelectorAll(".reveal:not(.in-view)");
      revealEls.forEach((el) => io.observe(el));
    };

    observeElements();

    // Re-check shortly after initial render in case of dynamic layout settling
    const timer = setTimeout(observeElements, 500);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  return null;
}
