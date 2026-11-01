"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface BannerBirdProps {
    width?: number;
}

// Banner ke right side ka tairta hua bird.
export default function BannerBird({ width = 170 }: BannerBirdProps) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, x: 40, rotate: 8 }}
            animate={
                reduce
                    ? { opacity: 1 }
                    : { opacity: 1, x: 0, rotate: [-4, 4, -4], y: [0, -14, 0] }
            }
            transition={{
                opacity: { duration: 0.6, delay: 0.3 },
                x: { type: "spring", stiffness: 90, damping: 14, delay: 0.3 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
        >
            <Image
                src="/logo-white.png"
                alt=""
                width={width}
                height={Math.round(width * (908 / 800))}
                className="drop-shadow-2xl"
            />
        </motion.div>
    );
}