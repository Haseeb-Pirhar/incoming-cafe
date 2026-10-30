"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineShoppingBag,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineTag,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import { Product } from "@/types/product";
import { useCart } from "@/components/user-dashboard/cart/CartContext";
import Image from "next/image";

const ACCENT = {
  plum: "#3A1150",
  marigold: "#FFB627",
  coral: "#FF6B4A",
  teal: "#0FA398",
  paper: "#FFF4E6",
  ink: "#241C1C",
};

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // One selected value per variant group (grouped by variant `name`, e.g. "Size", "Color")
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const media = product.media?.length ? product.media : [];
  const categoryName =
    typeof product.category === "object" ? product.category?.name : undefined;

  const hasDiscount =
    product.discountPrice != null &&
    Number(product.discountPrice) > 0 &&
    Number(product.discountPrice) < Number(product.price);

  const variantGroups = useMemo(() => {
    const groups: Record<
      string,
      { value: string; priceAdjustment?: number }[]
    > = {};
    for (const v of product.variants || []) {
      if (!groups[v.name]) groups[v.name] = [];
      groups[v.name].push({
        value: v.value,
        priceAdjustment: v.priceAdjustment,
      });
    }
    return groups;
  }, [product.variants]);

  const priceAdjustment = useMemo(() => {
    return Object.entries(selectedVariants).reduce(
      (sum, [groupName, value]) => {
        const match = variantGroups[groupName]?.find((g) => g.value === value);
        return sum + (match?.priceAdjustment || 0);
      },
      0,
    );
  }, [selectedVariants, variantGroups]);

  const basePrice = hasDiscount
    ? Number(product.discountPrice)
    : Number(product.price);
  const finalPrice = basePrice + priceAdjustment;
  const stock = product.stock ?? 0;
  const outOfStock = stock === 0;

  const handleAddToCart = () => {
    if (outOfStock) return;
    addToCart(
      {
        productId: String(product._id),
        name: product.name,
        image: media[0],
        price: finalPrice,
        stock,
        category: categoryName,
      },
      quantity,
    );
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: ACCENT.paper,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap");
      `}</style>

      {/* Slim top bar */}
      <header
        className="sticky top-0 z-30 border-b-2"
        style={{ backgroundColor: ACCENT.plum, borderColor: ACCENT.ink }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            <HiOutlineArrowLeft />
            Back to shop
          </Link>
          <span
            className="ml-auto text-base font-extrabold text-white"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            happy<span style={{ color: ACCENT.marigold }}>Life</span>
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Breadcrumb */}
        <p className="mb-4 text-xs text-[#241C1C]/50">
          <Link href="/dashboard" className="hover:underline">
            Shop
          </Link>
          {categoryName && (
            <>
              {" / "}
              <span>{categoryName}</span>
            </>
          )}
          {" / "}
          <span className="font-semibold text-[#241C1C]/70">
            {product.name}
          </span>
        </p>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* ── Gallery ─────────────────────────────── */}
          <div>
            <div
              className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 bg-white sm:rounded-[22px]"
              style={{ borderColor: ACCENT.ink }}
            >
              {media[activeImage] ? (
                <Image
                  src={media[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#FFB627]/15">
                  <HiOutlineTag
                    className="text-4xl"
                    style={{ color: `${ACCENT.plum}44` }}
                  />
                </div>
              )}

              {hasDiscount && (
                <span
                  className="absolute left-3 top-3 rounded-full border-2 px-2.5 py-1 text-xs font-extrabold text-white"
                  style={{
                    backgroundColor: ACCENT.coral,
                    borderColor: ACCENT.ink,
                  }}
                >
                  SALE!
                </span>
              )}
              {product.isFeatured && (
                <span
                  className="absolute right-3 top-3 flex items-center gap-1 rounded-full border-2 px-2.5 py-1 text-xs font-bold text-white"
                  style={{
                    backgroundColor: ACCENT.teal,
                    borderColor: ACCENT.ink,
                  }}
                >
                  <HiOutlineSparkles className="text-xs" />
                  Featured
                </span>
              )}
            </div>

            {media.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {media.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2"
                    style={{
                      borderColor:
                        i === activeImage ? ACCENT.coral : `${ACCENT.ink}33`,
                    }}
                  >
                    <Image
                      src={url}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ─────────────────────────────── */}
          <div>
            {categoryName && (
              <span
                className="mb-2 inline-block rounded-full border-2 px-2.5 py-0.5 text-[10px] font-bold"
                style={{
                  borderColor: ACCENT.ink,
                  color: ACCENT.plum,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {categoryName}
              </span>
            )}

            <h1
              className="text-xl font-extrabold leading-snug sm:text-2xl"
              style={{
                color: ACCENT.ink,
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              {product.name}
            </h1>

            {product.brand && (
              <p className="mt-1 text-sm text-[#241C1C]/50">{product.brand}</p>
            )}

            <div className="mt-4 flex items-end gap-2">
              <span
                className="text-2xl font-extrabold sm:text-3xl"
                style={{
                  color: hasDiscount ? ACCENT.coral : ACCENT.plum,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Rs {finalPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-sm text-[#241C1C]/40 line-through">
                  Rs {Number(product.price).toLocaleString()}
                </span>
              )}
            </div>

            <p
              className="mt-1 text-xs font-bold"
              style={{ color: outOfStock ? ACCENT.coral : ACCENT.teal }}
            >
              {outOfStock
                ? "Out of stock"
                : stock <= 5
                  ? `Only ${stock} left`
                  : "In stock"}
            </p>

            {/* Variants */}
            {Object.entries(variantGroups).map(([groupName, options]) => (
              <div key={groupName} className="mt-5">
                <p
                  className="mb-1.5 text-xs font-bold uppercase tracking-wide"
                  style={{ color: ACCENT.plum }}
                >
                  {groupName}
                </p>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => {
                    const active = selectedVariants[groupName] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setSelectedVariants((prev: Record<string, string>) => ({
                            ...prev,
                            [groupName]: opt.value,
                          }))
                        }
                        className="rounded-full border-2 px-3.5 py-1.5 text-sm font-bold"
                        style={{
                          backgroundColor: active ? ACCENT.marigold : "white",
                          borderColor: ACCENT.ink,
                          color: ACCENT.ink,
                        }}
                      >
                        {opt.value}
                        {opt.priceAdjustment
                          ? ` (+Rs ${opt.priceAdjustment})`
                          : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity + Add to cart */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div
                className="flex items-center gap-3 rounded-full border-2 px-3 py-2"
                style={{ borderColor: ACCENT.ink }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <HiOutlineMinus className="text-sm" />
                </button>
                <span className="min-w-[1.25rem] text-center text-sm font-bold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(stock || 99, q + 1))
                  }
                  disabled={quantity >= stock}
                  aria-label="Increase quantity"
                  className="disabled:opacity-30"
                >
                  <HiOutlinePlus className="text-sm" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-bold text-white disabled:opacity-40 sm:flex-none sm:px-8"
                style={{
                  backgroundColor: ACCENT.coral,
                  borderColor: ACCENT.ink,
                }}
              >
                <HiOutlineShoppingBag />
                {outOfStock ? "Out of stock" : "Add to cart"}
              </button>
            </div>

            {product.description && (
              <div className="mt-8">
                <p
                  className="mb-1.5 text-xs font-bold uppercase tracking-wide"
                  style={{ color: ACCENT.plum }}
                >
                  Description
                </p>
                <p className="text-sm leading-relaxed text-[#241C1C]/70">
                  {product.description}
                </p>
              </div>
            )}

            {product.sku && (
              <p
                className="mt-4 text-[11px] text-[#241C1C]/40"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                SKU: {product.sku}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}