"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { GALLERY } from "@/constants/gallery";
import { ACCENT } from "./theme";

// Slow, endless photo strip. With "reduce motion" on, it becomes a normal scrollable row.
export default function ImageMarquee() {
  const reduce = useReducedMotion();
  const items = reduce ? GALLERY : [...GALLERY, ...GALLERY];

  return (
    <div className={`py-10 ${reduce ? "overflow-x-auto" : "overflow-hidden"}`}>
      <motion.ul
        className="flex w-max"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{
          duration: GALLERY.length * 6,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((img, i) => (
          <li
            key={`${img.src}-${i}`}
            className="pr-4"
            aria-hidden={i >= GALLERY.length}
          >
            <div
              className="relative h-64 w-52 overflow-hidden rounded-2xl sm:h-72 sm:w-60"
              style={{ border: `2px solid ${ACCENT.ink}` }}
            >
              <Image
                src={img.src}
                alt={i >= GALLERY.length ? "" : img.alt}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
