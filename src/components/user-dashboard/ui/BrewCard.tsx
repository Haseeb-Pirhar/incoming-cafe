"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { COFFEE, FONT } from "../theme";

interface BrewCardProps {
    title: string;
    description: string;
    price: string;
    image: { src: string; alt: string };
}

// Image card: hover par uthta hai, image zoom hoti hai, heart toggle hota hai.
// Heart sirf visual toggle hai (save nahi hota).
export default function BrewCard({ title, description, price, image }: BrewCardProps) {
    const [liked, setLiked] = useState(false);

    return (
        <article className="group flex h-full flex-col">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-md transition duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                />

                <button
                    type="button"
                    onClick={() => setLiked((l) => !l)}
                    aria-pressed={liked}
                    aria-label={liked ? `Unfavourite ${title}` : `Favourite ${title}`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur transition hover:scale-110 active:scale-90"
                >
                    <Heart
                        size={18}
                        fill={liked ? "#B3261E" : "none"}
                        color={liked ? "#B3261E" : COFFEE.espresso}
                    />
                </button>

                <span
                    className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-sm font-semibold text-white"
                    style={{ backgroundColor: COFFEE.espresso }}
                >
                    {price}
                </span>
            </div>

            <h3
                className="mt-4 text-xl font-semibold"
                style={{ color: COFFEE.espresso, fontFamily: FONT.display }}
            >
                {title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: `${COFFEE.espresso}B3` }}>
                {description}
            </p>
        </article>
    );
}