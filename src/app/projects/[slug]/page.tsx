import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import GalleryRight from "@/components/sections/GalleryRight";
import ProjectCard from "@/components/sections/ProjectCard";
import CtaBand from "@/components/sections/CtaBand";
import TraceCard from "@/components/ui/TraceCard";
import Button from "@/components/ui/Button";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/Icons";
import { projects, projectBySlug } from "@/content/projects";
import { serviceBySlug } from "@/content/services";
import { pageMeta } from "@/lib/meta";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return pageMeta({ title: `${p.title}, ${p.location}`, description: p.summary, path: `/projects/${p.slug}` });
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={null}>
      <ProjectBody params={params} />
    </Suspense>
  );
}

async function ProjectBody({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const related = projects
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 3);
  const serviceList = p.services.map((s) => serviceBySlug(s)).filter((s) => s !== undefined);

  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: p.title }]}
          eyebrow={`${p.category} · ${p.status}`}
          title={p.title}
          lead={p.summary}
          meta={
            <dl className="facts-row">
              <div><dt>Location</dt><dd>{p.location}</dd></div>
              <div><dt>Category</dt><dd>{p.category}</dd></div>
              <div><dt>Status</dt><dd>{p.status}</dd></div>
              <div><dt>Entry</dt><dd>Demo case study</dd></div>
            </dl>
          }
        />
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section section--gallery">
          <div className="container">
            <SectionHead eyebrow="Image gallery" title="Project images" lead="Exterior, interior, detail, progress and before/after photographs go here." />
          </div>
          <GalleryRight rows={[[...p.gallery, ...p.gallery].map((g) => ({ title: g.caption, meta: p.title, art: g.art }))]} />
        </section>
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <div className="split">
            <div>
              <p className="eyebrow">Overview</p>
              <RevealText as="h2" className="h2">The brief and context</RevealText>
            </div>
            <Reveal className="prose">
              <p>{p.overview}</p>
              <p className="services-delivered">
                <strong>Services delivered: </strong>
                {serviceList.map((s, i) => (
                  <span key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="link-wave">{s.title}</Link>
                    {i < serviceList.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          <div className="case-grid">
            <TraceCard className="case-card">
              <p className="eyebrow">Design approach</p>
              <ul className="ticks">
                {p.approach.map((a) => (
                  <li key={a}><Check /> {a}</li>
                ))}
              </ul>
            </TraceCard>
            <TraceCard className="case-card">
              <p className="eyebrow">Scope and highlights</p>
              <ul className="chips-list">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </TraceCard>
            <TraceCard className="case-card">
              <p className="eyebrow">Specifications</p>
              <dl className="specs">
                {p.specs.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="case-note">Details are published only when verified and approved.</p>
            </TraceCard>
          </div>
        </section>
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section container">
          <SectionHead eyebrow="Related projects" title="More work like this" aside={<Button href="/projects" variant="ghost">All projects</Button>} />
          <Reveal className="pgrid pgrid--3">
            {related.map((r) => (
              <ProjectCard key={r.slug} p={r} />
            ))}
          </Reveal>
        </section>
      </StackPanel>

      <StackPanel tone="navy">
        <section className="section">
          <CtaBand
            title={`Planning a similar ${p.category.toLowerCase()} project?`}
            text="Let's talk about your site, requirements and budget, and how we could approach it."
            interest={serviceList[0]?.title}
          />
        </section>
      </StackPanel>
    </Stack>
  );
}
