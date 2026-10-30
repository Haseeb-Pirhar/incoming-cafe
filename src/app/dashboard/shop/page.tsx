import type { Metadata } from "next";
import type { ComponentType } from "react";
import ShopPageClient from "@/ui/dashboard/shop/shop";
import { getAllProducts } from "@/api/api-call/product-api";
import { getAllCategories } from "@/api/api-call/category";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse sexual wellness, intimate care, and personal wellness products at happyLife. Discreet packaging, WhatsApp ordering, no login required.",
  alternates: { canonical: "/dashboard/shop" },
  openGraph: {
    title: "Shop All Products | happyLife",
    description:
      "Browse the full happyLife catalog — sexual wellness and intimate care products.",
    url: "https://www.happylifepure.com/dashboard/shop",
    type: "website",
  },
};

export const revalidate = 60;

const ShopPageClientComponent = ShopPageClient as unknown as ComponentType<{
  initialProducts: any[];
  initialCategories: any[];
}>;

export default async function ShopPageWrapper() {
  const [productsRes, categories] = await Promise.all([
    getAllProducts({ page: 1 }),
    getAllCategories(),
  ]);

  return (
    <ShopPageClientComponent
      initialProducts={(productsRes?.data as any[]) || []}
      initialCategories={categories || []}
    />
  );
}
