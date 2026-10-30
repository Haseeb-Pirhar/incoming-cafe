"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ACCENT } from "@/components/user-dashboard/theme";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    const controls = animate(count, to, { duration: 1.6, ease: "easeOut" });
    return controls.stop;
  }, [to]);
  return (
    <span style={{ color: ACCENT.marigold }}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function AboutContent() {
  return (
    <div style={{ backgroundColor: ACCENT.paper }}>
      <section
        className="px-6 py-20 text-center"
        style={{ backgroundColor: ACCENT.plum }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-white sm:text-5xl"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Humari Kahani
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-4 max-w-2xl text-white/60"
        >
          happyLife ek chhoti si soch se shuru hua — everyday things that make
          everyday life a little happier. Products picked, priced, aur shipped
          with care.
        </motion.p>
      </section>

      <section className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-6 py-14 text-center">
        {[
          { n: 15000, s: "+", label: "Happy Customers" },
          { n: 500, s: "+", label: "Products" },
          { n: 4, s: " yrs", label: "In Business" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="text-3xl font-extrabold sm:text-4xl">
              <Counter to={item.n} suffix={item.s} />
            </div>
            <p
              className="mt-1 text-xs sm:text-sm"
              style={{ color: `${ACCENT.ink}80` }}
            >
              {item.label}
            </p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[
            {
              title: "Mission",
              text: "Quality products ko sab tak affordable banana.",
            },
            {
              title: "Vision",
              text: "Pakistan ki sabse trusted online shopping choice banna.",
            },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl border-2 p-6"
              style={{
                borderColor: ACCENT.ink,
                backgroundColor: i === 0 ? ACCENT.coral : ACCENT.teal,
              }}
            >
              <h3 className="text-lg font-extrabold text-white">{b.title}</h3>
              <p className="mt-2 text-sm text-white/85">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
