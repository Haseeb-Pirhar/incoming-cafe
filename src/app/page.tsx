// app/page.tsx
import type { Metadata } from "next";
import { getAuthCookies } from "@/utils/cookies";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "happyLife — Sexual Wellness & Intimate Care, Delivered Discreetly",
  description:
    "Shop sexual wellness, intimate care, and personal wellness products at happyLife. Discreet packaging, easy WhatsApp ordering, no login required.",
  alternates: { canonical: "https://www.happylifepure.com" },
  openGraph: {
    title: "happyLife — Sexual Wellness & Intimate Care",
    description:
      "Discreet delivery, easy WhatsApp ordering, no login required.",
    url: "https://www.happylifepure.com",
    siteName: "happyLife",
    type: "website",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "happyLife" },
    ],
  },
  robots: { index: true, follow: true },
};

export default async function HomePage() {
  const authCookies = await getAuthCookies();

  if (authCookies?.accessToken && authCookies?.user) {
    const { user } = authCookies;

    if (user.type === "superAdmin") return redirect("/super-admin/dashboard");
    if (user.type === "admin") return redirect("/admin/dashboard");
    if (user.type === "business") return redirect("/store");
  }

  // Normal user (logged in ya logged out) → hamesha dashboard
  return redirect("/dashboard");
}
