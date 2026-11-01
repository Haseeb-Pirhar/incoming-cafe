"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Coffee, CupSoda, Leaf, Sandwich } from "lucide-react";
import { ACCENT } from "../theme";

interface FloatingBackgroundProps {
    tone?: "light" | "dark";
    icons?: boolean;
}

const ICONS = [
    { Icon: Coffee, top: "12%", left: "6%", size: 44 },
    { Icon: Sandwich, top: "68%", left: "10%", size: 38 },
    { Icon: CupSoda, top: "18%", left: "88%", size: 40 },
    { Icon: Leaf, top: "74%", left: "84%", size: 34 },
    { Icon: Coffee, top: "46%", left: "48%", size: 30 },
];

// Section ke peeche halka animated background. Parent ko "relative overflow-hidden" chahiye.
export default function FloatingBackground({
    tone = "light",
    icons = true,
}: FloatingBackgroundProps) {
    const reduce = useReducedMotion();
    const iconColor = tone === "light" ? `${ACCENT.teal}1F` : "rgba(255,255,255,0.10)";
    const blobA = tone === "light" ? `${ACCENT.teal}26` : "rgba(255,255,255,0.08)";
    const blobB = tone === "light" ? `${ACCENT.timber}33` : `${ACCENT.timber}33`;

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl"
                style={{ backgroundColor: blobA }}
                animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl"
                style={{ backgroundColor: blobB }}
                animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            {icons &&
                ICONS.map(({ Icon, top, left, size }, i) => (
                    <motion.span
                        key={i}
                        className="absolute"
                        style={{ top, left, color: iconColor }}
                        animate={reduce ? undefined : { y: [0, -18, 0], rotate: [-8, 8, -8] }}
                        transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Icon size={size} />
                    </motion.span>
                ))}
        </div>
    );
}