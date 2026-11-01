import type { Metadata } from "next";
import ContactContent from "@/ui/dashboard/contact/contact";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Find Incoming Cafe at 24 Hunter Street, Parramatta, or send us a message.",
    alternates: { canonical: "/dashboard/contact" },
};

export default function ContactPage() {
    return <ContactContent />;
}