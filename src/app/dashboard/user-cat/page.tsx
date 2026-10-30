import type { Metadata } from "next";
import UserCategoryContent from "@/ui/dashboard/user-cat/user-cat";

export const metadata: Metadata = {
  title: "Categories | happyLife",
  description: "Browse all happyLife product categories.",
};

export default function UserCatPage() {
  return <UserCategoryContent />;
}
