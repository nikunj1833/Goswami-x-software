import Link from "next/link";

export default function WorkSection() {
  return (
    <section id="work" className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[64rem] px-6 pt-20 md:px-10 md:pt-28">
        <div className="reveal flex items-end justify-between gap-6">
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: "var(--fg)" }}>
            Selected work
          </h2>
          <p className="hidden font-mono text-sm md:block" style={{ color: "var(--fg-soft)" }}>
            7 projects
          </p>
        </div>
        <p className="reveal mt-4 max-w-[38rem]" style={{ color: "var(--fg-soft)" }}>
          Keep scrolling — each project pins at the top before the next one slides over it.
        </p>
      </div>

      <div className="mx-auto max-w-[64rem] px-6 pb-24 pt-12 md:px-10 md:pb-32">
        {/* Project 1: EarnPro */}
        <div
          className="stack-card"
          style={{
            zIndex: 1,
            background: "linear-gradient(155deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 85%, var(--bg)) 100%)",
            borderColor: "var(--line)",
            boxShadow: "0 20px 45px -15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--accent)", backgroundColor: "var(--bg-soft)" }}>
              MOBILE APP · 01
            </span>
            <span className="stack-index select-none" style={{ color: "var(--fg)", opacity: 0.15 }}>
              01
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "var(--accent)", opacity: 0.75 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="12" cy="18" r="0.9" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "var(--fg-soft)" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Solo build
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Cross-platform
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "var(--accent)" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              EarnPro
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              A React Native app for a premium earning &amp; rewards experience — reusable UI,
              navigation, haptics, and smooth transitions.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                React Native
              </span>
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                Firebase
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "var(--accent)" }} />
          </div>
        </div>

        {/* Project 2: SmartAlarm */}
        <div
          className="stack-card"
          style={{
            zIndex: 2,
            background: "linear-gradient(155deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 85%, var(--bg)) 100%)",
            borderColor: "var(--line)",
            boxShadow: "0 20px 45px -15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--accent)", backgroundColor: "var(--bg-soft)" }}>
              MOBILE APP · 02
            </span>
            <span className="stack-index select-none" style={{ color: "var(--fg)", opacity: 0.15 }}>
              02
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "var(--accent)", opacity: 0.75 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="12" cy="18" r="0.9" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "var(--fg-soft)" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Native Android
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Background tasks
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "var(--accent)" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              SmartAlarm
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              An Android alarm app using Kotlin AlarmManager and Notifee — native integration,
              notifications, and persistent state.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                Kotlin
              </span>
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                Notifee
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "var(--accent)" }} />
          </div>
        </div>

        {/* Project 3: E-Commerce Cart */}
        <div
          className="stack-card"
          style={{
            zIndex: 3,
            background: "linear-gradient(155deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 85%, var(--bg)) 100%)",
            borderColor: "var(--line)",
            boxShadow: "0 20px 45px -15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--accent)", backgroundColor: "var(--bg-soft)" }}>
              WEB APP · 03
            </span>
            <span className="stack-index select-none" style={{ color: "var(--fg)", opacity: 0.15 }}>
              03
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "var(--accent)", opacity: 0.75 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "var(--fg-soft)" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Cart logic
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Responsive UI
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "var(--accent)" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              E-Commerce Cart
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              A React shopping app with cart state management, live updates, and a responsive UI.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                React.js
              </span>
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                JavaScript
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "var(--accent)" }} />
          </div>
        </div>

        {/* Project 4: Employee Management */}
        <div
          className="stack-card"
          style={{
            zIndex: 4,
            background: "linear-gradient(155deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 85%, var(--bg)) 100%)",
            borderColor: "var(--line)",
            boxShadow: "0 20px 45px -15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--accent)", backgroundColor: "var(--bg-soft)" }}>
              WEB APP · 04
            </span>
            <span className="stack-index select-none" style={{ color: "var(--fg)", opacity: 0.15 }}>
              04
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "var(--accent)", opacity: 0.75 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "var(--fg-soft)" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Auth &amp; roles
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Live database
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "var(--accent)" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              Employee Management
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              A React and Firebase based system for managing employee records.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                React.js
              </span>
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                Firebase
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "var(--accent)" }} />
          </div>
        </div>

        {/* Project 5: Movie Browser */}
        <div
          className="stack-card"
          style={{
            zIndex: 5,
            background: "linear-gradient(155deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 85%, var(--bg)) 100%)",
            borderColor: "var(--line)",
            boxShadow: "0 20px 45px -15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--accent)", backgroundColor: "var(--bg-soft)" }}>
              WEB APP · 05
            </span>
            <span className="stack-index select-none" style={{ color: "var(--fg)", opacity: 0.15 }}>
              05
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "var(--accent)", opacity: 0.75 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "var(--fg-soft)" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                API integration
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Search &amp; filter
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "var(--accent)" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              Movie Browser
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              A clean movie discovery app built with React, focused on browsing without friction.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                React.js
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "var(--accent)" }} />
          </div>
        </div>

        {/* Project 6: Meal Finder */}
        <div
          className="stack-card"
          style={{
            zIndex: 6,
            background: "linear-gradient(155deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 85%, var(--bg)) 100%)",
            borderColor: "var(--line)",
            boxShadow: "0 20px 45px -15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--accent)", backgroundColor: "var(--bg-soft)" }}>
              WEB APP · 06
            </span>
            <span className="stack-index select-none" style={{ color: "var(--fg)", opacity: 0.15 }}>
              06
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "var(--accent)", opacity: 0.75 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "var(--fg-soft)" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Recipe API
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Fast search
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "var(--accent)" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              Meal Finder
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              A React app for discovering meals and recipes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                React.js
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "var(--accent)" }} />
          </div>
        </div>

        {/* Project 7: This Portfolio */}
        <div
          className="stack-card"
          style={{
            zIndex: 7,
            background: "linear-gradient(155deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 85%, var(--bg)) 100%)",
            borderColor: "var(--line)",
            boxShadow: "0 20px 45px -15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--accent)", backgroundColor: "var(--bg-soft)" }}>
              WEB APP · 07
            </span>
            <span className="stack-index select-none" style={{ color: "var(--fg)", opacity: 0.15 }}>
              07
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "var(--accent)", opacity: 0.75 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "var(--fg-soft)" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Fully custom
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                Hand-built
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "var(--accent)" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
            >
              This Portfolio
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              The official RN Developer website presenting the business and its digital products.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                Next.js
              </span>
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                TypeScript
              </span>
              <span className="stack-tag" style={{ borderColor: "var(--line)", color: "var(--fg-soft)", backgroundColor: "var(--bg-soft)" }}>
                Tailwind CSS
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "var(--accent)" }} />
          </div>
        </div>

        {/* Portfolio Page Link Banner */}
        <div
          className="reveal mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border p-6 sm:p-8 text-center sm:text-left"
          style={{ backgroundColor: "var(--bg-soft)", borderColor: "var(--line)" }}
        >
          <div>
            <h3 className="font-serif text-xl sm:text-2xl" style={{ color: "var(--fg)" }}>
              Want to see detailed technical highlights of all projects?
            </h3>
            <p className="mt-1 text-sm leading-relaxed max-w-xl" style={{ color: "var(--fg-soft)" }}>
              Explore our dedicated portfolio page featuring architectural breakdowns of mobile apps, Kotlin background utilities, and responsive web platforms.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/portfolio"
              className="btn-primary rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium"
              style={{ color: "var(--bg)" }}
            >
              Explore Full Portfolio →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
