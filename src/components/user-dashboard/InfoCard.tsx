import type { LucideIcon } from "lucide-react";
import { COFFEE, FONT } from "./theme";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

// Address / phone / hours card. Hover par uthta hai, icon ghoomta hai.
export default function InfoCard({ icon: Icon, title, children }: InfoCardProps) {
  return (
    <div
      className="group flex h-full gap-4 rounded-3xl p-6 shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      style={{
        backgroundColor: COFFEE.cream,
        border: `1px solid ${COFFEE.espresso}1A`,
      }}
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-6 group-hover:scale-110"
        style={{ backgroundColor: COFFEE.band, color: COFFEE.espresso }}
      >
        <Icon size={22} aria-hidden />
      </span>
      <div>
        <h3
          className="text-xl font-semibold"
          style={{ color: COFFEE.espresso, fontFamily: FONT.display }}
        >
          {title}
        </h3>
        <div
          className="mt-1 text-sm leading-relaxed"
          style={{ color: `${COFFEE.espresso}B3` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}