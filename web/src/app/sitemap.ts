import type { MetadataRoute } from "next";
import { parts } from "@/lib/inventory";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/repuestos", "/encargo", "/como-funciona"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "daily" as const,
  }));
  const partPages = parts.map((p) => ({
    url: `${site.url}/repuestos/${p.slug}`,
    changeFrequency: "weekly" as const,
  }));
  return [...staticPages, ...partPages];
}
