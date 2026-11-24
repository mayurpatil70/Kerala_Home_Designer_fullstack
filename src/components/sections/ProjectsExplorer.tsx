"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Flip, gsap, prefersReducedMotion, requestRefresh } from "@/lib/gsap";
import ProjectCard from "./ProjectCard";
import { projects } from "@/content/projects";
import { services, type ServiceSlug } from "@/content/services";

type Cat = "All" | "Residential" | "Commercial";
type Status = "All" | "Completed" | "Ongoing";

/** Filterable portfolio (PRD §5): category, status and service filters with animated re-layout. */
export default function ProjectsExplorer() {
  const [cat, setCat] = useState<Cat>("All");
  const [status, setStatus] = useState<Status>("All");
  const [service, setService] = useState<ServiceSlug | "all">("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const visible = (p: (typeof projects)[number]) =>
    (cat === "All" || p.category === cat) && (status === "All" || p.status === status) && (service === "all" || p.services.includes(service));
  const count = projects.filter(visible).length;

  const capture = () => {
    if (!gridRef.current || prefersReducedMotion()) return;
    flipState.current = Flip.getState(gridRef.current.querySelectorAll(".pgrid__item"));
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    if (state && gridRef.current) {
      Flip.from(state, {
        duration: 0.7,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.03,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out" }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.4 }),
        onComplete: () => requestRefresh(),
      });
    } else {
      requestRefresh();
    }
  }, [cat, status, service]);

  const chip = <T extends string>(value: T, current: T, set: (v: T) => void, label?: string) => (
    <button
      key={value}
      className={`chip${value === current ? " is-active" : ""}`}
      aria-pressed={value === current}
      onClick={() => {
        if (value === current) return;
        capture();
        set(value);
      }}
    >
      {label ?? value}
    </button>
  );

  return (
    <div className="explorer">
      <div className="filters" role="group" aria-label="Filter projects">
        <div className="filters__row">
          <span className="filters__label">Category</span>
          {(["All", "Residential", "Commercial"] as Cat[]).map((c) => chip(c, cat, setCat))}
        </div>
        <div className="filters__row">
          <span className="filters__label">Status</span>
          {(["All", "Completed", "Ongoing"] as Status[]).map((s) => chip(s, status, setStatus))}
        </div>
        <div className="filters__row">
          <span className="filters__label">Service</span>
          {chip<ServiceSlug | "all">("all", service, setService, "All services")}
          {services.map((s) => chip<ServiceSlug | "all">(s.slug, service, setService, s.title))}
        </div>
        <p className="filters__count" aria-live="polite">
          Showing {count} of {projects.length} projects
        </p>
      </div>

      <div className="pgrid" ref={gridRef}>
        {projects.map((p) => (
          <div key={p.slug} className="pgrid__item" data-flip-id={p.slug} style={{ display: visible(p) ? undefined : "none" }}>
            <ProjectCard p={p} />
          </div>
        ))}
        {count === 0 && (
          <div className="pgrid__empty">
            <p>No projects match these filters yet.</p>
            <button className="link-wave" onClick={() => { capture(); setCat("All"); setStatus("All"); setService("all"); }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
