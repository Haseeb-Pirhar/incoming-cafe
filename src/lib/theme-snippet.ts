// Optional: extract this out of Dashboard.tsx into a shared file
// (e.g. @/lib/theme.ts) so splash-product-card.tsx, the dashboard,
// and any future section all import the SAME palette instead of
// each redeclaring it. splash-product-card.tsx below redeclares it
// locally for now so it drops in without touching your dashboard file.

export const ACCENT = {
  plum: "#3A1150",
  plumSoft: "#5B2B7A",
  marigold: "#FFB627",
  coral: "#FF6B4A",
  teal: "#0FA398",
  paper: "#FFF4E6",
  ink: "#241C1C",
};
