import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "../Section";
import SectionHeading from "../SectionHeading";
import Reveal from "../ui/Reveal";
import BrewCard from "../ui/BrewCard";
import FloatingBackground from "../ui/FloatingBackground";
import { SIGNATURE_BREWS } from "@/constants/home";
import { MENU_ITEMS, formatPrice } from "@/constants/menu";
import { COFFEE } from "../theme";

export default function SignatureBrews() {
    const brews = SIGNATURE_BREWS.map((b) => {
        const item = MENU_ITEMS.find((m) => m.id === b.menuId);
        return item ? { ...b, item } : null;
    }).filter((b): b is NonNullable<typeof b> => b !== null);

    return (
        <div className="relative overflow-hidden" style={{ backgroundColor: COFFEE.sand }}>
            <FloatingBackground tone="light" />
            <div className="relative z-10">
                <Section>
                    <Reveal>
                        <SectionHeading
                            align="center"
                            title="Our signature brews"
                            description="A few favourites from the counter, made fresh."
                        />
                    </Reveal>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {brews.map((b, i) => (
                            <Reveal key={b.menuId} delay={(i % 4) * 0.1} className="h-full">
                                <BrewCard
                                    title={b.item.name}
                                    description={b.blurb}
                                    price={formatPrice(b.item.price, b.item.extra)}
                                    image={b.image}
                                />
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="mt-12 flex justify-center" delay={0.2}>
                        <Link
                            href="/dashboard/menu"
                            className="group inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
                            style={{ color: COFFEE.espresso }}
                        >
                            Discover more
                            <ArrowRight
                                size={16}
                                aria-hidden
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    </Reveal>
                </Section>
            </div>
        </div>
    );
}