"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import Reveal from "../ui/Reveal";
import ReviewCard from "../ui/ReviewCard";
import { REVIEWS } from "@/constants/reviews";
import { COFFEE } from "../theme";

const FADE =
    "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)";

// Hamesha chalne wali review strip. "Reduce motion" par normal scrollable row ban jati hai.
export default function ReviewsMarquee() {
    const reduce = useReducedMotion();
    const items = reduce ? REVIEWS : [...REVIEWS, ...REVIEWS];

    return (
        <section style={{ backgroundColor: COFFEE.cream }}>
            <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
                <Reveal>
                    <SectionHeading
                        align="center"
                        title="What our guests say"
                        description="Kind words from the people who drop in."
                    />
                </Reveal>
            </div>

            <div
                className={`py-10 pb-16 ${reduce ? "overflow-x-auto" : "overflow-hidden"}`}
                style={reduce ? undefined : { maskImage: FADE, WebkitMaskImage: FADE }}
            >
                <motion.ul
                    className="flex w-max"
                    animate={reduce ? undefined : { x: ["0%", "-50%"] }}
                    transition={{
                        duration: REVIEWS.length * 8,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {items.map((r, i) => (
                        <li
                            key={`${r.name}-${i}`}
                            className="pr-5"
                            aria-hidden={i >= REVIEWS.length}
                        >
                            <ReviewCard review={r} />
                        </li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}