// PLACEHOLDER REVIEWS. Launch se pehle inhe cafe ke REAL reviews se badlo
// (Google Maps se, customer ke naam ke saath, permission lekar).
// Naqli reviews live site par mat chhodna.

export interface Review {
    name: string;
    text: string;
    rating: 1 | 2 | 3 | 4 | 5;
}

export const REVIEWS: Review[] = [
    {
        name: "Customer one",
        text: "Placeholder: write a real review about the coffee here.",
        rating: 5,
    },
    {
        name: "Customer two",
        text: "Placeholder: write a real review about the food here.",
        rating: 5,
    },
    {
        name: "Customer three",
        text: "Placeholder: write a real review about the cafe vibe here.",
        rating: 5,
    },
    {
        name: "Customer four",
        text: "Placeholder: write a real review about the service here.",
        rating: 5,
    },
    {
        name: "Customer five",
        text: "Placeholder: write a real review about the drinks here.",
        rating: 5,
    },
];