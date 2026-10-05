"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

interface Coords {
  right: number;
  top: number;
}

function computePosition(): Coords {
  if (typeof window === "undefined") {
    return { right: 24, top: 76 };
  }

  // Target the "Get in touch" button specifically
  const btn =
    document.querySelector("header a[href='#contact'].btn-primary") ||
    document.querySelector("header a[href='#contact']") ||
    document.querySelector("header .btn-primary");

  if (btn) {
    const rect = btn.getBoundingClientRect();
    if (rect.width > 0 && rect.bottom > 0) {
      // Place directly below the "Get in touch" button with a comfortable 12px gap
      const top = Math.round(rect.bottom + 12);
      // Align the right edge of the toast with the right edge of the button
      const right = Math.max(16, Math.round(window.innerWidth - rect.right));
      return { right, top };
    }
  }

  // Fallback for mobile / small screens where button is hidden: below the header bar
  const header = document.querySelector("header");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 70;

  return {
    right: 16,
    top: Math.round(headerBottom + 12),
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
    window.addEventListener("scroll", measurePosition, { passive: true });

    // Initial positioning check
    measurePosition();

    // Trigger visible spring-in on the next animation frame
    const enterFrame = requestAnimationFrame(() => {
      setAnimPhase("visible");
    });

    // Stay visible for 3.2 seconds, then transition to exit
    const exitTimer = setTimeout(() => {
      setAnimPhase("exit");
    }, 3200);

    // Completely dismiss after exit animation finishes
    const dismissTimer = setTimeout(() => {
      dismissLoginToast();
    }, 3600);

    return () => {
      window.removeEventListener("resize", measurePosition);
      window.removeEventListener("scroll", measurePosition);
      cancelAnimationFrame(enterFrame);
      clearTimeout(exitTimer);
      clearTimeout(dismissTimer);
    };
  }, [showLoginToast, toastKey, dismissLoginToast, measurePosition]);

  if (!showLoginToast) {
    return null;
  }

  const isExiting = animPhase === "exit";

  return (
    <>
      <style jsx global>{`
        @keyframes toastSpringIn {
          0% {
            opacity: 0;
            transform: translateY(-16px) scale(0.86);
            filter: blur(4px);
          }
          65% {
            opacity: 1;
            transform: translateY(3px) scale(1.02);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes toastSpringOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px) scale(0.9);
            filter: blur(3px);
          }
        }

        @keyframes checkmarkPop {
          0% {
            transform: scale(0) rotate(-60deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.22) rotate(8deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes toastProgressDeplete {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }

        @keyframes toastPulseGlow {
          0%, 100% {
            box-shadow: 0 12px 30px -4px rgba(0, 0, 0, 0.8),
                        0 0 20px -2px rgba(217, 165, 116, 0.35),
                        inset 0 1px 0 rgba(255, 255, 255, 0.16);
          }
          50% {
            box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.9),
                        0 0 28px 2px rgba(217, 165, 116, 0.55),
                        inset 0 1px 0 rgba(255, 255, 255, 0.22);
          }
        }
      `}</style>

      <div
        id="loginSuccessToast"
        role="status"
        aria-live="polite"
        className="fixed z-[100] pointer-events-auto select-none"
        style={{
          top: `${coords.top}px`,
          right: `${coords.right}px`,
        }}
      >
        <div
          onClick={() => {
            setAnimPhase("exit");
            setTimeout(dismissLoginToast, 350);
          }}
          title="Click to dismiss"
          className="group relative overflow-hidden flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 rounded-full border backdrop-blur-xl cursor-pointer will-change-transform transition-transform hover:scale-[1.03] active:scale-[0.98]"
          style={{
            animation: isExiting
              ? "toastSpringOut 350ms cubic-bezier(0.4, 0, 0.2, 1) forwards"
              : "toastSpringIn 420ms cubic-bezier(0.16, 1.35, 0.3, 1) forwards, toastPulseGlow 2.5s ease-in-out infinite",
            backgroundColor: "#1D1611",
            borderColor: "rgba(217, 165, 116, 0.7)",
          }}
        >
          {/* Animated Gold Checkmark Badge */}
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full shrink-0 shadow-sm"
            style={{
              background: "linear-gradient(135deg, var(--accent-soft), var(--accent))",
              color: "#15100C",
              animation: "checkmarkPop 480ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 80ms backwards",
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

          {/* Crisp Message Text */}
          <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-tight whitespace-nowrap text-[#FAF7F2]">
            Successfully logged in
          </span>

          {/* Subtle Close '×' Icon on hover */}
          <span
            className="opacity-40 group-hover:opacity-100 transition-opacity text-xs font-mono ml-0.5 text-[#D9A574]"
            aria-hidden="true"
          >
            ×
          </span>

          {/* Slim Timer Depletion Line at the bottom */}
          <div
            className="absolute bottom-0 left-0 h-[2px] rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #B97A4C, #F0A15A)",
              animation: "toastProgressDeplete 3200ms linear forwards",
            }}
          />
        </div>
      </div>
    </>
  );
}
