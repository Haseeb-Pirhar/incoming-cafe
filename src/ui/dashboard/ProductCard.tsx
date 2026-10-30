"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineShoppingBag } from "react-icons/hi2";
import MediaPreview from "@/components/ui/MediaPreview";
import { Product } from "@/types/product";
import { useCart } from "@/components/user-dashboard/cart/CartContext";
import { ACCENT, cardVariants } from "@/components/user-dashboard/theme";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cart = useCart() as any;
  const addItem = cart?.addItem ?? (() => {});
  const pendingProductId = cart?.pendingProductId;
  const isAdding = pendingProductId === String(product._id);
  const outOfStock = product.stock != null && Number(product.stock) === 0;

  const mediaSrc =
    Array.isArray(product.media) && product.media.length > 0
      ? product.media[0]
      : undefined;

  const hasDiscount =
    product.discountPrice != null &&
    Number(product.discountPrice) > 0 &&
    Number(product.discountPrice) < Number(product.price);

  const categoryName =
    typeof product.category === "object"
      ? (product.category as any)?.name
      : null;

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-[18px] border-2 bg-white sm:rounded-[22px]"
      style={{ borderColor: ACCENT.ink }}
      whileHover={{
        y: -6,
        rotate: -1,
        boxShadow: `6px 8px 0px 0px ${ACCENT.ink}`,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Image */}
      <div
        className="relative aspect-square w-full overflow-hidden border-b-2 sm:aspect-[4/3]"
        style={{
          backgroundColor: `${ACCENT.marigold}22`,
          borderColor: ACCENT.ink,
        }}
      >
        <MediaPreview
          src={mediaSrc}
          alt={product.name}
          height={220}
          width={400}
          className="!h-full !w-full !rounded-none"
        />

        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: "-100%" }}
          animate={hovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        <div className="absolute left-1.5 top-1.5 flex flex-wrap gap-1 sm:left-2.5 sm:top-2.5 sm:gap-1.5">
          {product.isFeatured && (
            <motion.span
              initial={{ scale: 0, rotate: -8 }}
              animate={{ scale: 1, rotate: -8 }}
              className="inline-flex items-center gap-1 rounded-full border-2 px-1.5 py-0.5 text-[9px] font-bold text-white sm:px-2 sm:text-[10px]"
              style={{ backgroundColor: ACCENT.teal, borderColor: ACCENT.ink }}
            >
              <HiOutlineSparkles className="text-xs" />
              <span className="hidden xs:inline">Featured</span>
            </motion.span>
          )}
          {hasDiscount && (
            <motion.span
              initial={{ scale: 0, rotate: 6 }}
              animate={{ scale: 1, rotate: 6 }}
              className="rounded-full border-2 px-2 py-0.5 text-[9px] font-extrabold text-white sm:px-2.5 sm:text-[10px]"
              style={{ backgroundColor: ACCENT.coral, borderColor: ACCENT.ink }}
            >
              SALE!
            </motion.span>
          )}
        </div>

        {categoryName && (
          <span
            className="absolute bottom-1.5 left-1.5 rounded-full border-2 px-1.5 py-0.5 text-[9px] font-bold sm:bottom-2.5 sm:left-2.5 sm:px-2 sm:text-[10px]"
            style={{
              backgroundColor: ACCENT.paper,
              borderColor: ACCENT.ink,
              color: ACCENT.plum,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {categoryName}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1.5 p-2.5 sm:gap-2 sm:p-3.5">
        <h3
          className="line-clamp-2 text-xs font-bold leading-snug sm:text-sm"
          style={{
            color: ACCENT.ink,
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {product.name}
        </h3>

        {product.brand && (
          <p className="hidden text-[11px] text-[#241C1C]/50 sm:block">
            {product.brand}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-1.5 pt-1 sm:gap-2">
          <div className="flex min-w-0 flex-col">
            {hasDiscount ? (
              <>
                <span
                  className="truncate text-sm font-extrabold sm:text-base"
                  style={{
                    color: ACCENT.coral,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Rs {Number(product.discountPrice).toLocaleString()}
                </span>
                <span className="truncate text-[10px] text-[#241C1C]/35 line-through sm:text-[11px]">
                  Rs {Number(product.price).toLocaleString()}
                </span>
              </>
            ) : (
              <span
                className="truncate text-sm font-extrabold sm:text-base"
                style={{
                  color: ACCENT.plum,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Rs {Number(product.price).toLocaleString()}
              </span>
            )}
          </div>

          <motion.button
            type="button"
            disabled={outOfStock || isAdding}
            onClick={() => addItem(String(product._id), 1)}
            whileHover={outOfStock ? {} : { scale: 1.1, rotate: -6 }}
            whileTap={outOfStock ? {} : { scale: 0.9 }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 disabled:opacity-40 sm:h-9 sm:w-9"
            style={{
              backgroundColor: outOfStock ? "#ccc" : ACCENT.marigold,
              borderColor: ACCENT.ink,
            }}
            aria-label="Add to bag"
          >
            {isAdding ? (
              <span
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-t-transparent"
                style={{
                  borderColor: ACCENT.ink,
                  borderTopColor: "transparent",
                }}
              />
            ) : (
              <HiOutlineShoppingBag
                className="text-base sm:text-lg"
                style={{ color: ACCENT.ink }}
              />
            )}
          </motion.button>
        </div>

        {product.stock != null && Number(product.stock) <= 5 && (
          <p
            className="text-[9px] font-bold sm:text-[10px]"
            style={{ color: ACCENT.coral }}
          >
            {outOfStock ? "Out of stock" : `Only ${product.stock} left`}
          </p>
        )}
      </div>
    </motion.article>
  );
}
