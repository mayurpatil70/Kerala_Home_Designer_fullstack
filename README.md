# The Home Designers — website

*We materialise what you visualise.*

A multi-page website for **The Home Designers** (Engineers • Interior Designers • Contractors), Muthukulam South, Alappuzha, Kerala. It is built to the Final Website PRD with **Next.js 16**, **GSAP** (ScrollTrigger, SplitText, Flip), **Lenis** smooth scrolling and **React Three Fiber** for the 3D logo and the 3D process scene.

## Run it

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Node 20.9+ (Node 22 recommended). Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.yourdomain.in`) in production so canonical URLs, the sitemap and structured data use your domain.

## Pages (PRD §3)

| Page | Route |
| --- | --- |
| Home | `/` |
| About Us | `/about` |
| Our Services (overview + service finder) | `/services` |
| Residential Construction · Architectural Design · Interior Design · Commercial Construction · Turnkey Construction · Renovation & Remodelling | `/services/[slug]` |
| Our Projects (filterable portfolio) | `/projects` |
| Project Details (case-study template) | `/projects/[slug]` |
| Our Process | `/process` |
| Testimonials | `/testimonials` |
| Blog Journal (category filter) | `/journal` |
| Journal articles (8 drafts from the PRD's article ideas) | `/journal/[slug]` |
| Contact Us (form, call, WhatsApp, email, map) | `/contact` |
| FAQs · Privacy Policy · Terms & Conditions | `/faqs` · `/privacy-policy` · `/terms-and-conditions` |

Also included: `sitemap.xml`, `robots.txt`, a 404 page, per-page titles, descriptions and canonical URLs, and structured data (business details, breadcrumbs, FAQs, articles) that matches visible content.

## Editing content

All copy lives in `src/content/`:

- `site.ts`: company name, phones, WhatsApp number, email, address, navigation, social links
- `services.ts`: the six services (overview, scope, approach, considerations, FAQs)
- `projects.ts`: **demo projects**; replace them with approved real projects
- `journal.ts`: Blog Journal articles (**drafts for review**)
- `process.ts`, `faqs.ts`, `pages.ts`: process stages, FAQs, About, Testimonials and legal text

### Placeholders to replace before launch

The PRD asks for verified claims only, so these are clearly marked in the site:

- **Projects**: every project is labelled *Demo*. Add real projects, locations (town or district only), services delivered and photos with permission.
- **Photos**: there are no stock photos. Blueprint-style line drawings labelled *Project photo* mark where images go.
- **Testimonials**: placeholder cards only. Publish genuine feedback with client consent.
- **About**: company history, vision, mission and team are marked *Draft* or *Placeholder*.
- **Turnkey inclusions/exclusions**: sample lists, to be confirmed against your actual scope.
- **Journal articles**: original drafts. Have an engineer review them, then add publication dates.
- **Privacy Policy / Terms**: draft templates for legal review.
- **WhatsApp**: uses +91 93494 72018. Change `site.contact.whatsapp` if your WhatsApp line is the other number.
- **Social links**: add them to `site.socials` when ready.

## Receiving enquiries

Forms post to `src/app/api/enquiry/route.ts` (name, phone, email, location, service, message, consent, plus a spam honeypot). It validates and logs each lead. Connect it to email or a CRM at the `TODO` (for example, send to thdmkm@yahoo.com through Resend or SendGrid). Keep API keys in environment variables.

## Brand and logo

- Colours: navy `#071a2c` and sky blue `#35adec` (from the logo). Font: Plus Jakarta Sans (self-hosted).
- The logo was recreated as vector paths (`src/components/brand/logoPaths.ts`) matching the supplied artwork. The same paths drive the flat logo (`Logo.tsx`) and the extruded sky-blue **3D logo** (`three/LogoScene.tsx`). To regenerate the paths, run `scripts/logo/make-logo.mjs` (see its header comment). Letterforms use MgOpen Moderna (licence in `scripts/logo/LICENSE`).

## Effects

- **Stacking pages**: sections stick, and the next one slides over while the covered one scales down and dims (`components/stack/Stack.tsx`).
- **Smooth scrolling**: Lenis, synced with GSAP ScrollTrigger.
- **3D logo hero**: logo parts assemble on load, float, tilt toward the pointer and turn on scroll.
- **3D process scrollytelling** on the home page: a house builds itself through the five process stages, from blueprint to dusk.
- **Gallery moving right**: gallery rows glide to the right as you scroll down, each row at its own speed.
- **Wave nav hover**: a liquid sky-blue wave rises to fill the tab on hover and drains back down on hover-out. The same wave is used on all buttons.
- **Other hovers**: border-trace cards, circular colour sweep on service cards, magnetic buttons, wavy link underlines, tile zoom and tilt, custom cursor.
- **Page transitions**: a sky-blue and navy curtain wipe between pages, plus masked headline reveals.
- **Animated portfolio and journal filters** (GSAP Flip), accordions, a preloader and a mobile call / WhatsApp / enquire bar.

All motion respects the visitor's **reduced-motion** setting. If WebGL is unavailable, the 3D scenes fall back gracefully.

## A note on WordPress (PRD §8)

The PRD specifies WordPress as the CMS. This build keeps all content in typed data files, so it can be connected to WordPress as a **headless CMS** (WP REST API or WPGraphQL): editors manage projects, services, testimonials and journal posts in WordPress, and this site renders them with the same design and effects. Alternatively, the design can be ported to a custom WordPress theme. Agree the approach with your developer.
