import { RevealText, Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

export default function SectionHead({
  eyebrow,
  title,
  lead,
  light = false,
  aside,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  light?: boolean;
  aside?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`shead${aside ? " shead--split" : ""}${center ? " shead--center" : ""}`}>
      <div className="shead__main">
        {eyebrow && <p className={`eyebrow${light ? " eyebrow--light" : ""}`}>{eyebrow}</p>}
        <RevealText as="h2" className={`h2${light ? " h2--light" : ""}`}>{title}</RevealText>
        {lead && (
          <Reveal y={20}>
            <p className={`lead${light ? " lead--light" : ""}`}>{lead}</p>
          </Reveal>
        )}
      </div>
      {aside && <div className="shead__aside">{aside}</div>}
    </div>
  );
}
