import Link from "next/link";
import { Coffee, CupSoda, Leaf, Sandwich } from "lucide-react";
import Reveal from "../ui/Reveal";
import { HOME_CATEGORIES } from "@/constants/home";
import { COFFEE } from "../theme";

const ICONS = {
    coffee: Coffee,
    iced: CupSoda,
    "not-coffee": Leaf,
    food: Sandwich,
};

export default function CategoryStrip() {
    return (
        <section style={{ backgroundColor: COFFEE.band }}>
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
                {HOME_CATEGORIES.map((c, i) => {
                    const Icon = ICONS[c.key];
                    return (
                        <Reveal key={c.key} delay={i * 0.08}>
                            <Link
                                href="/dashboard/menu"
                                className="group flex flex-col items-center gap-3"
                            >
                                <span
                                    className="flex h-16 w-16 items-center justify-center rounded-full transition duration-300 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:shadow-lg"
                                    style={{ backgroundColor: COFFEE.cream, color: COFFEE.espresso }}
                                >
                                    <Icon size={28} aria-hidden />
                                </span>
                                <span className="text-sm font-medium" style={{ color: COFFEE.espresso }}>
                                    {c.label}
                                </span>
                            </Link>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}