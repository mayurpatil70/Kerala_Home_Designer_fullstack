// Generates exact SVG paths for "The Home Designers" logo from the MgOpen Moderna
// (helvetiker) outlines, laid out to match the supplied logo artwork.
// Usage (from scripts/logo): node make-logo.mjs ../../node_modules/three ../../src/components/brand/logoPaths.ts preview.svg
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const threeDir = process.argv[2];
const outFile = process.argv[3];
const previewFile = process.argv[4];
const { FontLoader } = await import(pathToFileURL(path.join(threeDir, "examples/jsm/loaders/FontLoader.js")).href);

const bold = new FontLoader().parse(JSON.parse(fs.readFileSync("helvetiker_bold.typeface.json", "utf8")));
const regular = new FontLoader().parse(JSON.parse(fs.readFileSync("helvetiker_regular.typeface.json", "utf8")));

const fmt = (n) => Number(n.toFixed(2));

/** Bounding box of shapes (font units, y up) */
function bbox(shapes) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const s of shapes) {
    for (const p of s.getPoints(8)) {
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
    }
  }
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}

/** Converts a three Path's curves to SVG commands using transform t(x,y)->[X,Y] */
function curvesToD(curves, t) {
  let d = "";
  let start = null;
  for (const c of curves) {
    const type = c.type;
    if (type === "LineCurve") {
      const a = t(c.v1.x, c.v1.y), b = t(c.v2.x, c.v2.y);
      if (!start) { d += `M${fmt(a[0])} ${fmt(a[1])}`; start = a; }
      d += `L${fmt(b[0])} ${fmt(b[1])}`;
    } else if (type === "QuadraticBezierCurve") {
      const a = t(c.v0.x, c.v0.y), cp = t(c.v1.x, c.v1.y), b = t(c.v2.x, c.v2.y);
      if (!start) { d += `M${fmt(a[0])} ${fmt(a[1])}`; start = a; }
      d += `Q${fmt(cp[0])} ${fmt(cp[1])} ${fmt(b[0])} ${fmt(b[1])}`;
    } else if (type === "CubicBezierCurve") {
      const a = t(c.v0.x, c.v0.y), c1 = t(c.v1.x, c.v1.y), c2 = t(c.v2.x, c.v2.y), b = t(c.v3.x, c.v3.y);
      if (!start) { d += `M${fmt(a[0])} ${fmt(a[1])}`; start = a; }
      d += `C${fmt(c1[0])} ${fmt(c1[1])} ${fmt(c2[0])} ${fmt(c2[1])} ${fmt(b[0])} ${fmt(b[1])}`;
    } else {
      throw new Error("Unknown curve " + type);
    }
  }
  return d + "Z";
}

function shapesToD(shapes, t) {
  return shapes
    .map((s) => curvesToD(s.curves, t) + s.holes.map((h) => curvesToD(h.curves, t)).join(""))
    .join("");
}

/**
 * Lays out text so its cap height spans capTop..capBottom (image px, y down)
 * and its width equals targetW, horizontally centred on cx (or starting at x0).
 */
function textPath(font, text, { capTop, capBottom, targetW, cx, x0 }) {
  const size = 100;
  const capShapes = font.generateShapes("H", size);
  const cap = bbox(capShapes); // cap height at this size (baseline at y=0)
  const shapes = font.generateShapes(text, size);
  const b = bbox(shapes);
  const sy = (capBottom - capTop) / cap.h;
  const sx = targetW / b.w;
  const left = x0 !== undefined ? x0 : cx - targetW / 2;
  const baseline = capBottom; // baseline sits at cap bottom
  const t = (x, y) => [left + (x - b.minX) * sx, baseline - y * sy];
  return { d: shapesToD(shapes, t), sx, sy };
}

