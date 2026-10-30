"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlinePhone,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { ACCENT } from "./theme";
import { useCart } from "./cart/CartContext";

const NAV_LINKS = [
  { href: "/dashboard", label: "Home", icon: HiOutlineHome },
  { href: "/dashboard/shop", label: "Shop", icon: HiOutlineShoppingBag },
  {
    href: "/dashboard/user-cat",
    label: "Categories",
    icon: HiOutlineSquares2X2,
  },
  {
    href: "/dashboard/about",
    label: "About",
    icon: HiOutlineInformationCircle,
  },
  { href: "/dashboard/contact", label: "Contact", icon: HiOutlinePhone },
];

export default function DashboardNavbar({
  search,
  setSearch,
  sidebarOpen,
  setSidebarOpen,
}: {
  search: string;
  setSearch: (v: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (fn: (o: boolean) => boolean) => void;
}) {
  const { itemCount, openDrawer } = useCart();
  const pathname = usePathname();

  const isLinkActive = (href: string) => pathname === href;

  return (
    <header
      className="sticky top-0 z-40 border-b-2"
      style={{ backgroundColor: ACCENT.plum, borderColor: ACCENT.ink }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-3 py-2.5 sm:flex-nowrap sm:gap-3 sm:px-6 sm:py-3">
        <button
          type="button"
          onClick={() => setSidebarOpen((o) => !o)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white sm:h-10 sm:w-10 lg:hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <HiOutlineXMark className="text-xl" />
          ) : (
            <HiOutlineBars3 className="text-xl" />
          )}
        </button>

        <Link
          href="/dashboard"
          className="flex shrink-0 items-center gap-2 sm:gap-2.5"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 sm:h-9 sm:w-9"
            style={{
              backgroundColor: ACCENT.marigold,
              borderColor: ACCENT.ink,
            }}
          >
            <HiOutlineSparkles
              className="text-base sm:text-lg"
              style={{ color: ACCENT.ink }}
            />
          </motion.div>
          <h1
            className="text-base font-extrabold leading-tight text-white sm:text-lg lg:text-xl"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            happy<span style={{ color: ACCENT.marigold }}>Life</span>
          </h1>
        </Link>

        <nav className="ml-1 hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = isLinkActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition"
                style={{ color: active ? "#fff" : "rgba(255,255,255,0.7)" }}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className="relative z-10 text-base"
                  style={{ color: active ? ACCENT.coral : undefined }}
                />
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="relative order-3 w-full flex-1 sm:order-none sm:ml-auto sm:max-w-md">
          <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border-2 border-transparent bg-white/10 py-2 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#FFB627]/60 focus:bg-white/15 sm:py-2.5"
          />
        </div>

        <motion.button
          type="button"
          onClick={openDrawer}
          whileHover={{ scale: 1.08, rotate: -6 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10"
          style={{ backgroundColor: ACCENT.marigold, borderColor: ACCENT.ink }}
          aria-label="Cart"
        >
          <HiOutlineShoppingBag
            className="text-base sm:text-lg"
            style={{ color: ACCENT.ink }}
          />
          {itemCount > 0 && (
            <span
              className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 px-1 text-[10px] font-extrabold text-white"
              style={{ backgroundColor: ACCENT.coral, borderColor: ACCENT.ink }}
            >
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </motion.button>
      </div>

      {sidebarOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col gap-1 px-3 pb-3 md:hidden"
        >
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = isLinkActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(() => false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold"
                style={{
                  backgroundColor: active
                    ? "rgba(255,255,255,0.12)"
                    : "transparent",
                  color: "#fff",
                }}
              >
                <Icon
                  className="text-base"
                  style={{ color: active ? ACCENT.coral : undefined }}
                />
                {label}
              </Link>
            );
          })}
        </motion.nav>
      )}

      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="block h-4 w-full sm:h-5"
        style={{ marginBottom: -1 }}
      >
        <path
          d="M0,0 C240,40 480,40 720,20 C960,0 1200,0 1440,20 L1440,40 L0,40 Z"
          fill={ACCENT.paper}
        />
      </svg>
    </header>
  );
}
