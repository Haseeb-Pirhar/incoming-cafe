import Section from "../Section";
import SectionHeading from "../SectionHeading";
import LinkButton from "../LinkButton";
import Reveal from "../ui/Reveal";
import MenuCard from "../ui/MenuCard";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/constants/menu";
import { ACCENT } from "../theme";

// Home par dikhane wale items ki ids (constants/menu.ts se)
const PICK_IDS = ["i3", "i4", "f7", "f2", "i5", "f6"];

export default function PopularPicks() {
    const picks = PICK_IDS.map((id) => MENU_ITEMS.find((m) => m.id === id)).filter(
        (m): m is NonNullable<typeof m> => Boolean(m),
    );

    return (
        <Section background={`${ACCENT.timber}26`}>
            <Reveal>
                <SectionHeading
                    title="Popular picks"
                    description="A few favourites to get you started."
                />
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {picks.map((item, i) => (
                    <Reveal key={item.id} delay={(i % 3) * 0.12}>
                        <MenuCard
                            item={item}
                            categoryLabel={MENU_CATEGORIES.find((c) => c.key === item.category)?.label}
                        />
                    </Reveal>
                ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
                <LinkButton href="/dashboard/menu" variant="outline">
                    View full menu
                </LinkButton>
            </Reveal>
        </Section>
    );
}