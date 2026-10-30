import toast from "react-hot-toast";
import { CART_ENDPOINT } from "../endpoints";
import { serverAction } from "../server-action";
import { Cart, emptyCart } from "@/types/cart";

export const getCart = async (): Promise<Cart> => {
  try {
    const res: any = await serverAction({
      url: `${CART_ENDPOINT}`,
      method: "GET",
    });
    const cart = res?.data?.data as Cart | undefined;
    return cart?.items ? cart : emptyCart;
  } catch (error) {
    console.error("Error getting cart:", error);
    return emptyCart;
  }
};

export const addToCart = async (
  productId: string,
  quantity: number = 1,
): Promise<Cart | null> => {
  try {
    console.log("[addToCart] sending:", { productId, quantity }); // TEMP debug

    const res: any = await serverAction({
      url: `${CART_ENDPOINT}/add`,
      method: "POST",
      body: { productId, quantity },
    });

    console.log("[addToCart] raw response:", res); // TEMP debug

    const cart = res?.data?.data as Cart | undefined;
    if (!cart?.items) {
      toast.error(
        res?.data?.message || res?.error || "Failed to add item to cart",
      );
      return null;
    }

    toast.success("Added to bag");
    return cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Error adding item to cart");
    return null;
  }
};

export const updateCartItem = async (
  productId: string,
  quantity: number,
): Promise<Cart | null> => {
  try {
    const res: any = await serverAction({
      url: `${CART_ENDPOINT}/update`,
      method: "PUT",
      body: { productId, quantity },
    });

    const cart = res?.data?.data as Cart | undefined;
    if (!cart?.items) {
      toast.error(res?.data?.message || res?.error || "Failed to update cart");
      return null;
    }

    return cart;
  } catch (error) {
    console.error("Error updating cart item:", error);
    toast.error("Error updating cart item");
    return null;
  }
};

export const removeCartItem = async (
  productId: string,
): Promise<Cart | null> => {
  try {
    const res: any = await serverAction({
      url: `${CART_ENDPOINT}/item/${productId}`,
      method: "DELETE",
    });

    const cart = res?.data?.data as Cart | undefined;
    if (!cart?.items) {
      toast.error(res?.data?.message || res?.error || "Failed to remove item");
      return null;
    }

    return cart;
  } catch (error) {
    console.error("Error removing cart item:", error);
    toast.error("Error removing cart item");
    return null;
  }
};

export const clearCart = async (): Promise<Cart | null> => {
  try {
    const res: any = await serverAction({
      url: `${CART_ENDPOINT}/clear`,
      method: "DELETE",
    });

    const cart = res?.data?.data as Cart | undefined;
    if (!cart?.items) {
      toast.error(res?.data?.message || res?.error || "Failed to clear cart");
      return null;
    }

    return cart;
  } catch (error) {
    console.error("Error clearing cart:", error);
    toast.error("Error clearing cart");
    return null;
  }
};
