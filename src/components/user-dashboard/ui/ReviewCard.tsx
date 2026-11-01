import { Star } from "lucide-react";
import type { Review } from "@/constants/reviews";
import { COFFEE, FONT } from "../theme";

// Ek review card. Marquee me fixed width rehti hai.
export default function ReviewCard({ review }: { review: Review }) {
    return (
        <figure
            className="flex h-full w-72 shrink-0 flex-col rounded-3xl p-6 shadow-md sm:w-80"
            style={{
                backgroundColor: COFFEE.sand,
                border: `1px solid ${COFFEE.espresso}1A`,
            }}
        >
            <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        size={18}
                        aria-hidden
                        fill={i < review.rating ? COFFEE.caramel : "none"}
                        color={COFFEE.caramel}
                    />
                ))}
            </div>

            <blockquote
                className="mt-4 flex-1 text-sm leading-relaxed"
                style={{ color: `${COFFEE.espresso}CC` }}
            >
                {review.text}
            </blockquote>

            <figcaption className="mt-5 flex items-center gap-3">
                <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-base font-semibold text-white"
                    style={{ backgroundColor: COFFEE.espresso, fontFamily: FONT.display }}
                    aria-hidden
                >
                    {review.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-semibold" style={{ color: COFFEE.espresso }}>
                    {review.name}
                </span>
            </figcaption>
        </figure>
    );
}