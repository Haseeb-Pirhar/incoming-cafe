import type { Metadata } from "next";
import AboutContent from "@/ui/dashboard/about/about";

export const metadata: Metadata = {
    title: "About us",
    description:
        "Incoming Cafe is a small cafe at 24 Hunter Street, Parramatta, serving coffee, wraps, toasties and cold drinks.",
    alternates: { canonical: "/dashboard/about" },
};

export default function AboutPage() {
    return <AboutContent />;
}