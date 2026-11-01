import type { LucideIcon } from "lucide-react";
import { ACCENT, FONT } from "./theme";

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
}

export default function HighlightCard({ icon: Icon, title, text }: HighlightCardProps) {
  return (
    <div
      className="group relative h-full overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        backgroundColor: ACCENT.card,
        border: `1px solid ${ACCENT.ink}1A`,
      }}
    >
      {/* hover par neeche se teal glow */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: ACCENT.teal }}
      />
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-6 group-hover:scale-110"
        style={{ backgroundColor: `${ACCENT.teal}1F`, color: ACCENT.teal }}
      >
        <Icon size={26} aria-hidden />
      </span>
      <h3
        className="mt-5 text-2xl font-semibold"
        style={{ color: ACCENT.ink, fontFamily: FONT.display }}
      >
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: `${ACCENT.ink}B3` }}>
        {text}
      </p>
    </div>
  );
}