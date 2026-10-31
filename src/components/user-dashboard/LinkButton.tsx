import Link from "next/link";
import { ACCENT } from "./theme";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  external?: boolean;
}

export default function LinkButton({
  href,
  children,
  variant = "primary",
  external = false,
}: LinkButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
  const style =
    variant === "primary"
      ? {
          backgroundColor: ACCENT.teal,
          color: "#fff",
          outlineColor: ACCENT.teal,
        }
      : {
          border: `1.5px solid ${ACCENT.ink}`,
          color: ACCENT.ink,
          outlineColor: ACCENT.ink,
        };

  const cls = `${base} ${
    variant === "primary" ? "hover:brightness-110" : "hover:bg-black/5"
  }`;

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      style={style}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}
