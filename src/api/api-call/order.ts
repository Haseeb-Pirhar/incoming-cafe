import toast from "react-hot-toast";
import { ORDER_ENDPOINT } from "../endpoints";
import { serverAction } from "../server-action";

export type GuestOrderItem = {
  productId: string;
  quantity: number;
};

export type GuestCheckoutPayload = {
  items: GuestOrderItem[];
  customerName: string;
  whatsapp: string;
  shippingAddress?: string;
  note?: string;
};

export const createGuestOrder = async (payload: GuestCheckoutPayload) => {
  try {
    // NOTE: this sends `payload` as a plain JSON body. product-api.ts and
    // category.ts only ever send FormData (file uploads) or nothing (GET),
    // so double-check your serverAction() implementation actually supports
    // a plain object body for POST — if it only accepts FormData, wrap
    // this with convertToFormData(payload) instead (already used in
    // useProduct.ts), though nested arrays like `items` serialize awkwardly
    // through FormData, so a JSON-body code path is the cleaner fix there.
    const res: any = await serverAction({
      url: `${ORDER_ENDPOINT}/guest-checkout`,
      method: "POST",
      body: payload,
    });

    if (res?.error) {
      toast.error(res.error || res?.message || "Failed to place order");
      return null;
    }

    toast.success(res?.message || "Order placed successfully");
    return res?.data ?? res;
  } catch (error) {
    console.error("Error placing guest order:", error);
    toast.error("Error placing order");
    return null;
  }
};

// ── Admin ──────────────────────────────────────────────────────────

export const getAllOrdersAdmin = async () => {
  try {
    const res = await serverAction({
      url: `${ORDER_ENDPOINT}/admin/all`,
      method: "GET",
    });
    return res as any;
  } catch (error) {
    console.error("Error getting all orders:", error);
    toast.error("Error getting orders");
    return null;
  }
};

export const updateOrderStatusAdmin = async (
  id: string,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
) => {
  try {
    const res: any = await serverAction({
      url: `${ORDER_ENDPOINT}/admin/${id}/status`,
      method: "PUT",
      body: { status },
    });

    if (res?.error) {
      toast.error(res.error || res?.message || "Failed to update status");
      return null;
    }

    return res?.data ?? res;
  } catch (error) {
    console.error("Error updating order status:", error);
    toast.error("Error updating order status");
    return null;
  }
};
