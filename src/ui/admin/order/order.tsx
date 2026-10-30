"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronDown,
  HiOutlineMapPin,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineInboxStack,
  HiOutlineUser,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { Order, OrderStatus } from "@/types/order";
import { useOrders } from "@/hook/useOrders";

const ACCENT = {
  plum: "#3A1150",
  marigold: "#FFB627",
  coral: "#FF6B4A",
  teal: "#0FA398",
  paper: "#FFF4E6",
  ink: "#241C1C",
};

const STATUS_META: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: "Pending", color: ACCENT.marigold },
  processing: { label: "Processing", color: "#3B82F6" },
  shipped: { label: "Shipped", color: ACCENT.teal },
  delivered: { label: "Delivered", color: "#22C55E" },
  cancelled: { label: "Cancelled", color: ACCENT.coral },
};

const FILTERS: { key: "all" | OrderStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

function whatsappLink(number?: string, orderId?: string) {
  if (!number) return "#";
  const digits = number.replace(/\D/g, "");
  const text = encodeURIComponent(
    `Hi! Regarding your order${orderId ? ` #${orderId.slice(-6).toUpperCase()}` : ""} on happyLife.`,
  );
  return `https://wa.me/${digits}?text=${text}`;
}

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function OrderCard({
  order,
  onUpdateStatus,
  updating,
}: {
  order: Order;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  updating: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const meta = STATUS_META[order.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden rounded-2xl border-2 bg-white"
      style={{ borderColor: ACCENT.ink }}
    >
      {/* Row header */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full flex-wrap items-center gap-2.5 px-3.5 py-3 text-left sm:gap-3 sm:px-4"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2"
          style={{
            borderColor: ACCENT.ink,
            backgroundColor:
              order.source === "guest"
                ? `${ACCENT.marigold}33`
                : `${ACCENT.teal}22`,
          }}
        >
          {order.source === "guest" ? (
            <HiOutlineUser className="text-sm" style={{ color: ACCENT.plum }} />
          ) : (
            <HiOutlineShoppingBag
              className="text-sm"
              style={{ color: ACCENT.teal }}
            />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p
              className="truncate text-sm font-bold"
              style={{ color: ACCENT.ink }}
            >
              {order.customerName || "Unnamed customer"}
            </p>
            <span
              className="rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
              style={{
                backgroundColor: `${ACCENT.plum}12`,
                color: ACCENT.plum,
              }}
            >
              {order.source}
            </span>
          </div>
          <p className="text-[11px] text-[#241C1C]/50">
            #{order._id.slice(-6).toUpperCase()} · {timeAgo(order.createdAt)} ·{" "}
            {order.items.length} item{order.items.length === 1 ? "" : "s"}
          </p>
        </div>

        <span
          className="shrink-0 rounded-full border-2 px-2.5 py-1 text-[10px] font-bold text-white"
          style={{ backgroundColor: meta.color, borderColor: ACCENT.ink }}
        >
          {meta.label}
        </span>

        <span
          className="shrink-0 text-sm font-extrabold"
          style={{
            color: ACCENT.plum,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Rs {order.totalAmount.toLocaleString()}
        </span>

        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          className="shrink-0"
        >
          <HiOutlineChevronDown style={{ color: ACCENT.plum }} />
        </motion.span>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t-2"
            style={{ borderColor: `${ACCENT.ink}1a` }}
          >
            <div className="space-y-3 px-3.5 py-3.5 sm:px-4">
              {/* Items */}
              <div className="space-y-1.5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-[#241C1C]/75">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-bold" style={{ color: ACCENT.plum }}>
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact + address + note */}
              <div className="flex flex-wrap gap-2 text-xs text-[#241C1C]/60">
                {order.whatsapp && (
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineChatBubbleLeftRight className="text-sm" />
                    {order.whatsapp}
                  </span>
                )}
                {order.shippingAddress && (
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineMapPin className="text-sm" />
                    {order.shippingAddress}
                  </span>
                )}
              </div>
              {order.note && (
                <div
                  className="flex items-start gap-1.5 rounded-xl border-2 px-3 py-2 text-xs text-[#241C1C]/70"
                  style={{
                    borderColor: `${ACCENT.ink}1a`,
                    backgroundColor: `${ACCENT.marigold}0d`,
                  }}
                >
                  <HiOutlineChatBubbleBottomCenterText
                    className="mt-0.5 shrink-0 text-sm"
                    style={{ color: ACCENT.coral }}
                  />
                  {order.note}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {order.whatsapp && (
                  <a
                    href={whatsappLink(order.whatsapp, order._id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-bold text-white"
                    style={{
                      backgroundColor: "#25D366",
                      borderColor: ACCENT.ink,
                    }}
                  >
                    <HiOutlineChatBubbleLeftRight />
                    Chat on WhatsApp
                  </a>
                )}

                <select
                  value={order.status}
                  disabled={updating}
                  onChange={(e) =>
                    onUpdateStatus(order._id, e.target.value as OrderStatus)
                  }
                  className="rounded-full border-2 px-3 py-1.5 text-xs font-bold outline-none disabled:opacity-50"
                  style={{ borderColor: ACCENT.ink, color: ACCENT.plum }}
                >
                  {Object.entries(STATUS_META).map(([key, m]) => (
                    <option key={key} value={key}>
                      {m.label}
                    </option>
                  ))}
                </select>

                {updating && (
                  <span className="text-[11px] text-[#241C1C]/40">
                    Updating…
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AdminOrders() {
  const {
    orders,
    counts,
    loading,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    updateStatus,
    updatingId,
    refresh,
  } = useOrders();

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: ACCENT.paper,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap");
      `}</style>

      <div className="mx-auto max-w-5xl px-3 py-5 sm:px-6 sm:py-8">
        {/* Header */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1
              className="text-xl font-extrabold sm:text-2xl"
              style={{
                color: ACCENT.plum,
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              Orders
            </h1>
            <p className="text-xs text-[#241C1C]/50">
              {loading ? "Loading…" : `${counts.all} total`}
            </p>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-xs font-bold"
            style={{
              borderColor: ACCENT.ink,
              color: ACCENT.plum,
              backgroundColor: "white",
            }}
          >
            <HiOutlineArrowPath />
            Refresh
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3.5">
          <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#241C1C]/40" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, WhatsApp, order id, or product…"
            className="w-full rounded-full border-2 bg-white py-2.5 pl-10 pr-3.5 text-sm outline-none"
            style={{ borderColor: `${ACCENT.ink}33` }}
          />
        </div>

        {/* Status filter chips */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => {
            const active = statusFilter === f.key;
            const count = f.key === "all" ? counts.all : counts[f.key];
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setStatusFilter(f.key)}
                className="flex shrink-0 items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-xs font-bold"
                style={{
                  backgroundColor: active ? ACCENT.plum : "white",
                  borderColor: ACCENT.ink,
                  color: active ? "white" : ACCENT.ink,
                }}
              >
                {f.label}
                <span
                  className="rounded-full px-1.5 text-[10px]"
                  style={{
                    backgroundColor: active
                      ? "rgba(255,255,255,0.2)"
                      : `${ACCENT.ink}0d`,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-2xl bg-[#3A1150]/8"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-16 text-center"
            style={{ borderColor: `${ACCENT.plum}44` }}
          >
            <HiOutlineInboxStack
              className="mb-3 text-3xl"
              style={{ color: `${ACCENT.plum}44` }}
            />
            <p className="text-sm font-bold" style={{ color: ACCENT.plum }}>
              No orders found
            </p>
            <p className="mt-1 text-xs text-[#241C1C]/50">
              Try a different filter or search term
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <AnimatePresence>
              {orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onUpdateStatus={updateStatus}
                  updating={updatingId === order._id}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
