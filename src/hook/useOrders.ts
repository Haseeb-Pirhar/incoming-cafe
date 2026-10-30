"use client";

import { useCallback, useEffect, useState } from "react";
import { Order, OrderStatus } from "@/types/order";
import { getAllOrdersAdmin, updateOrderStatusAdmin } from "@/api/api-call/order";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllOrdersAdmin();
      console.log("[useOrders] 🐛 raw response:", res);

      const anyRes = res as any;
      const list: Order[] = Array.isArray(anyRes)
        ? anyRes
        : Array.isArray(anyRes?.data)
          ? anyRes.data
          : Array.isArray(anyRes?.data?.data)
            ? anyRes.data.data
            : [];

      console.log(
        "[useOrders] 🐛 parsed list:",
        list,
        `(${list.length} orders)`,
      );
      setOrders(list);
    } catch (err) {
      console.error("[useOrders] ❌ fetch error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    setUpdatingId(id);
    const prevOrders = orders;
    // Optimistic update
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    try {
      const res = await updateOrderStatusAdmin(id, status);
      if (!res) {
        // rollback on failure
        setOrders(prevOrders);
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      return (
        o.customerName?.toLowerCase().includes(q) ||
        o.whatsapp?.toLowerCase().includes(q) ||
        o._id?.toLowerCase().includes(q) ||
        o.items?.some((i) => i.name?.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return {
    orders: filteredOrders,
    counts,
    loading,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    updateStatus,
    updatingId,
    refresh: fetchOrders,
  };
};
