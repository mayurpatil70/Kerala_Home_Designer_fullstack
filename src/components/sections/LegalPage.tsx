import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";

export default function LegalPage({ title, lead, sections, updated }: { title: string; lead: string; sections: { h: string; p: string }[]; updated: string }) {
  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero crumbs={[{ label: "Home", href: "/" }, { label: title }]} eyebrow="Legal" title={title} lead={lead} />
      </StackPanel>
      <StackPanel tone="paper" className="stack-panel--tall">
        <section className="section container">
          <div className="legal prose">
            <p className="callout">This page is a draft template. Please have it reviewed by a legal advisor before publishing. Status: {updated}.</p>
            {sections.map((s, i) => (
              <section key={s.h}>
                <h2>
                  <span className="legal__no">{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </h2>
                <p>{s.p}</p>
              </section>
            ))}
          </div>
        </section>
      </StackPanel>
    </Stack>
  );
}
