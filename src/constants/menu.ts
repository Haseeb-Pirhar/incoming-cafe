// Real menu from the cafe board. Edit items here, not in components.
// Later, when the admin portal exists, this file can be swapped for an API call.

export type MenuCategoryKey =
  | "food"
  | "coffee"
  | "not-coffee"
  | "iced"
  | "addons";

export interface MenuItem {
  id: string;
  name: string;
  note?: string; // small text next to the name, e.g. "single origin"
  description?: string;
  price: number; // AUD
  category: MenuCategoryKey;
  diet?: "V" | "VO"; // V = vegetarian, VO = vegetarian option
  extra?: boolean; // shown as "+$0.50" (add ons)
}

export const MENU_CATEGORIES: { key: MenuCategoryKey; label: string }[] = [
  { key: "food", label: "Food" },
  { key: "coffee", label: "Coffee" },
  { key: "not-coffee", label: "Not coffee" },
  { key: "iced", label: "Iced drinks" },
  { key: "addons", label: "Add ons" },
];

export const MENU_ITEMS: MenuItem[] = [
  // Food
  {
    id: "f1",
    category: "food",
    name: "Sourdough toast",
    description: "Choice of jam, vegemite, peanut butter or cinnamon.",
    price: 3,
  },
  {
    id: "f2",
    category: "food",
    name: "Banana bread",
    description: "Toasted with butter.",
    price: 6,
  },
  {
    id: "f3",
    category: "food",
    name: "Brekkie wrap",
    diet: "VO",
    description: "Seared ham, egg, cheese, spinach, tomato, mayo.",
    price: 15,
  },
  {
    id: "f4",
    category: "food",
    name: "Caesar wrap",
    description: "Roast chicken, bacon, lettuce, tomato, ranch.",
    price: 15,
  },
  {
    id: "f5",
    category: "food",
    name: "Sesame chicken wrap",
    description: "Poached chicken, pickled carrot, slaw, sesame mayo.",
    price: 15,
  },
  {
    id: "f6",
    category: "food",
    name: "HCT toastie",
    diet: "VO",
    description: "Smoked ham, cheese, tomato, pesto.",
    price: 15,
  },
  {
    id: "f7",
    category: "food",
    name: "Mushroom toastie",
    diet: "V",
    description: "Herb mushrooms, cheese, pesto.",
    price: 15,
  },
  {
    id: "f8",
    category: "food",
    name: "Chicken toastie",
    description: "Roast chicken, spinach, pickled carrot, mayo.",
    price: 15,
  },

  // Coffee
  {
    id: "c1",
    category: "coffee",
    name: "Espresso",
    note: "single origin",
    price: 4,
  },
  { id: "c2", category: "coffee", name: "Milk", note: "blend", price: 4.5 },
  {
    id: "c3",
    category: "coffee",
    name: "Black",
    note: "single origin",
    price: 4.5,
  },
  {
    id: "c4",
    category: "coffee",
    name: "Batch brew",
    note: "single origin",
    price: 4.5,
  },

  // Not coffee
  { id: "n1", category: "not-coffee", name: "Matcha", price: 5 },
  { id: "n2", category: "not-coffee", name: "Choc / Chai", price: 5 },
  { id: "n3", category: "not-coffee", name: "Tea", price: 4.5 },

  // Iced drinks
  { id: "i1", category: "iced", name: "Latte", price: 6.5 },
  {
    id: "i2",
    category: "iced",
    name: "Black",
    note: "single origin",
    price: 6.5,
  },
  { id: "i3", category: "iced", name: "Vietnamese coffee", price: 6 },
  {
    id: "i4",
    category: "iced",
    name: "Cold brew",
    note: "single origin",
    price: 7,
  },
  {
    id: "i5",
    category: "iced",
    name: "Matcha",
    note: "full cream or soy",
    price: 7.5,
  },
  { id: "i6", category: "iced", name: "Choc / Chai", price: 7 },

  // Add ons
  {
    id: "a1",
    category: "addons",
    name: "Large",
    note: "hot drinks only",
    price: 0.5,
    extra: true,
  },
  { id: "a2", category: "addons", name: "Extra shot", price: 0.5, extra: true },
  {
    id: "a3",
    category: "addons",
    name: "Alternative milk",
    description: "Soy, almond or oat.",
    price: 0.8,
    extra: true,
  },
];

export const formatPrice = (price: number, extra = false) =>
  `${extra ? "+" : ""}$${price.toFixed(2)}`;
