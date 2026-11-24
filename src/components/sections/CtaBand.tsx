"use client";

import { useEnquiry } from "@/components/providers/EnquiryProvider";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import { RevealText, Reveal } from "@/components/ui/Reveal";
import { Phone, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappHref } from "@/content/site";

/** Closing call-to-action band used at the end of each page. */
export default function CtaBand({
  title = "Let's discuss your project",
  text = "Tell us about your plot, property or business space. We'll help you understand the options, scope and next steps.",
  interest,
  secondary = { label: "Explore Our Projects", href: "/projects" },
}: {
  title?: string;
  text?: string;
  interest?: string;
  secondary?: { label: string; href: string } | null;
}) {
  const enquire = useEnquiry();
  return (
    <div className="cta container">
      <div className="cta__roof" aria-hidden="true" />
      <p className="eyebrow eyebrow--light">{site.tagline}</p>
      <RevealText as="h2" className="cta__title">{title}</RevealText>
      <Reveal className="cta__body" y={24}>
        <p>{text}</p>
        <div className="cta__actions">
          <Magnetic>
            <Button variant="sky" size="lg" onClick={() => enquire({ source: "cta", interest, title: interest ? `Enquire about ${interest}` : undefined })}>
              Discuss Your Project
            </Button>
          </Magnetic>
          {secondary && (
            <Button variant="outline-light" size="lg" href={secondary.href}>
              {secondary.label}
            </Button>
          )}
        </div>
        <div className="cta__contact">
          <a href={site.contact.phones[0].href} className="link-wave link-wave--light"><Phone /> {site.contact.phones[0].label}</a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="link-wave link-wave--light"><WhatsApp /> WhatsApp</a>
        </div>
      </Reveal>
    </div>
  );
}
