import toast from "react-hot-toast";

import { SplashResponse, ResponseForSplash, ISplash } from "@/types/splash";

import { SPLASH_ENDPOINT } from "../endpoints";
import { serverAction } from "../server-action";

/**
 * Public — no login required. Used on the user-dashboard splash marquee.
 * Returns the single active splash doc with its (max 6) products populated.
 */
export const getSplash = async () => {
  try {
    console.log("[splash-api] 🐛 calling GET", SPLASH_ENDPOINT);

    const res = await serverAction({
      url: SPLASH_ENDPOINT,
      method: "GET",
    });

    console.log("[splash-api] 🐛 getSplash raw response:", res);

    // Defensive parsing — same double-wrap pattern as getSplashById
    const anyRes = res as any;
    const splash = anyRes?.data?.data ?? anyRes?.data ?? anyRes ?? null;

    console.log("[splash-api] 🐛 getSplash parsed splash:", splash);

    return splash;
  } catch (error) {
    console.error("[splash-api] ❌ Error getting splash:", error);
    return null;
  }
};

export const getSplashById = async (id: string) => {
  try {
    const res = await serverAction({
      url: `${SPLASH_ENDPOINT}/${id}`,
      method: "GET",
    });

    console.log("[splash-api] 🐛 getSplashById raw response:", res);

    // Defensive parsing — same double-wrap pattern we've hit before
    // (categories, orders, products).
    const anyRes = res as any;
    const splash = anyRes?.data?.data ?? anyRes?.data ?? anyRes ?? null;

    return splash;
  } catch (error) {
    console.error("Error getting splash by id:", error);
    return null;
  }
};

// ── Admin only ──────────────────────────────────────────────────────
// body: { title?: string; products: string[] (max 6 product ids); isActive?: boolean }
export const addSplash = async (body: {
  title?: string;
  products: string[];
  isActive?: boolean;
}) => {
  try {
    const res = await serverAction({
      url: `${SPLASH_ENDPOINT}/create`,
      method: "POST",
      body,
    });
    return res as ResponseForSplash;
  } catch (error) {
    console.error("Error creating splash:", error);
    return null;
  }
};

export const updateSplash = async (
  body: { title?: string; products?: string[]; isActive?: boolean },
  id: string,
) => {
  try {
    const res = await serverAction({
      url: `${SPLASH_ENDPOINT}/${id}`,
      method: "PUT",
      body,
    });
    return res as ResponseForSplash;
  } catch (error) {
    console.error("Error updating splash:", error);
    return null;
  }
};

export const deleteSplash = async (id: string) => {
  try {
    const res = await serverAction({
      url: `${SPLASH_ENDPOINT}/${id}`,
      method: "DELETE",
    });
    if (!res.state) {
      toast.error(res.error || "Failed to delete splash");
      return;
    }
    return res.data as SplashResponse;
  } catch (error) {
    console.error("Error deleting splash:", error);
    return null;
  }
};
