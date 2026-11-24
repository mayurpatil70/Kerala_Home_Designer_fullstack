/**
 * ─────────────────────────────────────────────────────────────────────────
 *  COMPANY DETAILS, NAVIGATION AND SHARED COPY
 *  Contact details below were supplied by The Home Designers. Please verify
 *  them once more before launch (the PRD asks for this).
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "The Home Designers",
  shortName: "THD",
  tagline: "We materialise what you visualise.",
  headline: "Thoughtfully Designed. Professionally Built.",
  roles: ["Engineers", "Interior Designers", "Contractors"],
  positioning:
    "The Home Designers provides construction and design solutions for residential and commercial clients across Kerala, with services adaptable to a range of project requirements and budgets.",
  serviceArea: "Across Kerala, India",

  contact: {
    phones: [
      { label: "+91 93494 72018", href: "tel:+919349472018" },
      { label: "+91 62826 50369", href: "tel:+916282650369" },
    ],
    /** Number used for WhatsApp (digits only, with country code). Confirm it is the WhatsApp line. */
    whatsapp: "919349472018",
    whatsappMessage: "Hello The Home Designers, I would like to discuss a project.",
    email: "thdmkm@yahoo.com",
    address: {
      line1: "The Home Designers",
      line2: "Muthukulam South Post",
      district: "Alappuzha District",
      state: "Kerala",
      pin: "690506",
      country: "India",
    },
    mapQuery: "Muthukulam South Post, Alappuzha, Kerala 690506",
  },

  /** Add official profile URLs here when ready. Empty entries are hidden. */
  socials: [] as { label: string; href: string }[],

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", hasMenu: true },
    { label: "Projects", href: "/projects" },
    { label: "Process", href: "/process" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],

  footerLinks: {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/process" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Blog Journal", href: "/journal" },
      { label: "Contact Us", href: "/contact" },
    ],
    support: [
      { label: "FAQs", href: "/faqs" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
};

export const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

export const fullAddress = [
  site.contact.address.line2,
  site.contact.address.district,
  `${site.contact.address.state} ${site.contact.address.pin}`,
].join(", ");

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&output=embed`;
export const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapQuery)}`;
