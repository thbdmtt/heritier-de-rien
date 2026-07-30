import type { MetadataRoute } from "next";
import { absoluteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-07-30",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/le-livre/"),
      lastModified: "2026-07-30",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/acheter/"),
      lastModified: "2026-07-30",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/extrait/"),
      lastModified: "2026-07-30",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/a-propos/"),
      lastModified: "2026-07-30",
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
