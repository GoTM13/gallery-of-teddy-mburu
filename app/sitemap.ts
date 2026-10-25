import type { MetadataRoute } from "next";
import { getPrints } from "@/lib/prints";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://galleryofteddymburu.com";
  const prints = await getPrints();
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    ...prints.map((p) => ({
      url: `${base}/print/${p.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
