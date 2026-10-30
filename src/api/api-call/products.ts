"use server";

import toast from "react-hot-toast";
import { LIKES_ENDPOINT, RECENT_ITEMS_ENDPOINT } from "../endpoints";
import { serverAction } from "../server-action";
import { LikesResponse, RecentItemsResponse } from "@/types/recientItem";

export const getRecentItems = async () => {
  try {
    const res = await serverAction({
      url: `${RECENT_ITEMS_ENDPOINT}?latitude=0&longitude=0`,
      method: "GET",
    });
    if (res.state && res.data) {
      return res.data as RecentItemsResponse;
    }
  } catch (error) {
    console.error("Error getting recent items:", error);
    toast.error("Error getting recent items");
    return null;
  }
};

export const likeItem = async (
  type: string,
  ownerId: string,
  itemId: string
) => {
  try {
    const res = await serverAction({
      url: `${LIKES_ENDPOINT}`,
      method: "POST",
      body: { type, owner: ownerId, item: itemId },
    });
    return res.data as LikesResponse;
  } catch (error) {
    console.error("Error liking item:", error);
    toast.error("Error liking item");
    return null;
  }
};

export const getLikes = async (userId: string) => {
  try {
    const res = await serverAction({
      url: `${LIKES_ENDPOINT}/${userId}`,
      method: "GET",
    });
    return res.data as LikesResponse;
  } catch (error) {
    console.error("Error getting likes:", error);
    toast.error("Error getting likes");
    return null;
  }
};
