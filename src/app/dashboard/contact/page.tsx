import type { Metadata } from "next";
import ContactContent from "@/ui/dashboard/contact/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with happyLife for order support, product questions, or WhatsApp assistance — discreet and quick response.",
  alternates: { canonical: "/dashboard/contact" },
  openGraph: {
    title: "Contact happyLife",
    description: "Reach out for order support or product questions.",
    url: "https://www.happylifepure.com/dashboard/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
