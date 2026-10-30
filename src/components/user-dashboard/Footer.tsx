"use client";
import Link from "next/link";
import { ACCENT } from "./theme";

export default function Footer() {
  return (
    <footer
      className="mt-8 sm:mt-10 border-t-2"
      style={{ borderColor: ACCENT.ink, backgroundColor: ACCENT.plum }}
    >
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 px-4 py-8 sm:px-6 sm:py-10 sm:grid-cols-3">
        <div>
          <h3
            className="mb-2 text-lg sm:text-xl font-extrabold text-white"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            happy<span style={{ color: ACCENT.marigold }}>Life</span>
          </h3>
          <p className="text-sm text-white/60">
            Everyday things that make everyday life a little happier.
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
            About
          </h4>
          <p className="text-sm text-white/70">
            A marketplace for products people actually love using — picked,
            priced, and shipped with care.
          </p>
          <Link
            href="/dashboard/about"
            className="mt-2 inline-block text-sm font-semibold"
            style={{ color: ACCENT.marigold }}
          >
            Learn more →
          </Link>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
            Contact
          </h4>
          <p className="text-sm text-white/70">pirharsahib@gmail.com</p>
          <p className="text-sm text-white/70">+92 329 4552747</p>
        </div>
      </div>
      <div
        className="border-t-2 px-4 py-3 text-center text-[11px] sm:text-xs font-medium text-white/50"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        © {new Date().getFullYear()} happyLife. Made with a smile.
      </div>
    </footer>
  );
}
