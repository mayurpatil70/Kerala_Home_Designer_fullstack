import type { ArtKind } from "@/content/projects";

/**
 * Architectural line drawings used in place of photographs until real project
 * images are added. Each variant hints at the kind of image that belongs there.
 */
export default function PlaceholderArt({ kind, label = true, className }: { kind: ArtKind; label?: boolean; className?: string }) {
  return (
    <div className={`ph ${className ?? ""}`}>
      <svg className="ph__svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="ph__lines">{ART[kind]}</g>
      </svg>
      {label && <span className="ph__tag">Project photo</span>}
    </div>
  );
}

const ART: Record<ArtKind, React.ReactNode> = {
  elevation: (
    <>
      <path d="M40 250H360" className="ph__ground" />
      <path d="M90 250V140L200 70L310 140V250" />
      <path d="M70 150L200 62L330 150" className="ph__accent" />
      <path d="M120 250V190H160V250M230 170H290V215H230Z M120 160H160V180H120Z" />
      <path d="M245 170V215M230 192H290" />
      <path d="M180 250V200H215V250" className="ph__accent" />
    </>
  ),
  plan: (
    <>
      <rect x="60" y="50" width="280" height="200" className="ph__accent" />
      <path d="M60 140H180V50M180 140V250M180 180H340M260 50V180M120 140V250" />
      <path d="M150 140A30 30 0 0 1 180 110M260 140A25 25 0 0 0 285 165" />
      <path d="M200 95H240M75 200H105" className="ph__dim" />
    </>
  ),
  interior: (
    <>
      <path d="M40 40L140 110H260L360 40M140 110V210H260V110M40 270L140 210M360 270L260 210" />
      <rect x="165" y="130" width="70" height="45" className="ph__accent" />
      <path d="M110 245H230V225H130V200H110ZM230 245V200" />
      <path d="M290 200V150M280 150H300L290 135Z" className="ph__accent" />
    </>
  ),
  facade: (
    <>
      <path d="M30 260H370" className="ph__ground" />
      <rect x="90" y="40" width="220" height="220" />
      <path d="M90 200H310M90 150H310M90 100H310M145 40V200M200 40V200M255 40V200" />
      <path d="M110 260V215H180V260M220 215H290V245H220Z" className="ph__accent" />
    </>
  ),
  kitchen: (
    <>
      <path d="M40 180H360M40 250H360M60 180V250M140 180V250M220 180V250M300 180V250" />
      <path d="M40 60H360V120H40ZM120 60V120M200 60V120M280 60V120" />
      <rect x="235" y="160" width="50" height="20" className="ph__accent" />
      <path d="M95 160V140A12 12 0 0 1 119 140" className="ph__accent" />
    </>
  ),
  section: (
    <>
      <path d="M20 250L150 235L380 200" className="ph__ground" />
      <path d="M90 240V140H230V215M230 130V90H330V205M80 140H240M220 90H340" />
      <path d="M70 145L160 95L250 145" className="ph__accent" />
      <path d="M110 240V200H140V240M250 130H300V160H250Z" />
    </>
  ),
  renovation: (
    <>
      <path d="M30 250H370" className="ph__ground" />
      <path d="M60 250V150L140 100L220 150V250" />
      <path d="M220 250V160H330V250M220 160L275 125L330 160" className="ph__dashed" />
      <path d="M90 250V200H120V250M150 170H190V200H150Z" />
      <text x="105" y="85" className="ph__txt">EXISTING</text>
      <text x="245" y="110" className="ph__txt ph__txt--accent">NEW</text>
    </>
  ),
  office: (
    <>
      <rect x="40" y="40" width="320" height="220" className="ph__accent" />
      <path d="M40 120H140V40M260 40V260M260 150H360" />
      <rect x="70" y="160" width="60" height="30" />
      <rect x="160" y="160" width="60" height="30" />
      <rect x="70" y="210" width="60" height="30" />
      <rect x="160" y="210" width="60" height="30" />
      <circle cx="310" cy="95" r="22" />
    </>
  ),
};