// Measurements taken from the supplied logo (2079 × 1714 px artwork)
const parts = {};
parts.the = textPath(bold, "THE", { capTop: 135, capBottom: 340, targetW: 540, cx: 1040 });
parts.home = textPath(bold, "HOME", { capTop: 672, capBottom: 897, targetW: 893, cx: 1043 });
parts.designers = textPath(bold, "DESIGNERS", { capTop: 1047, capBottom: 1300, targetW: 1890, x0: 95 });
parts.roof = { d: "M1047 360L1627 618L458 618Z" };
// Thick bar + thin line between HOME and DESIGNERS
parts.bar = { d: "M95 935L1985 935L1985 977L95 977Z" };
parts.bar2 = { d: "M95 991L1985 991L1985 1003L95 1003Z" };
// Lines above and below the tagline
parts.line = { d: "M95 1352L1985 1352L1985 1362L95 1362Z" };
parts.line2 = { d: "M95 1508L1985 1508L1985 1518L95 1518Z" };

// Tagline: three phrases separated by vertical dividers, sitting between two lines
{
  const capTop = 1400, capBottom = 1470;
  const phrases = ["Engineers", "Interior Designers", "Contractors"];
  const size = 100;
  const cap = bbox(regular.generateShapes("H", size));
  const sy = (capBottom - capTop) / cap.h;
  const widths = phrases.map((p) => bbox(regular.generateShapes(p, size)).w);
  const bar = 8; // divider thickness (px)
  const gap = 34; // space either side of a divider (px)
  const total = 1890;
  const textTotal = total - 2 * (bar + gap * 2);
  const sx = textTotal / widths.reduce((a, b) => a + b, 0);
  let x = 95;
  let d = "";
  phrases.forEach((p, i) => {
    const shapes = regular.generateShapes(p, size);
    const b = bbox(shapes);
    const left = x;
    d += shapesToD(shapes, (px, py) => [left + (px - b.minX) * sx, capBottom - py * sy]);
    x += b.w * sx;
    if (i < phrases.length - 1) {
      const x0 = x + gap;
      // Divider runs from just below the top line down to the bottom line
      d += `M${fmt(x0)} 1372L${fmt(x0 + bar)} 1372L${fmt(x0 + bar)} 1508L${fmt(x0)} 1508Z`;
      x += gap * 2 + bar;
    }
  });
  parts.tagline = { d, sx, sy };
}

const vb = { x: 95, y: 135, w: 1890, h: 1385 };
const ts = `/* Generated from the MgOpen Moderna (helvetiker) outlines to match the supplied
 * "The Home Designers" logo artwork. Do not edit by hand. */
export const LOGO_VIEWBOX = { x: ${vb.x}, y: ${vb.y}, w: ${vb.w}, h: ${vb.h} } as const;

export const LOGO_PATHS = {
  the: ${JSON.stringify(parts.the.d)},
  roof: ${JSON.stringify(parts.roof.d)},
  home: ${JSON.stringify(parts.home.d)},
  bar: ${JSON.stringify(parts.bar.d)},
  bar2: ${JSON.stringify(parts.bar2.d)},
  designers: ${JSON.stringify(parts.designers.d)},
  line: ${JSON.stringify(parts.line.d)},
  tagline: ${JSON.stringify(parts.tagline.d)},
  line2: ${JSON.stringify(parts.line2.d)},
} as const;

export type LogoPart = keyof typeof LOGO_PATHS;
`;
fs.writeFileSync(outFile, ts);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x - 40} ${vb.y - 40} ${vb.w + 80} ${vb.h + 80}" width="1000"><rect x="${vb.x - 40}" y="${vb.y - 40}" width="${vb.w + 80}" height="${vb.h + 80}" fill="#000"/><g fill="#2EA8E8" fill-rule="evenodd">${Object.values(parts).map((p) => `<path d="${p.d}"/>`).join("")}</g></svg>`;
fs.writeFileSync(previewFile, svg);
console.log("scales", Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, v.sx ? [fmt(v.sx), fmt(v.sy)] : null])));
console.log("bytes", ts.length);
