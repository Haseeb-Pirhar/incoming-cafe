import toast from "react-hot-toast";
import { CATEGORY_ENDPOINT } from "../endpoints";
import { serverAction } from "../server-action";
import { Category, CategoryResponse } from "@/types/category";

export const getAllCategories = async () => {
  try {
    const res: any = await serverAction({
      url: `${CATEGORY_ENDPOINT}?page=1&search=`,
      method: "GET",
    });
    // API shape: res.data.data = Category[]
    return (res?.data?.data ?? []) as Category[];
  } catch (error) {
    console.error("Error getting categories:", error);
    toast.error("Error getting categories");
    return [];
  }
};

export const addCategory = async (formData: FormData) => {
  try {
    const res = await serverAction({
      url: `${CATEGORY_ENDPOINT}`,
      method: "POST",
      body: formData,
    });
    console.log("=====================================");
    console.log("response", res);
    console.log("=====================================");
    return res as CategoryResponse;
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
};

export const updateCategory = async (formData: FormData, id: string) => {
  try {
    const res = await serverAction({
      url: `${CATEGORY_ENDPOINT}/${id}`,
      method: "PUT",
      body: formData,
    });
    return res as CategoryResponse;
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const res = await serverAction({
      url: `${CATEGORY_ENDPOINT}/${id}`,
      method: "DELETE",
    });
    if (!res.state) {
      toast.error(res.error || "Failed to delete category");
      return;
    }
    return res.data as Category;
  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
};
