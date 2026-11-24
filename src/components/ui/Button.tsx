import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";
import { ArrowRight } from "./Icons";

/** Wave shape that rises on hover and falls back on hover-out (shared by nav + buttons). */
export function Wave() {
  return (
    <span className="wave" aria-hidden="true">
      <svg viewBox="0 0 240 60" preserveAspectRatio="none">
        <path d="M0 14C20 4 40 4 60 14S100 24 120 14S160 4 180 14S220 24 240 14V60H0Z" />
      </svg>
    </span>
  );
}

type Variant = "sky" | "light" | "ghost" | "dark" | "outline-light";

export default function Button({
  href,
  onClick,
  children,
  variant = "sky",
  arrow = true,
  size,
  type = "button",
  className,
  external,
  disabled,
  ariaLabel,
}: {
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  size?: "sm" | "lg";
  type?: "button" | "submit";
  className?: string;
  external?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""}${className ? ` ${className}` : ""}`;
  const inner = (
    <>
      <Wave />
      <span className="btn__label">{children}</span>
      {arrow && <ArrowRight className="btn__arrow" />}
    </>
  );
  if (href) {
    const isInternal = href.startsWith("/") && !external;
    if (isInternal) {
      return (
        <Link href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} onClick={onClick} aria-label={ariaLabel} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
