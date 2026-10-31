import type { LucideIcon } from "lucide-react";
import { ACCENT, FONT } from "./theme";

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
}

export default function HighlightCard({
  icon: Icon,
  title,
  text,
}: HighlightCardProps) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: ACCENT.card,
        border: `1px solid ${ACCENT.ink}1A`,
      }}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: `${ACCENT.teal}1F`, color: ACCENT.teal }}
      >
        <Icon size={22} aria-hidden />
      </span>
      <h3
        className="mt-4 text-xl font-semibold"
        style={{ color: ACCENT.ink, fontFamily: FONT.display }}
      >
        {title}
      </h3>
      <p
        className="mt-1.5 text-sm leading-relaxed"
        style={{ color: `${ACCENT.ink}B3` }}
      >
        {text}
      </p>
    </div>
  );
}
