"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Coffee, CupSoda, Leaf, Plus, Sandwich, Search, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CategoryTabs from "./CategoryTabs";
import MenuCard from "../ui/MenuCard";
import Reveal from "../ui/Reveal";
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  formatPrice,
  type MenuCategoryKey,
} from "@/constants/menu";
import { COFFEE, FONT } from "../theme";

const ICONS: Record<MenuCategoryKey, LucideIcon> = {
  food: Sandwich,
  coffee: Coffee,
  "not-coffee": Leaf,
  iced: CupSoda,
  addons: Plus,
};

export default function MenuBoard() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const q = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      MENU_CATEGORIES.filter((c) => active === "all" || c.key === active)
        .map((cat) => ({
          cat,
          items: MENU_ITEMS.filter(
            (i) =>
              i.category === cat.key &&
              (!q ||
                `${i.name} ${i.note ?? ""} ${i.description ?? ""}`
                  .toLowerCase()
                  .includes(q)),
          ),
        }))
        .filter((g) => g.items.length > 0),
    [active, q],
  );

  return (
    <div>
      {/* Navbar ke neeche chipka rehta hai. Agar overlap ho to top value badlo. */}
      <div className="sticky top-[76px] z-30 flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <CategoryTabs
          options={[{ key: "all", label: "All" }, ...MENU_CATEGORIES]}
          active={active}
          onChange={setActive}
        />

        <div className="relative w-full md:max-w-xs">
          <Search
            size={18}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: `${COFFEE.espresso}99` }}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu"
            aria-label="Search the menu"
            className="w-full rounded-full border border-white/60 bg-white/75 py-3 pl-11 pr-10 text-sm shadow-lg outline-none backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-1"
            style={{ color: COFFEE.espresso, outlineColor: COFFEE.espresso }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full hover:bg-black/10"
              style={{ color: COFFEE.espresso }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-14">
        {groups.length === 0 && (
          <Reveal>
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: COFFEE.band, color: COFFEE.espresso }}
              >
                <Coffee size={28} aria-hidden />
              </span>
              <p className="text-lg font-medium" style={{ color: COFFEE.espresso }}>
                No items found
              </p>
              <p className="text-sm" style={{ color: `${COFFEE.espresso}B3` }}>
                Try a different word or pick another category.
              </p>
            </div>
          </Reveal>
        )}

        {groups.map(({ cat, items }) => (
          <section key={cat.key} aria-labelledby={`menu-${cat.key}`}>
            <div className="mb-6 flex items-center gap-3">
              <h2
                id={`menu-${cat.key}`}
                className="text-3xl font-semibold"
                style={{ color: COFFEE.espresso, fontFamily: FONT.display }}
              >
                {cat.label}
              </h2>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: COFFEE.band, color: COFFEE.espresso }}
              >
                {items.length}
              </span>
              <span
                aria-hidden
                className="h-px flex-1"
                style={{ backgroundColor: `${COFFEE.espresso}26` }}
              />
            </div>

            {cat.key === "addons" ? (
              <Reveal>
                <ul
                  className="divide-y rounded-3xl px-6 py-2 shadow-md"
                  style={{
                    backgroundColor: COFFEE.cream,
                    border: `1px solid ${COFFEE.espresso}1A`,
                  }}
                >
                  {items.map((item) => (
                    <li key={item.id} className="flex items-baseline gap-3 py-4">
                      <div>
                        <p className="font-semibold" style={{ color: COFFEE.espresso }}>
                          {item.name}
                          {item.note && (
                            <span
                              className="ml-1.5 text-sm font-normal"
                              style={{ color: `${COFFEE.espresso}99` }}
                            >
                              ({item.note})
                            </span>
                          )}
                        </p>
                        {item.description && (
                          <p className="text-sm" style={{ color: `${COFFEE.espresso}B3` }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span
                        aria-hidden
                        className="flex-1 -translate-y-1 border-b border-dotted"
                        style={{ borderColor: `${COFFEE.espresso}4D` }}
                      />
                      <span className="font-semibold" style={{ color: COFFEE.mocha }}>
                        {formatPrice(item.price, item.extra)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                  >
                    <MenuCard item={item} icon={ICONS[item.category]} />
                  </motion.li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p
        className="mt-14 text-sm leading-relaxed"
        style={{ color: `${COFFEE.espresso}B3` }}
      >
        V is vegetarian, VO is vegetarian option. Please tell us if you have any
        allergies or dietary requirements.
      </p>
    </div>
  );
}