import type { Metadata } from "next";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import ServiceGrid from "@/components/sections/ServiceGrid";
import ServiceFinder from "@/components/sections/ServiceFinder";
import CtaBand from "@/components/sections/CtaBand";
import Accordion from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Our Services",
  description:
    "Residential construction, architectural design, interior design, commercial construction, turnkey construction and renovation services across Kerala.",
  path: "/services",
});

const faqs = [
  { q: "Can I combine more than one service?", a: "Yes. Many projects combine services, for example architectural design with residential construction and interior design. The combined scope is set out in one proposal." },
  { q: "Do you work outside Alappuzha?", a: "Yes. We serve residential and commercial clients across Kerala." },
  { q: "How do I know which service I need?", a: "Use the quick guide above, or simply contact us. We'll help you understand the right scope during the initial consultation." },
];

export default function ServicesPage() {
  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Our Services" }]}
          eyebrow="Our services"
          title="Design and construction services for homes and businesses"
          lead="Six services that can be engaged individually or together, adapted to your project's requirements and budget."
        />
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <SectionHead eyebrow="Six services" title="Choose what your project needs" />
          <ServiceGrid large />
        </section>
      </StackPanel>

      <StackPanel tone="dark">
        <section className="section container">
          <SectionHead light eyebrow="Quick guide" title="Not sure where to start?" lead="Answer two questions to see the services that usually fit." />
          <Reveal y={30}>
            <ServiceFinder />
          </Reveal>
        </section>
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section container">
          <div className="split">
            <SectionHead eyebrow="FAQs" title="Questions about our services" />
            <Accordion items={faqs} />
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
