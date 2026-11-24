/**
 * Blog Journal — initial articles from the PRD's article ideas (§6).
 * These are DRAFTS: original, general guidance written for review. Check any
 * technical, regulatory or cost statement with the company's engineers before
 * publishing, and add the publication date when approved.
 */
import type { ServiceSlug } from "./services";

export const journalCategories = [
  "Construction Guides",
  "Architecture & Design",
  "Interior Design",
  "Commercial Spaces",
  "Renovation & Remodelling",
  "Turnkey Projects",
  "Project Stories",
  "Company Journal",
] as const;

export type JournalCategory = (typeof journalCategories)[number];

type Section = { h: string; p: string[]; list?: string[] };

export type Article = {
  slug: string;
  title: string;
  category: JournalCategory;
  excerpt: string;
  minutes: number;
  sections: Section[];
  faqs: { q: string; a: string }[];
  services: ServiceSlug[];
};

export const articles: Article[] = [
  {
    slug: "planning-to-build-a-house-in-kerala",
    title: "Planning to Build a House in Kerala: What Should You Consider First?",
    category: "Construction Guides",
    excerpt: "Before drawings and estimates, a few early decisions shape everything that follows. Here is where to start.",
    minutes: 6,
    sections: [
      {
        h: "Start with how you want to live",
        p: [
          "A good home brief describes people, not just rooms. Think about who will live in the house now and in ten years, how the family spends time together, and which spaces need privacy or quiet.",
          "Write down your must-haves and your nice-to-haves separately. This list becomes the most useful document you can bring to a first meeting with a designer or contractor.",
        ],
      },
      {
        h: "Understand your plot",
        p: ["The plot decides much more than the size of the house. Before planning, gather what you know about it."],
        list: [
          "Plot dimensions, shape and access road",
          "Ground levels, slope and any history of water-logging",
          "Orientation: where the sun rises and sets, and where breezes come from",
          "Neighbouring buildings, trees and views",
          "Ownership and land documents needed for approvals",
        ],
      },
      {
        h: "Think about Kerala's climate early",
        p: [
          "Heavy monsoon rain, high humidity and strong sun all affect design and material choices. Roof form, overhangs, waterproofing, drainage and cross-ventilation are easier to get right at the planning stage than to fix later.",
        ],
      },
      {
        h: "Set a realistic budget range",
        p: [
          "Decide on a comfortable budget range, including a contingency, before design begins. Share it openly with your design and construction team. It helps them suggest a scope and specifications that fit, rather than designing something you then have to cut back.",
        ],
      },
      {
        h: "Check approvals with your local body",
        p: [
          "Building permits and the rules that apply (such as setbacks and coverage) depend on the location and the local body. Confirm the current requirements for your site before finalising a design.",
        ],
      },
    ],
    faqs: [
      { q: "What should I bring to the first meeting?", a: "Plot details or documents, your list of requirements, any reference images you like and your indicative budget range." },
      { q: "Should I design first or get an estimate first?", a: "A meaningful estimate needs a defined scope, so design direction and specifications usually come first." },
    ],
    services: ["residential-construction", "architectural-design"],
  },
  {
    slug: "stages-of-residential-construction",
    title: "Understanding the Stages of Residential Construction",
    category: "Construction Guides",
    excerpt: "From the first site visit to handover, here is what typically happens at each stage of building a home.",
    minutes: 5,
    sections: [
      {
        h: "1. Consultation and brief",
        p: ["The project starts with understanding your goals, site, requirements and indicative budget. This shapes everything that follows."],
      },
      {
        h: "2. Planning and design",
        p: ["Layouts, elevations and design direction are developed and refined with you. Structural and services planning begin alongside the architectural design."],
      },
      {
        h: "3. Scope, specifications and proposal",
        p: ["A clear proposal sets out the scope, specifications, assumptions, exclusions, estimate and a proposed schedule. Agreeing this in writing prevents misunderstandings later."],
      },
      {
        h: "4. Construction",
        p: ["On site, work generally moves through these phases:"],
        list: [
          "Site preparation and setting out",
          "Foundation and plinth",
          "Structure: columns, beams and slabs",
          "Masonry, roofing and openings",
          "Plumbing and electrical works",
          "Plastering, flooring and finishes",
        ],
      },
      {
        h: "5. Completion and handover",
        p: ["Final checks confirm the agreed work is complete before the home is handed over. It is a good moment to collect any manuals, warranties for fittings and as-built information."],
      },
    ],
    faqs: [{ q: "How long does construction take?", a: "It depends on the size, design, specifications, approvals, weather and site conditions. A proposed schedule is shared once the scope is defined." }],
    services: ["residential-construction", "turnkey-construction"],
  },
  {
    slug: "plan-a-home-design-around-your-plot-and-lifestyle",
    title: "How to Plan a Home Design Around Your Plot and Lifestyle",
    category: "Architecture & Design",
    excerpt: "The best layouts respond to both the land and the people living on it. A practical way to think about it.",
    minutes: 5,
    sections: [
      {
        h: "Let the plot lead",
        p: ["Narrow plots, corner plots and sloping plots each suggest different layouts. Working with the plot, rather than against it, usually saves cost and produces a more comfortable home."],
      },
      {
        h: "Orientation, light and air",
        p: ["Place living spaces to enjoy pleasant daylight and position openings to encourage cross-ventilation. In a humid climate, airflow makes a real difference to comfort."],
      },
      {
        h: "Zone the house",
        p: ["Group spaces by how they are used:"],
        list: ["Public: entrance, living, dining", "Private: bedrooms and study", "Service: kitchen, work area, utility, storage"],
      },
      {
        h: "Plan for change",
        p: ["A ground-floor bedroom for elders, a room that can become a home office, or a structure designed to take an upper floor later can keep the home useful for years."],
      },
    ],
    faqs: [{ q: "Can a small plot still feel spacious?", a: "Yes. Open layouts, good light, height and well-planned storage help smaller homes feel generous." }],
    services: ["architectural-design", "residential-construction"],
  },
  {
    slug: "what-is-turnkey-construction",
    title: "What Is Turnkey Construction? Scope, Inclusions and Questions to Ask",
    category: "Turnkey Projects",
    excerpt: "Turnkey promises one point of responsibility. Here is how to make sure the scope is truly clear.",
    minutes: 6,
    sections: [
      {
        h: "What turnkey means",
        p: ["In a turnkey project, one company manages the agreed stages, typically from design through construction to handover. The client deals with a single team instead of coordinating many contractors."],
      },
      {
        h: "Why the written scope matters",
        p: ["\"Turnkey\" can mean different things to different builders. The proposal should spell out exactly what is included, what is excluded and what is optional."],
      },
      {
        h: "Questions to ask before you sign",
        p: ["Use these questions to make the scope concrete:"],
        list: [
          "Which stages are managed by the company, and which are my responsibility?",
          "Are specifications for materials, fittings and finishes listed in detail?",
          "Who handles statutory approvals and related costs?",
          "What is excluded (for example, furniture, landscaping or appliances)?",
          "How are changes to scope priced and approved?",
          "What is the payment schedule, and how is progress reported?",
        ],
      },
    ],
    faqs: [{ q: "Is turnkey always more expensive?", a: "Not necessarily. Costs depend on scope and specifications. Turnkey mainly changes who coordinates the work and carries responsibility." }],
    services: ["turnkey-construction"],
  },
  {
    slug: "renovation-or-rebuilding",
    title: "Renovation or Rebuilding: Factors to Consider Before Deciding",
    category: "Renovation & Remodelling",
    excerpt: "Should you upgrade what you have or start again? The answer depends on a few key factors.",
    minutes: 5,
    sections: [
      {
        h: "Condition of the existing structure",
        p: ["An assessment of foundations, walls, roof and services is the starting point. A sound structure often makes renovation the sensible choice."],
      },
      {
        h: "How much needs to change",
        p: ["Cosmetic upgrades and kitchen or bathroom renewals suit renovation well. Extensive changes to layout and structure can bring costs close to building new."],
      },
      {
        h: "Approvals and regulations",
        p: ["Extensions and some alterations may need approval from the local body. Feasibility should be checked before you commit."],
      },
      {
        h: "Living arrangements",
        p: ["Consider whether you will stay in the property during the work, and how disruption will be managed."],
      },
    ],
    faqs: [{ q: "Can an older Kerala home be modernised?", a: "Often, yes. Many older homes can be upgraded with new interiors, kitchens, bathrooms and waterproofing, subject to an assessment." }],
    services: ["renovation-remodelling", "interior-design"],
  },
  {
    slug: "architectural-and-interior-design-together",
    title: "How Architectural Design and Interior Design Work Together",
    category: "Interior Design",
    excerpt: "When architecture and interiors are planned together, homes work better and surprises are fewer.",
    minutes: 4,
    sections: [
      {
        h: "Why timing matters",
        p: ["Interior decisions such as furniture layout, lighting and storage affect where walls, windows, electrical points and plumbing go. Planning them early avoids costly changes later."],
      },
      {
        h: "What to coordinate",
        list: ["Furniture layouts and room sizes", "Lighting design and electrical points", "Kitchen layout and plumbing", "Built-in storage and joinery", "Materials and colour palette"],
        p: [],
      },
      {
        h: "One team, fewer gaps",
        p: ["When the same team handles architecture, interiors and construction, information flows more easily and the finished space is closer to what was designed."],
      },
    ],
    faqs: [],
    services: ["architectural-design", "interior-design"],
  },
  {
    slug: "planning-a-commercial-space",
    title: "Planning a Commercial Space: Key Questions Before Construction",
    category: "Commercial Spaces",
    excerpt: "Clear answers to a few questions at the start make commercial projects smoother and more predictable.",
    minutes: 5,
    sections: [
      {
        h: "Who will use the space?",
        p: ["Staff numbers, customer footfall and operating hours all influence layout, circulation, toilets and parking."],
      },
      {
        h: "What services are needed?",
        p: ["Confirm electrical load, data, plumbing, ventilation and any special equipment early, so the building is planned to support them."],
      },
      {
        h: "What approvals apply?",
        p: ["Requirements differ by use, size and location. Check them with the relevant authorities before finalising the design."],
      },
      {
        h: "How might the business change?",
        p: ["Flexible layouts and spare services capacity help a building adapt as the business grows."],
      },
    ],
    faqs: [],
    services: ["commercial-construction", "interior-design"],
  },
  {
    slug: "nri-guide-to-construction-in-kerala",
    title: "A Practical Guide for NRIs Planning Construction in Kerala",
    category: "Construction Guides",
    excerpt: "Building from abroad is very possible with the right preparation, communication and documentation.",
    minutes: 6,
    sections: [
      {
        h: "Prepare documents in advance",
        p: ["Keep land documents, identity documents and any authorisations organised and accessible. If someone will act on your behalf locally, arrange the necessary authorisation well in advance."],
      },
      {
        h: "Agree on communication",
        p: ["Decide how often you want updates and in what form: photos, video calls or written reports. Regular, structured updates reduce the stress of building from a distance."],
      },
      {
        h: "Make decisions easy",
        p: ["Finalise as many specifications as possible before construction begins. Approving selections in batches at planned stages keeps work moving."],
      },
      {
        h: "Consider turnkey",
        p: ["A turnkey arrangement gives you a single point of responsibility, which many clients living abroad find simpler to manage."],
      },
    ],
    faqs: [{ q: "Can I manage the whole project remotely?", a: "Much of it, yes, with clear documentation, regular updates and a local contact for tasks that need someone present." }],
    services: ["turnkey-construction", "residential-construction"],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
