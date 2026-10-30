"use client";
import React from "react";
import { PackageOpen } from "lucide-react";
import Loader from "@/components/ui/loader";
import { Category } from "@/types/category";
import CategoryCard from "./category-card";

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
  onDelete: (id: string) => void;
  onUpdated: (category: Category) => void;
}

const CategoryList = ({
  categories,
  loading,
  onDelete,
  onUpdated,
}: CategoryListProps) => {
  if (loading) return <Loader label="categories" />;

  if (categories.length === 0) {
    return (
      <div className="shop-rise-in text-center h-48 rounded-2xl border-2 border-dashed border-[#14213D]/15 bg-white/50 flex flex-col items-center justify-center gap-2">
        <span className="shop-box-bounce inline-block text-[#14213D]/25">
          <PackageOpen size={34} />
        </span>
        <p
          className="text-[#14213D]/45 text-sm"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          No categories yet — add your first one
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {categories.map((category, idx) => (
        <div
          key={category._id?.toString()}
          className="shop-rise-in"
          style={{ animationDelay: `${Math.min(idx * 60, 480)}ms` }}
        >
          <CategoryCard
            category={category}
            onDelete={onDelete}
            onUpdated={onUpdated}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
