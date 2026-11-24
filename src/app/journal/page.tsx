import type { Metadata } from "next";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import JournalExplorer from "@/components/sections/JournalExplorer";
import CtaBand from "@/components/sections/CtaBand";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Blog Journal",
  description: "Construction guides, design ideas and practical advice for planning homes, interiors, commercial spaces and renovations in Kerala.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Blog Journal" }]}
          eyebrow="Blog Journal"
          title="Guidance for planning, designing and building in Kerala"
          lead="Practical articles on construction stages, design decisions, interiors, renovation and turnkey projects."
        />
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section container">
          <SectionHead eyebrow="Latest articles" title="Read, plan, then build" lead="Draft articles for review. Each will show its publication date once approved." />
          <JournalExplorer />
        </section>
      </StackPanel>

      <StackPanel tone="navy">
        <section className="section">
          <CtaBand title="Have a question about your project?" text="Our team is happy to talk it through. Call, WhatsApp or send an enquiry." secondary={{ label: "Read our FAQs", href: "/faqs" }} />
        </section>
      </StackPanel>
    </Stack>
  );
}
