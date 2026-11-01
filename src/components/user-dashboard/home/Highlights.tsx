import { Coffee, CupSoda, Sandwich } from "lucide-react";
import Section from "../Section";
import HighlightCard from "../HighlightCard";
import SectionHeading from "../SectionHeading";
import Reveal from "../ui/Reveal";
import FloatingBackground from "../ui/FloatingBackground";
import { HIGHLIGHTS } from "@/constants/cafe";

const ICONS = { coffee: Coffee, drinks: CupSoda, bites: Sandwich };

export default function Highlights() {
  return (
    <div className="relative overflow-hidden">
      <FloatingBackground tone="light" />
      <div className="relative z-10">
        <Section>
          <Reveal>
            <SectionHeading
              title="What we serve"
              description="A short menu, made fresh. The full list is on the menu page."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.key} delay={i * 0.12}>
                <HighlightCard icon={ICONS[h.key]} title={h.title} text={h.text} />
              </Reveal>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}