import toast from "react-hot-toast";
import { PRODUCT_ENDPOINT } from "../endpoints";
import { serverAction } from "../server-action";
import { ProductResponse, ResponseForProducts } from "@/types/product";

export type GetProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
};

export const getAllProducts = async (
  pageOrParams: number | GetProductsParams = 1,
) => {
  try {
    const params: GetProductsParams =
      typeof pageOrParams === "number" ? { page: pageOrParams } : pageOrParams;

    const {
      page = 1,
      limit,
      search,
      category,
      isFeatured,
      minPrice,
      maxPrice,
      isActive,
    } = params;

    const query = new URLSearchParams();
    query.set("page", String(page));

    if (limit != null) query.set("limit", String(limit));
    if (search?.trim()) query.set("search", search.trim());
    if (category && category !== "all") query.set("category", category);
    if (isFeatured !== undefined) query.set("isFeatured", String(isFeatured));
    if (minPrice != null) query.set("minPrice", String(minPrice));
    if (maxPrice != null) query.set("maxPrice", String(maxPrice));
    if (isActive !== undefined) query.set("isActive", String(isActive));

    const res = await serverAction({
      url: `${PRODUCT_ENDPOINT}?${query.toString()}`,
      method: "GET",
    });

    return res.data as ProductResponse;
  } catch (error) {
    console.error("Error getting all products:", error);
    toast.error("Error getting all products");
    return null;
  }
};

export const getRecentProducts = async () => {
  try {
    const res = await serverAction({
      url: `${PRODUCT_ENDPOINT}?limit=8`,
      method: "GET",
    });
    return res.data as ProductResponse;
  } catch (error) {
    console.error("Error getting recent products:", error);
    return null;
  }
};

export const addProduct = async (formData: FormData) => {
  try {
    const res = await serverAction({
      url: `${PRODUCT_ENDPOINT}/create`,
      method: "POST",
      body: formData,
    });
    return res as ResponseForProducts;
  } catch (error) {
    console.error("Error submitting product form:", error);
    return null;
  }
};

export const updateProduct = async (formData: FormData, id: string) => {
  try {
    const res = await serverAction({
      url: `${PRODUCT_ENDPOINT}/${id}`,
      method: "PUT",
      body: formData,
    });
    return res as ResponseForProducts;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await serverAction({
      url: `${PRODUCT_ENDPOINT}/${id}`,
      method: "DELETE",
    });
    if (!res.state) {
      toast.error(res.error || "Failed to delete product");
      return;
    }
    return res.data as ProductResponse;
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const res = await serverAction({
      url: `${PRODUCT_ENDPOINT}/slug/${slug}`,
      method: "GET",
    });

    const anyRes = res as any;

    // Try increasingly nested shapes — serverAction/axios sometimes adds
    // an extra .data wrapper on top of the API's own { message, data } shape.
    const candidates = [
      anyRes?.data?.data?.data,
      anyRes?.data?.data,
      anyRes?.data,
      anyRes,
    ];

    const product = candidates.find(
      (c) => c && typeof c === "object" && "slug" in c && "price" in c,
    );

    if (!product) {
      console.error(
        "[product-api] Could not find product in response:",
        anyRes,
      );
    }

    return product ?? null;
  } catch (error) {
    console.error("Error getting product by slug:", error);
    return null;
  }
};
