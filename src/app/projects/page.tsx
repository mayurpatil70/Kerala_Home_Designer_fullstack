import type { Metadata } from "next";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import GalleryRight, { type GalleryTile } from "@/components/sections/GalleryRight";
import ProjectsExplorer from "@/components/sections/ProjectsExplorer";
import CtaBand from "@/components/sections/CtaBand";
import { projects } from "@/content/projects";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Our Projects",
  description: "Residential and commercial projects by The Home Designers across Kerala, filterable by category, status and service.",
  path: "/projects",
});

const tiles: GalleryTile[] = projects.flatMap((p) =>
  p.gallery.map((g) => ({ title: g.caption, meta: `${p.title} · ${p.location}`, art: g.art, href: `/projects/${p.slug}` })),
);
const half = Math.ceil(tiles.length / 2);

export default function ProjectsPage() {
  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Our Projects" }]}
          eyebrow="Portfolio"
          title="Completed and ongoing projects across Kerala"
          lead="Browse homes, commercial buildings, interiors and renovations. Filter by category, status or the service delivered."
        />
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section section--gallery">
          <div className="container">
            <SectionHead eyebrow="Gallery" title="A glimpse of the work" lead="Placeholder drawings mark where project photographs will go." />
          </div>
          <GalleryRight rows={[tiles.slice(0, half), tiles.slice(half)]} />
        </section>
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <SectionHead eyebrow="All projects" title="Find projects like yours" lead="Demo entries showing how the portfolio works. Replace them with approved projects and photographs." />
          <ProjectsExplorer />
        </section>
      </StackPanel>

      <StackPanel tone="navy">
        <section className="section">
          <CtaBand title="Planning something similar?" text="Tell us about your project. We'll share relevant experience and explain how we would approach it." secondary={{ label: "Our Process", href: "/process" }} />
        </section>
      </StackPanel>
    </Stack>
  );
}
