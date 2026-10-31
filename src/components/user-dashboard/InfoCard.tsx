import type { LucideIcon } from "lucide-react";
import { ACCENT, FONT } from "./theme";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export default function InfoCard({
  icon: Icon,
  title,
  children,
}: InfoCardProps) {
  return (
    <div
      className="flex gap-4 rounded-2xl p-6"
      style={{
        backgroundColor: ACCENT.card,
        border: `1px solid ${ACCENT.ink}1A`,
      }}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${ACCENT.timber}33`, color: ACCENT.ink }}
      >
        <Icon size={22} aria-hidden />
      </span>
      <div>
        <h3
          className="text-lg font-semibold"
          style={{ color: ACCENT.ink, fontFamily: FONT.display }}
        >
          {title}
        </h3>
        <div
          className="mt-1 text-sm leading-relaxed"
          style={{ color: `${ACCENT.ink}B3` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
