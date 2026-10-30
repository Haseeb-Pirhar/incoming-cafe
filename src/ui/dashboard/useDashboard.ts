"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllProducts } from "@/api/api-call/product-api";
import { getAllCategories } from "@/api/api-call/category";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

export const useDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Search debounce (300ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  // Category change → page 1
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  // ── Categories fetch — same pattern as useProduct.ts, with debug logs ──
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await getAllCategories();
        // 🐛 DEBUG — check this in your browser console.
        // If "raw response" is undefined/null/empty, the problem is in
        // category.ts (getAllCategories) or the API itself.
        // If "raw response" looks fine but "parsed list" is [], the
        // problem is in the shape-detection below — tell me what shape
        // "raw response" actually has and I'll fix the parsing.
        console.log("[useDashboard] 🐛 categories raw response:", res);

        const list: Category[] = Array.isArray(res)
          ? res
          : Array.isArray((res as any)?.data)
            ? (res as any).data
            : [];

        console.log(
          "[useDashboard] 🐛 categories parsed list:",
          list,
          `(${list.length} items)`,
        );

        setCategories(list);
      } catch (err) {
        console.error("[useDashboard] ❌ categories fetch error:", err);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // 🐛 DEBUG — log whenever categories state actually changes/settles.
  useEffect(() => {
    console.log(
      "[useDashboard] 🐛 categories state updated:",
      categories,
      `loading=${categoriesLoading}`,
    );
  }, [categories, categoriesLoading]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllProducts({
        page,
        limit: 30,
        search: debouncedSearch.trim() || undefined,
        category:
          selectedCategory && selectedCategory !== "all"
            ? selectedCategory
            : undefined,
      });

      console.log("[useDashboard] 🐛 products raw response:", res);

      if (!res) {
        setProducts([]);
        setTotalPages(1);
        return;
      }

      // Response shapes: { data: Product[], pagination } | Product[] | nested
      const anyRes = res as any;
      const list: Product[] = Array.isArray(anyRes)
        ? anyRes
        : Array.isArray(anyRes?.data)
          ? anyRes.data
          : Array.isArray(anyRes?.data?.data)
            ? anyRes.data.data
            : [];

      console.log(
        "[useDashboard] 🐛 products parsed list:",
        list,
        `(${list.length} items)`,
      );

      setProducts(list);

      const pages =
        anyRes?.pagination?.pages ?? anyRes?.data?.pagination?.pages ?? 1;
      setTotalPages(Number(pages) || 1);
    } catch (e) {
      console.error("[useDashboard] ❌ products fetch error:", e);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    allProductsCount: products.length,
    categories,
    loading,
    categoriesLoading,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    page,
    setPage,
    totalPages,
    sidebarOpen,
    setSidebarOpen,
    refresh: fetchProducts,
  };
};
