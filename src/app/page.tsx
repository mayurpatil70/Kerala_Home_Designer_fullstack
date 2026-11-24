import type { Metadata } from "next";
import Link from "next/link";
import { Stack, StackPanel } from "@/components/stack/Stack";
import HomeHero from "@/components/sections/HomeHero";
import Statement from "@/components/sections/Statement";
import SectionHead from "@/components/sections/SectionHead";
import ServiceGrid from "@/components/sections/ServiceGrid";
import BuildStory from "@/components/sections/BuildStory";
import GalleryRight, { type GalleryTile } from "@/components/sections/GalleryRight";
import JournalCard from "@/components/sections/JournalCard";
import CtaBand from "@/components/sections/CtaBand";
import TraceCard from "@/components/ui/TraceCard";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Quote } from "@/components/ui/Icons";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { articles } from "@/content/journal";
import { why } from "@/content/pages";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Construction & Design Company in Kerala",
    description: site.positioning,
    path: "/",
  }),
  title: { absolute: `${site.name} | Construction & Design Company in Kerala` },
};

const tiles: GalleryTile[] = projects.map((p) => ({
  title: p.title,
  meta: `${p.category} · ${p.location}`,
  tag: p.status,
  art: p.art,
  href: `/projects/${p.slug}`,
}));

export default function Home() {
  return (
    <>
      <Stack>
        <StackPanel tone="navy" label="Introduction">
          <HomeHero />
        </StackPanel>

        <StackPanel tone="paper" label="About The Home Designers">
          <section className="section">
            <Statement
              eyebrow="Who we are"
              text={site.positioning}
              facts={[
                { value: "6", label: "Design & construction services" },
                { value: "Kerala", label: "Projects across the state" },
                { value: "Budget → Luxury", label: "Solutions for every segment" },
                { value: "Homes & Business", label: "Residential and commercial" },
              ]}
            />
          </section>
        </StackPanel>

        <StackPanel tone="light" label="Services">
          <section className="section container">
            <SectionHead
              eyebrow="What we do"
              title="Six services, one dependable team"
              lead="Engineers, interior designers and contractors working together, from the first sketch to the final handover."
              aside={<Button href="/services" variant="ghost">All services</Button>}
            />
            <ServiceGrid />
          </section>
        </StackPanel>

        <StackPanel tone="navy" label="Our process" className="stack-panel--flush">
          <BuildStory />
        </StackPanel>

        <StackPanel tone="paper" label="Featured projects">
          <section className="section section--gallery">
            <div className="container">
              <SectionHead
                eyebrow="Featured projects"
                title="Work across homes and businesses"
                lead="Demo project cards. Each will link to a full case study with photographs once real projects are added."
                aside={<Button href="/projects" variant="ghost">Explore Our Projects</Button>}
              />
            </div>
            <GalleryRight rows={[tiles, [...tiles].reverse()]} />
          </section>
        </StackPanel>

        <StackPanel tone="dark" label="Why choose us">
          <section className="section container">
            <SectionHead light eyebrow="Why The Home Designers" title="What you can expect working with us" />
            <Reveal className="why" stagger={0.06}>
              {why.map((w, i) => (
                <TraceCard key={w.title} className="why__card">
                  <span className="why__no">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </TraceCard>
              ))}
            </Reveal>
          </section>
        </StackPanel>

        <StackPanel tone="light" label="Testimonials">
          <section className="section container">
            <SectionHead
              eyebrow="Client feedback"
              title="Words from our clients"
              lead="Genuine testimonials will appear here once clients approve them for publication."
              aside={<Button href="/testimonials" variant="ghost">Testimonials</Button>}
            />
            <Reveal className="tgrid tgrid--3">
              {[0, 1, 2].map((i) => (
                <TraceCard key={i} className="tslot">
                  <Quote className="tslot__mark" />
                  <p className="tslot__text">Approved client feedback will be shown here.</p>
                  <p className="tslot__who">Client name · Project type · Location</p>
                  <span className="tslot__badge">Placeholder</span>
                </TraceCard>
              ))}
            </Reveal>
          </section>
        </StackPanel>

        <StackPanel tone="paper" label="Blog Journal">
          <section className="section container">
            <SectionHead
              eyebrow="Blog Journal"
              title="Guidance for planning your project"
              aside={<Button href="/journal" variant="ghost">All articles</Button>}
            />
            <Reveal className="jgrid jgrid--3">
              {articles.slice(0, 3).map((a, i) => (
                <JournalCard key={a.slug} a={a} index={i} />
              ))}
            </Reveal>
            <p className="more-link">
              <Link href="/faqs" className="link-wave">Have a quick question? Read our FAQs</Link>
            </p>
          </section>
        </StackPanel>

        <StackPanel tone="navy" label="Contact">
          <section className="section">
            <CtaBand />
          </section>
        </StackPanel>
      </Stack>
    </>
  );
}
