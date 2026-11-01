"use client";

import { motion } from "framer-motion";
import { COFFEE } from "../theme";

interface Option {
  key: string;
  label: string;
}

interface CategoryTabsProps {
  options: Option[];
  active: string;
  onChange: (key: string) => void;
}

// Filter pills. Active pill layoutId ki wajah se ek tab se doosre tak slide karta hai.
export default function CategoryTabs({ options, active, onChange }: CategoryTabsProps) {
  return (
    <div
      className="flex gap-1 overflow-x-auto rounded-full border border-white/60 bg-white/75 p-1.5 shadow-lg backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label="Menu categories"
    >
      {options.map((o) => {
        const isActive = o.key === active;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            aria-pressed={isActive}
            className="relative shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              color: isActive ? "#fff" : COFFEE.espresso,
              outlineColor: COFFEE.espresso,
            }}
          >
            {isActive && (
              <motion.span
                layoutId="menu-tab-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: COFFEE.espresso }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}