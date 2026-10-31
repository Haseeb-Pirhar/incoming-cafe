import Image from "next/image";
import Link from "next/link";
import { ACCENT, FONT } from "./theme";

interface LogoProps {
  size?: number;
  withText?: boolean;
  href?: string | null;
}

// Save the bird logo as /public/logo.png
export default function Logo({
  size = 44,
  withText = true,
  href = "/dashboard",
}: LogoProps) {
  const content = (
    <span className="flex items-center gap-2.5">
      <Image
        src="/logo.png"
        alt="Incoming Cafe logo"
        width={size}
        height={size}
        className="rounded-md object-contain"
        priority
      />
      {withText && (
        <span
          className="text-lg font-semibold leading-none"
          style={{ color: ACCENT.ink, fontFamily: FONT.display }}
        >
          incoming cafe
        </span>
      )}
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
