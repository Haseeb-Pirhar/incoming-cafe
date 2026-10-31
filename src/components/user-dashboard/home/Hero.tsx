"use client";

import { motion, useReducedMotion } from "framer-motion";
import Logo from "../Logo";
import LinkButton from "../LinkButton";
import { CAFE } from "@/constants/cafe";
import { ACCENT, FONT } from "../theme";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: ACCENT.paper }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ color: ACCENT.ink, fontFamily: FONT.display }}
          >
            {CAFE.tagline}
          </h1>
          <p
            className="mt-5 max-w-md text-lg leading-relaxed"
            style={{ color: `${ACCENT.ink}CC` }}
          >
            {CAFE.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/dashboard/menu">See the menu</LinkButton>
            <LinkButton href="/dashboard/contact" variant="outline">
              Find us
            </LinkButton>
          </div>
        </div>

        {/* The signboard from the shopfront: the one memorable moment on the page */}
        <div className="flex justify-center">
          <motion.div
            initial={reduce ? false : { rotate: -8, y: 24, opacity: 0 }}
            animate={{ rotate: -2, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="rounded-3xl p-6 sm:p-8"
            style={{
              backgroundColor: ACCENT.card,
              border: `3px solid ${ACCENT.ink}`,
              boxShadow: `10px 12px 0 ${ACCENT.teal}`,
            }}
          >
            <Logo size={240} withText={false} href={null} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
