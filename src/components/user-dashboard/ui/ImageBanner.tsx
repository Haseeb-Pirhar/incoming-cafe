import Image from "next/image";

interface ImageBannerProps {
    src: string;
    alt: string;
    className?: string; // height classes
}

// Full-width image strip, hover par halka zoom.
export default function ImageBanner({
    src,
    alt,
    className = "h-48 sm:h-64",
}: ImageBannerProps) {
    return (
        <div className={`group relative w-full overflow-hidden ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover transition duration-1000 group-hover:scale-105"
            />
        </div>
    );
}