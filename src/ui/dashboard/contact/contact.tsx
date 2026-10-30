"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { ACCENT } from "@/components/user-dashboard/theme";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "happyLife",
  telephone: "+92-329-4552747",
  email: "pirharsahib@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
};

export default function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ backgroundColor: ACCENT.paper }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <section
        className="px-6 py-16 text-center"
        style={{ backgroundColor: ACCENT.plum }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-white sm:text-5xl"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Rabta Karein
        </motion.h1>
        <p className="mt-3 text-white/60">
          Sawal ho ya suggestion — hum sun rahe hain.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-3">
        {[
          { icon: <HiOutlinePhone />, label: "Call", value: "+92 329 4552747" },
          {
            icon: <HiOutlineEnvelope />,
            label: "Email",
            value: "pirharsahib@gmail.com",
          },
          {
            icon: <HiOutlineMapPin />,
            label: "Address",
            value: "Lahore, Pakistan",
          },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="rounded-2xl border-2 bg-white p-6 text-center"
            style={{ borderColor: ACCENT.ink }}
          >
            <div
              className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full text-lg text-white"
              style={{ backgroundColor: ACCENT.teal }}
            >
              {c.icon}
            </div>
            <p
              className="text-xs font-semibold"
              style={{ color: `${ACCENT.ink}80` }}
            >
              {c.label}
            </p>
            <p className="mt-1 font-bold" style={{ color: ACCENT.ink }}>
              {c.value}
            </p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-lg px-6 pb-20">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 rounded-2xl border-2 bg-white p-6"
          style={{ borderColor: ACCENT.ink }}
        >
          <input
            required
            placeholder="Aapka naam"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-[#0FA398]"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-[#0FA398]"
          />
          <textarea
            required
            placeholder="Aapka message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-[#0FA398]"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg py-3 font-bold text-white"
            style={{ backgroundColor: sent ? ACCENT.teal : ACCENT.coral }}
          >
            <HiOutlinePaperAirplane className="rotate-45" />
            {sent ? "Bhej diya! ✅" : "Message Bhejein"}
          </motion.button>
        </motion.form>
      </section>
    </div>
  );
}
