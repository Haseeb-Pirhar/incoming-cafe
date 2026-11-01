// Home page content. Images/text yahan badlo, components me nahi.
// Signature brews ka naam aur price constants/menu.ts se aata hai (menuId se).

export const HOME_CATEGORIES = [
    { key: "coffee", label: "Hot coffee" },
    { key: "iced", label: "Iced drinks" },
    { key: "not-coffee", label: "Not coffee" },
    { key: "food", label: "Food" },
] as const;

export const SIGNATURE_BREWS = [
    {
        menuId: "c2",
        blurb: "Our smooth milk coffee, made fresh on the machine.",
        image: {
            src: "/images/gallery/latte-art.jpg",
            alt: "A cup of coffee on a timber table",
        },
    },
    {
        menuId: "i5",
        blurb: "Iced matcha, cold and creamy. Full cream or soy.",
        image: { src: "/images/gallery/matcha.jpg", alt: "Iced matcha latte" },
    },
    {
        menuId: "f2",
        blurb: "Warm banana bread, toasted with butter.",
        image: {
            src: "/images/gallery/banana-bread.jpg",
            alt: "Toasted banana bread with butter",
        },
    },
    {
        menuId: "f6",
        blurb: "Smoked ham, cheese, tomato and pesto, toasted to order.",
        image: { src: "/images/gallery/toast.jpg", alt: "Toasted sandwich cut in half" },
    },
] as const;

// Premium band. Abhi gallery ki photos laga di hain taake sab chale;
// apni beans / cafe ki photos /public/images/home/ me rakh ke yahan paths badal do.
export const PREMIUM = {
    title: "Taste our single origin coffee",
    text: "Espresso, black and batch brew, all single origin. Ask at the counter what is pouring today.",
    cta: { label: "Explore", href: "/dashboard/menu" },
    top: { src: "/images/gallery/cafe.jpg", alt: "Inside Incoming Cafe" },
    bottom: { src: "/images/gallery/latte-art.jpg", alt: "A cup of coffee on a timber table" },
    left: { src: "/images/gallery/matcha.jpg", alt: "Iced matcha latte" },
    right: { src: "/images/gallery/banana-bread.jpg", alt: "Toasted banana bread with butter" },
} as const;