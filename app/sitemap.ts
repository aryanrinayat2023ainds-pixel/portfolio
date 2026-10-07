import type { MetadataRoute } from "next";
import { site, writing } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...writing.map((w) => ({ url: `${site.url}/writing/${w.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
