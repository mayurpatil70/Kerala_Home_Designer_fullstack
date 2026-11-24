import Link from "next/link";
import type { ReactNode } from "react";

/** Card whose border draws itself around the edge on hover. */
export default function TraceCard({
  href,
  children,
  className,
  as = "div",
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const trace = (
    <svg className="trace" aria-hidden="true">
      <rect x="0" y="0" width="100%" height="100%" rx="20" ry="20" pathLength={1} />
    </svg>
  );
  const cls = `tcard ${className ?? ""}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {trace}
        {children}
      </Link>
    );
  }
  const Tag = as;
  return (
    <Tag className={cls}>
      {trace}
      {children}
    </Tag>
  );
}
