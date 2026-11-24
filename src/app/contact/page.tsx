import type { Metadata } from "next";
import { Stack, StackPanel } from "@/components/stack/Stack";
import PageHero from "@/components/sections/PageHero";
import SectionHead from "@/components/sections/SectionHead";
import EnquiryForm from "@/components/ui/EnquiryForm";
import MapEmbed from "@/components/sections/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { Mail, Phone, Pin, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappHref, mapLinkHref } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description: "Contact The Home Designers, Muthukulam South, Alappuzha, Kerala. Call +91 93494 72018 or +91 62826 50369, WhatsApp, or email thdmkm@yahoo.com.",
  path: "/contact",
});

export default function ContactPage() {
  const a = site.contact.address;
  return (
    <Stack>
      <StackPanel tone="navy">
        <PageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
          eyebrow="Contact us"
          title="Let's talk about your project"
          lead="Call, WhatsApp, email or send an enquiry. Tell us what you are planning and we'll get back to you."
        />
      </StackPanel>

      <StackPanel tone="light">
        <section className="section container">
          <div className="contact">
            <div className="contact__info">
              <SectionHead eyebrow="Reach us" title="The Home Designers" lead={site.roles.join(" · ")} />
              <Reveal className="contact__list">
                {site.contact.phones.map((p) => (
                  <a key={p.href} href={p.href} className="ccard ccard--row">
                    <Phone />
                    <span><small>Call</small>{p.label}</span>
                  </a>
                ))}
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="ccard ccard--row ccard--wa">
                  <WhatsApp />
                  <span><small>WhatsApp</small>Chat with us</span>
                </a>
                <a href={`mailto:${site.contact.email}`} className="ccard ccard--row">
                  <Mail />
                  <span><small>Email</small>{site.contact.email}</span>
                </a>
                <a href={mapLinkHref} target="_blank" rel="noopener noreferrer" className="ccard ccard--row">
                  <Pin />
                  <span>
                    <small>Office</small>
                    {a.line1}, {a.line2}, {a.district}, {a.state} – {a.pin}
                  </span>
                </a>
              </Reveal>
            </div>
            <Reveal className="contact__form" y={40}>
              <div className="form-card">
                <h2 className="form-card__title">Send an enquiry</h2>
                <p className="form-card__sub">Fields marked * are required. We use your details only to respond to your enquiry.</p>
                <EnquiryForm source="contact-page" />
              </div>
            </Reveal>
          </div>
        </section>
      </StackPanel>

      <StackPanel tone="paper">
        <section className="section container">
          <SectionHead eyebrow="Find us" title="Our office" lead={`${a.line2}, ${a.district}, ${a.state} – ${a.pin}`} />
          <MapEmbed />
        </section>
      </StackPanel>
    </Stack>
  );
}
