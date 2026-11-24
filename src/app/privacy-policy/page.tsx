import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { legal } from "@/content/pages";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How The Home Designers collects, uses and protects the information you share through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" lead="How we handle the information you share with us through this website." sections={legal.privacy} updated={legal.updated} />;
}
