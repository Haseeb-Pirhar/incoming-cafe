// Single source of truth for cafe content. Edit text here, not inside components.

export const CAFE = {
  name: "Incoming Cafe",
  tagline: "Coffee and a bite on Hunter Street",
  intro:
    "Incoming Cafe is a small, friendly spot in Parramatta serving coffee, fresh drinks and light bites.",
  address: {
    line1: "24 Hunter Street",
    line2: "Parramatta NSW",
    plusCode: "52M2+V6 Parramatta, New South Wales, Australia",
    plusCodeUrl:
      "https://www.google.com/maps/search/?api=1&query=52M2%2BV6+Parramatta+New+South+Wales+Australia",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Incoming+Cafe+24+Hunter+Street+Parramatta",
  },
  // Google listing ke hisaab se. Opening se pehle ek baar owner se confirm kar lena.
  hours: [
    { days: "Monday", time: "Closed" },
    { days: "Tuesday", time: "6am to 2:30pm" },
    { days: "Wednesday", time: "6am to 2:30pm" },
    { days: "Thursday", time: "6am to 2:30pm" },
    { days: "Friday", time: "6am to 2:30pm" },
    { days: "Saturday", time: "Closed" },
    { days: "Sunday", time: "Closed" },
  ] as { days: string; time: string }[],
  price: "$1 to $20 per person",
  priceBands: "$20 to $40 two people, $40 to $60 four people, $60 to $80 six people".split(", "),
  // Add phone / email / instagram when you have them (used in Footer + Contact page)
  instagram: {
    handle: "@incomingcafe",
    url: "https://www.instagram.com/incomingcafe/",
  },
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