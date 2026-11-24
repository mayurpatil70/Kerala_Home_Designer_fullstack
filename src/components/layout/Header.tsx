"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, onIntro, prefersReducedMotion } from "@/lib/gsap";
import { useScroll } from "@/components/providers/SmoothScroll";
import { useEnquiry } from "@/components/providers/EnquiryProvider";
import Logo from "@/components/brand/Logo";
import Button, { Wave } from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import { ArrowUpRight, Chevron, ServiceIcon, Phone, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappHref } from "@/content/site";
import { services } from "@/content/services";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const pathname = usePathname();
  const { lock, unlock } = useScroll();
  const enquire = useEnquiry();
  const closeTimer = useRef<number | undefined>(undefined);

  // Intro + hide on scroll down / show on scroll up + solid background once scrolled
  useGSAP(
    () => {
      const el = ref.current!;
      if (!prefersReducedMotion()) {
        gsap.set(el, { yPercent: -100, autoAlpha: 0 });
        onIntro(() => gsap.to(el, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out", delay: 0.4 }));
      }
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const y = self.scroll();
          el.classList.toggle("is-solid", y > 40);
          el.classList.toggle("is-hidden", self.direction === 1 && y > window.innerHeight * 0.9);
        },
      });
    },
    { scope: ref },
  );

  // Mega menu reveal
  useEffect(() => {
    const el = megaRef.current;
    if (!el) return;
    if (mega) {
      gsap.killTweensOf(el);
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 0.6, ease: "expo.out" });
      gsap.fromTo(el.querySelectorAll(".mega__item"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.04, ease: "power3.out", delay: 0.08 });
    } else {
      gsap.to(el, { clipPath: "inset(0% 0% 100% 0% round 24px)", duration: 0.4, ease: "power3.in", onComplete: () => { gsap.set(el, { visibility: "hidden" }); } });
    }
  }, [mega]);

  // Mobile menu open/close
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu || !open) return;
    lock();
    gsap.set(menu, { visibility: "visible" });
    gsap.fromTo(menu, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "expo.inOut" });
    gsap.fromTo(menu.querySelectorAll(".menu__link, .menu__sub a, .menu__foot > *"), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", stagger: 0.03, delay: 0.3 });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
      gsap.to(menu, { clipPath: "circle(0% at 100% 0%)", duration: 0.6, ease: "expo.inOut", onComplete: () => { gsap.set(menu, { visibility: "hidden" }); } });
    };
  }, [open, lock, unlock]);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 160);
  };

  return (
    <>
      <header className={`header${mega ? " has-mega" : ""}`} ref={ref}>
        <div className="header__inner">
          <Link href="/" className="header__logo" aria-label="The Home Designers, home">
            <Logo compact />
          </Link>

          <nav className="header__nav" aria-label="Primary">
            {site.nav.map((n) =>
              n.hasMenu ? (
                <div
                  key={n.href}
                  className="nav-item"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                  onFocus={openMega}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) closeMega();
                  }}
                >
                  <Link href={n.href} className={`nav-link${isActive(pathname, n.href) ? " is-active" : ""}`} aria-haspopup="true" aria-expanded={mega}>
                    <Wave />
                    <span className="nav-link__label">
                      {n.label}
                      <Chevron className="nav-link__chev" />
                    </span>
                  </Link>
                  <div className="mega" ref={megaRef} onMouseEnter={openMega} onMouseLeave={closeMega}>
                    <div className="mega__grid">
                      {services.map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`} className="mega__item" onClick={() => setMega(false)}>
                          <span className="mega__icon"><ServiceIcon name={s.icon} /></span>
                          <span className="mega__text">
                            <strong>{s.title}</strong>
                            <span>{s.short}</span>
                          </span>
                          <ArrowUpRight className="mega__arrow" />
                        </Link>
                      ))}
                    </div>
                    <div className="mega__foot">
                      <span>Not sure which service you need?</span>
                      <Link href="/services" className="link-wave" onClick={() => setMega(false)}>See all services</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={`nav-link${isActive(pathname, n.href) ? " is-active" : ""}`}>
                  <Wave />
                  <span className="nav-link__label">{n.label}</span>
                </Link>
              ),
            )}
          </nav>

          <div className="header__actions">
            <Magnetic>
              <Button variant="sky" size="sm" arrow={false} onClick={() => enquire({ source: "header" })} className="header__cta">
                Discuss Your Project
              </Button>
            </Magnetic>
            <button
              className={`burger${open ? " is-open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="menu" id="mobile-menu" ref={menuRef} data-lenis-prevent>
        <nav className="menu__nav" aria-label="Mobile">
          {site.nav.map((n, i) => (
            <div className="menu__row" key={n.href}>
              <Link className={`menu__link${isActive(pathname, n.href) ? " is-active" : ""}`} href={n.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                <sup>{String(i + 1).padStart(2, "0")}</sup>
                {n.label}
              </Link>
              {n.hasMenu && (
                <div className="menu__sub">
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={site.contact.phones[0].href} tabIndex={open ? 0 : -1}><Phone /> {site.contact.phones[0].label}</a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}><WhatsApp /> WhatsApp us</a>
          <Button variant="sky" onClick={() => { setOpen(false); enquire({ source: "menu" }); }}>
            Discuss Your Project
          </Button>
        </div>
      </div>
    </>
  );
}
