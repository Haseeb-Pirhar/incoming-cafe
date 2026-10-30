"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/user-dashboard/ProductCard";
import CategoryCard from "@/components/user-dashboard/CategoryCard";
import { getAllProducts } from "@/api/api-call/product-api";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { ACCENT } from "@/components/user-dashboard/theme";
import { motion as m } from "framer-motion";
import { HiOutlineSquares2X2 } from "react-icons/hi2";

export default function ShopPage({
  initialProducts,
  initialCategories,
}: {
  initialProducts: Product[];
  initialCategories: Category[];
}) {
  const [categories] = useState<Category[]>(initialCategories);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  useEffect(() => {
    // First mount: we already have server-rendered data, skip refetch
    if (!hasFetchedOnce) {
      setHasFetchedOnce(true);
      return;
    }

    setLoading(true);
    getAllProducts({
      page: 1,
      category: activeCategory === "all" ? undefined : activeCategory,
    }).then((res) => {
      setProducts((res?.data as Product[]) || []);
      setLoading(false);
    });
  }, [activeCategory]);

  return (
    <div style={{ backgroundColor: ACCENT.paper, minHeight: "100vh" }}>
      <section
        className="px-6 py-14 text-center"
        style={{ backgroundColor: ACCENT.plum }}
      >
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2"
          style={{ backgroundColor: ACCENT.marigold, borderColor: ACCENT.ink }}
        >
          <HiOutlineSquares2X2
            className="text-2xl"
            style={{ color: ACCENT.ink }}
          />
        </m.div>
        <m.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-white sm:text-4xl"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Full Shop
        </m.h1>
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-3 max-w-lg text-white/60"
        >
          Har cheez ek jagah — apni category chuno, ya sab dekho.
        </m.p>
      </section>

      <div
        className="sticky top-[64px] z-30 border-b-2 bg-white/90 backdrop-blur-sm"
        style={{ borderColor: ACCENT.ink }}
      >
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          <button
            onClick={() => setActiveCategory("all")}
            className="relative shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap"
            style={{ color: activeCategory === "all" ? "#fff" : ACCENT.ink }}
          >
            {activeCategory === "all" && (
              <motion.span
                layoutId="shop-active-pill"
                className="absolute inset-0 rounded-full border-2"
                style={{
                  backgroundColor: ACCENT.plum,
                  borderColor: ACCENT.ink,
                }}
              />
            )}
            <span className="relative z-10">All</span>
          </button>
          {categories.map((cat) => {
            const isActive = activeCategory === String(cat._id);
            return (
              <button
                key={String(cat._id)}
                onClick={() => setActiveCategory(String(cat._id))}
                className="relative shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap"
                style={{ color: isActive ? "#fff" : ACCENT.ink }}
              >
                {isActive && (
                  <motion.span
                    layoutId="shop-active-pill"
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      backgroundColor: ACCENT.plum,
                      borderColor: ACCENT.ink,
                    }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeCategory === "all" && categories.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat, i) => (
              <CategoryCard
                key={String(cat._id)}
                name={cat.name}
                image={(cat as any).image}
                index={i}
                onClick={() => setActiveCategory(String(cat._id))}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] animate-pulse rounded-[18px]"
                style={{ backgroundColor: `${ACCENT.plum}10` }}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div
            className="flex h-40 items-center justify-center"
            style={{ color: `${ACCENT.ink}80` }}
          >
            Koi product nahi mila.
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
          >
            <AnimatePresence>
              {products.map((product, i) => (
                <ProductCard
                  key={String(product._id)}
                  product={product}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
