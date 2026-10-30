"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ACCENT } from "./theme";

interface CategoryCardProps {
  name: string;
  image?: string;
  active?: boolean;
  onClick?: () => void;
  index?: number;
  size?: "sm" | "lg";
}

export default function CategoryCard({
  name,
  image,
  active,
  onClick,
  index = 0,
  size = "sm",
}: CategoryCardProps) {
  const dim =
    size === "lg" ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12 sm:h-14 sm:w-14";
  const wrapper =
    size === "lg" ? "w-full p-4 sm:p-5" : "w-24 p-3 sm:w-28 sm:p-4";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -6, rotate: -1 }}
      whileTap={{ scale: 0.95 }}
      className={`group flex ${wrapper} shrink-0 flex-col items-center gap-2 rounded-2xl border-2 bg-white`}
      style={{
        borderColor: active ? ACCENT.coral : ACCENT.ink,
        boxShadow: active ? `4px 5px 0px 0px ${ACCENT.coral}` : undefined,
      }}
    >
      <span
        className={`relative flex ${dim} items-center justify-center overflow-hidden rounded-full border-2`}
        style={{
          backgroundColor: `${ACCENT.marigold}22`,
          borderColor: ACCENT.ink,
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="80px"
            unoptimized
          />
        ) : (
          <span
            className="text-lg font-extrabold"
            style={{ color: ACCENT.plum }}
          >
            {name.charAt(0)}
          </span>
        )}
      </span>
      <span
        className="line-clamp-2 text-center text-[10px] font-bold leading-tight sm:text-xs"
        style={{ color: ACCENT.ink }}
      >
        {name}
      </span>
    </motion.button>
  );
}
