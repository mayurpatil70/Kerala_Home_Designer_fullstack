import type { Metadata } from "next";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import CtaBand from "@/components/sections/CtaBand";
import TraceCard from "@/components/ui/TraceCard";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Check, Quote } from "@/components/ui/Icons";
import { testimonialsPage } from "@/content/pages";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Testimonials",
  description: "Genuine feedback from clients of The Home Designers, published with permission.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const shareHref = `mailto:${site.contact.email}?subject=${encodeURIComponent("My experience with The Home Designers")}`;
  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
          eyebrow="Testimonials"
          title="What our clients say"
          lead="Only genuine client feedback appears here, shared with each client's permission."
        >
          <Button href={shareHref} variant="sky">Share your experience</Button>
        </PageHero>
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <SectionHead eyebrow="Client feedback" title="Testimonials" lead="These placeholder cards show where approved testimonials will be published." />
          <Reveal className="tgrid" stagger={0.06}>
            {Array.from({ length: testimonialsPage.placeholders }, (_, i) => (
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

      <StackPanel tone="dark">
        <section className="section container">
          <div className="split">
            <SectionHead light eyebrow="Our standard" title="How we publish feedback" />
            <Reveal className="principles">
              {testimonialsPage.principles.map((p) => (
                <p key={p}><Check /> {p}</p>
              ))}
            </Reveal>
          </div>
        </section>
      </StackPanel>

      <StackPanel tone="navy">
        <section className="section">
          <CtaBand title="Worked with us?" text="We'd value your feedback. With your permission, it may help other families and businesses choose with confidence." secondary={{ label: "Share your experience", href: shareHref }} />
        </section>
      </StackPanel>
    </Stack>
  );
}
