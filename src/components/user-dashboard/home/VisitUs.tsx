import { Clock, MapPin } from "lucide-react";
import Section from "../Section";
import InfoCard from "../InfoCard";
import LinkButton from "../LinkButton";
import { CAFE } from "@/constants/cafe";
import { ACCENT } from "../theme";
import SectionHeading from "../SectionHeading";

export default function VisitUs() {
  return (
    <Section background={`${ACCENT.teal}14`}>
      <SectionHeading
        title="Visit us"
        description="Drop in for a coffee or a quick bite."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <InfoCard icon={MapPin} title="Address">
          <p>{CAFE.address.line1}</p>
          <p>{CAFE.address.line2}</p>
        </InfoCard>

        {CAFE.hours.length > 0 && (
          <InfoCard icon={Clock} title="Opening hours">
            {CAFE.hours.map((h) => (
              <p key={h.days}>
                {h.days}: {h.time}
              </p>
            ))}
          </InfoCard>
        )}
      </div>
      <div className="mt-8">
        <LinkButton href={CAFE.address.mapsUrl} external>
          Get directions
        </LinkButton>
      </div>
    </Section>
  );
}
