import type { Metadata } from "next";
import HomeContent from "./home/home";

export const metadata: Metadata = {
  title: "Coffee and light bites in Parramatta",
  description:
    "Incoming Cafe, 24 Hunter Street, Parramatta. Coffee, fresh drinks and light bites.",
};

export default function DashboardPage() {
  return <HomeContent />;
}
