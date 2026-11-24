"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useScroll } from "@/components/providers/SmoothScroll";
import { useEnquiry } from "@/components/providers/EnquiryProvider";
import Logo from "@/components/brand/Logo";
import Magnetic from "@/components/ui/Magnetic";
import { Phone, Mail, Pin, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappHref, mapLinkHref } from "@/content/site";
import { services } from "@/content/services";

const noopSubscribe = () => () => {};

function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = ref.current!.querySelector(".marquee__track");
      const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 34, repeat: -1 });
      const skew = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" });
      let idle = 0;
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const v = self.getVelocity();
          loop.timeScale(1 + Math.min(3, Math.abs(v) / 500));
          skew(gsap.utils.clamp(-6, 6, v / -350));
          window.clearTimeout(idle);
          idle = window.setTimeout(() => {
            gsap.to(loop, { timeScale: 1, duration: 0.6 });
            skew(0);
          }, 140);
        },
      });
      return () => window.clearTimeout(idle);
    },
    { scope: ref },
  );

  const words = services.map((s) => s.title);
  const row = (key: string) => (
    <span className="marquee__row" key={key} aria-hidden={key === "b"}>
      {words.map((w) => (
        <span key={w} className="marquee__item">
          {w}
          <svg viewBox="0 0 40 24" aria-hidden="true"><path d="M2 22L20 4L38 22Z" /></svg>
        </span>
      ))}
    </span>
  );
  return (
    <div className="marquee" ref={ref}>
      <div className="marquee__track">{[row("a"), row("b")]}</div>
    </div>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useScroll();
  const enquire = useEnquiry();
  const year = useSyncExternalStore(noopSubscribe, () => new Date().getFullYear(), () => null);
  const a = site.contact.address;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(ref);
      gsap.from(q(".footer__logo path"), {
        autoAlpha: 0,
        y: 30,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: q(".footer__logo")[0], start: "top 92%", once: true },
      });
      gsap.from(q(".footer__cta > *"), {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: { trigger: q(".footer__cta")[0], start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <>
      <Marquee />
      <footer className="footer" ref={ref}>
        <div className="container">
          <div className="footer__cta">
            <p className="footer__kicker">{site.tagline}</p>
            <h2 className="footer__title">Have a project in mind? Let&apos;s plan it together.</h2>
            <Magnetic strength={0.35}>
              <button className="footer__cta-btn" onClick={() => enquire({ source: "footer" })} data-cursor="Let's talk">
                <span>Discuss Your Project</span>
              </button>
            </Magnetic>
          </div>

          <div className="footer__grid">
            <div className="footer__brand">
              <Logo className="footer__logo" />
              <p>{site.positioning}</p>
            </div>

            <div className="footer__col">
              <p className="footer__label">Services</p>
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="link-wave">{s.title}</Link>
              ))}
            </div>

            <div className="footer__col">
              <p className="footer__label">Company</p>
              {site.footerLinks.company.map((l) => (
                <Link key={l.href} href={l.href} className="link-wave">{l.label}</Link>
              ))}
              <Link href="/projects" className="link-wave">Our Projects</Link>
            </div>

            <div className="footer__col footer__contact">
              <p className="footer__label">Contact</p>
              {site.contact.phones.map((p) => (
                <a key={p.href} href={p.href} className="footer__line"><Phone /> {p.label}</a>
              ))}
              <a href={`mailto:${site.contact.email}`} className="footer__line"><Mail /> {site.contact.email}</a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="footer__line"><WhatsApp /> WhatsApp</a>
              <a href={mapLinkHref} target="_blank" rel="noopener noreferrer" className="footer__line footer__address">
                <Pin />
                <span>
                  {a.line1}<br />{a.line2}<br />{a.district}<br />{a.state} – {a.pin}
                </span>
              </a>
            </div>
          </div>

          <div className="footer__bottom">
            <p>© {year ?? ""} {site.name}. All rights reserved.</p>
            <nav aria-label="Legal" className="footer__legal">
              {site.footerLinks.support.map((l) => (
                <Link key={l.href} href={l.href} className="link-wave">{l.label}</Link>
              ))}
            </nav>
            <button className="footer__top" onClick={() => scrollTo(0, { offset: 0 })}>
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
