import { Banknote, Clock, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import Section from "../Section";
import InfoCard from "../InfoCard";
import SectionHeading from "../SectionHeading";
import Reveal from "../ui/Reveal";
import HoursList from "../ui/HoursList";
import PriceList from "../ui/PriceList";
import FloatingBackground from "../ui/FloatingBackground";
import { CAFE } from "@/constants/cafe";
import { COFFEE } from "../theme";

export default function VisitUs() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: COFFEE.sand }}>
      <FloatingBackground tone="light" icons={false} />
      <div className="relative z-10">
        <Section>
          <Reveal>
            <SectionHeading
              title="Visit us"
              description="Drop in for a coffee or a quick bite."
            />
          </Reveal>

          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
            <Reveal className="h-full">
              <InfoCard icon={MapPin} title="Address">
                <p>{CAFE.address.line1}</p>
                <p>{CAFE.address.line2}</p>
                <a
                  href={CAFE.address.plusCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block underline-offset-2 hover:underline"
                >
                  {CAFE.address.plusCode}
                </a>
                <a
                  href={CAFE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-medium underline-offset-2 hover:underline"
                  style={{ color: COFFEE.espresso }}
                >
                  <FaInstagram size={18} aria-hidden />
                  {CAFE.instagram.handle}
                </a>
              </InfoCard>
            </Reveal>

            {CAFE.hours.length > 0 && (
              <Reveal delay={0.12} className="h-full">
                <InfoCard icon={Clock} title="Opening hours">
                  <HoursList hours={CAFE.hours} />
                </InfoCard>
              </Reveal>
            )}

            {CAFE.priceBands.length > 0 && (
              <Reveal delay={0.24} className="h-full">
                <InfoCard icon={Banknote} title="Price">
                  <PriceList bands={CAFE.priceBands} />
                </InfoCard>
              </Reveal>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}