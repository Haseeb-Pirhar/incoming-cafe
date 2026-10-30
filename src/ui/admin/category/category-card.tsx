"use client";
import React from "react";
import { Trash, ImageOff, CornerDownRight } from "lucide-react";
import { Category } from "@/types/category";
import CategoryFormDialog from "./category-form";

interface CategoryCardProps {
  category: Category;
  onDelete: (id: string) => void;
  onUpdated: (category: Category) => void;
}

/** A badge shaped like a retail price tag: rounded corner, punched hole
 * with a loop of "string", hanging at a slight tilt over the card corner. */
const PriceTagBadge = ({ id }: { id: string }) => (
  <div
    className="shop-tag-pop shop-tag-swing absolute -top-3 -left-3 z-10 cursor-default"
    style={{ transform: "rotate(-3deg)" }}
  >
    <div className="relative">
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        className="absolute -top-2 left-3"
      >
        <path
          d="M1 9 Q1 1 9 1"
          fill="none"
          stroke="#14213D"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
      <div
        className="relative flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-r-md rounded-l-sm shadow-md border border-white/40"
        style={{ background: "#14213D" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#F8F6F1]/80 shrink-0" />
        <span
          className="text-[10px] text-[#F8F6F1] tracking-wide"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          SKU-{id}
        </span>
      </div>
    </div>
  </div>
);

const CategoryCard = ({ category, onDelete, onUpdated }: CategoryCardProps) => {
  const shortId = category._id?.toString().slice(-6).toUpperCase();
  const isActive = category.isActive ?? true;
  const parentName =
    typeof category.parent === "object" && category.parent
      ? category.parent.name
      : undefined;

  return (
    <div className="group relative flex gap-4 bg-white rounded-xl p-4 pl-5 shadow-sm border border-[#14213D]/10 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-[#14213D]/20">
      {/* status stripe */}
      <span
        className={`absolute left-0 top-0 h-full w-1.5 transition-colors ${
          isActive ? "bg-[#0F9D6C]" : "bg-[#B3261E]"
        }`}
      />

      {shortId && <PriceTagBadge id={shortId} />}

      <div className="shrink-0 h-20 w-20 rounded-lg overflow-hidden border border-[#14213D]/10 bg-[#F8F6F1] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImageOff size={22} className="text-[#14213D]/25" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className="text-base font-semibold text-[#14213D]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {category.name}
          </h3>

          {parentName && (
            <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-[#14213D]/60 border border-[#14213D]/15 bg-[#F8F6F1]">
              <CornerDownRight size={11} />
              {parentName}
            </span>
          )}

          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium text-white shadow-sm transition-colors flex items-center gap-1 ${
              isActive ? "bg-[#0F9D6C]" : "bg-[#B3261E]"
            }`}
          >
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full bg-white/85 ${isActive ? "animate-pulse" : ""}`}
            />
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {typeof category.sortOrder === "number" && (
          <p
            className="text-xs text-[#14213D]/40 mt-1"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Sort: {category.sortOrder}
          </p>
        )}

        {category.description && (
          <p
            className="text-xs text-[#14213D]/45 mt-1 line-clamp-2"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            {category.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
        <CategoryFormDialog
          mode="edit"
          category={category}
          onSaved={onUpdated}
        />
        <button
          onClick={() => category._id && onDelete(category._id.toString())}
          className="p-2 rounded-full bg-[#B3261E] hover:bg-[#96201a] hover:scale-105 active:scale-95 transition shadow-sm cursor-pointer"
        >
          <Trash size={16} color="#F8F6F1" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
