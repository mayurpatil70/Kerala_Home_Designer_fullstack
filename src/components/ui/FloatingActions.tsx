"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useEnquiry } from "@/components/providers/EnquiryProvider";
import { site, whatsappHref } from "@/content/site";
import { WhatsApp } from "./Icons";

/** Scroll-progress line, floating WhatsApp button and a mobile call / enquire bar. */
export default function FloatingActions() {
  const ref = useRef<HTMLDivElement>(null);
  const enquire = useEnquiry();

  useGSAP(
    () => {
      const bar = ref.current!.querySelector<HTMLElement>(".progress-line");
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
          ref.current!.classList.toggle("is-shown", self.scroll() > window.innerHeight * 0.6);
        },
      });
      gsap.set(ref.current, { autoAlpha: 1 });
    },
    { scope: ref },
  );

  return (
    <div className="floating" ref={ref}>
      <span className="progress-line" aria-hidden="true" />
      <a className="wa-btn" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with The Home Designers on WhatsApp" data-cursor="Chat">
        <WhatsApp />
      </a>
      <div className="mobile-bar">
        <a className="mobile-bar__wa" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <WhatsApp />
        </a>
        <a href={site.contact.phones[0].href} className="mobile-bar__call">Call now</a>
        <button className="mobile-bar__cta" onClick={() => enquire({ source: "mobile-bar" })}>Enquire</button>
      </div>
    </div>
  );
}
