import type { LucideIcon } from "lucide-react";
import { formatPrice, type MenuItem } from "@/constants/menu";
import { COFFEE, FONT } from "../theme";

interface MenuCardProps {
    item: MenuItem;
    icon: LucideIcon;
    categoryLabel?: string;
}

// Menu item card: hover par uthta hai, icon ghoomta hai, neeche caramel line phailti hai.
export default function MenuCard({ item, icon: Icon, categoryLabel }: MenuCardProps) {
    return (
        <article
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 shadow-md transition duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl"
            style={{
                backgroundColor: COFFEE.cream,
                border: `1px solid ${COFFEE.espresso}1A`,
            }}
        >
            <div className="flex items-start justify-between gap-3">
                <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-6 group-hover:scale-110"
                    style={{ backgroundColor: COFFEE.band, color: COFFEE.espresso }}
                >
                    <Icon size={26} aria-hidden />
                </span>
                <span
                    className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-white transition duration-300 group-hover:scale-110"
                    style={{ backgroundColor: COFFEE.espresso }}
                >
                    {formatPrice(item.price, item.extra)}
                </span>
            </div>

            {categoryLabel && (
                <span
                    className="mt-5 w-fit rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${COFFEE.caramel}26`, color: COFFEE.mocha }}
                >
                    {categoryLabel}
                </span>
            )}

            <h3
                className="mt-3 text-2xl font-semibold"
                style={{ color: COFFEE.espresso, fontFamily: FONT.display }}
            >
                {item.name}
                {item.diet && (
                    <span
                        className="ml-2 rounded-full border px-1.5 py-px align-middle text-xs font-medium"
                        style={{ borderColor: `${COFFEE.espresso}66`, color: `${COFFEE.espresso}B3` }}
                        title={item.diet === "V" ? "Vegetarian" : "Vegetarian option"}
                    >
                        {item.diet}
                    </span>
                )}
            </h3>

            {item.note && (
                <p className="mt-1 text-sm" style={{ color: `${COFFEE.espresso}99` }}>
                    {item.note}
                </p>
            )}
            {item.description && (
                <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: `${COFFEE.espresso}B3` }}
                >
                    {item.description}
                </p>
            )}

            <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: COFFEE.caramel }}
            />
        </article>
    );
}