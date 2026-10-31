"use client";

import { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import MenuItemRow from "./MenuItemRow";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/constants/menu";
import { FONT } from "../theme";

export default function MenuBoard() {
  const [active, setActive] = useState("all");

  const visible =
    active === "all"
      ? MENU_CATEGORIES
      : MENU_CATEGORIES.filter((c) => c.key === active);

  return (
    <div>
      <CategoryTabs
        options={[{ key: "all", label: "All" }, ...MENU_CATEGORIES]}
        active={active}
        onChange={setActive}
      />

      <div className="mt-10 space-y-12">
        {visible.map((cat) => {
          const items = MENU_ITEMS.filter((i) => i.category === cat.key);
          if (items.length === 0) return null;
          return (
            <section key={cat.key} aria-labelledby={`menu-${cat.key}`}>
              <h2
                id={`menu-${cat.key}`}
                className="mb-6 border-b border-white/20 pb-3 text-2xl font-semibold text-white"
                style={{ fontFamily: FONT.display }}
              >
                {cat.label}
              </h2>
              <ul className="grid gap-x-12 gap-y-7 md:grid-cols-2">
                {items.map((item) => (
                  <MenuItemRow key={item.id} item={item} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-12 text-sm leading-relaxed text-white/60">
        V is vegetarian, VO is vegetarian option. Please tell us if you have any
        allergies or dietary requirements.
      </p>
    </div>
  );
}
