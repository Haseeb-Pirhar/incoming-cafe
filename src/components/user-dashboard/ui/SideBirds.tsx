"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface SideBirdsProps {
    width?: number;
}

// Section ke dono sides par logo bird. Parent ko "relative" chahiye.
// Sirf badi screen par dikhta hai, aur click/screen reader ko disturb nahi karta.
const BIRDS = [
    { side: "left", top: "14%", flip: false, delay: 0 },
    { side: "right", top: "38%", flip: true, delay: 1 },
    { side: "left", top: "62%", flip: false, delay: 2 },
    { side: "right", top: "84%", flip: true, delay: 0.5 },
] as const;

export default function SideBirds({ width = 90 }: SideBirdsProps) {
    const reduce = useReducedMotion();
    const height = Math.round(width * (348 / 384));

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
            {BIRDS.map((b, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        top: b.top,
                        [b.side]: "1.5rem",
                        transform: b.flip ? "scaleX(-1)" : undefined,
                    }}
                    animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-4, 4, -4] }}
                    transition={{
                        duration: 5 + i,
                        delay: b.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Image
                        src="/logo-bird.png"
                        alt=""
                        width={width}
                        height={height}
                        className="opacity-90"
                    />
                </motion.div>
            ))}
        </div>
    );
}