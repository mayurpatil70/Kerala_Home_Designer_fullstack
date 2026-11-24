/**
 * The six confirmed service categories (PRD §3–4).
 * Copy is written to describe scope and approach without promising fixed
 * timelines, costs, approvals or warranties. Review against how The Home
 * Designers actually delivers each service before launch.
 */

export type ServiceSlug =
  | "residential-construction"
  | "architectural-design"
  | "interior-design"
  | "commercial-construction"
  | "turnkey-construction"
  | "renovation-remodelling";

type Item = { title: string; text: string };
type Faq = { q: string; a: string };

export type Service = {
  slug: ServiceSlug;
  title: string;
  short: string;
  icon: "house" | "compass" | "sofa" | "building" | "key" | "hammer";
  group: "Build" | "Design" | "Deliver";
  intro: string;
  overview: { heading: string; body: string[] };
  covers: { heading: string; items: Item[] };
  approach: { heading: string; steps: Item[] };
  considerations: { heading: string; items: Item[] };
  note?: string;
  faqs: Faq[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
    short: "Custom homes, independent houses and villas, planned around your plot, family and budget.",
    icon: "house",
    group: "Build",
    intro:
      "From a compact family home to a spacious villa, we plan and build residences around how you live, the realities of your plot and the budget you are comfortable with.",
    overview: {
      heading: "Homes built around your brief",
      body: [
        "Every residential project begins with a conversation about the people who will live there: how many rooms you need, how the family uses shared spaces, and what matters most to you, whether that is natural light, low maintenance or room to grow.",
        "We then look closely at the site itself (orientation, access, drainage and surroundings) so the house responds to Kerala's climate and to the plot you have, rather than forcing a standard plan onto it.",
      ],
    },
    covers: {
      heading: "What residential construction can include",
      items: [
        { title: "Custom homes", text: "Homes designed for a specific family, plot and set of priorities." },
        { title: "Independent houses", text: "Single and multi-storey houses on individual plots, in town or village settings." },
        { title: "Villas", text: "Larger residences with more space, outdoor areas and tailored finishes." },
        { title: "Site and planning input", text: "Plot assessment, setbacks, orientation and practical layout decisions." },
        { title: "Construction coordination", text: "Coordinating trades, materials and site activity across the agreed scope." },
        { title: "Quality checks", text: "Stage-wise checks and supervision as part of the agreed service." },
      ],
    },
    approach: {
      heading: "How we approach a home",
      steps: [
        { title: "Understand the brief", text: "Rooms, lifestyle, priorities and an indicative budget." },
        { title: "Read the site", text: "Plot size and shape, access, levels, drainage and neighbouring buildings." },
        { title: "Plan the layout", text: "Zoning, circulation, light and ventilation, refined with you." },
        { title: "Define the scope", text: "Specifications, assumptions and exclusions written down before work begins." },
        { title: "Build and supervise", text: "Coordinated execution with regular communication and quality monitoring." },
        { title: "Hand over", text: "Final checks on the agreed work and a clear handover." },
      ],
    },
    considerations: {
      heading: "Things worth deciding early",
      items: [
        { title: "Climate and rainfall", text: "Roof form, overhangs, waterproofing and drainage matter in Kerala's monsoon." },
        { title: "Future needs", text: "Space for parents, a home office or a future upper floor can shape today's structure." },
        { title: "Maintenance", text: "Material choices affect how much upkeep the home will need over the years." },
        { title: "Budget balance", text: "Deciding where to invest and where to keep things simple keeps the project on track." },
      ],
    },
    faqs: [
      { q: "Can you work with a plan I already have?", a: "Yes. We can review an existing plan, suggest improvements where useful, and build to an agreed set of drawings and specifications." },
      { q: "Do you build on budget as well as premium projects?", a: "Yes. We work across budget to luxury segments. The scope and specifications are set to suit your requirements and budget." },
      { q: "How is the cost estimated?", a: "After understanding your brief and site, we prepare a scope with specifications, assumptions and exclusions, and an estimate based on that agreed scope." },
    ],
    cta: "Planning a home? Let's talk about your plot and requirements.",
  },
  {
    slug: "architectural-design",
    title: "Architectural Design",
    short: "Concepts, floor plans, elevations and visualisation that turn ideas into a buildable design.",
    icon: "compass",
    group: "Design",
    intro:
      "Good buildings start on paper. We develop concepts, layouts and elevations that balance how a space works, how it looks and what it takes to build it well.",
    overview: {
      heading: "Design that is ready to be built",
      body: [
        "Architectural design is where your requirements, the site and the budget come together. We explore options, test layouts and refine a design direction with you before anything is finalised.",
        "Because our team also builds, design decisions are made with construction in mind, so the drawings you approve are practical to execute.",
      ],
    },
    covers: {
      heading: "What architectural design covers",
      items: [
        { title: "Concept development", text: "Early options and a design direction based on your brief and site." },
        { title: "Architectural planning", text: "Zoning, room relationships, circulation and space efficiency." },
        { title: "Floor plans and layouts", text: "Detailed plans for each level, refined through review." },
        { title: "Elevations", text: "Exterior appearance, proportions, openings and roof form." },
        { title: "2D / 3D visualisation", text: "Drawings and visuals to help you understand the design, where offered for the project." },
        { title: "Design coordination", text: "Aligning architectural design with structure, services and interiors." },
      ],
    },
    approach: {
      heading: "From idea to drawings",
      steps: [
        { title: "Brief and site study", text: "Requirements, plot details, orientation and constraints." },
        { title: "Concept options", text: "Initial layouts and massing to compare directions." },
        { title: "Design development", text: "Refining the chosen option into detailed plans and elevations." },
        { title: "Visualisation", text: "2D and 3D views to review spaces and appearance, where included." },
        { title: "Final drawings", text: "A coordinated set of drawings for the agreed scope." },
      ],
    },
    considerations: {
      heading: "Design considerations",
      items: [
        { title: "Plot shape and orientation", text: "Sun path and prevailing breeze influence room placement and openings." },
        { title: "Ventilation and light", text: "Cross-ventilation and daylight make homes more comfortable in a humid climate." },
        { title: "Local building rules", text: "Setbacks and other requirements of the local body must be checked for each site." },
        { title: "Buildability and cost", text: "Simple, efficient structures help keep construction practical and economical." },
      ],
    },
    faqs: [
      { q: "Can I get only the design without construction?", a: "Please discuss your requirement with us. The scope of each engagement is agreed at the proposal stage." },
      { q: "Will I see 3D views before construction?", a: "Where 3D visualisation is included in the agreed scope, you will be able to review views of the design before it is finalised." },
      { q: "Do you consider Vastu?", a: "If Vastu is important to you, tell us at the start so it can be considered alongside the plot and design requirements." },
    ],
    cta: "Have an idea or a plot? Start with a design consultation.",
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    short: "Space planning, materials, colours, lighting and finishes for homes and applicable commercial spaces.",
    icon: "sofa",
    group: "Design",
    intro:
      "Interiors shape how a building feels every day. We plan spaces, select materials and detail finishes so rooms are comfortable, practical and personal.",
    overview: {
      heading: "Interiors that work as well as they look",
      body: [
        "We design residential interiors and applicable commercial interiors, starting with how each space will be used and who will use it.",
        "Working alongside our architectural and construction teams means interior decisions such as electrical points, lighting and joinery can be planned at the right time, not as an afterthought.",
      ],
    },
    covers: {
      heading: "Spaces we design",
      items: [
        { title: "Living spaces", text: "Living and dining areas planned for family time and hosting." },
        { title: "Bedrooms", text: "Calm, practical bedrooms with storage that suits how you live." },
        { title: "Kitchens", text: "Layouts, storage and work surfaces planned around daily cooking." },
        { title: "Workspaces", text: "Home offices and workspaces that support focus and comfort." },
        { title: "Commercial interiors", text: "Interiors for offices, retail and business premises where applicable." },
        { title: "Customised solutions", text: "Joinery, storage and details designed for the specific space." },
      ],
    },
    approach: {
      heading: "Elements we plan together",
      steps: [
        { title: "Space planning", text: "Furniture layout, movement and how each area is used." },
        { title: "Materials", text: "Durable, suitable materials for Kerala's humidity and your budget." },
        { title: "Colours", text: "A palette that ties rooms together and suits the light." },
        { title: "Lighting", text: "Layered lighting for tasks, ambience and safety." },
        { title: "Finishes", text: "Surfaces, hardware and details that complete the design." },
      ],
    },
    considerations: {
      heading: "Before you begin interiors",
      items: [
        { title: "Plan services early", text: "Electrical, plumbing and data points are easier to place before finishes." },
        { title: "Humidity", text: "Material and finish choices should account for moisture and ventilation." },
        { title: "Storage", text: "Built-in storage planned early makes small and large homes feel organised." },
        { title: "Phasing", text: "Interiors can be completed in stages if budget or timing requires it." },
      ],
    },
    faqs: [
      { q: "Do you design interiors for existing homes?", a: "Yes. Interior design can be part of a new build, a renovation or an existing property." },
      { q: "Can interiors be done in phases?", a: "Often, yes. We can plan the complete design and agree which areas are executed first." },
      { q: "Do you handle commercial interiors?", a: "Applicable commercial interiors such as offices and business premises can be discussed based on the project." },
    ],
    cta: "Ready to plan your interiors? Tell us about your space.",
  },
  {
    slug: "commercial-construction",
    title: "Commercial Construction",
    short: "Commercial buildings, offices, retail and business premises planned and executed with care.",
    icon: "building",
    group: "Build",
    intro:
      "Business premises need to work for staff, customers and operations. We plan, coordinate and build commercial spaces with a clear scope and professional execution.",
    overview: {
      heading: "Spaces that support your business",
      body: [
        "Commercial projects bring their own priorities: access, visibility, efficient layouts, services capacity and minimal disruption to business plans.",
        "We start by understanding how the building will be used, then set out a clear scope, coordinate the work and keep you informed as construction progresses.",
      ],
    },
    covers: {
      heading: "Commercial project types",
      items: [
        { title: "Commercial buildings", text: "New buildings for business use, planned around operations." },
        { title: "Offices", text: "Workplaces with practical layouts, services and finishes." },
        { title: "Retail", text: "Shops and showrooms designed for customer flow and display." },
        { title: "Business premises", text: "Clinics, studios and other premises, depending on the requirement." },
      ],
    },
    approach: {
      heading: "Planning, coordination and execution",
      steps: [
        { title: "Requirements", text: "Use, occupancy, services and how the space must perform." },
        { title: "Planning", text: "Layout, structure and services planned together." },
        { title: "Scope and schedule", text: "A written scope with assumptions, exclusions and a proposed schedule." },
        { title: "Coordination", text: "Managing trades, materials and site activity across the scope." },
        { title: "Execution and handover", text: "Construction with quality monitoring, final checks and handover." },
      ],
    },
    considerations: {
      heading: "Key questions before construction",
      items: [
        { title: "Use and capacity", text: "Who uses the space, how many people, and what equipment it must support." },
        { title: "Services", text: "Electrical load, plumbing, ventilation and data requirements." },
        { title: "Approvals", text: "Requirements vary by project and local body and should be confirmed early." },
        { title: "Future flexibility", text: "Layouts that can adapt if the business grows or changes." },
      ],
    },
    faqs: [
      { q: "Do you take on small commercial projects?", a: "Yes, commercial projects of different sizes can be discussed. Scope and suitability are confirmed after understanding the requirement." },
      { q: "Can you also design the interiors?", a: "Interior design for applicable commercial spaces can be included in the scope." },
    ],
    cta: "Planning a commercial space? Discuss your requirements with us.",
  },
  {
    slug: "turnkey-construction",
    title: "Turnkey Construction",
    short: "One team managing the agreed stages, from design to completion, with a clearly defined scope.",
    icon: "key",
    group: "Deliver",
    intro:
      "Turnkey construction means one team manages the agreed stages of your project, from design through construction to handover, so you have a single point of responsibility.",
    overview: {
      heading: "What turnkey means with us",
      body: [
        "In a turnkey project, The Home Designers takes responsibility for the stages agreed in the proposal. That can include design, construction, coordination of trades and agreed finishes, so you deal with one team instead of many.",
        "The key to a good turnkey project is clarity. Before work begins, the scope, specifications, inclusions, exclusions and responsibilities are written down and agreed, so everyone knows exactly what will be delivered.",
      ],
    },
    covers: {
      heading: "Stages typically managed by the company",
      items: [
        { title: "Design and planning", text: "Architectural planning and design for the agreed scope." },
        { title: "Scope and estimate", text: "Specifications, assumptions, exclusions and estimate in a written proposal." },
        { title: "Procurement", text: "Sourcing agreed materials and fittings as per specifications." },
        { title: "Construction", text: "Execution and coordination of all trades within the scope." },
        { title: "Finishes", text: "Agreed finishes and, where included, interior works." },
        { title: "Handover", text: "Final checks on the agreed work and handover to the client." },
      ],
    },
    approach: {
      heading: "How scope, specifications and estimates are agreed",
      steps: [
        { title: "Consultation", text: "Your goals, site, requirements and indicative budget." },
        { title: "Design direction", text: "A plan and design that suit the requirement and budget." },
        { title: "Specifications", text: "Materials, fittings and finishes listed so there are no assumptions." },
        { title: "Proposal", text: "Scope, inclusions, exclusions, estimate and proposed schedule." },
        { title: "Agreement", text: "Work begins once the scope and responsibilities are confirmed in writing." },
      ],
    },
    considerations: {
      heading: "Client responsibilities (typical)",
      items: [
        { title: "Land and documents", text: "Providing ownership documents and site details required for the project." },
        { title: "Approvals inputs", text: "Signatures and documents needed for statutory approvals, as applicable." },
        { title: "Timely decisions", text: "Confirming selections and approvals at each stage to avoid delays." },
        { title: "Payments", text: "Payments as per the agreed schedule in the contract." },
      ],
    },
    note:
      "Sample lists for the demo. The actual inclusions, exclusions and responsibilities for each project are defined in the written proposal and must be confirmed by The Home Designers.",
    faqs: [
      { q: "What is included in a turnkey project?", a: "Inclusions are specific to each project and are listed in the proposal. Anything not listed is treated as excluded unless agreed in writing." },
      { q: "Who handles approvals?", a: "Responsibility for approvals is agreed at the proposal stage. Requirements depend on the project and the local body." },
      { q: "Can I change the specifications later?", a: "Changes can be discussed. Any change to scope or specifications is agreed in writing, along with its effect on cost and schedule." },
    ],
    cta: "Prefer one team from start to finish? Ask about turnkey construction.",
  },
  {
    slug: "renovation-remodelling",
    title: "Renovation & Remodelling",
    short: "Upgrades, alterations, extensions and interior or exterior improvements to existing properties.",
    icon: "hammer",
    group: "Build",
    intro:
      "Give an existing property a new life. We assess what you have, define what is possible and plan the work to improve how your space looks, works and lasts.",
    overview: {
      heading: "Improving the space you already have",
      body: [
        "Renovation starts with understanding the existing building: its condition, structure, services and what you would like to change.",
        "From there we define a clear scope and plan the work in a sensible sequence, keeping disruption in mind, especially if you will be living or working in the property during the project.",
      ],
    },
    covers: {
      heading: "What renovation can include",
      items: [
        { title: "Interior upgrades", text: "New finishes, kitchens, bathrooms, lighting and storage." },
        { title: "Remodelling", text: "Reworking layouts to make spaces more useful." },
        { title: "Extensions", text: "Adding rooms or floors where the structure and approvals allow." },
        { title: "Alterations", text: "Changes to walls, openings and spaces within the existing building." },
        { title: "Exterior improvements", text: "Façade updates, roofing, waterproofing and outdoor areas." },
        { title: "Residential and commercial", text: "Renovation for homes and business premises, as applicable." },
      ],
    },
    approach: {
      heading: "Assessment, scope and planning",
      steps: [
        { title: "Initial assessment", text: "Visiting the property to understand condition and requirements." },
        { title: "Feasibility", text: "Checking what is practical given the structure, services and approvals." },
        { title: "Scope definition", text: "A written scope with specifications, assumptions and exclusions." },
        { title: "Execution planning", text: "Sequencing work to manage disruption and safety." },
        { title: "Completion", text: "Final checks on the agreed work and handover." },
      ],
    },
    considerations: {
      heading: "Renovate or rebuild?",
      items: [
        { title: "Structural condition", text: "The state of the existing structure strongly influences what is sensible." },
        { title: "Extent of change", text: "Major layout changes can sometimes approach the cost of building new." },
        { title: "Living arrangements", text: "Whether you stay in the property during work affects planning." },
        { title: "Approvals", text: "Extensions and some alterations may need approval from the local body." },
      ],
    },
    note:
      "Feasibility, approvals and scope depend on each property and project. Before-and-after photographs will be published only with the owner's permission.",
    faqs: [
      { q: "Can you add a floor to my existing house?", a: "It depends on the existing structure, foundations and approvals. An assessment is needed before this can be confirmed." },
      { q: "Can we stay at home during renovation?", a: "Sometimes. We discuss this during planning and sequence the work to reduce disruption where possible." },
    ],
    cta: "Thinking of renovating? Book an initial assessment.",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
