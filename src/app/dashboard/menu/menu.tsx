import PageHero from "@/components/user-dashboard/PageHero";
import Section from "@/components/user-dashboard/Section";
import MenuBoard from "@/components/user-dashboard/menu/MenuBoard";
import { ACCENT } from "@/components/user-dashboard/theme";

export default function MenuContent() {
  return (
    <>
      <PageHero
        title="Menu"
        description="Coffee, fresh drinks and light bites. Ask at the counter about today's specials."
      />
      <Section background={ACCENT.ink}>
        <MenuBoard />
      </Section>
    </>
  );
}
