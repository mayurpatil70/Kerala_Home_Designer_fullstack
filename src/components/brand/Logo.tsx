import { LOGO_PATHS, LOGO_VIEWBOX, type LogoPart } from "./logoPaths";

const ORDER: LogoPart[] = ["the", "roof", "home", "bar", "bar2", "designers", "line", "tagline", "line2"];
const COMPACT: LogoPart[] = ["the", "roof", "home", "bar", "bar2", "designers"];

/**
 * The Home Designers logo, recreated as vector paths.
 * `compact` drops the tagline for small sizes (header). Colour follows `currentColor`.
 */
export default function Logo({
  compact = false,
  className,
  title = "The Home Designers",
}: {
  compact?: boolean;
  className?: string;
  title?: string;
}) {
  const parts = compact ? COMPACT : ORDER;
  const vb = LOGO_VIEWBOX;
  const h = compact ? 1300 - vb.y : vb.h;
  return (
    <svg
      className={className}
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${h}`}
      role="img"
      aria-label={title}
      fill="currentColor"
      fillRule="evenodd"
    >
      {parts.map((p) => (
        <path key={p} d={LOGO_PATHS[p]} data-part={p} />
      ))}
    </svg>
  );
}
