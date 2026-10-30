"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineBolt } from "react-icons/hi2";

import { getSplash } from "@/api/api-call/splash";
import { ISplash } from "@/types/splash";
import { SplashProductCard } from "@/components/user-dashboard/splash/SplashProductCard";

const ACCENT = {
  coral: "#FF6B4A",
  coralDark: "#E8452C",
  marigold: "#FFB627",
  ink: "#241C1C",
};

/**
 * "Flash Sale Today" banner — happyLife's bold-border card style,
 * inside a coral gradient banner. Cards scroll continuously right →
 * left with no gaps (list is duplicated, animates 0% → -50%), no
 * buttons, no edge fade — matching the seamless wego-style motion.
 */
export function Splash() {
  const [splash, setSplash] = useState<ISplash | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSplash = async () => {
      const res = await getSplash();
      if (isMounted) {
        setSplash((res as any)?.data ?? res ?? null);
        setIsLoading(false);
      }
    };

    fetchSplash();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-64 w-full animate-pulse rounded-3xl bg-gradient-to-br from-[#FF6B4A]/10 to-[#FFB627]/10" />
    );
  }

  const products = splash?.products ?? [];

  if (products.length === 0) {
    return null;
  }

  // Duplicate the list so the CSS animation loops seamlessly 0% → -50%.
  const loopProducts = [...products, ...products];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-6 sm:mb-8 overflow-hidden rounded-3xl border-2 p-[2px] shadow-[0_10px_30px_-10px_rgba(255,107,74,0.5)]"
      style={{ borderColor: ACCENT.ink }}
    >
      {/* Animated gradient border/background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(120deg, ${ACCENT.coral}, ${ACCENT.coralDark}, ${ACCENT.marigold}, ${ACCENT.coral})`,
          backgroundSize: "300% 300%",
          animation: "splash-gradient-shift 8s ease infinite",
        }}
      />

      <div
        className="relative overflow-hidden rounded-[calc(1.5rem-2px)] px-3 py-4 sm:px-5 sm:py-5"
        style={{
          background: `linear-gradient(135deg, ${ACCENT.coral} 0%, ${ACCENT.coralDark} 100%)`,
        }}
      >
        {/* Decorative diagonal pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
          }}
        />

        {/* Soft glow blobs for depth */}
        <div
          className="pointer-events-none absolute -left-10 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
          style={{ background: ACCENT.marigold }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full opacity-20 blur-3xl"
          style={{ background: "#fff" }}
        />

        {/* Header */}
        <div className="relative mb-3 sm:mb-4 flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, -12, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 bg-white/15 backdrop-blur-sm"
            style={{ borderColor: "rgba(255,255,255,0.5)" }}
          >
            <HiOutlineBolt className="text-lg text-white" />
          </motion.span>
          <div>
            <h2
              className="text-base sm:text-lg font-extrabold leading-none text-white md:text-xl"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              {splash?.title || "Flash Sale Today"}
            </h2>
            <p className="mt-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white/70">
              Limited stock — grab it before it's gone
            </p>
          </div>
        </div>

        {/* Marquee viewport — full-bleed, no edge fade, no controls */}
        <div className="splash-marquee-viewport relative w-full overflow-hidden">
          <div className="splash-marquee-track flex w-max gap-3 sm:gap-4 py-1">
            {loopProducts.map((product, index) => (
              <SplashProductCard
                key={`${product._id}-${index}`}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .splash-marquee-track {
          animation: splash-scroll-left ${Math.max(products.length * 4.5, 14)}s
            linear infinite;
        }

        @keyframes splash-scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes splash-gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.section>
  );
}
