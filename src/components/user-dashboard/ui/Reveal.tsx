"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}

// Scroll par ek baar fade + slide in. delay se stagger banta hai.
export default function Reveal({
    children,
    delay = 0,
    y = 28,
    className,
}: RevealProps) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}