import { Variants } from "framer-motion";

export const ACCENT = {
  plum: "#3A1150",
  plumSoft: "#5B2B7A",
  marigold: "#FFB627",
  coral: "#FF6B4A",
  teal: "#0FA398",
  paper: "#FFF4E6",
  ink: "#241C1C",
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.94, rotate: -1.5 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.18 } },
};
