// About page content. Replace the story with the owner's real words when you have them.

export const ABOUT = {
    title: "About us",
    intro: "A small cafe on Hunter Street in Parramatta.",
    storyTitle: "Our story",
    story: [
        "Incoming Cafe is a small cafe at 24 Hunter Street in Parramatta. We serve coffee, a short food menu and cold drinks.",
        "We keep things simple: good coffee, wraps and toasties made to order, and a relaxed spot to sit down.",
    ],
    image: {
        src: "/images/gallery/cafe.jpg",
        alt: "Inside Incoming Cafe, with timber tables and chairs",
    },
    valuesTitle: "What you will find here",
    values: [
        {
            key: "coffee",
            title: "Good coffee",
            text: "Single origin espresso, black and batch brew, plus a milk blend and cold brew.",
        },
        {
            key: "food",
            title: "Simple food",
            text: "Wraps, toasties, sourdough toast and banana bread.",
        },
        {
            key: "options",
            title: "Options for everyone",
            text: "Vegetarian choices and soy, almond or oat milk on request.",
        },
    ],
} as const;