import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import ProjectCard from "@/components/sections/ProjectCard";
import CtaBand from "@/components/sections/CtaBand";
import TraceCard from "@/components/ui/TraceCard";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { ArrowUpRight, Check, ServiceIcon } from "@/components/ui/Icons";
import { services, serviceBySlug } from "@/content/services";
import { projects } from "@/content/projects";
import { pageMeta } from "@/lib/meta";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return pageMeta({ title: `${s.title} in Kerala`, description: `${s.short} ${s.intro}`.slice(0, 300), path: `/services/${s.slug}` });
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={null}>
      <ServiceBody params={params} />
    </Suspense>
  );
}

async function ServiceBody({ params }: Pick<PageProps<"/services/[slug]">, "params">) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const related = projects.filter((p) => p.services.includes(s.slug)).slice(0, 3);
  const others = services.filter((x) => x.slug !== s.slug);
  const isTurnkey = s.slug === "turnkey-construction";
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.title }]}
          eyebrow={`${s.group} · Service`}
          title={s.title}
          lead={s.intro}
          meta={
            <span className="phero__icon">
              <ServiceIcon name={s.icon} />
            </span>
          }
        >
          <Button href="/contact" variant="sky">Discuss Your Project</Button>
          <Button href="/projects" variant="outline-light">Explore Our Projects</Button>
        </PageHero>
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section container">
          <div className="split">
            <div>
              <p className="eyebrow">Overview</p>
              <RevealText as="h2" className="h2">{s.overview.heading}</RevealText>
            </div>
            <Reveal className="prose">
              {s.overview.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>

          <div className="covers">
            <SectionHead eyebrow={isTurnkey ? "Managed by us" : "Scope"} title={s.covers.heading} />
            <Reveal className="covers__grid" stagger={0.06}>
              {s.covers.items.map((it, i) => (
                <TraceCard key={it.title} className="cover">
                  <span className="cover__no">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </TraceCard>
              ))}
            </Reveal>
          </div>
        </section>
      </StackPanel>

      <StackPanel tone="dark">
        <section className="section container">
          <SectionHead light eyebrow="Approach" title={s.approach.heading} />
          <Reveal className="timeline" stagger={0.08}>
            {s.approach.steps.map((st, i) => (
              <div className="timeline__item" key={st.title}>
                <span className="timeline__dot">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </section>
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <SectionHead eyebrow={isTurnkey ? "Your part" : "Considerations"} title={s.considerations.heading} />
          <Reveal className="considerations">
            {s.considerations.items.map((c) => (
              <div className="consider" key={c.title}>
                <Check />
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </Reveal>

          {isTurnkey && (
            <div className="scope-lists">
              <SectionHead eyebrow="Scope clarity" title="Inclusions, exclusions and optional services" />
              <Reveal className="scope-lists__grid">
                <TraceCard className="scope-list scope-list--in">
                  <h3>Typically included</h3>
                  <ul>
                    <li>Design and planning for the agreed scope</li>
                    <li>Civil and structural works</li>
                    <li>Agreed electrical and plumbing works</li>
                    <li>Agreed flooring, painting and finishes</li>
                    <li>Coordination of all trades on site</li>
                  </ul>
                </TraceCard>
                <TraceCard className="scope-list scope-list--out">
                  <h3>Typically excluded</h3>
                  <ul>
                    <li>Land and land-related costs</li>
                    <li>Statutory fees, unless agreed</li>
                    <li>Loose furniture and appliances</li>
                    <li>Items not listed in the proposal</li>
                  </ul>
                </TraceCard>
                <TraceCard className="scope-list scope-list--opt">
                  <h3>Optional services</h3>
                  <ul>
                    <li>Interior design and joinery</li>
                    <li>Landscaping and outdoor works</li>
                    <li>Compound wall and gate</li>
                    <li>Other items, as agreed</li>
                  </ul>
                </TraceCard>
              </Reveal>
            </div>
          )}

          {s.note && <p className="callout">{s.note}</p>}
        </section>
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section container">
          <SectionHead
            eyebrow="Project examples"
            title={`Related projects`}
            lead="Demo examples showing how related case studies will appear."
            aside={<Button href="/projects" variant="ghost">All projects</Button>}
          />
          {related.length > 0 ? (
            <Reveal className="pgrid pgrid--3">
              {related.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </Reveal>
          ) : (
            <p className="lead">Project examples for this service will be added soon.</p>
          )}
        </section>
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <div className="split">
            <SectionHead eyebrow="FAQs" title={`Common questions about ${s.title.toLowerCase()}`} />
            <Accordion items={s.faqs} />
          </div>
          <div className="other-services">
            <p className="eyebrow">Other services</p>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="other-link">
                    <ServiceIcon name={o.icon} />
                    <span>{o.title}</span>
                    <ArrowUpRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </StackPanel>

      <StackPanel tone="navy">
        <section className="section">
          <CtaBand title={s.cta} interest={s.title} />
        </section>
      </StackPanel>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </Stack>
  );
}
