import Image from "next/image";
import Reveal from "./Reveal";
import { FONT } from "../theme";

interface PageBannerProps {
    title: string;
    description?: string;
    image: { src: string; alt: string };
}

// Inner pages (Menu, About, Contact) ke liye image header.
export default function PageBanner({ title, description, image }: PageBannerProps) {
    return (
        <section className="relative isolate overflow-hidden">
            <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />
            <div
                aria-hidden
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(24,14,8,0.82) 0%, rgba(24,14,8,0.5) 60%, rgba(24,14,8,0.3) 100%)",
                }}
            />
            <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
                <Reveal>
                    <h1
                        className="text-5xl text-white drop-shadow-lg sm:text-6xl"
                        style={{ fontFamily: FONT.display }}
                    >
                        {title}
                    </h1>
                </Reveal>
                {description && (
                    <Reveal delay={0.12}>
                        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
                            {description}
                        </p>
                    </Reveal>
                )}
            </div>
        </section>
    );
}