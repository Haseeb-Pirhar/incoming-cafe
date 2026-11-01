import Hero from "@/components/user-dashboard/home/Hero";
import CategoryStrip from "@/components/user-dashboard/home/CategoryStrip";
import SignatureBrews from "@/components/user-dashboard/home/SignatureBrews";
import PremiumBeans from "@/components/user-dashboard/home/PremiumBeans";
import ImageMarquee from "@/components/user-dashboard/ImageMarquee";
import VisitUs from "@/components/user-dashboard/home/VisitUs";
import { COFFEE } from "@/components/user-dashboard/theme";

export default function HomeContent() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <SignatureBrews />
      <PremiumBeans />
      <div style={{ backgroundColor: COFFEE.cream }}>
        <ImageMarquee />
      </div>
      <VisitUs />
    </>
  );
}