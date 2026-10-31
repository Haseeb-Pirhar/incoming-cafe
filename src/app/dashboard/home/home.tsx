import Hero from "@/components/user-dashboard/home/Hero";
import ImageMarquee from "@/components/user-dashboard/ImageMarquee";
import Highlights from "@/components/user-dashboard/home/Highlights";
import VisitUs from "@/components/user-dashboard/home/VisitUs";

export default function HomeContent() {
  return (
    <>
      <Hero />
      <ImageMarquee />
      <Highlights />
      <VisitUs />
    </>
  );
}
