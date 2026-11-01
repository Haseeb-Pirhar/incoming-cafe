import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/user-dashboard/PageHero";
import Section from "@/components/user-dashboard/Section";
import InfoCard from "@/components/user-dashboard/InfoCard";
import LinkButton from "@/components/user-dashboard/LinkButton";
import ContactForm from "@/components/user-dashboard/contact/ContactForm";
import MapEmbed from "@/components/user-dashboard/contact/MapEmbed";
import { CAFE } from "@/constants/cafe";

export default function ContactContent() {
  return (
    <>
      <PageHero
        title="Contact"
        description="Questions about the menu or opening times? Send us a message or drop in."
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <InfoCard icon={MapPin} title="Address">
              <p>{CAFE.address.line1}</p>
              <p>{CAFE.address.line2}</p>
            </InfoCard>

            {CAFE.phone && (
              <InfoCard icon={Phone} title="Phone">
                <a href={`tel:${CAFE.phone.replace(/\s/g, "")}`} className="underline">
                  {CAFE.phone}
                </a>
              </InfoCard>
            )}

            {CAFE.email && (
              <InfoCard icon={Mail} title="Email">
                <a href={`mailto:${CAFE.email}`} className="underline">
                  {CAFE.email}
                </a>
              </InfoCard>
            )}

            {CAFE.hours.length > 0 && (
              <InfoCard icon={Clock} title="Opening hours">
                {CAFE.hours.map((h) => (
                  <p key={h.days}>
                    {h.days}: {h.time}
                  </p>
                ))}
              </InfoCard>
            )}

            <LinkButton href={CAFE.address.mapsUrl} external variant="outline">
              Get directions
            </LinkButton>
          </div>

          <ContactForm />
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <MapEmbed />
      </Section>
    </>
  );
}