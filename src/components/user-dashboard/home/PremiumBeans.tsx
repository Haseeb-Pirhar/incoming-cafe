import Image from "next/image";
import Reveal from "../ui/Reveal";
import ImageBanner from "../ui/ImageBanner";
import LinkButton from "../LinkButton";
import { PREMIUM } from "@/constants/home";
import { COFFEE, FONT } from "../theme";

function SideImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div
            className="relative mx-auto hidden aspect-square w-full max-w-[200px] overflow-hidden rounded-full transition duration-500 hover:rotate-3 hover:scale-105 md:block"
            style={{ boxShadow: `8px 10px 0 ${COFFEE.caramel}` }}
        >
            <Image src={src} alt={alt} fill sizes="200px" className="object-cover" />
        </div>
    );
}

export default function PremiumBeans() {
    return (
        <section style={{ backgroundColor: COFFEE.cream }}>
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
                <Reveal>
                    <div className="overflow-hidden rounded-3xl shadow-2xl">
                        <ImageBanner src={PREMIUM.top.src} alt={PREMIUM.top.alt} />

                        <div
                            className="grid items-center gap-8 px-6 py-12 text-center md:grid-cols-[1fr_1.3fr_1fr]"
                            style={{ backgroundColor: COFFEE.band }}
                        >
                            <SideImage src={PREMIUM.left.src} alt={PREMIUM.left.alt} />

                            <div>
                                <h2
                                    className="text-3xl font-semibold sm:text-4xl"
                                    style={{ color: COFFEE.espresso, fontFamily: FONT.display }}
                                >
                                    {PREMIUM.title}
                                </h2>
                                <p
                                    className="mx-auto mt-3 max-w-md text-base leading-relaxed"
                                    style={{ color: `${COFFEE.espresso}CC` }}
                                >
                                    {PREMIUM.text}
                                </p>
                                <div className="mt-6">
                                    <LinkButton href={PREMIUM.cta.href} variant="dark">
                                        {PREMIUM.cta.label}
                                    </LinkButton>
                                </div>
                            </div>

                            <SideImage src={PREMIUM.right.src} alt={PREMIUM.right.alt} />
                        </div>

                        <ImageBanner src={PREMIUM.bottom.src} alt={PREMIUM.bottom.alt} />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}