import type { MetadataRoute } from "next";
import { getParts } from "@/lib/catalog";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const parts = await getParts();
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
