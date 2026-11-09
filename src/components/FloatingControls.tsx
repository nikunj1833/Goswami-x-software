"use client";

import { useEffect, useState } from "react";

export default function FloatingControls() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        id="toTop"
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
        className={`to-top fixed bottom-24 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-opacity duration-300 ${
          show ? "opacity-100 pointer-events-auto cursor-pointer" : "opacity-0 pointer-events-none"
        }`}
        style={{
          borderColor: "var(--accent)",
          backgroundColor: "color-mix(in srgb, var(--bg) 90%, transparent)",
          color: "var(--accent)",
        }}
      >
        ↑
      </button>

    </>
  );
}
