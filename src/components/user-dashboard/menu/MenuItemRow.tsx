import { formatPrice, type MenuItem } from "@/constants/menu";
import { FONT } from "../theme";

// One line of the menu board: name ........ price, description underneath.
export default function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li>
      <div className="flex items-baseline gap-3">
        <h3
          className="text-lg font-semibold text-white"
          style={{ fontFamily: FONT.display }}
        >
          {item.name}
          {item.note && (
            <span className="ml-1.5 text-sm font-normal text-white/60">
              ({item.note})
            </span>
          )}
          {item.diet && (
            <span
              className="ml-2 rounded-full border border-white/40 px-1.5 py-px align-middle text-xs font-medium text-white/80"
              title={item.diet === "V" ? "Vegetarian" : "Vegetarian option"}
            >
              {item.diet}
            </span>
          )}
        </h3>
        <span
          aria-hidden
          className="flex-1 -translate-y-1 border-b border-dotted border-white/30"
        />
        <span className="font-medium" style={{ color: "#E0B386" }}>
          {formatPrice(item.price, item.extra)}
        </span>
      </div>
      {item.description && (
        <p className="mt-1 text-sm leading-relaxed text-white/70">
          {item.description}
        </p>
      )}
    </li>
  );
}
