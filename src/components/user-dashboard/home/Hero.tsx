"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import Logo from "../Logo";
import LinkButton from "../LinkButton";
import VideoBackground from "../ui/VideoBackground";
import { CAFE } from "@/constants/cafe";
import { ACCENT, FONT } from "../theme";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      <VideoBackground
        src="/videos/hero.mp4"
        webm="/videos/hero.webm"
        poster="/images/gallery/cafe.jpg"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <motion.div
          variants={container}
          initial={reduce ? "show" : "hidden"}
          animate="show"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur"
          >
            <MapPin size={15} aria-hidden />
            {CAFE.address.line1}, Parramatta
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-5xl leading-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            style={{ fontFamily: FONT.display }}
          >
            {CAFE.tagline}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md text-lg leading-relaxed text-white/85"
          >
            {CAFE.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/dashboard/menu">See the menu</LinkButton>
            <LinkButton href="/dashboard/contact" variant="light">
              Find us
            </LinkButton>
          </motion.div>
        </motion.div>

        {/* Signboard: entry spring + halka hawa me tairta hua */}
        <div className="flex justify-center">
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              initial={reduce ? false : { rotate: -10, y: 40, opacity: 0, scale: 0.9 }}
              animate={{ rotate: -2, y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 110, damping: 13, delay: 0.4 }}
              className="rounded-3xl px-8 py-6 sm:px-12 sm:py-8"
              style={{
                backgroundColor: ACCENT.card,
                border: `3px solid ${ACCENT.ink}`,
                boxShadow: `10px 12px 0 ${ACCENT.teal}`,
              }}
            >
              <Logo variant="full" width={260} href={null} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/80"
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ChevronDown size={30} />
      </motion.div>
    </section>
  );
}