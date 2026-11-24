import TraceCard from "@/components/ui/TraceCard";
import { ArrowUpRight } from "@/components/ui/Icons";
import type { Article } from "@/content/journal";

export default function JournalCard({ a, index = 0 }: { a: Article; index?: number }) {
  return (
    <TraceCard href={`/journal/${a.slug}`} className={`jcard jcard--${index % 4}`}>
      <span className="jcard__band" aria-hidden="true">
        <span className="jcard__roof" />
      </span>
      <span className="jcard__meta">
        <span className="jcard__cat">{a.category}</span>
        <span>{a.minutes} min read</span>
      </span>
      <h3 className="jcard__title">{a.title}</h3>
      <p className="jcard__excerpt">{a.excerpt}</p>
      <span className="jcard__foot">
        <span className="jcard__draft">Draft</span>
        <span className="jcard__more">Read article <ArrowUpRight /></span>
      </span>
    </TraceCard>
  );
}
