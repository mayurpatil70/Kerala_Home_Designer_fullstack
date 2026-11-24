import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { legal } from "@/content/pages";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Terms and Conditions",
  description: "Terms that apply to the use of The Home Designers website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return <LegalPage title="Terms and Conditions" lead="The terms that apply when you use this website." sections={legal.terms} updated={legal.updated} />;
}
