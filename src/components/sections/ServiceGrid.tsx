import TraceCard from "@/components/ui/TraceCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, ServiceIcon } from "@/components/ui/Icons";
import { services, type Service } from "@/content/services";

/** Six service cards with icon, number, wave sweep and border-trace hover. */
export default function ServiceGrid({ items = services, large = false }: { items?: Service[]; large?: boolean }) {
  return (
    <Reveal className={`sgrid${large ? " sgrid--large" : ""}`} stagger={0.07}>
      {items.map((s) => (
        <TraceCard key={s.slug} href={`/services/${s.slug}`} className="scard">
          <span className="scard__sweep" aria-hidden="true" />
          <span className="scard__top">
            <span className="scard__icon"><ServiceIcon name={s.icon} /></span>
            <span className="scard__no">{String(services.indexOf(s) + 1).padStart(2, "0")}</span>
          </span>
          <span className="scard__group">{s.group}</span>
          <h3 className="scard__title">{s.title}</h3>
          <p className="scard__text">{s.short}</p>
          <span className="scard__more">
            Explore service <ArrowUpRight />
          </span>
        </TraceCard>
      ))}
    </Reveal>
  );
}
