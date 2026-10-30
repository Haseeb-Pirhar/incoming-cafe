import type { Metadata } from "next";
import AboutContent from "@/ui/dashboard/about/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about happyLife — a discreet online store for sexual wellness, intimate care, and personal wellness products, with easy WhatsApp ordering.",
  alternates: { canonical: "/dashboard/about" },
  openGraph: {
    title: "About happyLife",
    description:
      "Discreet online store for sexual wellness and intimate care products.",
    url: "https://www.happylifepure.com/dashboard/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}