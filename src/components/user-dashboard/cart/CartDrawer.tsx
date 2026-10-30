"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineXMark,
  HiOutlineTrash,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineShoppingBag,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { useCart } from "./CartContext";
import { createGuestOrder } from "@/api/api-call/order";

const ACCENT = {
  plum: "#3A1150",
  marigold: "#FFB627",
  coral: "#FF6B4A",
  teal: "#0FA398",
  paper: "#FFF4E6",
  ink: "#241C1C",
};

type View = "cart" | "checkout" | "success";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    items,
    itemCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [view, setView] = useState<View>("cart");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    whatsapp: "",
    shippingAddress: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetAndClose = () => {
    onClose();
    // Small delay so the drawer doesn't visibly flash back to "cart" while closing
    setTimeout(() => setView("cart"), 300);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.customerName.trim()) next.customerName = "Naam required hai";
    const digits = form.whatsapp.replace(/\D/g, "");
    if (digits.length < 7) next.whatsapp = "Valid WhatsApp number likhein";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await createGuestOrder({
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
        customerName: form.customerName.trim(),
        whatsapp: form.whatsapp.trim(),
        shippingAddress: form.shippingAddress.trim() || undefined,
        note: form.note.trim() || undefined,
      });

      if (res) {
        clearCart();
        setView("success");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 z-40 bg-black/40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l-2 bg-white"
            style={{ borderColor: ACCENT.ink }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b-2 px-4 py-3.5 sm:px-5"
              style={{ borderColor: ACCENT.ink, backgroundColor: ACCENT.plum }}
            >
              <div className="flex items-center gap-2">
                {view === "checkout" && (
                  <button
                    type="button"
                    onClick={() => setView("cart")}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    aria-label="Back to cart"
                  >
                    <HiOutlineArrowLeft />
                  </button>
                )}
                <h2
                  className="text-base sm:text-lg font-extrabold text-white"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {view === "cart" &&
                    `Your Cart${itemCount ? ` (${itemCount})` : ""}`}
                  {view === "checkout" && "Checkout"}
                  {view === "success" && "Order Placed"}
                </h2>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                aria-label="Close"
              >
                <HiOutlineXMark />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
              {/* ── CART VIEW ─────────────────────────────── */}
              {view === "cart" &&
                (items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                    <HiOutlineShoppingBag
                      className="mb-3 text-4xl"
                      style={{ color: `${ACCENT.plum}44` }}
                    />
                    <p
                      className="text-sm font-bold"
                      style={{ color: ACCENT.plum }}
                    >
                      Your cart is empty
                    </p>
                    <p className="mt-1 text-xs text-[#241C1C]/50">
                      Add products to see them here
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li
                        key={item.productId}
                        className="flex gap-3 rounded-2xl border-2 p-2.5"
                        style={{ borderColor: `${ACCENT.ink}22` }}
                      >
                        <div
                          className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-[#FFB627]/15"
                          style={{ borderColor: ACCENT.ink }}
                        >
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className="truncate text-sm font-bold"
                              style={{ color: ACCENT.ink }}
                            >
                              {item.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.productId)}
                              className="shrink-0 text-[#FF6B4A]"
                              aria-label="Remove item"
                            >
                              <HiOutlineTrash className="text-sm" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span
                              className="text-sm font-extrabold"
                              style={{
                                color: ACCENT.plum,
                                fontFamily: "'JetBrains Mono', monospace",
                              }}
                            >
                              Rs {(item.price * item.quantity).toLocaleString()}
                            </span>

                            <div
                              className="flex items-center gap-2 rounded-full border-2 px-1.5 py-1"
                              style={{ borderColor: ACCENT.ink }}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1,
                                  )
                                }
                                className="flex h-5 w-5 items-center justify-center"
                                aria-label="Decrease quantity"
                              >
                                <HiOutlineMinus className="text-xs" />
                              </button>
                              <span className="min-w-[1rem] text-center text-xs font-bold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1,
                                  )
                                }
                                disabled={
                                  item.stock != null &&
                                  item.quantity >= item.stock
                                }
                                className="flex h-5 w-5 items-center justify-center disabled:opacity-30"
                                aria-label="Increase quantity"
                              >
                                <HiOutlinePlus className="text-xs" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}

              {/* ── CHECKOUT VIEW ─────────────────────────── */}
              {view === "checkout" && (
                <div className="space-y-3.5">
                  <p className="text-xs text-[#241C1C]/60">
                    Apna contact detail bhar dein — hum aapko WhatsApp par
                    contact karke order finalize karenge.
                  </p>

                  <div>
                    <label
                      className="mb-1 block text-xs font-bold"
                      style={{ color: ACCENT.plum }}
                    >
                      Naam *
                    </label>
                    <input
                      type="text"
                      value={form.customerName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, customerName: e.target.value }))
                      }
                      placeholder="Your name"
                      className="w-full rounded-xl border-2 px-3 py-2.5 text-sm outline-none"
                      style={{
                        borderColor: errors.customerName
                          ? ACCENT.coral
                          : `${ACCENT.ink}33`,
                      }}
                    />
                    {errors.customerName && (
                      <p
                        className="mt-1 text-[11px] font-medium"
                        style={{ color: ACCENT.coral }}
                      >
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="mb-1 block text-xs font-bold"
                      style={{ color: ACCENT.plum }}
                    >
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, whatsapp: e.target.value }))
                      }
                      placeholder="03xx xxxxxxx"
                      className="w-full rounded-xl border-2 px-3 py-2.5 text-sm outline-none"
                      style={{
                        borderColor: errors.whatsapp
                          ? ACCENT.coral
                          : `${ACCENT.ink}33`,
                      }}
                    />
                    {errors.whatsapp && (
                      <p
                        className="mt-1 text-[11px] font-medium"
                        style={{ color: ACCENT.coral }}
                      >
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="mb-1 block text-xs font-bold"
                      style={{ color: ACCENT.plum }}
                    >
                      Address (optional)
                    </label>
                    <input
                      type="text"
                      value={form.shippingAddress}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          shippingAddress: e.target.value,
                        }))
                      }
                      placeholder="Delivery address"
                      className="w-full rounded-xl border-2 px-3 py-2.5 text-sm outline-none"
                      style={{ borderColor: `${ACCENT.ink}33` }}
                    />
                  </div>

                  <div>
                    <label
                      className="mb-1 block text-xs font-bold"
                      style={{ color: ACCENT.plum }}
                    >
                      Note / Message (optional)
                    </label>
                    <textarea
                      value={form.note}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, note: e.target.value }))
                      }
                      placeholder="Koi specific request ya note..."
                      rows={3}
                      className="w-full resize-none rounded-xl border-2 px-3 py-2.5 text-sm outline-none"
                      style={{ borderColor: `${ACCENT.ink}33` }}
                    />
                  </div>

                  {/* Order summary */}
                  <div
                    className="rounded-xl border-2 p-3"
                    style={{
                      borderColor: `${ACCENT.ink}22`,
                      backgroundColor: `${ACCENT.marigold}10`,
                    }}
                  >
                    <p
                      className="mb-1.5 text-[11px] font-bold uppercase tracking-wide"
                      style={{ color: ACCENT.plum }}
                    >
                      {itemCount} item{itemCount === 1 ? "" : "s"}
                    </p>
                    {items.map((i) => (
                      <div
                        key={i.productId}
                        className="flex justify-between text-xs text-[#241C1C]/70"
                      >
                        <span className="truncate pr-2">
                          {i.name} × {i.quantity}
                        </span>
                        <span className="shrink-0">
                          Rs {(i.price * i.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SUCCESS VIEW ──────────────────────────── */}
              {view === "success" && (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2"
                    style={{
                      backgroundColor: `${ACCENT.teal}22`,
                      borderColor: ACCENT.teal,
                    }}
                  >
                    <HiOutlineCheckCircle
                      className="text-3xl"
                      style={{ color: ACCENT.teal }}
                    />
                  </motion.div>
                  <p
                    className="text-base font-extrabold"
                    style={{ color: ACCENT.plum }}
                  >
                    Order received!
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-[#241C1C]/60">
                    Hum jald hi aapko WhatsApp par contact karke order finalize
                    karenge.
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-bold"
                    style={{ borderColor: ACCENT.ink, color: ACCENT.plum }}
                  >
                    <HiOutlineChatBubbleLeftRight
                      style={{ color: ACCENT.coral }}
                    />
                    Keep your phone nearby
                  </div>
                </div>
              )}
            </div>

            {/* Footer / actions */}
            {view !== "success" && items.length > 0 && (
              <div
                className="border-t-2 px-4 py-3.5 sm:px-5"
                style={{ borderColor: ACCENT.ink }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#241C1C]/60">
                    Subtotal
                  </span>
                  <span
                    className="text-lg font-extrabold"
                    style={{
                      color: ACCENT.plum,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    Rs {subtotal.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    view === "cart" ? setView("checkout") : handleSubmit()
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-bold text-white disabled:opacity-60"
                  style={{
                    backgroundColor: ACCENT.coral,
                    borderColor: ACCENT.ink,
                  }}
                >
                  {submitting
                    ? "Placing order..."
                    : view === "cart"
                      ? "Proceed to Checkout"
                      : "Place Order"}
                </button>
              </div>
            )}

            {view === "success" && (
              <div
                className="border-t-2 px-4 py-3.5 sm:px-5"
                style={{ borderColor: ACCENT.ink }}
              >
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full rounded-full border-2 py-3 text-sm font-bold"
                  style={{
                    borderColor: ACCENT.ink,
                    color: ACCENT.plum,
                    backgroundColor: ACCENT.marigold,
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
