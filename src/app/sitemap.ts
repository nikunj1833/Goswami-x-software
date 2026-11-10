import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const baseUrl = rawUrl
    ? (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`).replace(/\/+$/, "")
    : "https://www.rndeveloper.in";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
