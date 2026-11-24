"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useScroll } from "./SmoothScroll";
import EnquiryForm from "@/components/ui/EnquiryForm";
import { site } from "@/content/site";
import { Close } from "@/components/ui/Icons";

type OpenOpts = { title?: string; interest?: string; source?: string };
const EnquiryContext = createContext<(opts?: OpenOpts) => void>(() => {});

export const useEnquiry = () => useContext(EnquiryContext);

export default function EnquiryProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<OpenOpts | null>(null);
  const { lock, unlock } = useScroll();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closing = useRef(false);

  const open = useCallback((o: OpenOpts = {}) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    closing.current = false;
    setOpts(o);
  }, []);

  const close = useCallback(() => {
    const root = dialogRef.current;
    if (!root || closing.current) return;
    closing.current = true;
    gsap
      .timeline({
        defaults: { ease: "power3.in" },
        onComplete: () => {
          setOpts(null);
          lastFocus.current?.focus?.();
        },
      })
      .to(root.querySelector(".modal__panel"), { yPercent: 8, autoAlpha: 0, duration: 0.35 })
      .to(root, { autoAlpha: 0, duration: 0.3 }, "<0.1");
  }, []);

  useEffect(() => {
    if (!opts) return;
    const root = dialogRef.current;
    if (!root) return;
    lock();
    gsap.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
    gsap.fromTo(
      root.querySelector(".modal__panel"),
      { yPercent: 10, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out", delay: 0.05 },
    );
    const t = window.setTimeout(() => root.querySelector<HTMLInputElement>("input[name='name']")?.focus(), 120);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const focusables = root.querySelectorAll<HTMLElement>("button, input:not([tabindex='-1']), select, textarea, a[href]");
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      unlock();
    };
  }, [opts, lock, unlock, close]);

  return (
    <EnquiryContext.Provider value={open}>
      {children}
      {opts && (
        <div className="modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
          <button className="modal__backdrop" aria-label="Close enquiry form" onClick={close} tabIndex={-1} />
          <div className="modal__panel" data-lenis-prevent>
            <button className="modal__close" onClick={close} aria-label="Close">
              <Close />
            </button>
            <p className="eyebrow">Discuss your project</p>
            <h2 id="enquiry-title" className="modal__title">{opts.title ?? "Tell us what you have in mind"}</h2>
            <p className="modal__sub">
              Share a few details and our team will get back to you. Prefer to talk? Call{" "}
              <a href={site.contact.phones[0].href}>{site.contact.phones[0].label}</a>.
            </p>
            <EnquiryForm compact source={opts.source ?? "modal"} interest={opts.interest} onDone={close} />
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}
