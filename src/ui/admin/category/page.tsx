"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Category } from "@/types/category";
import { deleteCategory, getAllCategories } from "@/api/api-call/category";
import CategoryFormDialog from "./category-form";
import CategoryList from "./category-list";

/** Decorative barcode with a scanning beam sweeping across it — the page's
 * signature moment, reinforcing "cataloguing inventory". */
const ScanningBarcode = () => {
  const bars = [
    3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 2, 1, 1, 2, 3, 1, 4, 1, 2, 1,
  ];
  return (
    <div className="relative flex items-end gap-[2px] h-8 overflow-hidden rounded-sm px-1">
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-[#14213D]/70"
          style={{ width: `${w}px`, height: `${8 + (w % 3) * 6}px` }}
        />
      ))}
      <span className="shop-scan pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-transparent via-[#FF6B35]/70 to-transparent" />
    </div>
  );
};

const CategoryAdminPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await getAllCategories();
    if (res) setCategories(Array.isArray(res) ? res : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreated = (category: Category) => {
    setCategories((prev) => [category, ...prev]);
  };

  const handleUpdated = (updated: Category) => {
    setCategories((prev) =>
      prev.map((c) =>
        c._id?.toString() === updated._id?.toString() ? updated : c,
      ),
    );
  };

  const handleDelete = async (id: string) => {
    const res = await deleteCategory(id);
    if (!res) {
      toast.error("Failed to delete category");
      return;
    }
    toast.success("Category deleted");
    setCategories((prev) => prev.filter((c) => c._id?.toString() !== id));
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F8F6F1 0%, #EFEBE2 100%)",
      }}
    >
      {/* soft ambient depth — porcelain shelf glow, not neon */}
      <div
        className="shop-orb pointer-events-none absolute -top-28 -right-16 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "#FF6B35", opacity: 0.1 }}
      />
      <div
        className="shop-orb pointer-events-none absolute top-1/3 -left-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "#14213D", opacity: 0.06, animationDelay: "4s" }}
      />

      {/* faint inventory-grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(#14213D08 1px, transparent 1px), linear-gradient(90deg, #14213D08 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 pt-8 pb-16">
        <div className="shop-rise-in flex items-center justify-between mb-6">
          <ScanningBarcode />
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#14213D]/40"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Catalog / Categories
          </span>
        </div>

        <div
          className="flex justify-between items-end mb-8 shop-rise-in"
          style={{ animationDelay: "70ms" }}
        >
          <div>
            <h1
              className="text-3xl font-semibold text-[#14213D]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Categories
            </h1>
            <p
              className="text-sm text-[#14213D]/45 mt-1.5"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Organize your storefront into browsable groups
            </p>
          </div>
          <CategoryFormDialog mode="create" onSaved={handleCreated} />
        </div>

        <CategoryList
          categories={categories}
          loading={loading}
          onDelete={handleDelete}
          onUpdated={handleUpdated}
        />
      </div>
    </div>
  );
};

export default CategoryAdminPage;
