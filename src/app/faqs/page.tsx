import type { Metadata } from "next";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import CtaBand from "@/components/sections/CtaBand";
import Accordion from "@/components/ui/Accordion";
import { faqGroups } from "@/content/faqs";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "FAQs",
  description: "Answers to common questions about house construction, design, interiors, turnkey projects and renovation with The Home Designers in Kerala.",
  path: "/faqs",
});

export default function FaqsPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) => g.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))),
  };
  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
          eyebrow="FAQs"
          title="Frequently asked questions"
          lead="Straight answers to the questions we hear most often. Can't find yours? Contact us."
        />
      </StackPanel>

      <StackPanel tone="paper" className="stack-panel--tall">
        <section className="section container">
          {faqGroups.map((g, i) => (
            <div className="faq-group" key={g.group}>
              <SectionHead eyebrow={String(i + 1).padStart(2, "0")} title={g.group} />
              <Accordion items={g.items} defaultOpen={i === 0 ? 0 : null} />
            </div>
          ))}
        </section>
      </StackPanel>

      <StackPanel tone="navy">
        <section className="section">
          <CtaBand title="Still have a question?" text="Call, WhatsApp or send us a message and we'll be glad to help." secondary={{ label: "Contact Us", href: "/contact" }} />
        </section>
      </StackPanel>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </Stack>
  );
}
