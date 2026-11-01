import Link from "next/link";
import { ACCENT, COFFEE } from "./theme";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light" | "dark" | "cream";
  external?: boolean;
}

export default function LinkButton({
  href,
  children,
  variant = "primary",
  external = false,
}: LinkButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2";

  const styles = {
    primary: {
      backgroundColor: ACCENT.teal,
      color: "#fff",
      outlineColor: ACCENT.teal,
    },
    outline: {
      border: `1.5px solid ${ACCENT.ink}`,
      color: ACCENT.ink,
      outlineColor: ACCENT.ink,
    },
    light: {
      border: "1.5px solid rgba(255,255,255,0.8)",
      color: "#fff",
      outlineColor: "#fff",
    },
    dark: {
      backgroundColor: COFFEE.espresso,
      color: "#fff",
      outlineColor: COFFEE.espresso,
    },
    cream: {
      backgroundColor: COFFEE.cream,
      color: COFFEE.espresso,
      outlineColor: COFFEE.cream,
    },
  } as const;

  const hover = {
    primary: "hover:brightness-110 hover:shadow-lg",
    outline: "hover:bg-black/5",
    light: "hover:bg-white/15",
    dark: "hover:bg-[#4B3A2B] hover:shadow-lg",
    cream: "hover:brightness-95 hover:shadow-lg",
  } as const;

  const cls = `${base} ${hover[variant]}`;
  const style = styles[variant];

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}