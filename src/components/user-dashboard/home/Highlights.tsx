import { Coffee, CupSoda, Sandwich } from "lucide-react";
import Section from "../Section";
import HighlightCard from "../HighlightCard";
import { HIGHLIGHTS } from "@/constants/cafe";
import SectionHeading from "../SectionHeading";

const ICONS = { coffee: Coffee, drinks: CupSoda, bites: Sandwich };

export default function Highlights() {
  return (
    <Section>
      <SectionHeading
        title="What we serve"
        description="A short menu, made fresh. The full list is on the menu page."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {HIGHLIGHTS.map((h) => (
          <HighlightCard
            key={h.key}
            icon={ICONS[h.key]}
            title={h.title}
            text={h.text}
          />
        ))}
      </div>
    </Section>
  );
}
