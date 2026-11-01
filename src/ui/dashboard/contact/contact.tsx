import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageBanner from "@/components/user-dashboard/ui/PageBanner";
import Reveal from "@/components/user-dashboard/ui/Reveal";
import FloatingBackground from "@/components/user-dashboard/ui/FloatingBackground";
import Section from "@/components/user-dashboard/Section";
import InfoCard from "@/components/user-dashboard/InfoCard";
import LinkButton from "@/components/user-dashboard/LinkButton";
import ContactForm from "@/components/user-dashboard/contact/ContactForm";
import MapEmbed from "@/components/user-dashboard/contact/MapEmbed";
import { COFFEE } from "@/components/user-dashboard/theme";
import { CAFE } from "@/constants/cafe";

export default function ContactContent() {
  return (
    <>
      <PageBanner
        title="Contact"
        description="Questions about the menu or opening times? Send us a message or drop in."
        image={{
          src: "/images/gallery/cafe.jpg",
          alt: "Inside Incoming Cafe, with timber tables and chairs",
        }}
      />

      <div className="relative overflow-hidden" style={{ backgroundColor: COFFEE.sand }}>
        <FloatingBackground tone="light" />
        <div className="relative z-10">
          <Section>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-5">
                <Reveal>
                  <InfoCard icon={MapPin} title="Address">
                    <p>{CAFE.address.line1}</p>
                    <p>{CAFE.address.line2}</p>
                  </InfoCard>
                </Reveal>

                {CAFE.phone && (
                  <Reveal delay={0.08}>
                    <InfoCard icon={Phone} title="Phone">
                      <a href={`tel:${CAFE.phone.replace(/\s/g, "")}`} className="underline">
                        {CAFE.phone}
                      </a>
                    </InfoCard>
                  </Reveal>
                )}

                {CAFE.email && (
                  <Reveal delay={0.16}>
                    <InfoCard icon={Mail} title="Email">
                      <a href={`mailto:${CAFE.email}`} className="underline">
                        {CAFE.email}
                      </a>
                    </InfoCard>
                  </Reveal>
                )}

                {CAFE.hours.length > 0 && (
                  <Reveal delay={0.24}>
                    <InfoCard icon={Clock} title="Opening hours">
                      {CAFE.hours.map((h) => (
                        <p key={h.days}>
                          {h.days}: {h.time}
                        </p>
                      ))}
                    </InfoCard>
                  </Reveal>
                )}

                <Reveal delay={0.3}>
                  <LinkButton href={CAFE.address.mapsUrl} external variant="dark">
                    Get directions
                  </LinkButton>
                </Reveal>
              </div>

              <Reveal delay={0.12}>
                <ContactForm />
              </Reveal>
            </div>
          </Section>

          <Section className="pt-0 sm:pt-0">
            <Reveal>
              <MapEmbed />
            </Reveal>
          </Section>
        </div>
      </div>
    </>
  );
}