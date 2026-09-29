"use client";

import { useRef } from "react";

export default function FooterWordmark() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    wrap.style.setProperty("--mx", `${e.clientX - r.left}px`);
    wrap.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const handleMouseLeave = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.setProperty("--mx", "-9999px");
    wrap.style.setProperty("--my", "-9999px");
  };

  return (
    <div
      ref={wrapRef}
      className="footer-mark-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <p className="footer-mark-base" aria-hidden="true">
        Goswami X Software
      </p>
      <p className="footer-mark-glow" aria-hidden="true">
        Goswami X Software
      </p>
    </div>
  );
}
