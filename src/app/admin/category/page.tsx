import type { Metadata } from "next";
import CategoryAdminPage from "@/ui/admin/category/page";

export const metadata: Metadata = {
  title: "Manage Categories | happyLife Admin",
  description:
    "Manage and organize product categories for the happyLife store.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },
};

const AdminCategoryPage = () => {
  return <CategoryAdminPage />;
};

export default AdminCategoryPage;
