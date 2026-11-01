import { formatPrice, type MenuItem } from "@/constants/menu";
import { ACCENT, FONT } from "../theme";

interface MenuCardProps {
    item: MenuItem;
    categoryLabel?: string;
}

// Offset shadow + hover par uthta aur halka tilt hota card.
export default function MenuCard({ item, categoryLabel }: MenuCardProps) {
    return (
        <article
            className="group relative flex h-full flex-col rounded-3xl p-6 transition duration-300 ease-out shadow-[6px_8px_0_#2F6F73] hover:-translate-y-2 hover:-rotate-1 hover:shadow-[10px_14px_0_#2F6F73]"
            style={{ backgroundColor: ACCENT.card, border: `3px solid ${ACCENT.ink}` }}
        >
            <div className="flex items-start justify-between gap-3">
                {categoryLabel && (
                    <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ backgroundColor: `${ACCENT.teal}1F`, color: ACCENT.tealDark }}
                    >
                        {categoryLabel}
                    </span>
                )}
                <span
                    className="rounded-full px-3 py-1 text-sm font-semibold text-white transition group-hover:scale-110"
                    style={{ backgroundColor: ACCENT.timber }}
                >
                    {formatPrice(item.price, item.extra)}
                </span>
            </div>

            <h3
                className="mt-5 text-2xl font-semibold"
                style={{ color: ACCENT.ink, fontFamily: FONT.display }}
            >
                {item.name}
                {item.diet && (
                    <span
                        className="ml-2 rounded-full border px-1.5 py-px align-middle text-xs font-medium"
                        style={{ borderColor: `${ACCENT.ink}66`, color: `${ACCENT.ink}B3` }}
                        title={item.diet === "V" ? "Vegetarian" : "Vegetarian option"}
                    >
                        {item.diet}
                    </span>
                )}
            </h3>

            {item.note && (
                <p className="mt-1 text-sm" style={{ color: `${ACCENT.ink}99` }}>
                    {item.note}
                </p>
            )}
            {item.description && (
                <p className="mt-3 text-sm leading-relaxed" style={{ color: `${ACCENT.ink}B3` }}>
                    {item.description}
                </p>
            )}
        </article>
    );
}