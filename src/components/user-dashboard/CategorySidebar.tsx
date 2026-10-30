"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { Category } from "@/types/category";
import { ACCENT } from "./theme";

export default function CategorySidebar({
  categories,
  categoriesLoading,
  selectedCategory,
  setSelectedCategory,
  sidebarOpen,
  setSidebarOpen,
}: {
  categories: Category[];
  categoriesLoading: boolean;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (fn: (o: boolean) => boolean) => void;
}) {
  return (
    <>
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -20, opacity: 0, width: 0 }}
            animate={{ x: 0, opacity: 1, width: "auto" }}
            exit={{ x: -20, opacity: 0, width: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-y-0 left-0 z-30 w-60 overflow-y-auto border-r-2 bg-white pt-16 sm:w-64 lg:static lg:z-0 lg:w-56 lg:shrink-0 lg:rounded-2xl lg:border-2 lg:pt-0"
            style={{ borderColor: ACCENT.ink }}
          >
            <div className="p-3 sm:p-4">
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

                  {categories.length === 0 ? (
                    <li className="px-3 py-4 text-center text-xs text-[#241C1C]/40">
                      No categories found
                    </li>
                  ) : (
                    categories.map((cat) => {
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
                                setSidebarOpen(() => false);
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
                    })
                  )}
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
          onClick={() => setSidebarOpen(() => false)}
        />
      )}
    </>
  );
}
