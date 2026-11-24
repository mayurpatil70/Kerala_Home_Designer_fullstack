import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { articles } from "@/content/journal";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/projects", "/process", "/testimonials", "/journal", "/contact", "/faqs", "/privacy-policy", "/terms-and-conditions"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...articles.map((a) => ({ url: `${base}/journal/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
