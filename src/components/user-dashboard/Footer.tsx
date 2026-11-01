import Link from "next/link";
import Logo from "./Logo";
import { CAFE, NAV_LINKS } from "@/constants/cafe";
import { ACCENT, FONT } from "./theme";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: ACCENT.tealDark, color: "#fff" }}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo variant="full" tone="light" width={150} href={null} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">{CAFE.intro}</p>
        </div>

        <div>
          <h4 className="text-xl" style={{ fontFamily: FONT.display }}>
            pages
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl" style={{ fontFamily: FONT.display }}>
            find us
          </h4>
          <address className="mt-3 space-y-1 text-sm not-italic text-white/75">
            <p>{CAFE.address.line1}</p>
            <p>{CAFE.address.line2}</p>
            {CAFE.phone && <p>{CAFE.phone}</p>}
            {CAFE.email && <p>{CAFE.email}</p>}
          </address>
        </div>
      </div>

      <div className="border-t border-white/15 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {CAFE.name}
      </div>
    </footer>
  );
}