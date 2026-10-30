import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AddProductFormInput, addProductSchema } from "./schema";
import { addProduct, updateProduct } from "@/api/api-call/product-api";
import { getAllCategories } from "@/api/api-call/category";
import { getMediaType } from "@/utils/file-helper";
import { convertToFormData } from "@/utils";
import { Category } from "@/types/category";
import { Product, TotalProductResponse } from "@/types/product";

interface UseProductArgs {
  data?: Product;
  edit?: boolean;
  id?: string;
  optimisticallyUpdate?: (product: Product) => void;
  addOptimistically?: (product: Product) => void;
}

/** Media se File objects nikaalo — File | { file: File } | Blob sab support */
const extractMediaFiles = (media: unknown): File[] => {
  if (!Array.isArray(media)) return [];

  const files: File[] = [];

  for (const item of media as any[]) {
    if (item instanceof File) {
      files.push(item);
    } else if (item?.file instanceof File) {
      files.push(item.file);
    } else if (item instanceof Blob && !(item instanceof File)) {
      files.push(
        new File([item], (item as any).name || "media", {
          type: item.type || "application/octet-stream",
        }),
      );
    }
  }

  return files;
};

/** Edit mode: existing URLs nikaalo (File nahi wale items) */
const extractExistingMediaUrls = (media: unknown): string[] => {
  if (!Array.isArray(media)) return [];

  return (media as any[])
    .filter(
      (item) =>
        !(item instanceof File) &&
        !(item?.file instanceof File) &&
        !(item instanceof Blob && !(item instanceof File)),
    )
    .map((item) => {
      if (typeof item === "string") return item;
      if (item?.uri && typeof item.uri === "string") return item.uri;
      return null;
    })
    .filter(Boolean) as string[];
};

export const useProduct = ({
  data,
  edit = false,
  id,
  optimisticallyUpdate,
  addOptimistically,
}: UseProductArgs) => {
  const form = useForm<AddProductFormInput>({
    resolver: zodResolver(addProductSchema),
    reValidateMode: "onChange",
    defaultValues: {
      variants: [],
      isActive: true,
      isFeatured: false,
      stock: 0,
      price: 0,
      media: [],
      category: "", // Select controlled/uncontrolled warning fix
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // ── Categories fetch ──────────────────────────────────────────────
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await getAllCategories();
        const list: Category[] = Array.isArray(res)
          ? res
          : Array.isArray((res as any)?.data)
            ? (res as any).data
            : [];
        setCategories(list);
      } catch (err) {
        console.error("[useProduct] categories fetch error:", err);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: c._id?.toString() || "",
  }));

  // ── Edit prefill ──────────────────────────────────────────────────
  useEffect(() => {
    if (edit && data) {
      form.reset({
        name: data.name || "",
        description: data.description || "",
        price: data.price || 0,
        discountPrice: data.discountPrice || undefined,
        stock: data.stock || 0,
        sku: data.sku || "",
        brand: data.brand || "",
        isActive: data.isActive ?? true,
        isFeatured: data.isFeatured ?? false,
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        keywords: Array.isArray(data.keywords)
          ? data.keywords.join(", ")
          : (data.keywords as unknown as string) || "",
        variants: data.variants || [],
        category:
          typeof data.category === "object"
            ? data.category?._id?.toString() || ""
            : data.category || "",
        media: Array.isArray(data.media)
          ? data.media.map((url: string) => ({
              uri: url,
              type: getMediaType(url),
              fileName: url.split("/").pop() || "",
            }))
          : [],
      });
    }
  }, [edit, data, form]);

  // ── ADD ───────────────────────────────────────────────────────────
  const onAddProduct = async (formData: AddProductFormInput) => {
    const newFiles = extractMediaFiles(formData.media);

    const { media, ...restData } = formData;
    const fd = convertToFormData(restData);

    newFiles.forEach((file) => {
      fd.append("media", file);
    });

    const res = await addProduct(fd);

    if (!res?.state || res?.error) {
      toast.error(res?.error || "Failed to add product");
      return null;
    }

    toast.success(res?.data?.message || "Product added successfully");
    return res?.data as TotalProductResponse;
  };

  // ── EDIT ──────────────────────────────────────────────────────────
  const onEditProduct = async (
    formData: AddProductFormInput,
    productId: string,
  ) => {
    const newFiles = extractMediaFiles(formData.media);
    const existingMedia = extractExistingMediaUrls(formData.media);

    const { media, ...restData } = formData;
    const fd = convertToFormData(restData);

    fd.append("existingMedia", JSON.stringify(existingMedia));
    newFiles.forEach((file) => {
      fd.append("media", file);
    });

    const res = await updateProduct(fd, productId);

    if (!res?.state || res?.error) {
      toast.error(res?.error || "Failed to update product");
      return null;
    }

    toast.success(res?.data?.message || "Product updated successfully");
    return res?.data as TotalProductResponse;
  };

  // ── Submit ────────────────────────────────────────────────────────
  const onSubmit = async (formData: AddProductFormInput) => {
    setLoading(true);
    try {
      if (data && edit && id) {
        const updated = await onEditProduct(formData, id);
        if (updated) {
          const product =
            (updated as any)?.data &&
            typeof (updated as any).data === "object" &&
            !Array.isArray((updated as any).data)
              ? ((updated as any).data as Product)
              : (updated as unknown as Product);

          optimisticallyUpdate?.(product);
          form.reset({
            variants: [],
            isActive: true,
            isFeatured: false,
            stock: 0,
            price: 0,
            media: [],
            category: "",
          });
        }
      } else {
        const added = await onAddProduct(formData);
        if (added) {
          const product =
            (added as any)?.data &&
            typeof (added as any).data === "object" &&
            !Array.isArray((added as any).data)
              ? ((added as any).data as Product)
              : (added as unknown as Product);

          addOptimistically?.(product);
          form.reset({
            variants: [],
            isActive: true,
            isFeatured: false,
            stock: 0,
            price: 0,
            media: [],
            category: "",
          });
        }
      }
    } catch (err) {
      console.error("[useProduct] submit error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    fields,
    append,
    remove,
    loading,
    categories,
    categoriesLoading,
    categoryOptions,
    onSubmit,
  };
};
