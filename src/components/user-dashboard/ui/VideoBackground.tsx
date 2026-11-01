"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface VideoBackgroundProps {
    src: string;
    webm?: string;
    poster?: string;
    overlay?: string; // CSS background (gradient / color)
    className?: string;
}

// Loop me auto chalne wali background video. "Reduce motion" par sirf poster dikhata hai.
export default function VideoBackground({
    src,
    webm,
    poster,
    overlay = "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)",
    className = "",
}: VideoBackgroundProps) {
    const ref = useRef<HTMLVideoElement>(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        const v = ref.current;
        if (!v) return;
        v.muted = true; // autoplay ke liye browsers muted mangte hain
        v.play().catch(() => { });
    }, [reduce]);

    return (
        <div aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
            {reduce ? (
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: poster ? `url(${poster})` : undefined }}
                />
            ) : (
                <video
                    ref={ref}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster={poster}
                >
                    {webm && <source src={webm} type="video/webm" />}
                    <source src={src} type="video/mp4" />
                </video>
            )}
            <div className="absolute inset-0" style={{ background: overlay }} />
        </div>
    );
}