import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowRight = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
);
export const ArrowLeft = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
export const Phone = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" /></svg>
);
export const Mail = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const Pin = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Check = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const Plus = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
);
export const Minus = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M5 12h14" /></svg>
);
export const Close = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Chevron = (p: P) => (
  <svg {...base} {...p} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);
export const Quote = (p: P) => (
  <svg viewBox="0 0 32 24" fill="currentColor" {...p} aria-hidden="true"><path d="M0 24V14C0 6 4 1 12 0l1 3c-4 1-6 4-6 8h5v13H0zm19 0V14c0-8 4-13 12-14l1 3c-4 1-6 4-6 8h5v13H19z" /></svg>
);
export const WhatsApp = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...p} aria-hidden="true">
    <path d="M16 3a13 13 0 00-11.2 19.6L3 29l6.6-1.7A13 13 0 1016 3zm0 23.6a10.6 10.6 0 01-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1116 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 01-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 00-.9.4 3.6 3.6 0 00-1.1 2.7 6.3 6.3 0 001.3 3.3 14.4 14.4 0 005.5 4.9c2 .9 2.9 1 3.9.8a3.3 3.3 0 002.2-1.5 2.7 2.7 0 00.2-1.5c-.1-.2-.3-.3-.6-.4z" />
  </svg>
);

/* Service icons */
export const ServiceIcon = ({ name, ...p }: P & { name: "house" | "compass" | "sofa" | "building" | "key" | "hammer" }) => {
  switch (name) {
    case "house":
      return (
        <svg {...base} {...p} aria-hidden="true"><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>
      );
    case "compass":
      return (
        <svg {...base} {...p} aria-hidden="true"><circle cx="12" cy="5" r="2" /><path d="M11 7L6 21M13 7l5 14M8 15h8" /></svg>
      );
    case "sofa":
      return (
        <svg {...base} {...p} aria-hidden="true"><path d="M5 10V8a3 3 0 013-3h8a3 3 0 013 3v2" /><path d="M3 12a2 2 0 014 0v2h10v-2a2 2 0 014 0v5H3z" /><path d="M5 17v2M19 17v2" /></svg>
      );
    case "building":
      return (
        <svg {...base} {...p} aria-hidden="true"><path d="M4 21V5l8-2v18M12 7l8 2v12M2 21h20" /><path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" /></svg>
      );
    case "key":
      return (
        <svg {...base} {...p} aria-hidden="true"><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8M16 7l2 2M14 9l2 2" /></svg>
      );
    case "hammer":
      return (
        <svg {...base} {...p} aria-hidden="true"><path d="M14 4l6 6-3 3-6-6z" /><path d="M11 7L4 14a2 2 0 003 3l7-7" /></svg>
      );
  }
};
