// app/dashboard/page.tsx
import type { Metadata } from "next";
import HomeContent from "./home/home";

export const metadata: Metadata = {
  title: "happyLife — Dashboard",
  alternates: { canonical: "https://www.happylifepure.com" },
  robots: { index: false, follow: true }, // duplicate content — root already indexed
};

export default function DashboardPage() {
  return <HomeContent />;
}
