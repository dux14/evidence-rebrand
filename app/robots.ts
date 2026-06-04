import type { MetadataRoute } from "next";

// Crawl permitido (incluidos bots de citación IA) para que el meta noindex
// sea visible; la indexación se controla con metadata.robots en layout.tsx.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://evidence-rebrand.vercel.app/sitemap.xml",
  };
}
