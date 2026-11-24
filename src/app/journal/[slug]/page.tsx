import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import JournalCard from "@/components/sections/JournalCard";
import CtaBand from "@/components/sections/CtaBand";
import Accordion from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, ServiceIcon } from "@/components/ui/Icons";
import { articles, articleBySlug } from "@/content/journal";
import { serviceBySlug } from "@/content/services";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return pageMeta({ title: a.title, description: a.excerpt, path: `/journal/${a.slug}` });
}

export default function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  return (
    <Suspense fallback={null}>
      <ArticleBody params={params} />
    </Suspense>
  );
}

const toId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function ArticleBody({ params }: Pick<PageProps<"/journal/[slug]">, "params">) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();

  const related = articles.filter((x) => x.slug !== a.slug && (x.category === a.category || x.services.some((s) => a.services.includes(s)))).slice(0, 3);
  const svc = a.services.map((s) => serviceBySlug(s)).filter((s) => s !== undefined);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    articleSection: a.category,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal" }, { label: a.category }]}
          eyebrow={a.category}
          title={a.title}
          lead={a.excerpt}
          meta={
            <p className="article-meta">
              <span>{a.minutes} min read</span>
              <span>By The Home Designers</span>
              <span className="draft-badge draft-badge--light">Draft for review</span>
            </p>
          }
        />
      </StackPanel>

      <StackPanel tone="paper" className="stack-panel--tall">
        <section className="section container">
          <div className="article">
            <aside className="article__toc" aria-label="On this page">
              <p className="eyebrow">On this page</p>
              <ol>
                {a.sections.map((s) => (
                  <li key={s.h}><a href={`#${toId(s.h)}`} className="link-wave">{s.h}</a></li>
                ))}
                {a.faqs.length > 0 && <li><a href="#faqs" className="link-wave">FAQs</a></li>}
              </ol>
            </aside>
            <article className="article__body prose">
              {a.sections.map((s) => (
                <section key={s.h} id={toId(s.h)}>
                  <h2>{s.h}</h2>
                  {s.p.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                  {s.list && (
                    <ul>
                      {s.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {a.faqs.length > 0 && (
                <section id="faqs">
                  <h2>FAQs</h2>
                  <Accordion items={a.faqs} defaultOpen={null} />
                </section>
              )}

              <div className="article__services">
                <p className="eyebrow">Related services</p>
                <ul>
                  {svc.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="other-link">
                        <ServiceIcon name={s.icon} />
                        <span>{s.title}</span>
                        <ArrowUpRight />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="article__disclaimer">General guidance only. Requirements, rules and costs vary by project and location; please confirm details for your own site.</p>
            </article>
          </div>
        </section>
      </StackPanel>

      {related.length > 0 && (
        <StackPanel tone="light">
          <section className="section container">
            <SectionHead eyebrow="Keep reading" title="Related articles" />
            <Reveal className="jgrid jgrid--3">
              {related.map((r, i) => (
                <JournalCard key={r.slug} a={r} index={i} />
              ))}
            </Reveal>
          </section>
        </StackPanel>
      )}

      <StackPanel tone="navy">
        <section className="section">
          <CtaBand title="Want advice for your own project?" interest={svc[0]?.title} />
        </section>
      </StackPanel>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </Stack>
  );
}
