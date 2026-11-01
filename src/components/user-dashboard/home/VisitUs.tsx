import { Clock, MapPin } from "lucide-react";
import Section from "../Section";
import InfoCard from "../InfoCard";
import LinkButton from "../LinkButton";
import SectionHeading from "../SectionHeading";
import Reveal from "../ui/Reveal";
import FloatingBackground from "../ui/FloatingBackground";
import { CAFE } from "@/constants/cafe";
import { ACCENT } from "../theme";

export default function VisitUs() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: `${ACCENT.teal}14` }}>
      <FloatingBackground tone="light" icons={false} />
      <div className="relative z-10">
        <Section>
          <Reveal>
            <SectionHeading
              title="Visit us"
              description="Drop in for a coffee or a quick bite."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <InfoCard icon={MapPin} title="Address">
                <p>{CAFE.address.line1}</p>
                <p>{CAFE.address.line2}</p>
              </InfoCard>
            </Reveal>

            {CAFE.hours.length > 0 && (
              <Reveal delay={0.12}>
                <InfoCard icon={Clock} title="Opening hours">
                  {CAFE.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}: {h.time}
                    </p>
                  ))}
                </InfoCard>
              </Reveal>
            )}
          </div>
          <Reveal className="mt-8" delay={0.2}>
            <LinkButton href={CAFE.address.mapsUrl} external>
              Get directions
            </LinkButton>
          </Reveal>
        </Section>
      </div>
    </div>
  );
}