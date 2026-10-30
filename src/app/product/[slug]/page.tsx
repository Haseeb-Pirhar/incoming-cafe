import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/api/api-call/product-api";
import ProductDetail from "@/ui/product/product-details";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const categoryName =
    typeof product.category === "object" ? product.category?.name : undefined;

  return {
    title: product.metaTitle || product.name,
    description:
      product.metaDescription ||
      product.description ||
      `Buy ${product.name} on happyLife${categoryName ? ` — ${categoryName}` : ""}.`,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.description,
      images: product.media?.[0]
        ? [
            {
              url: product.media[0],
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.description,
      images: product.media?.[0] ? [product.media[0]] : undefined,
    },
    keywords: product.keywords,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const hasDiscount =
    product.discountPrice != null &&
    Number(product.discountPrice) > 0 &&
    Number(product.discountPrice) < Number(product.price);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.media,
    sku: product.sku,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: hasDiscount ? product.discountPrice : product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `/product/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
