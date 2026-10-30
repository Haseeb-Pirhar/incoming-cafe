"use client";
import React, { useEffect, useState } from "react";
import { Dialog, VisuallyHidden } from "@radix-ui/themes";
import { MdOutlineAdd, MdOutlineImage } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { Pencil, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Category } from "@/types/category";
import {
  addCategory,
  updateCategory,
  getAllCategories,
} from "@/api/api-call/category";

/** Mirrors ICategory on the backend. slug is derived server-side from
 * name, so it's intentionally not collected here. ancestors are computed
 * server-side from parent, so they're not collected here either. */
interface CategoryFormValues {
  name: string;
  description?: string;
  parent?: string;
  isActive: boolean;
  sortOrder?: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string; // comma-separated in the UI, split into an array on submit
}

interface CategoryFormDialogProps {
  mode: "create" | "edit";
  category?: Category;
  onSaved: (category: Category) => void;
}

const inputClass =
  "border border-[#14213D]/15 rounded-lg px-3 py-2 text-sm text-[#14213D] bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-colors";
const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-[#14213D]/50";

const getParentId = (parent: Category["parent"]): string => {
  if (!parent) return "";
  return typeof parent === "string" ? parent : parent._id;
};

const CategoryFormDialog = ({
  mode,
  category,
  onSaved,
}: CategoryFormDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    category?.image || null,
  );
  const [parentOptions, setParentOptions] = useState<Category[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { register, handleSubmit, reset } = useForm<CategoryFormValues>({
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      parent: getParentId(category?.parent),
      isActive: category?.isActive ?? true,
      sortOrder: category?.sortOrder ?? 0,
      metaTitle: category?.metaTitle || "",
      metaDescription: category?.metaDescription || "",
      keywords: category?.keywords?.join(", ") || "",
    },
  });

  // Load possible parent categories once the dialog is opened, so the
  // dropdown always reflects the current catalog tree.
  useEffect(() => {
    if (!dialogOpen) return;
    (async () => {
      const res = await getAllCategories();
      if (!Array.isArray(res)) return;
      // a category can't be its own parent
      setParentOptions(
        res.filter((c) => c._id?.toString() !== category?._id?.toString()),
      );
    })();
  }, [dialogOpen, category?._id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const resetForm = () => {
    reset();
    setImageFile(null);
    setPreviewUrl(category?.image || null);
    setShowAdvanced(false);
  };

  const onSubmit = async (values: CategoryFormValues) => {
    // image is required on create (uploadHelper is not optional on POST /category)
    if (mode === "create" && !imageFile) {
      toast.error("Please upload an image");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", values.name);
    if (values.description) formData.append("description", values.description);
    if (values.parent) formData.append("parent", values.parent);
    formData.append("isActive", String(values.isActive));
    if (values.sortOrder !== undefined)
      formData.append("sortOrder", String(values.sortOrder));
    if (values.metaTitle) formData.append("metaTitle", values.metaTitle);
    if (values.metaDescription)
      formData.append("metaDescription", values.metaDescription);
    if (values.keywords) {
      values.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
        .forEach((k) => formData.append("keywords", k));
    }
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (mode === "edit" && category?.image) {
      formData.append("image", category.image);
    }

    const res =
      mode === "create"
        ? await addCategory(formData)
        : await updateCategory(formData, category!._id!.toString());

    setSubmitting(false);

    if (!res?.state || res?.error) {
      toast.error(
        res?.error ||
          `Failed to ${mode === "create" ? "add" : "update"} category`,
      );
      return;
    }

    toast.success(
      mode === "create"
        ? "Category added successfully"
        : "Category updated successfully",
    );
    onSaved(res.data as Category);
    if (mode === "create") resetForm();
    setDialogOpen(false);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger className="cursor-pointer!">
        {mode === "create" ? (
          <button className="group flex items-center gap-1.5 bg-[#FF6B35] text-white px-4 py-2 rounded-lg shadow-md font-medium text-sm hover:bg-[#e85c28] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer">
            <MdOutlineAdd
              size={18}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            Add Category
          </button>
        ) : (
          <button className="p-2 rounded-full bg-[#14213D]/8 hover:bg-[#14213D]/15 hover:scale-105 active:scale-95 transition shrink-0">
            <Pencil size={16} className="text-[#14213D]" />
          </button>
        )}
      </Dialog.Trigger>

      <VisuallyHidden>
        <Dialog.Title>
          {mode === "create" ? "Add Category" : "Edit Category"}
        </Dialog.Title>
      </VisuallyHidden>

      <Dialog.Content
        size="2"
        className="shop-dialog-rise !rounded-2xl !border !border-[#14213D]/10 !bg-[#FBFAF7]"
      >
        <Dialog.Close className="absolute top-4 right-5 z-50 cursor-pointer hover:rotate-90 transition-transform duration-300">
          <VscChromeClose size="1.2rem" color="#14213D" />
        </Dialog.Close>

        <span
          className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#FF6B35]/80"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {mode === "create" ? "New Entry" : "Edit Entry"}
        </span>
        <h2
          className="text-xl font-semibold text-[#14213D] mt-0.5 mb-1"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {mode === "create" ? "New Category" : "Edit Category"}
        </h2>
        <p
          className="text-xs text-[#14213D]/40 mb-4"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          {mode === "create"
            ? "Add a group to organize products in your store."
            : "Update this category's details."}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1"
        >
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>
              Image{" "}
              {mode === "create" && <span className="text-[#FF6B35]">*</span>}
            </label>
            <label
              htmlFor={`category-media-${mode}`}
              className={`relative flex items-center justify-center h-32 rounded-xl border-2 border-dashed cursor-pointer overflow-hidden transition-colors ${
                previewUrl
                  ? "border-[#14213D]/15"
                  : "border-[#FF6B35]/50 shop-pulse-ring hover:border-[#FF6B35]"
              } bg-white`}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-[#14213D]/30">
                  <MdOutlineImage size={26} />
                  <span className="text-xs">Click to upload</span>
                </div>
              )}
            </label>
            <input
              id={`category-media-${mode}`}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>
              Name <span className="text-[#FF6B35]">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="e.g. Sneakers"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Description</label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Short note about this category..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Parent Category</label>
              <select {...register("parent")} className={inputClass}>
                <option value="">None (top-level)</option>
                {parentOptions.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Sort Order</label>
              <input
                type="number"
                {...register("sortOrder", { valueAsNumber: true })}
                placeholder="0"
                className={inputClass}
              />
            </div>
          </div>

          <label className="flex items-center justify-between rounded-lg border border-[#14213D]/15 bg-white px-3 py-2.5 cursor-pointer">
            <span className="text-sm text-[#14213D] font-medium">Active</span>
            <span className="relative inline-flex items-center">
              <input
                type="checkbox"
                {...register("isActive")}
                className="peer sr-only"
                defaultChecked
              />
              <span className="h-5 w-9 rounded-full bg-[#14213D]/20 peer-checked:bg-[#0F9D6C] transition-colors" />
              <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
            </span>
          </label>

          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="flex items-center gap-1 text-xs font-medium text-[#14213D]/60 hover:text-[#14213D] transition-colors self-start"
          >
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""}`}
            />
            SEO &amp; advanced options
          </button>

          {showAdvanced && (
            <div className="shop-rise-in flex flex-col gap-4 rounded-lg border border-dashed border-[#14213D]/15 p-3 bg-white/60">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Meta Title</label>
                <input
                  {...register("metaTitle")}
                  placeholder="Defaults to the category name"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Meta Description</label>
                <textarea
                  {...register("metaDescription")}
                  rows={2}
                  placeholder="Defaults to the description"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Keywords</label>
                <input
                  {...register("keywords")}
                  placeholder="comma, separated, keywords"
                  className={inputClass}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="relative overflow-hidden w-full rounded-lg py-2.5 font-medium mt-1 cursor-pointer transition-colors disabled:opacity-80 bg-[#14213D] hover:bg-[#0d1729] text-white"
          >
            {submitting && <span className="shop-shimmer absolute inset-0" />}
            <span className="relative">
              {submitting
                ? "Saving..."
                : mode === "create"
                  ? "Save Category"
                  : "Update Category"}
            </span>
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CategoryFormDialog;
