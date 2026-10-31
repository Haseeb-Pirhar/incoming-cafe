// Single source of truth for cafe content. Edit text here, not inside components.

export const CAFE = {
  name: "Incoming Cafe",
  tagline: "Coffee and a bite on Hunter Street",
  intro:
    "Incoming Cafe is a small, friendly spot in Parramatta serving coffee, fresh drinks and light bites.",
  address: {
    line1: "24 Hunter Street",
    line2: "Parramatta NSW",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Incoming+Cafe+24+Hunter+Street+Parramatta",
  },
  // Add real opening hours when you have them, e.g. { days: "Mon to Fri", time: "7am to 3pm" }
  hours: [] as { days: string; time: string }[],
  // Add phone / email / instagram when you have them (used in Footer + Contact page)
  phone: "",
  email: "",
};

export const NAV_LINKS = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/menu", label: "Menu" },
  { href: "/dashboard/about", label: "About" },
  { href: "/dashboard/contact", label: "Contact" },
];

// Placeholder copy: replace with the real menu categories from the cafe.
export const HIGHLIGHTS = [
  {
    key: "coffee",
    title: "Coffee",
    text: "Espresso drinks made fresh, hot or iced.",
  },
  {
    key: "drinks",
    title: "Fresh drinks",
    text: "Cold, refreshing drinks made to order.",
  },
  {
    key: "bites",
    title: "Light bites",
    text: "Toasties, pastries and fruity yoghurt cups.",
  },
] as const;
