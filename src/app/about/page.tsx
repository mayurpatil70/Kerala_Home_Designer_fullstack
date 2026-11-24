import type { Metadata } from "next";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import Statement from "@/components/sections/Statement";
import CtaBand from "@/components/sections/CtaBand";
import TraceCard from "@/components/ui/TraceCard";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Pin, Phone, Mail } from "@/components/ui/Icons";
import { about } from "@/content/pages";
import { site, fullAddress } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description: "The Home Designers is a team of engineers, interior designers and contractors at Muthukulam, Alappuzha, designing and building homes and commercial spaces across Kerala.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
          eyebrow="About us"
          title="Engineers, interior designers and contractors, working as one"
          lead={about.intro}
        >
          <Button href="/contact" variant="sky">Contact Us</Button>
          <Button href="/projects" variant="outline-light">Our Projects</Button>
        </PageHero>
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section">
          <Statement eyebrow="Our positioning" text={site.positioning} />
        </section>
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <div className="split">
            <div>
              <SectionHead eyebrow={about.story.heading} title="How The Home Designers began" />
            </div>
            <Reveal>
              <TraceCard className="note-card">
                <span className="draft-badge">Draft — verified history needed</span>
                <p>{about.story.text}</p>
              </TraceCard>
            </Reveal>
          </div>

          <Reveal className="vm">
            <TraceCard className="vm__card vm__card--sky">
              <p className="vm__label">Vision</p>
              <p className="vm__text">{about.vision.text}</p>
              <span className="draft-badge">Draft for approval</span>
            </TraceCard>
            <TraceCard className="vm__card">
              <p className="vm__label">Mission</p>
              <p className="vm__text">{about.mission.text}</p>
              <span className="draft-badge">Draft for approval</span>
            </TraceCard>
          </Reveal>
        </section>
      </StackPanel>

      <StackPanel tone="dark">
        <section className="section container">
          <SectionHead light eyebrow="Our values" title="What guides our work" />
          <Reveal className="values">
            {about.values.map((v, i) => (
              <TraceCard key={v.title} className="value">
                <span className="value__no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </TraceCard>
            ))}
          </Reveal>
        </section>
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section container">
          <SectionHead eyebrow="Our approach" title="How we work on every project" />
          <Reveal className="steps-row">
            {about.approach.map((a, i) => (
              <div className="step-mini" key={a.title}>
                <span className="step-mini__no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </Reveal>

          <div className="budgets">
            <SectionHead eyebrow="Every budget" title="Working across project types and budgets" lead="We serve budget-conscious, mid-range and premium clients. What changes is the scope and specification, not the care we put in." />
            <Reveal className="budgets__grid">
              {about.budgets.map((b) => (
                <TraceCard key={b.title} className="budget">
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </TraceCard>
              ))}
            </Reveal>
          </div>
        </section>
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <SectionHead eyebrow="Our team" title="The people behind the work" lead="Team profiles, qualifications and credentials will be published once verified." />
          <Reveal className="team">
            {about.team.map((t) => (
              <TraceCard key={t.role} className="member">
                <span className="member__avatar" aria-hidden="true">
                  <svg viewBox="0 0 48 48"><circle cx="24" cy="18" r="8" /><path d="M8 44c2-9 9-14 16-14s14 5 16 14" /></svg>
                </span>
                <h3>{t.role}</h3>
                <p>{t.note}</p>
                <span className="draft-badge">Placeholder</span>
              </TraceCard>
            ))}
          </Reveal>
        </section>
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section container">
          <div className="split split--center">
            <SectionHead eyebrow="Service area" title="Based in Alappuzha, working across Kerala" lead="Our office is at Muthukulam South. We take on residential and commercial projects across the state." />
            <Reveal className="contact-cards">
              <a className="ccard" href={site.contact.phones[0].href}><Phone /><span><small>Call</small>{site.contact.phones[0].label}</span></a>
              <a className="ccard" href={`mailto:${site.contact.email}`}><Mail /><span><small>Email</small>{site.contact.email}</span></a>
              <div className="ccard"><Pin /><span><small>Office</small>{fullAddress}</span></div>
            </Reveal>
          </div>
        </section>
      </StackPanel>

      <StackPanel tone="navy">
        <section className="section">
          <CtaBand />
        </section>
      </StackPanel>
    </Stack>
  );
}
