import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Loader from "@/components/Loader";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingControls from "@/components/FloatingControls";
import AuthModal from "@/components/AuthModal";
import LoginSuccessToast from "@/components/LoginSuccessToast";
import ScrollRevealObserver from "@/components/ScrollRevealObserver";
import JsonLd from "@/components/JsonLd";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = rawSiteUrl
  ? (rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`).replace(/\/+$/, "")
  : "https://www.rndeveloper.in";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#15100C" },
    { media: "(prefers-color-scheme: light)", color: "#F7F3EE" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "RN Developer — Android Apps, Mobile & Game Development",
  description:
    "RN Developer is an independent software development business specializing in Android applications, casual mobile games, Play Store publishing guidance, and custom web software.",
  keywords: [
    "RN Developer",
    "Android app development",
    "Android app developer India",
    "Mobile app development services",
    "Android game development",
    "Game development",
    "Google Play Store publishing support",
    "Play Console publishing guidance",
    "Website development services",
    "Custom software development",
    "React Native",
    "Kotlin",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "RN Developer" }],
  creator: "RN Developer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "RN Developer — Android Apps, Mobile & Game Development",
    description:
      "RN Developer is an independent software development business specializing in Android applications, casual mobile games, Play Store publishing guidance, and custom web software.",
    siteName: "RN Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "RN Developer — Android Apps, Mobile & Game Development",
    description:
      "RN Developer is an independent software development business specializing in Android applications, casual mobile games, Play Store publishing guidance, and custom web software.",
  },
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('ng-theme');if(saved==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
          }}
        />
        <JsonLd />
      </head>
      <body
        className="min-h-screen font-sans antialiased overflow-x-hidden"
        style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
      >
        <AuthProvider>
          <Loader />
          <ParticlesBackground />
          <Header />
          {children}
          <Footer />
          <FloatingControls />
          <AuthModal />
          <LoginSuccessToast />
          <ScrollRevealObserver />
        </AuthProvider>
      </body>
    </html>
  );
}
