import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const baseUrl = rawUrl
    ? (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`).replace(/\/+$/, "")
    : "https://www.rndeveloper.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
