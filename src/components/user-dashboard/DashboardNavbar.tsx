"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/cafe";
import { ACCENT } from "./theme";
import Logo from "./Logo";

export default function DashboardNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{
        backgroundColor: `${ACCENT.paper}E6`,
        borderColor: `${ACCENT.ink}1A`,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5"
                style={{
                  color: active ? "#fff" : ACCENT.ink,
                  backgroundColor: active ? ACCENT.teal : undefined,
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          style={{ color: ACCENT.ink }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          className="flex flex-col gap-1 px-4 pb-4 md:hidden"
          aria-label="Mobile"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium"
                style={{
                  color: active ? "#fff" : ACCENT.ink,
                  backgroundColor: active ? ACCENT.teal : undefined,
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
