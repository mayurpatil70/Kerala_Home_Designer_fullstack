import type { Metadata } from "next";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import ProcessStack from "@/components/sections/ProcessStack";
import CtaBand from "@/components/sections/CtaBand";
import Accordion from "@/components/ui/Accordion";
import { processSteps } from "@/content/process";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Our Process",
  description: "How The Home Designers works: initial consultation, planning and design, scope and proposal, project execution, and completion and handover.",
  path: "/process",
});

const faqs = [
  { q: "Do you commit to fixed timelines?", a: "A proposed schedule is shared with the proposal. Actual timelines depend on scope, approvals, weather and site conditions, so we avoid promising fixed dates before the scope is defined." },
  { q: "When is the cost confirmed?", a: "An estimate is prepared at the scope and proposal stage, based on the agreed scope, specifications, assumptions and exclusions." },
  { q: "How will I receive progress updates?", a: "We agree the format and frequency of updates at the start, such as site visits, calls, photos or messages." },
];

export default function ProcessPage() {
  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Our Process" }]}
          eyebrow="Our process"
          title="Five clear stages, from conversation to handover"
          lead="Each project follows the same transparent path, so you always know what is happening, what we need from you and what comes next."
          meta={
            <ol className="hero-steps">
              {processSteps.map((s) => (
                <li key={s.no}><span>{s.no}</span>{s.short}</li>
              ))}
            </ol>
          }
        />
      </StackPanel>

      <StackPanel tone="paper" className="stack-panel--tall">
        <section className="section">
          <div className="container">
            <SectionHead eyebrow="Stage by stage" title="What happens at each step" lead="The published process reflects how we work. Timelines, approvals and outcomes are confirmed for each project in writing." />
          </div>
          <ProcessStack />
        </section>
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <div className="split">
            <SectionHead eyebrow="FAQs" title="Questions about the process" />
            <Accordion items={faqs} />
          </div>
        </section>
      </StackPanel>

      <StackPanel tone="navy">
        <section className="section">
          <CtaBand title="Ready for the first step?" text="Book an initial consultation. Bring your requirements, site details and an indicative budget, and we'll take it from there." />
        </section>
      </StackPanel>
    </Stack>
  );
}
