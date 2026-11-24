import Link from "next/link";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import { ArrowUpRight } from "@/components/ui/Icons";
import { serviceBySlug } from "@/content/services";
import type { Project } from "@/content/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="pcard" data-cursor="View">
      <div className="pcard__media">
        <PlaceholderArt kind={p.art} />
        <span className="pcard__demo">Demo</span>
        <span className={`pcard__status pcard__status--${p.status.toLowerCase()}`}>{p.status}</span>
      </div>
      <div className="pcard__body">
        <p className="pcard__meta">
          <span>{p.category}</span>
          <span>{p.location}</span>
        </p>
        <h3 className="pcard__title">{p.title}</h3>
        <p className="pcard__summary">{p.summary}</p>
        <p className="pcard__services">{p.services.map((s) => serviceBySlug(s)?.title).filter(Boolean).join(" · ")}</p>
        <span className="pcard__arrow" aria-hidden="true"><ArrowUpRight /></span>
      </div>
    </Link>
  );
}
