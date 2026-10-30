"use client";

/**
 * happyLife — Marketplace dashboard
 *
 * Fonts used: Bricolage Grotesque (display), Inter (body), JetBrains Mono (labels/prices).
 * Loaded inline below via <style jsx global> so this file is self-contained — feel free to
 * move that @import into your root layout/globals.css instead for better perf.
 *
 * Cart: guest cart, no login. Lives entirely in localStorage via CartContext.
 * If your app has more than this one page that needs the cart (e.g. a
 * product detail page, a checkout page), move <CartProvider> up into your
 * root layout.tsx instead of wrapping it here, so the cart is shared
 * across routes rather than re-mounted per page.
 */

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineFire,
} from "react-icons/hi2";
import { useDashboard } from "./useDashboard";
import MediaPreview from "@/components/ui/MediaPreview";
import { Product } from "@/types/product";
import {
  CartProvider,
  useCart,
} from "@/components/user-dashboard/cart/CartContext";
import CartDrawer from "@/components/user-dashboard/cart/CartDrawer";
import { Splash } from "@/ui/dashboard/splash/splash";

const ACCENT = {
  plum: "#3A1150",
  plumSoft: "#5B2B7A",
  marigold: "#FFB627",
  coral: "#FF6B4A",
  teal: "#0FA398",
  paper: "#FFF4E6",
  ink: "#241C1C",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.94, rotate: -1.5 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.18 } },
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();

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

  const stock = product.stock != null ? Number(product.stock) : undefined;
  const outOfStock = stock != null && stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (outOfStock) return;

    addToCart({
      productId: String(product._id),
      name: product.name,
      image: mediaSrc,
      price: hasDiscount
        ? Number(product.discountPrice)
        : Number(product.price),
      stock,
      category: categoryName || undefined,
    });
    toast.success(`${product.name} added to cart`);
  };

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
      className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-[22px] border-2 bg-white"
      style={{ borderColor: ACCENT.ink }}
      whileHover={{
        y: -8,
        rotate: -1,
        boxShadow: `8px 10px 0px 0px ${ACCENT.ink}`,
        transition: { duration: 0.2 },
      }}
    >
      {/* Image */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden border-b-2"
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

        {/* Shine sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: "-100%" }}
          animate={hovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        {/* Badges */}
        <div className="absolute left-1.5 top-1.5 sm:left-2.5 sm:top-2.5 flex flex-wrap gap-1 sm:gap-1.5">
          {product.isFeatured && (
            <motion.span
              initial={{ scale: 0, rotate: -8 }}
              animate={{ scale: 1, rotate: -8 }}
              className="inline-flex items-center gap-1 rounded-full border-2 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-white"
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
              className="rounded-full border-2 px-1.5 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-white"
              style={{ backgroundColor: ACCENT.coral, borderColor: ACCENT.ink }}
            >
              SALE!
            </motion.span>
          )}
        </div>

        {categoryName && (
          <span
            className="absolute bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-2.5 rounded-full border-2 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold max-w-[70%] truncate"
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
      <div className="flex flex-1 flex-col gap-1.5 sm:gap-2 p-2.5 sm:p-3.5">
        <h3
          className="line-clamp-2 text-xs sm:text-sm font-bold leading-snug"
          style={{
            color: ACCENT.ink,
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {product.name}
        </h3>

        {product.brand && (
          <p className="text-[10px] sm:text-[11px] text-[#241C1C]/50 truncate">
            {product.brand}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex min-w-0 flex-col">
            {hasDiscount ? (
              <>
                <span
                  className="truncate text-sm sm:text-base font-extrabold"
                  style={{
                    color: ACCENT.coral,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Rs {Number(product.discountPrice).toLocaleString()}
                </span>
                <span className="truncate text-[10px] sm:text-[11px] text-[#241C1C]/35 line-through">
                  Rs {Number(product.price).toLocaleString()}
                </span>
              </>
            ) : (
              <span
                className="truncate text-sm sm:text-base font-extrabold"
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
            onClick={handleAddToCart}
            disabled={outOfStock}
            whileHover={outOfStock ? undefined : { scale: 1.1, rotate: -6 }}
            whileTap={outOfStock ? undefined : { scale: 0.9 }}
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border-2 text-white disabled:opacity-40"
            style={{
              backgroundColor: ACCENT.marigold,
              borderColor: ACCENT.ink,
            }}
            aria-label="Add to bag"
          >
            <HiOutlineShoppingBag
              className="text-base sm:text-lg"
              style={{ color: ACCENT.ink }}
            />
          </motion.button>
        </div>

        {stock != null && stock <= 5 && (
          <p
            className="text-[9px] sm:text-[10px] font-bold"
            style={{ color: ACCENT.coral }}
          >
            {stock === 0 ? "Out of stock" : `Only ${stock} left`}
          </p>
        )}
      </div>
    </motion.article>
  );
}

function DashboardInner() {
  const {
    products,
    categories,
    loading,
    categoriesLoading,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    page,
    setPage,
    totalPages,
    sidebarOpen,
    setSidebarOpen,
  } = useDashboard();

  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  // Curate "Top Selling": one product per category, capped at 3 — only when
  // no category filter/search is active, so it doesn't fight the user's own filtering.
  const showTopSelling = selectedCategory === "all" && !search.trim();

  const topPicks: Product[] = [];
  if (showTopSelling) {
    const seenCategories = new Set<string>();
    for (const product of products) {
      const catId =
        typeof product.category === "object"
          ? String((product.category as any)?._id)
          : String(product.category ?? "uncategorized");
      if (!seenCategories.has(catId)) {
        seenCategories.add(catId);
        topPicks.push(product);
      }
      if (topPicks.length >= 3) break;
    }
  }
  const topPickIds = new Set(topPicks.map((p) => String(p._id)));
  const restProducts = showTopSelling
    ? products.filter((p) => !topPickIds.has(String(p._id)))
    : products;

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundColor: ACCENT.paper,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Fonts — move to your root layout/globals.css if you prefer */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap");
      `}</style>

      {/* ── Navbar ───────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b-2"
        style={{ backgroundColor: ACCENT.plum, borderColor: ACCENT.ink }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-6 sm:py-3">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-white lg:hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            aria-label="Toggle categories"
          >
            {sidebarOpen ? (
              <HiOutlineXMark className="text-lg sm:text-xl" />
            ) : (
              <HiOutlineBars3 className="text-lg sm:text-xl" />
            )}
          </button>

          {/* Logo */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <motion.div
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border-2"
              style={{
                backgroundColor: ACCENT.marigold,
                borderColor: ACCENT.ink,
              }}
            >
              <HiOutlineSparkles
                className="text-base sm:text-lg"
                style={{ color: ACCENT.ink }}
              />
            </motion.div>
            <h1
              className="whitespace-nowrap text-base sm:text-lg font-extrabold leading-tight text-white md:text-xl"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              happy<span style={{ color: ACCENT.marigold }}>Life</span>
            </h1>
          </div>

          {/* Nav links */}
          <nav className="ml-2 hidden items-center gap-1 lg:flex">
            <a
              href="#top-selling"
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              <HiOutlineFire
                className="text-base"
                style={{ color: ACCENT.coral }}
              />
              Top Selling
            </a>
            <a
              href="#contact"
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Contact
            </a>
            <a
              href="#about"
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              About
            </a>
          </nav>

          {/* Search */}
          <div className="relative ml-auto min-w-0 max-w-md flex-1">
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-sm sm:text-base text-white/50" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full min-w-0 rounded-full border-2 border-transparent bg-white/10 py-2 sm:py-2.5 pl-8 sm:pl-10 pr-2.5 sm:pr-3 text-xs sm:text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#FFB627]/60 focus:bg-white/15"
            />
          </div>

          {/* Cart */}
          <motion.button
            type="button"
            onClick={() => setCartOpen(true)}
            whileHover={{ scale: 1.08, rotate: -6 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border-2"
            style={{
              backgroundColor: ACCENT.marigold,
              borderColor: ACCENT.ink,
            }}
            aria-label="Cart"
          >
            <HiOutlineShoppingBag
              className="text-base sm:text-lg"
              style={{ color: ACCENT.ink }}
            />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full border-2 px-1 text-[9px] font-extrabold text-white"
                style={{
                  backgroundColor: ACCENT.coral,
                  borderColor: ACCENT.ink,
                }}
              >
                {itemCount > 99 ? "99+" : itemCount}
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Signature wave divider — the "happy" smile */}
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className="block h-3 w-full sm:h-5"
          style={{ marginBottom: -1 }}
        >
          <path
            d="M0,0 C240,40 480,40 720,20 C960,0 1200,0 1440,20 L1440,40 L0,40 Z"
            fill={ACCENT.paper}
          />
        </svg>
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-0 px-0 py-3 sm:gap-6 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        {/* ── Category Sidebar ───────────────────────────── */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -20, opacity: 0, width: 0 }}
              animate={{ x: 0, opacity: 1, width: "auto" }}
              exit={{ x: -20, opacity: 0, width: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed inset-y-0 left-0 z-30 w-[78vw] max-w-[280px] overflow-y-auto border-r-2 bg-white pt-16 lg:static lg:z-0 lg:w-56 lg:max-w-none lg:shrink-0 lg:self-start lg:rounded-2xl lg:border-2 lg:pt-0 lg:sticky lg:top-20"
              style={{ borderColor: ACCENT.ink }}
            >
              <div className="p-3.5 sm:p-4">
                <div className="mb-3 flex items-center gap-2">
                  <HiOutlineSquares2X2
                    className="text-lg"
                    style={{ color: ACCENT.coral }}
                  />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{
                      color: ACCENT.plum,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    Categories
                  </span>
                </div>

                {categoriesLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-9 animate-pulse rounded-xl bg-[#FFB627]/15"
                      />
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-1.5">
                    <li>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory("all")}
                        className="flex w-full items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-bold transition"
                        style={{
                          backgroundColor:
                            selectedCategory === "all"
                              ? ACCENT.marigold
                              : "transparent",
                          borderColor:
                            selectedCategory === "all"
                              ? ACCENT.ink
                              : "transparent",
                          color:
                            selectedCategory === "all"
                              ? ACCENT.ink
                              : `${ACCENT.ink}99`,
                        }}
                      >
                        All products
                      </button>
                    </li>
                    {categories.map((cat) => {
                      const active = selectedCategory === String(cat._id);
                      return (
                        <li key={String(cat._id)}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCategory(String(cat._id));
                              if (
                                typeof window !== "undefined" &&
                                window.innerWidth < 1024
                              ) {
                                setSidebarOpen(false);
                              }
                            }}
                            className="flex w-full items-center gap-2.5 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-bold transition"
                            style={{
                              backgroundColor: active
                                ? `${ACCENT.teal}22`
                                : "transparent",
                              borderColor: active ? ACCENT.teal : "transparent",
                              color: active ? ACCENT.teal : `${ACCENT.ink}99`,
                            }}
                          >
                            {cat.image && (
                              <span
                                className="relative h-7 w-7 shrink-0 overflow-hidden rounded-lg border-2"
                                style={{ borderColor: ACCENT.ink }}
                              >
                                <Image
                                  src={cat.image}
                                  alt={cat.name}
                                  fill
                                  className="object-cover"
                                  sizes="28px"
                                  unoptimized
                                />
                              </span>
                            )}
                            <span className="truncate">{cat.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Main content ─────────────────────────────────── */}
        <main className="min-w-0 flex-1 px-3 sm:px-0">
          <Splash />
          {/* Top Selling — one pick per category */}
          {showTopSelling && !loading && topPicks.length > 0 && (
            <section id="top-selling" className="mb-6 sm:mb-8">
              <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <HiOutlineFire style={{ color: ACCENT.coral }} />
                <h2
                  className="text-base sm:text-lg font-extrabold md:text-xl"
                  style={{
                    color: ACCENT.plum,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  Top Selling
                </h2>
              </div>
              <motion.div
                layout
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3"
              >
                {topPicks.map((product, i) => (
                  <ProductCard
                    key={String(product._id)}
                    product={product}
                    index={i}
                  />
                ))}
              </motion.div>
            </section>
          )}

          {/* All Products */}
          <section>
            <div className="mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <h2
                className="text-base sm:text-lg font-extrabold md:text-xl"
                style={{
                  color: ACCENT.plum,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                All Products
              </h2>
              <p className="text-[11px] sm:text-xs font-medium text-[#241C1C]/50">
                {loading
                  ? "Loading…"
                  : `${restProducts.length} product${restProducts.length === 1 ? "" : "s"}`}
                {search.trim() ? ` for "${search.trim()}"` : null}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] animate-pulse rounded-2xl sm:rounded-[22px] bg-[#3A1150]/10"
                  />
                ))}
              </div>
            ) : restProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center rounded-2xl sm:rounded-[22px] border-2 border-dashed px-4 py-14 sm:py-20 text-center"
                style={{ borderColor: `${ACCENT.plum}55` }}
              >
                <HiOutlineShoppingBag
                  className="mb-3 text-3xl sm:text-4xl"
                  style={{ color: `${ACCENT.plum}44` }}
                />
                <p className="text-sm font-bold" style={{ color: ACCENT.plum }}>
                  No products found
                </p>
                <p className="mt-1 text-xs text-[#241C1C]/50">
                  Try another category or search term
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 xl:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {restProducts.map((product, i) => (
                    <ProductCard
                      key={String(product._id)}
                      product={product}
                      index={i}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-full border-2 px-3.5 sm:px-4 py-2 text-xs font-bold disabled:opacity-40"
                  style={{
                    borderColor: ACCENT.ink,
                    color: ACCENT.plum,
                    backgroundColor: "white",
                  }}
                >
                  Prev
                </button>
                <span
                  className="text-xs font-bold"
                  style={{
                    color: ACCENT.plum,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-full border-2 px-3.5 sm:px-4 py-2 text-xs font-bold disabled:opacity-40"
                  style={{
                    borderColor: ACCENT.ink,
                    color: ACCENT.plum,
                    backgroundColor: "white",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        id="contact"
        className="mt-8 sm:mt-10 border-t-2"
        style={{ borderColor: ACCENT.ink, backgroundColor: ACCENT.plum }}
      >
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 px-4 py-8 sm:px-6 sm:py-10 sm:grid-cols-3">
          <div>
            <h3
              className="mb-2 text-lg sm:text-xl font-extrabold text-white"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              happy<span style={{ color: ACCENT.marigold }}>Life</span>
            </h3>
            <p className="text-sm text-white/60">
              Everyday things that make everyday life a little happier.
            </p>
          </div>
          <div id="about">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
              About
            </h4>
            <p className="text-sm text-white/70">
              A marketplace for products people actually love using — picked,
              priced, and shipped with care.
            </p>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
              Contact
            </h4>
            <p className="text-sm text-white/70">pirharsahib@gmail.com</p>
            <p className="text-sm text-white/70">+92 329 4552747</p>
          </div>
        </div>
        <div
          className="border-t-2 px-4 py-3 text-center text-[11px] sm:text-xs font-medium text-white/50"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          © {new Date().getFullYear()} happyLife. Made with a smile.
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function Dashboard() {
  return (
    <CartProvider>
      <DashboardInner />
    </CartProvider>
  );
}
