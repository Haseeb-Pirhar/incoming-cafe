import Image from "next/image";
import { Coffee, Leaf, Sandwich } from "lucide-react";
import PageHero from "@/components/user-dashboard/PageHero";
import Section from "@/components/user-dashboard/Section";
import SectionHeading from "@/components/user-dashboard/SectionHeading";
import HighlightCard from "@/components/user-dashboard/HighlightCard";
import VisitUs from "@/components/user-dashboard/home/VisitUs";
import { ACCENT } from "@/components/user-dashboard/theme";
import { ABOUT } from "@/constants/about";

const ICONS = { coffee: Coffee, food: Sandwich, options: Leaf };

export default function AboutContent() {
  return (
    <>
      <PageHero title={ABOUT.title} description={ABOUT.intro} />

      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading title={ABOUT.storyTitle} />
            <div
              className="mt-5 space-y-4 text-base leading-relaxed"
              style={{ color: `${ACCENT.ink}CC` }}
            >
              {ABOUT.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div
            className="relative aspect-[4/3] overflow-hidden rounded-3xl"
            style={{ border: `3px solid ${ACCENT.ink}`, boxShadow: `10px 12px 0 ${ACCENT.teal}` }}
          >
            <Image
              src={ABOUT.image.src}
              alt={ABOUT.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeading title={ABOUT.valuesTitle} />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {ABOUT.values.map((v) => (
            <HighlightCard key={v.key} icon={ICONS[v.key]} title={v.title} text={v.text} />
          ))}
        </div>
      </Section>

      <VisitUs />
    </>
  );
}