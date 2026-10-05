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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

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
  title: "Goswami X Software — Nikunj Giri, Full-Stack Developer",
  description:
    "Nikunj Giri — self-taught Full-Stack Developer building real projects across web and mobile, one at a time. Goswami X Software.",
  keywords: [
    "Nikunj Giri",
    "Goswami X Software",
    "Full-Stack Developer",
    "React Native",
    "React.js",
    "Kotlin",
    "Android Developer",
    "Firebase",
    "TypeScript",
  ],
  authors: [{ name: "Nikunj Giri" }],
  creator: "Nikunj Giri",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Goswami X Software — Nikunj Giri, Full-Stack Developer",
    description:
      "Nikunj Giri — self-taught Full-Stack Developer building real projects across web and mobile, one at a time.",
    siteName: "Goswami X Software",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goswami X Software — Nikunj Giri, Full-Stack Developer",
    description:
      "Nikunj Giri — self-taught Full-Stack Developer building real projects across web and mobile, one at a time.",
  },
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  alternates: siteUrl ? { canonical: "/" } : undefined,
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
