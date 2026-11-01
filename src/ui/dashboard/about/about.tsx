import Image from "next/image";
import { Coffee, Leaf, Sandwich } from "lucide-react";
import PageBanner from "@/components/user-dashboard/ui/PageBanner";
import Reveal from "@/components/user-dashboard/ui/Reveal";
import FloatingBackground from "@/components/user-dashboard/ui/FloatingBackground";
import Section from "@/components/user-dashboard/Section";
import SectionHeading from "@/components/user-dashboard/SectionHeading";
import HighlightCard from "@/components/user-dashboard/HighlightCard";
import LinkButton from "@/components/user-dashboard/LinkButton";
import VisitUs from "@/components/user-dashboard/home/VisitUs";
import { COFFEE } from "@/components/user-dashboard/theme";
import { ABOUT } from "@/constants/about";

const ICONS = { coffee: Coffee, food: Sandwich, options: Leaf };

export default function AboutContent() {
  return (
    <>
      <PageBanner
        title={ABOUT.title}
        description={ABOUT.intro}
        image={ABOUT.image}
      />

      {/* Our story */}
      <div className="relative overflow-hidden" style={{ backgroundColor: COFFEE.sand }}>
        <FloatingBackground tone="light" />
        <div className="relative z-10">
          <Section>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <Reveal>
                <SectionHeading title={ABOUT.storyTitle} />
                <div
                  className="mt-5 space-y-4 text-base leading-relaxed"
                  style={{ color: `${COFFEE.espresso}CC` }}
                >
                  {ABOUT.story.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <LinkButton href="/dashboard/menu" variant="dark">
                    See the menu
                  </LinkButton>
                  <LinkButton href="/dashboard/contact" variant="outline">
                    Get in touch
                  </LinkButton>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div
                  className="group relative aspect-[4/3] overflow-hidden rounded-3xl transition duration-500 hover:-rotate-1"
                  style={{ boxShadow: `10px 12px 0 ${COFFEE.caramel}` }}
                >
                  <Image
                    src={ABOUT.image.src}
                    alt={ABOUT.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-1000 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            </div>
          </Section>
        </div>
      </div>

      {/* What you will find here */}
      <div style={{ backgroundColor: COFFEE.band }}>
        <Section>
          <Reveal>
            <SectionHeading title={ABOUT.valuesTitle} align="center" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {ABOUT.values.map((v, i) => (
              <Reveal key={v.key} delay={i * 0.12} className="h-full">
                <HighlightCard icon={ICONS[v.key]} title={v.title} text={v.text} />
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <VisitUs />
    </>
  );
}