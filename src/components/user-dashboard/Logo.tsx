import Image from "next/image";
import Link from "next/link";
import { ACCENT, FONT } from "./theme";

interface LogoProps {
  // "mark": small bird + the name in the wordmark font (navbar)
  // "full": the complete logo, bird and lettering (hero, footer)
  variant?: "mark" | "full";
  tone?: "dark" | "light";
  width?: number; // image width in px
  href?: string | null;
}

// Files in /public: logo.png, logo-white.png, logo-bird.png (transparent PNGs)
export default function Logo({
  variant = "mark",
  tone = "dark",
  width,
  href = "/dashboard",
}: LogoProps) {
  const light = tone === "light";

  const content =
    variant === "full" ? (
      <Image
        src={light ? "/logo-white.png" : "/logo.png"}
        alt="Incoming Cafe"
        width={width ?? 240}
        height={Math.round((width ?? 240) * (908 / 800))}
        priority
      />
    ) : (
      <span className="flex items-center gap-2.5">
        <Image
          src={light ? "/logo-white.png" : "/logo-bird.png"}
          alt=""
          aria-hidden
          width={width ?? 44}
          height={Math.round((width ?? 44) * (348 / 384))}
          priority
        />
        <span
          className="text-2xl leading-none"
          style={{ color: light ? "#fff" : ACCENT.ink, fontFamily: FONT.display }}
        >
          incoming cafe
        </span>
      </span>
    );

  return href ? (
    <Link href={href} aria-label="Incoming Cafe home">
      {content}
    </Link>
  ) : (
    content
  );
}