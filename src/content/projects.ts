/**
 * DEMO PROJECTS — placeholders that show how the portfolio and case-study
 * template work. Replace every entry with approved real projects (name,
 * location, category, status, services delivered, images and permissions).
 * PRD §5: use town/district only, never a private address.
 */
import type { ServiceSlug } from "./services";

export type ArtKind = "elevation" | "plan" | "interior" | "facade" | "kitchen" | "section" | "renovation" | "office";

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: "Residential" | "Commercial";
  status: "Completed" | "Ongoing";
  services: ServiceSlug[];
  art: ArtKind;
  summary: string;
  overview: string;
  approach: string[];
  highlights: string[];
  specs: { label: string; value: string }[];
  gallery: { art: ArtKind; caption: string }[];
};

const tbc = "To be confirmed";

export const projects: Project[] = [
  {
    slug: "contemporary-family-home-alappuzha",
    title: "Contemporary Family Home",
    location: "Alappuzha District",
    category: "Residential",
    status: "Completed",
    services: ["architectural-design", "residential-construction", "interior-design"],
    art: "elevation",
    summary: "A two-storey family home planned around natural light and cross-ventilation.",
    overview:
      "Sample case study. The client wanted a low-maintenance home with generous shared spaces and bedrooms that stay cool through the day. The brief, plot details and budget guided every design decision.",
    approach: [
      "Living and dining placed to catch the morning light and the prevailing breeze.",
      "Deep roof overhangs and a sloped roof to handle heavy monsoon rain.",
      "Interiors kept simple and durable, with built-in storage in every bedroom.",
    ],
    highlights: ["Open living and dining", "Sloped roof with deep overhangs", "Built-in storage", "Covered sit-out"],
    specs: [
      { label: "Built-up area", value: tbc },
      { label: "Floors", value: tbc },
      { label: "Bedrooms", value: tbc },
      { label: "Plot", value: tbc },
    ],
    gallery: [
      { art: "elevation", caption: "Front elevation" },
      { art: "plan", caption: "Ground floor layout" },
      { art: "interior", caption: "Living room" },
      { art: "kitchen", caption: "Kitchen" },
    ],
  },
  {
    slug: "courtyard-residence-kollam",
    title: "Courtyard Residence",
    location: "Kollam District",
    category: "Residential",
    status: "Ongoing",
    services: ["turnkey-construction", "architectural-design"],
    art: "plan",
    summary: "A single-storey turnkey home organised around a central open courtyard.",
    overview:
      "Sample case study. A turnkey project in which design, construction and agreed finishes are managed by one team, with the client's responsibilities agreed at the proposal stage.",
    approach: [
      "Rooms arranged around a courtyard for light, air and privacy.",
      "Specifications and inclusions listed in the proposal before work began.",
      "Regular progress updates shared with the client during construction.",
    ],
    highlights: ["Central courtyard", "Single-storey plan", "Turnkey scope", "Stage-wise updates"],
    specs: [
      { label: "Built-up area", value: tbc },
      { label: "Floors", value: tbc },
      { label: "Bedrooms", value: tbc },
      { label: "Stage", value: "Under construction" },
    ],
    gallery: [
      { art: "plan", caption: "Courtyard plan" },
      { art: "section", caption: "Section through courtyard" },
      { art: "elevation", caption: "Street elevation" },
    ],
  },
  {
    slug: "retail-office-building-kayamkulam",
    title: "Retail & Office Building",
    location: "Alappuzha District",
    category: "Commercial",
    status: "Completed",
    services: ["commercial-construction", "architectural-design"],
    art: "facade",
    summary: "Ground-floor retail with flexible office floors above.",
    overview:
      "Sample case study. A commercial building planned for street-facing retail and adaptable office space on the upper floors, with services designed for future tenant changes.",
    approach: [
      "Large shopfront openings on the ground floor for visibility.",
      "Column grid kept regular so office floors can be divided flexibly.",
      "Services and staircase positioned to keep floor plates efficient.",
    ],
    highlights: ["Street-facing retail", "Flexible office floors", "Efficient core", "Service provisions"],
    specs: [
      { label: "Built-up area", value: tbc },
      { label: "Floors", value: tbc },
      { label: "Use", value: "Retail and office" },
    ],
    gallery: [
      { art: "facade", caption: "Front façade" },
      { art: "office", caption: "Typical office floor" },
      { art: "section", caption: "Building section" },
    ],
  },
  {
    slug: "home-renovation-extension-haripad",
    title: "Home Renovation & Extension",
    location: "Alappuzha District",
    category: "Residential",
    status: "Completed",
    services: ["renovation-remodelling", "interior-design"],
    art: "renovation",
    summary: "An older home upgraded with a new kitchen, refreshed interiors and a rear extension.",
    overview:
      "Sample case study. The owners wanted to stay in their existing home but needed more space and a modern kitchen. After an assessment, the scope covered an extension, interior upgrades and waterproofing.",
    approach: [
      "Initial assessment of structure, roof and services.",
      "Work sequenced so the family could continue living in part of the house.",
      "Before-and-after photos published only with the owners' permission.",
    ],
    highlights: ["Rear extension", "New kitchen", "Roof waterproofing", "Refreshed interiors"],
    specs: [
      { label: "Extension area", value: tbc },
      { label: "Scope", value: "Extension, interiors, waterproofing" },
    ],
    gallery: [
      { art: "renovation", caption: "Extension (before / after)" },
      { art: "kitchen", caption: "New kitchen" },
      { art: "interior", caption: "Living area" },
    ],
  },
  {
    slug: "clinic-interior-fit-out-mavelikara",
    title: "Clinic Interior Fit-out",
    location: "Alappuzha District",
    category: "Commercial",
    status: "Ongoing",
    services: ["interior-design", "renovation-remodelling"],
    art: "office",
    summary: "A calm, easy-to-clean clinic interior with clear patient flow.",
    overview:
      "Sample case study. An existing commercial space being fitted out as a clinic, with reception, waiting and consultation rooms planned for clear movement and hygiene.",
    approach: [
      "Patient flow mapped from entry to consultation and exit.",
      "Durable, easy-to-clean surfaces selected for daily use.",
      "Lighting planned for both comfort and clinical tasks.",
    ],
    highlights: ["Reception & waiting", "Consultation rooms", "Easy-clean finishes", "Task lighting"],
    specs: [
      { label: "Area", value: tbc },
      { label: "Stage", value: "Interior works in progress" },
    ],
    gallery: [
      { art: "office", caption: "Reception" },
      { art: "plan", caption: "Layout" },
      { art: "interior", caption: "Waiting area" },
    ],
  },
  {
    slug: "two-storey-residence-pathanamthitta",
    title: "Two-storey Residence",
    location: "Pathanamthitta District",
    category: "Residential",
    status: "Ongoing",
    services: ["residential-construction", "architectural-design"],
    art: "section",
    summary: "A sloping-site home that steps with the land to reduce excavation.",
    overview:
      "Sample case study. On a sloping plot, the house was designed to follow the natural levels, reducing excavation and creating a lower-level family room with garden access.",
    approach: [
      "Split levels following the slope of the site.",
      "Retaining and drainage details planned early.",
      "Large openings toward the view, shaded by overhangs.",
    ],
    highlights: ["Split-level plan", "Drainage planning", "Garden-level family room", "Shaded openings"],
    specs: [
      { label: "Built-up area", value: tbc },
      { label: "Floors", value: tbc },
      { label: "Stage", value: "Structure in progress" },
    ],
    gallery: [
      { art: "section", caption: "Site section" },
      { art: "elevation", caption: "Rear elevation" },
      { art: "plan", caption: "Upper floor layout" },
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
