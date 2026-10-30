"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import MediaPreview from "@/components/ui/MediaPreview";
import { useCart } from "@/components/user-dashboard/cart/CartContext";
import { ISplashProduct } from "@/types/splash";

const ACCENT = {
  plum: "#3A1150",
  marigold: "#FFB627",
  coral: "#FF6B4A",
  ink: "#241C1C",
};

interface SplashProductCardProps {
  product: ISplashProduct;
}

/**
 * Single product card used inside the splash marquee.
 * Bold-border / offset-shadow look, same family as the main
 * ProductCard, shrunk to a fixed width for the scroll row.
 */
export function SplashProductCard({ product }: SplashProductCardProps) {
  const { addToCart } = useCart();
  const { _id, name, slug, media, price, discountPrice, stock } = product;

  const mediaSrc =
    Array.isArray(media) && media.length > 0 ? media[0] : undefined;
  const hasDiscount =
    discountPrice != null &&
    Number(discountPrice) > 0 &&
    Number(discountPrice) < Number(price);
  const outOfStock = stock != null && Number(stock) === 0;
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(price) - Number(discountPrice)) / Number(price)) * 100,
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;

    addToCart({
      productId: String(_id),
      name,
      image: mediaSrc,
      price: hasDiscount ? Number(discountPrice) : Number(price),
      stock: stock != null ? Number(stock) : undefined,
    });
    toast.success(`${name} added to cart`);
  };

  return (
    <Link
      href={`/product/${slug}`}
      className="group relative flex w-[clamp(150px,40vw,205px)] shrink-0 flex-col overflow-hidden rounded-2xl border-2 bg-white shadow-[3px_4px_0px_0px_rgba(36,28,28,1)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[5px_7px_0px_0px_rgba(36,28,28,1)]"
      style={{ borderColor: ACCENT.ink }}
    >
      <div
        className="relative aspect-square w-full overflow-hidden border-b-2"
        style={{
          backgroundColor: `${ACCENT.marigold}22`,
          borderColor: ACCENT.ink,
        }}
      >
        <MediaPreview
          src={mediaSrc}
          alt={name}
          height={210}
          width={210}
          className="!h-full !w-full !rounded-none transition-transform duration-300 group-hover:scale-105"
        />

        {hasDiscount && (
          <span
            className="absolute left-1.5 top-1.5 rounded-full border-2 px-1.5 py-0.5 text-[9px] font-extrabold text-white shadow-sm"
            style={{ backgroundColor: ACCENT.coral, borderColor: ACCENT.ink }}
          >
            {discountPercent > 0 ? `-${discountPercent}%` : "SALE!"}
          </span>
        )}

        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-[#241C1C]">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2.5">
        <h3
          className="line-clamp-2 text-xs font-bold leading-snug"
          style={{
            color: ACCENT.ink,
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex min-w-0 flex-col">
            {hasDiscount ? (
              <>
                <span
                  className="truncate text-sm font-extrabold"
                  style={{
                    color: ACCENT.coral,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Rs {Number(discountPrice).toLocaleString()}
                </span>
                <span className="truncate text-[10px] text-[#241C1C]/35 line-through">
                  Rs {Number(price).toLocaleString()}
                </span>
              </>
            ) : (
              <span
                className="truncate text-sm font-extrabold"
                style={{
                  color: ACCENT.plum,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Rs {Number(price).toLocaleString()}
              </span>
            )}
          </div>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            whileHover={outOfStock ? undefined : { scale: 1.1, rotate: -6 }}
            whileTap={outOfStock ? undefined : { scale: 0.9 }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 disabled:opacity-40"
            style={{
              backgroundColor: ACCENT.marigold,
              borderColor: ACCENT.ink,
            }}
            aria-label="Add to bag"
          >
            <HiOutlineShoppingBag
              className="text-sm"
              style={{ color: ACCENT.ink }}
            />
          </motion.button>
        </div>

        {stock != null && Number(stock) > 0 && Number(stock) <= 5 && (
          <p className="text-[9px] font-bold" style={{ color: ACCENT.coral }}>
            Only {stock} left
          </p>
        )}
      </div>
    </Link>
  );
}
