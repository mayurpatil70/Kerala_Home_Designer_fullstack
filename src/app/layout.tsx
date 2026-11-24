import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site, fullAddress } from "@/content/site";
import { services } from "@/content/services";
import SmoothScroll from "@/components/providers/SmoothScroll";
import EnquiryProvider from "@/components/providers/EnquiryProvider";
import Preloader from "@/components/ui/Preloader";
import Cursor from "@/components/ui/Cursor";
import FloatingActions from "@/components/ui/FloatingActions";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const jakarta = localFont({
  src: "../fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

// Italic is used for a couple of small accents only, so it is not preloaded.
const jakartaItalic = localFont({
  src: "../fonts/plus-jakarta-sans-latin-wght-italic.woff2",
  weight: "200 800",
  style: "italic",
  variable: "--font-italic",
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Construction & Design Company in Kerala`,
    template: `%s | ${site.name}`,
  },
  description: site.positioning,
  openGraph: {
    title: site.name,
    description: site.positioning,
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#071a2c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  slogan: site.tagline,
  description: site.positioning,
  url: siteUrl,
  telephone: site.contact.phones.map((p) => p.href.replace("tel:", "")),
  email: site.contact.email,
  areaServed: { "@type": "State", name: "Kerala" },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.line2,
    addressLocality: "Muthukulam",
    addressRegion: "Kerala",
    postalCode: site.contact.address.pin,
    addressCountry: "IN",
  },
  knowsAbout: services.map((s) => s.title),
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${jakartaItalic.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <EnquiryProvider>
            <Preloader />
            <Cursor />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <FloatingActions />
          </EnquiryProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
