import type { LucideIcon } from "lucide-react";
import { COFFEE, FONT } from "./theme";

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
}

export default function HighlightCard({ icon: Icon, title, text }: HighlightCardProps) {
  return (
    <div
      className="group relative h-full overflow-hidden rounded-3xl p-7 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        backgroundColor: COFFEE.cream,
        border: `1px solid ${COFFEE.espresso}1A`,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: COFFEE.caramel }}
      />
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-6 group-hover:scale-110"
        style={{ backgroundColor: COFFEE.band, color: COFFEE.espresso }}
      >
        <Icon size={26} aria-hidden />
      </span>
      <h3
        className="mt-5 text-2xl font-semibold"
        style={{ color: COFFEE.espresso, fontFamily: FONT.display }}
      >
        {title}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: `${COFFEE.espresso}B3` }}
      >
        {text}
      </p>
    </div>
  );
}