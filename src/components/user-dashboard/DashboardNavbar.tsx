"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, X } from "lucide-react";
import { CAFE, NAV_LINKS } from "@/constants/cafe";
import { ACCENT, COFFEE } from "./theme";
import Logo from "./Logo";

const GLASS = "border border-white/50 bg-white/75 shadow-lg backdrop-blur-md";

export default function DashboardNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Home par navbar hero video ke upar tairta hai; baaki pages par normal jagah leta hai.
  const isHome = pathname === "/dashboard";

  return (
    <header
      className={`sticky top-0 z-50 ${isHome ? "h-0" : ""}`}
      style={{ backgroundColor: isHome ? undefined : ACCENT.paper }}
    >
      <div className="mx-auto max-w-6xl px-4 pb-2 pt-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className={`rounded-full px-4 py-2 ${GLASS}`}>
            <Logo width={34} />
          </div>

          <nav
            className={`hidden items-center gap-1 rounded-full p-1.5 md:flex ${GLASS}`}
            aria-label="Main"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="rounded-full px-5 py-2 text-sm font-medium transition-colors hover:bg-black/5"
                  style={{
                    color: active ? "#fff" : COFFEE.espresso,
                    backgroundColor: active ? COFFEE.espresso : undefined,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <a
            href={CAFE.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#4B3A2B] md:inline-flex"
            style={{ backgroundColor: COFFEE.espresso }}
          >
            <MapPin size={16} aria-hidden />
            Get directions
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`flex h-11 w-11 items-center justify-center rounded-full md:hidden ${GLASS}`}
            style={{ color: COFFEE.espresso }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav
            className={`mt-3 flex flex-col gap-1 rounded-3xl p-3 md:hidden ${GLASS}`}
            aria-label="Mobile"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium"
                  style={{
                    color: active ? "#fff" : COFFEE.espresso,
                    backgroundColor: active ? COFFEE.espresso : undefined,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}