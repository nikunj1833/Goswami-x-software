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

      <a
        id="whatsappBtn"
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`to-top fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full transition-opacity duration-300 ${
          show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "#25D366",
          boxShadow: "0 10px 26px -8px rgba(37,211,102,.6)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            fill="#fff"
            d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"
          />
          <path
            fill="#fff"
            d="M12.02 2C6.5 2 2.03 6.44 2.03 11.92c0 1.79.47 3.47 1.3 4.93L2 22l5.3-1.4a10.02 10.02 0 0 0 4.72 1.2h.01c5.52 0 9.99-4.44 9.99-9.92C21.99 6.44 17.54 2 12.02 2Zm0 18.2h-.01a8.27 8.27 0 0 1-4.23-1.16l-.3-.18-3.15.83.84-3.07-.2-.32a8.21 8.21 0 0 1-1.27-4.4c0-4.55 3.72-8.26 8.32-8.26 2.22 0 4.31.87 5.88 2.44a8.19 8.19 0 0 1 2.44 5.83c0 4.55-3.72 8.29-8.32 8.29Z"
          />
        </svg>
      </a>
    </>
  );
}
