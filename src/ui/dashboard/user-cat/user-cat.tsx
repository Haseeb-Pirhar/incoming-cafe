"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import CategoryCard from "@/components/user-dashboard/CategoryCard";
import { ACCENT } from "@/components/user-dashboard/theme";
import { getAllCategories } from "@/api/api-call/category";
import { Category } from "@/types/category";

export default function UserCategoryContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res || []);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ backgroundColor: ACCENT.paper, minHeight: "100vh" }}>
      <section
        className="px-6 py-14 text-center"
        style={{ backgroundColor: ACCENT.plum }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2"
          style={{ backgroundColor: ACCENT.marigold, borderColor: ACCENT.ink }}
        >
          <HiOutlineSquares2X2
            className="text-2xl"
            style={{ color: ACCENT.ink }}
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-white sm:text-4xl"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Browse by Category
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-3 max-w-lg text-white/60"
        >
          Jo dhoondh rahe ho, apni category se jaldi pohancho.
        </motion.p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {loading ? (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-2xl"
                style={{ backgroundColor: `${ACCENT.plum}10` }}
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center" style={{ color: `${ACCENT.ink}80` }}>
            Koi category nahi mili.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-6">
            {categories.map((cat, i) => (
              <Link
                key={String(cat._id)}
                href={`/dashboard/shop?category=${cat._id}`}
              >
                <CategoryCard
                  name={cat.name}
                  image={(cat as any).image}
                  index={i}
                  size="lg"
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
