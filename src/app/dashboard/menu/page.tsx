import type { Metadata } from "next";
import MenuContent from "./menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "See the Incoming Cafe menu: coffee, fresh drinks and light bites at 24 Hunter Street, Parramatta.",
  alternates: { canonical: "/dashboard/menu" },
};

export default function MenuPage() {
  return <MenuContent />;
}
