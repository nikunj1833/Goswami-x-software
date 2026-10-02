/**
 * Utility functions for environment-aware site and auth redirect URLs.
 * Ensures localhost is strictly used for local development and
 * https://goswami-x-software.vercel.app is used in production.
 */

export const PRODUCTION_SITE_URL = "https://goswami-x-software.vercel.app";

/**
 * Returns the base site URL for the current environment.
 */
export function getSiteUrl(): string {
  // 1. If explicit environment variable is defined
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl && typeof envUrl === "string") {
    const trimmed = envUrl.trim().replace(/\/+$/, "");
    if (trimmed.length > 0) {
      return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    }
  }

  // 2. In browser runtime
  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    const origin = window.location.origin;

    // Localhost or loopback
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".local")
    ) {
      return origin.replace(/\/+$/, "");
    }

    // Production / Vercel deployment domain
    if (origin && origin.startsWith("https://")) {
      return origin.replace(/\/+$/, "");
    }
  }

  // 3. Fallback to production canonical URL
  return PRODUCTION_SITE_URL;
}

/**
 * Returns the exact absolute OAuth callback URL.
 * Example:
 *   - Local: http://localhost:3000/auth/callback
 *   - Production: https://goswami-x-software.vercel.app/auth/callback
 */
export function getAuthCallbackUrl(): string {
  const baseUrl = getSiteUrl();
  return `${baseUrl}/auth/callback`;
}
