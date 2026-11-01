import Hero from "@/components/user-dashboard/home/Hero";
import Highlights from "@/components/user-dashboard/home/Highlights";
import PopularPicks from "@/components/user-dashboard/home/PopularPicks";
import ImageMarquee from "@/components/user-dashboard/ImageMarquee";
import VisitUs from "@/components/user-dashboard/home/VisitUs";

export default function HomeContent() {
  return (
    <>
      <Hero />
      <Highlights />
      <PopularPicks />
      <ImageMarquee />
      <VisitUs />
    </>
  );
}