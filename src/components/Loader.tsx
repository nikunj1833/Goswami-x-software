"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = setTimeout(() => {
        setHide(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setHide(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="loader"
      className={hide ? "hide" : ""}
      aria-hidden={hide}
    >
      <p className="loader-mark">
        Goswami <b>X Software</b>
      </p>
      <div className="loader-bar" />
    </div>
  );
}
