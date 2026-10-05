"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

interface Coords {
  right?: number;
  left?: number;
  top: number;
  isDesktop: boolean;
}

function computePosition(): Coords {
  if (typeof window === "undefined") {
    return { right: 320, top: 38, isDesktop: true };
  }

  const btn =
    document.querySelector("header a[href='#contact'].btn-primary") ||
    document.querySelector("header a[href='#contact']") ||
    document.querySelector("header .btn-primary");
  const isDesktop = window.innerWidth >= 640;

  if (btn) {
    const rect = btn.getBoundingClientRect();
    if (rect.width > 0 && rect.left > 0 && isDesktop) {
      const gap = 16; // same gap from 'Get in touch' button
      const hasRoomOnRight = rect.right + gap + 201 <= window.innerWidth;

      if (hasRoomOnRight) {
        return {
          left: Math.round(rect.right + gap),
          top: Math.round(rect.top + rect.height / 2),
          isDesktop: true,
        };
      } else {
        // Aligned to the rightmost edge of the header if space is tight
        return {
          right: 12,
          top: Math.round(rect.top + rect.height / 2),
          isDesktop: true,
        };
      }
    }
  }

  // Fallback for mobile / small screens where button is hidden: top-right below header
  const header = document.querySelector("header");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 70;

  return {
    right: 16,
    top: Math.round(headerBottom + 12),
    isDesktop: false,
  };
}

export default function LoginSuccessToast() {
  const { showLoginToast, toastKey, dismissLoginToast } = useAuth();
  const [animPhase, setAnimPhase] = useState<"enter" | "visible" | "exit">("enter");
  const [coords, setCoords] = useState<Coords>(computePosition);

  const measurePosition = useCallback(() => {
    setCoords(computePosition());
  }, []);

  useEffect(() => {
    if (!showLoginToast) return;

    window.addEventListener("resize", measurePosition);

    // Frame 1: Trigger entrance zoom-in transition on next frame
    const enterFrame = requestAnimationFrame(() => {
      measurePosition();
      setAnimPhase("visible");
    });

    // Stay fully visible for ~3 seconds, then start zoom-out exit
    const exitTimer = setTimeout(() => {
      setAnimPhase("exit");
    }, 3000);

    // After exit transition completes (3.4s total), dismiss from context
    const dismissTimer = setTimeout(() => {
      dismissLoginToast();
    }, 3400);

    return () => {
      window.removeEventListener("resize", measurePosition);
      cancelAnimationFrame(enterFrame);
      clearTimeout(exitTimer);
      clearTimeout(dismissTimer);
    };
  }, [showLoginToast, toastKey, dismissLoginToast, measurePosition]);

  if (!showLoginToast) {
    return null;
  }

  const isDesktop = coords.isDesktop;
  const baseTransform = isDesktop ? "translateY(-50%)" : "";

  let transform = `${baseTransform} scale(1)`.trim();
  let opacity = 1;
  let transition =
    "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1.2, 0.3, 1)";

  if (animPhase === "enter") {
    transform = `${baseTransform} scale(0.88)`.trim();
    opacity = 0;
    transition = "none";
  } else if (animPhase === "exit") {
    transform = `${baseTransform} scale(0.94)`.trim();
    opacity = 0;
    transition =
      "opacity 380ms cubic-bezier(0.4, 0, 0.2, 1), transform 380ms cubic-bezier(0.4, 0, 0.2, 1)";
  }

  const containerStyle: React.CSSProperties = {
    top: `${coords.top}px`,
    ...(coords.right !== undefined
      ? { right: `${coords.right}px`, left: "auto" }
      : { left: `${coords.left}px`, right: "auto" }),
  };

  return (
    <div
      id="loginSuccessToast"
      role="status"
      aria-live="polite"
      className="fixed z-[100] pointer-events-none select-none"
      style={containerStyle}
    >
      <div
        className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full border backdrop-blur-xl pointer-events-none will-change-transform"
        style={{
          transform,
          opacity,
          transition,
          backgroundColor: "#1D1611",
          borderColor: "rgba(217, 165, 116, 0.65)",
          boxShadow:
            "0 10px 30px -4px rgba(0, 0, 0, 0.85), 0 0 25px -2px rgba(185, 122, 76, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.16)",
        }}
      >
        {/* Prominent Gold Checkmark Badge */}
        <div
          className="flex h-5 w-5 items-center justify-center rounded-full shrink-0 shadow-sm"
          style={{
            background: "linear-gradient(135deg, var(--accent-soft), var(--accent))",
            color: "#15100C",
          }}
          aria-hidden="true"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M2.5 6.25L4.75 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Crisp Text */}
        <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-tight whitespace-nowrap text-[#FAF7F2]">
          Successfully logged in
        </span>
      </div>
    </div>
  );
}
