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
            background: "#FFFFFF",
            borderColor: "rgba(0,0,0,.10)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "#161009", color: "#161009" }}>
              MOBILE APP · 01
            </span>
            <span className="stack-index select-none" style={{ color: "#161009" }}>
              01
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "#C9600F", opacity: 0.55 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="12" cy="18" r="0.9" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "#4A3E33" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#C9600F" }} />
                Solo build
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#C9600F" }} />
                Cross-platform
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "#C9600F" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-4xl md:text-5xl"
              style={{ color: "#161009", letterSpacing: "-0.02em" }}
            >
              EarnPro
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "#4A3E33" }}>
              A React Native app for a premium earning &amp; rewards experience — reusable UI,
              navigation, haptics, and smooth transitions.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "#161009", color: "#161009" }}>
                React Native
              </span>
              <span className="stack-tag" style={{ borderColor: "#161009", color: "#161009" }}>
                Firebase
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "#C9600F" }} />
          </div>
        </div>

        {/* Project 2: SmartAlarm */}
        <div
          className="stack-card"
          style={{
            zIndex: 2,
            background: "linear-gradient(155deg,#3D2414,#241309)",
            borderColor: "rgba(255,255,255,.10)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "#F3E7BE", color: "#F3E7BE" }}>
              MOBILE APP · 02
            </span>
            <span className="stack-index select-none" style={{ color: "#F3E7BE" }}>
              02
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "#F3902B", opacity: 0.55 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="12" cy="18" r="0.9" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "#E4D6C6" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#F3902B" }} />
                Native Android
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#F3902B" }} />
                Background tasks
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "#F3902B" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-4xl md:text-5xl"
              style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
            >
              SmartAlarm
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "#E4D6C6" }}>
              An Android alarm app using Kotlin AlarmManager and Notifee — native integration,
              notifications, and persistent state.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "#F3E7BE", color: "#F3E7BE" }}>
                Kotlin
              </span>
              <span className="stack-tag" style={{ borderColor: "#F3E7BE", color: "#F3E7BE" }}>
                Notifee
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "#F3902B" }} />
          </div>
        </div>

        {/* Project 3: E-Commerce Cart */}
        <div
          className="stack-card"
          style={{
            zIndex: 3,
            background: "linear-gradient(155deg,#F3902B,#C9600F)",
            borderColor: "rgba(0,0,0,.16)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "#1A0C02", color: "#1A0C02" }}>
              WEB APP · 03
            </span>
            <span className="stack-index select-none" style={{ color: "#1A0C02" }}>
              03
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "#241005", opacity: 0.55 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "#2E1706" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#241005" }} />
                Cart logic
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#241005" }} />
                Responsive UI
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "#241005" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-4xl md:text-5xl"
              style={{ color: "#1A0C02", letterSpacing: "-0.02em" }}
            >
              E-Commerce Cart
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "#2E1706" }}>
              A React shopping app with cart state management, live updates, and a responsive UI.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "#1A0C02", color: "#1A0C02" }}>
                React.js
              </span>
              <span className="stack-tag" style={{ borderColor: "#1A0C02", color: "#1A0C02" }}>
                JavaScript
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "#241005" }} />
          </div>
        </div>

        {/* Project 4: Employee Management */}
        <div
          className="stack-card"
          style={{
            zIndex: 4,
            background: "linear-gradient(160deg,#1C120A,#0D0805)",
            borderColor: "rgba(255,255,255,.08)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "#EFCE9E", color: "#EFCE9E" }}>
              WEB APP · 04
            </span>
            <span className="stack-index select-none" style={{ color: "#EFCE9E" }}>
              04
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "#F3902B", opacity: 0.55 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "#CBB49B" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#F3902B" }} />
                Auth &amp; roles
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#F3902B" }} />
                Live database
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "#F3902B" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-4xl md:text-5xl"
              style={{ color: "#FBF3E4", letterSpacing: "-0.02em" }}
            >
              Employee Management
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "#CBB49B" }}>
              A React and Firebase based system for managing employee records.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "#EFCE9E", color: "#EFCE9E" }}>
                React.js
              </span>
              <span className="stack-tag" style={{ borderColor: "#EFCE9E", color: "#EFCE9E" }}>
                Firebase
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "#F3902B" }} />
          </div>
        </div>

        {/* Project 5: Movie Browser */}
        <div
          className="stack-card"
          style={{
            zIndex: 5,
            background: "linear-gradient(155deg,#C89B6B,#A97A45)",
            borderColor: "rgba(0,0,0,.16)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "#1A0D02", color: "#1A0D02" }}>
              WEB APP · 05
            </span>
            <span className="stack-index select-none" style={{ color: "#1A0D02" }}>
              05
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "#2E1B08", opacity: 0.55 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "#33200A" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#2E1B08" }} />
                API integration
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#2E1B08" }} />
                Search &amp; filter
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "#2E1B08" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-4xl md:text-5xl"
              style={{ color: "#1A0D02", letterSpacing: "-0.02em" }}
            >
              Movie Browser
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "#33200A" }}>
              A clean movie discovery app built with React, focused on browsing without friction.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "#1A0D02", color: "#1A0D02" }}>
                React.js
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "#2E1B08" }} />
          </div>
        </div>

        {/* Project 6: Meal Finder */}
        <div
          className="stack-card"
          style={{
            zIndex: 6,
            background: "linear-gradient(155deg,#B2472A,#7A2E19)",
            borderColor: "rgba(255,255,255,.10)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "#FFF6EE", color: "#FFF6EE" }}>
              WEB APP · 06
            </span>
            <span className="stack-index select-none" style={{ color: "#FFF6EE" }}>
              06
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "#241309", opacity: 0.55 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "#F0D4C4" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#241309" }} />
                Recipe API
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#241309" }} />
                Fast search
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "#241309" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-4xl md:text-5xl"
              style={{ color: "#FFF6EE", letterSpacing: "-0.02em" }}
            >
              Meal Finder
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "#F0D4C4" }}>
              A React app for discovering meals and recipes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "#FFF6EE", color: "#FFF6EE" }}>
                React.js
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "#241309" }} />
          </div>
        </div>

        {/* Project 7: This Portfolio */}
        <div
          className="stack-card"
          style={{
            zIndex: 7,
            background: "linear-gradient(155deg,#4A4038,#2E271F)",
            borderColor: "rgba(255,255,255,.09)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="stack-tag" style={{ borderColor: "#FBF6EF", color: "#FBF6EF" }}>
              WEB APP · 07
            </span>
            <span className="stack-index select-none" style={{ color: "#FBF6EF" }}>
              07
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div style={{ color: "#F3902B", opacity: 0.55 }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.2" cy="6.5" r=".6" fill="currentColor" />
                <circle cx="7.2" cy="6.5" r=".6" fill="currentColor" />
              </svg>
            </div>
            <ul className="space-y-2 text-sm sm:text-right" style={{ color: "#D6C9B9" }}>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#F3902B" }} />
                Fully custom
              </li>
              <li className="flex items-center gap-2 sm:justify-end">
                <span className="h-1 w-1 rounded-full" style={{ background: "#F3902B" }} />
                Hand-built
              </li>
            </ul>
          </div>

          <div>
            <p className="stack-eyebrow" style={{ color: "#F3902B" }}>
              Featured Build
            </p>
            <h3
              className="mt-3 font-serif text-4xl md:text-5xl"
              style={{ color: "#FBF6EF", letterSpacing: "-0.02em" }}
            >
              This Portfolio
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "#D6C9B9" }}>
              My personal frontend portfolio — the very site you&apos;re looking at.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="stack-tag" style={{ borderColor: "#FBF6EF", color: "#FBF6EF" }}>
                HTML5
              </span>
              <span className="stack-tag" style={{ borderColor: "#FBF6EF", color: "#FBF6EF" }}>
                CSS3
              </span>
            </div>
            <div className="stack-divider mt-7" style={{ background: "#F3902B" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
