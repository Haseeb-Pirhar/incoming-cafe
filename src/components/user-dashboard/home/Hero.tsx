"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CalendarCheck, ChevronDown, MapPin } from "lucide-react";
import LinkButton from "../LinkButton";
import VideoBackground from "../ui/VideoBackground";
import Modal from "../ui/Modal";
import BookingForm from "./BookingForm";
import { CAFE } from "@/constants/cafe";
import { FONT } from "../theme";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const OVERLAY =
  "linear-gradient(90deg, rgba(24,14,8,0.8) 0%, rgba(24,14,8,0.4) 55%, rgba(24,14,8,0.15) 100%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, rgba(0,0,0,0.5) 100%)";

export default function Hero() {
  const reduce = useReducedMotion();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <VideoBackground
        src="/videos/hero.mp4"
        webm="/videos/hero.webm"
        poster="/images/gallery/cafe.jpg"
        overlay={OVERLAY}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-end gap-10 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-[1fr_380px]">
        <motion.div
          className="max-w-xl"
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

          <motion.p variants={item} className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
            {CAFE.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/dashboard/menu" variant="cream">
              See the menu
            </LinkButton>
            <LinkButton href="/dashboard/contact" variant="light">
              Find us
            </LinkButton>
            {/* Chhoti screen par form modal me khulta hai */}
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/80 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
            >
              <CalendarCheck size={16} aria-hidden />
              Book a table
            </button>
          </motion.div>
        </motion.div>

        {/* Desktop: right side booking card */}
        <motion.div
          className="hidden lg:block"
          initial={reduce ? false : { opacity: 0, x: 50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.5 }}
        >
          <BookingForm />
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/80"
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ChevronDown size={30} />
      </motion.div>

      <Modal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        label="Book a table"
      >
        <BookingForm />
      </Modal>
    </section>
  );
}