"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineFire,
} from "react-icons/hi2";
import CategoryCard from "@/components/user-dashboard/CategoryCard";
import ProductCard from "@/components/user-dashboard/ProductCard";
import { ACCENT } from "@/components/user-dashboard/theme";
import { getAllCategories } from "@/api/api-call/category";
import { getRecentProducts } from "@/api/api-call/product-api";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Splash } from "@/ui/dashboard/splash/splash";

export default function HomeContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories().then(setCategories);
    getRecentProducts().then((res) => {
      setProducts((res?.data as Product[]) || []);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ backgroundColor: ACCENT.paper }}>
      <section
        className="relative overflow-hidden px-6 pt-16 pb-24 text-center"
        style={{ backgroundColor: ACCENT.plum }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-16 -left-10 h-64 w-64 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${ACCENT.teal}, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${ACCENT.coral}, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold"
          style={{ borderColor: ACCENT.marigold, color: ACCENT.marigold }}
        >
          <HiOutlineSparkles /> Naya collection live hai
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mt-5 text-3xl font-extrabold leading-tight text-white sm:text-5xl"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Roz ki zindagi ko <br />
          <span style={{ color: ACCENT.marigold }}>thoda aur happy</span> banao
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="relative mx-auto mt-4 max-w-xl text-white/60"
        >
          happyLife par har cheez curated hai — quality, price aur delivery, sab
          ek jagah.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative mt-7"
        >
          <Link href="/dashboard/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white shadow-xl"
              style={{ backgroundColor: ACCENT.coral }}
            >
              Shop Karo <HiOutlineArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <Splash />
      </div>

      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-4 flex items-center justify-between">
            <h2
              className="text-lg font-extrabold sm:text-xl"
              style={{
                color: ACCENT.plum,
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              Categories
            </h2>
            <Link
              href="/dashboard/user-cat"
              className="text-sm font-semibold"
              style={{ color: ACCENT.coral }}
            >
              Sab dekho →
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat, i) => (
              <Link
                key={String(cat._id)}
                href={`/dashboard/shop?category=${cat._id}`}
              >
                <CategoryCard
                  name={cat.name}
                  image={(cat as any).image}
                  index={i}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="mb-4 flex items-center gap-2">
          <HiOutlineFire style={{ color: ACCENT.coral }} />
          <h2
            className="text-lg font-extrabold sm:text-xl"
            style={{
              color: ACCENT.plum,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            Top Picks
          </h2>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] animate-pulse rounded-2xl"
                style={{ backgroundColor: `${ACCENT.plum}10` }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            {products.slice(0, 8).map((p, i) => (
              <ProductCard key={String(p._id)} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-4 pb-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              icon: <HiOutlineTruck />,
              title: "Fast Delivery",
              desc: "48 ghanton mein aapke ghar tak.",
            },
            {
              icon: <HiOutlineShieldCheck />,
              title: "Trusted Quality",
              desc: "Har product verified aur checked.",
            },
            {
              icon: <HiOutlineSparkles />,
              title: "Best Prices",
              desc: "Seedha source se, bina extra margin.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl border-2 bg-white p-6 text-center"
              style={{ borderColor: ACCENT.ink }}
            >
              <div
                className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full text-lg text-white"
                style={{ backgroundColor: ACCENT.teal }}
              >
                {f.icon}
              </div>
              <h3 className="font-bold" style={{ color: ACCENT.ink }}>
                {f.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: `${ACCENT.ink}99` }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
