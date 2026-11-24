import type { Metadata } from "next";
import { site } from "@/content/site";

/** Per-page metadata with a canonical URL (resolved against metadataBase). */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, siteName: site.name, type: "website", locale: "en_IN" },
  };
}
