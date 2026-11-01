import PageBanner from "@/components/user-dashboard/ui/PageBanner";
import BannerBird from "@/components/user-dashboard/ui/BannerBird";
import Section from "@/components/user-dashboard/Section";
import MenuBoard from "@/components/user-dashboard/menu/MenuBoard";
import FloatingBackground from "@/components/user-dashboard/ui/FloatingBackground";
import SideBirds from "@/components/user-dashboard/ui/SideBirds";
import { COFFEE } from "@/components/user-dashboard/theme";

export default function MenuContent() {
  return (
    <>
      <PageBanner
        title="Menu"
        description="Coffee, fresh drinks and light bites. Ask at the counter about today's specials."
        image={{
          src: "/images/gallery/latte-art.jpg",
          alt: "A cup of coffee on a timber table",
        }}
        aside={<BannerBird />}
      />
      <div className="relative overflow-hidden" style={{ backgroundColor: COFFEE.sand }}>
        <FloatingBackground tone="light" icons={false} />
        <SideBirds />
        <div className="relative z-10">
          <Section>
            <MenuBoard />
          </Section>
        </div>
      </div>
    </>
  );
}