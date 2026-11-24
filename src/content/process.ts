/**
 * Project process (PRD §4.10). The published process must match how the company
 * actually works. No fixed timelines, approvals, warranties or outcomes are promised.
 */
export const processSteps = [
  {
    no: "01",
    title: "Initial consultation",
    short: "Consult",
    text: "We understand your goals, the property or site, your requirements and an indicative budget.",
    youShare: ["Your requirements and priorities", "Plot or property details", "Indicative budget range"],
    youGet: ["A clear understanding of next steps", "Initial guidance on scope and feasibility"],
  },
  {
    no: "02",
    title: "Planning and design",
    short: "Design",
    text: "We develop an appropriate concept, plan and design direction for the agreed scope.",
    youShare: ["Feedback on options", "Preferences on style and materials"],
    youGet: ["Concept and layout options", "Refined plans and design direction"],
  },
  {
    no: "03",
    title: "Scope and proposal",
    short: "Propose",
    text: "We set out the scope, specifications, assumptions, exclusions, estimate and proposed schedule.",
    youShare: ["Decisions on specifications", "Confirmation of responsibilities"],
    youGet: ["A written proposal", "Estimate based on the agreed scope", "Proposed schedule"],
  },
  {
    no: "04",
    title: "Project execution",
    short: "Build",
    text: "We coordinate construction activities, communicate progress and monitor quality throughout.",
    youShare: ["Timely approvals and selections", "Payments as per the agreed schedule"],
    youGet: ["Coordinated site work", "Regular progress communication", "Quality monitoring"],
  },
  {
    no: "05",
    title: "Completion and handover",
    short: "Handover",
    text: "We carry out final checks, complete the agreed work and hand the project over.",
    youShare: ["Final walkthrough feedback"],
    youGet: ["Completed agreed work", "Handover of the project"],
  },
];
