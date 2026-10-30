"use client";
import { FormProvider } from "react-hook-form";
import { Text } from "@radix-ui/themes";
import { FormInput } from "@/components/FormInput";
import { ImageUpload } from "@/components/ImageUpload";
import { SelectDropdown } from "@/components/Select";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiOutlineTag,
  HiOutlinePhoto,
  HiOutlineSquares2X2,
  HiOutlineIdentification,
  HiOutlineBanknotes,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { useProduct } from "./useProduct";
import { Product } from "@/types/product";

interface ProductFormProps {
  data?: Product;
  edit?: boolean;
  id?: string;
  optimisticallyUpdate?: (product: Product) => void;
  addOptimistically?: (product: Product) => void;
}

const ACCENT = {
  media: "#00AFA5",
  category: "#D4A017",
  basics: "#A5432A",
  pricing: "#2F4F3E",
  variants: "#F15A22",
  details: "#00AFA5",
};

const Section = ({
  icon,
  accent,
  title,
  children,
  badge,
}: {
  icon: React.ReactNode;
  accent: string;
  title: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) => (
  <div
    className="rounded-xl border bg-white"
    style={{ borderColor: `${accent}33` }}
  >
    <div
      className="flex items-center justify-between px-4 py-3 rounded-t-xl"
      style={{ backgroundColor: `${accent}14` }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm"
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          {icon}
        </span>
        <span
          className="text-[11px] tracking-[0.14em] font-semibold uppercase"
          style={{ color: accent, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {title}
        </span>
      </div>
      {badge}
    </div>
    <div className="p-4 space-y-4">{children}</div>
  </div>
);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.32, ease: "easeOut" },
  }),
};

export default function ProductForm({
  data,
  edit = false,
  id,
  optimisticallyUpdate,
  addOptimistically,
}: ProductFormProps) {
  const {
    form,
    fields,
    append,
    remove,
    loading,
    categoriesLoading,
    categoryOptions,
    onSubmit,
  } = useProduct({ data, edit, id, optimisticallyUpdate, addOptimistically });

  const t = (key?: string) =>
    key
      ? key
          .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
          .replace(/[_-]+/g, " ")
          .replace(/\./g, " ")
          .replace(/^./, (char) => char.toUpperCase())
      : "";

  return (
    <FormProvider {...form}>
      <div
        className="mx-auto w-full max-w-2xl"
        style={{ fontFamily: "'Work Sans', sans-serif" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-[#2F4F3E] to-[#17281f] px-5 sm:px-6 pt-6 pb-10 overflow-hidden"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-8 -right-4 h-28 w-28 rounded-full blur-3xl opacity-40"
            style={{
              background: "radial-gradient(circle, #00AFA5, transparent 70%)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 left-10 h-24 w-24 rounded-full blur-3xl opacity-30"
            style={{
              background: "radial-gradient(circle, #F15A22, transparent 70%)",
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <div className="relative flex items-center gap-3.5">
            <motion.div
              initial={{ scale: 0.6, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F15A22]/15 border border-[#F15A22]/40"
            >
              <HiOutlineTag className="text-[#F15A22] text-xl" />
            </motion.div>
            <div>
              <h2
                className="text-lg sm:text-xl font-bold text-[#FAF3E3] leading-tight"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {edit ? t("updateProduct") : t("addNewProduct")}
              </h2>
              <p className="text-[11px] sm:text-xs text-[#FAF3E3]/55 mt-0.5">
                {t("fillDetailsBelowToListYourProduct")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Body */}
        <div className="bg-[#FAF3E3]/40 px-4 sm:px-6 pt-5 pb-28 space-y-4 -mt-5 rounded-t-3xl relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="relative z-[60]"
          >
            <Section
              icon={<HiOutlinePhoto />}
              accent={ACCENT.media}
              title="Media"
            >
              <ImageUpload field="media" isMultiple />
              <Text className="text-[11px] text-[#2F4F3E]/50 block">
                Max 50MB · .jpg, .jpeg, .png, .mp4 · up to 10 files
              </Text>
            </Section>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="relative z-50"
          >
            <Section
              icon={<HiOutlineSquares2X2 />}
              accent={ACCENT.category}
              title="Category"
              badge={
                !categoriesLoading && categoryOptions.length > 0 ? (
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: `${ACCENT.category}22`,
                      color: ACCENT.category,
                    }}
                  >
                    {categoryOptions.length} available
                  </span>
                ) : undefined
              }
            >
              {categoriesLoading ? (
                <div className="h-10 rounded-md bg-[#D4A017]/10 animate-pulse" />
              ) : categoryOptions.length === 0 ? (
                <p className="text-xs text-[#A5432A] bg-[#A5432A]/10 border border-[#A5432A]/30 rounded-md px-3 py-2.5 leading-relaxed">
                  No categories found yet. Add one from Admin → Categories, then
                  come back to this form.
                </p>
              ) : (
                <SelectDropdown
                  options={categoryOptions}
                  heading={t("category")}
                  field="category"
                  placeHolder={t("selectCategory")}
                  type="dropdown"
                />
              )}
            </Section>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="relative z-40"
          >
            <Section
              icon={<HiOutlineIdentification />}
              accent={ACCENT.basics}
              title="Basics"
            >
              <FormInput
                field="name"
                placeHolder={t("enter") + " " + t("productName")}
                label={t("productName")}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <FormInput
                  field="brand"
                  placeHolder={t("brand") + " " + t("optional")}
                  label={t("brand") + " " + t("optional")}
                />
                <FormInput
                  field="sku"
                  placeHolder={t("sku") + " " + t("optional")}
                  label={t("sku") + " " + t("optional")}
                />
              </div>
            </Section>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="relative z-30"
          >
            <Section
              icon={<HiOutlineBanknotes />}
              accent={ACCENT.pricing}
              title="Pricing & stock"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <FormInput
                  field="stock"
                  placeHolder={t("stock")}
                  label={t("stock")}
                  type="number"
                />
                <FormInput
                  field="price"
                  placeHolder={t("price")}
                  label={t("price")}
                  type="number"
                />
              </div>
              <FormInput
                field="discountPrice"
                placeHolder={t("discountPrice") + " " + t("optional")}
                label={t("discountPrice") + " " + t("optional")}
                type="number"
              />

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <label
                  className="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full border"
                  style={{ borderColor: `${ACCENT.pricing}33` }}
                >
                  <input
                    type="checkbox"
                    {...form.register("isActive")}
                    className="w-3.5 h-3.5 accent-[#00AFA5]"
                  />
                  <span className="text-xs text-[#2F4F3E] font-medium">
                    {t("active")}
                  </span>
                </label>
                <label
                  className="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full border"
                  style={{ borderColor: `${ACCENT.variants}33` }}
                >
                  <input
                    type="checkbox"
                    {...form.register("isFeatured")}
                    className="w-3.5 h-3.5 accent-[#F15A22]"
                  />
                  <span className="text-xs text-[#2F4F3E] font-medium">
                    {t("featured")}
                  </span>
                </label>
              </div>
            </Section>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="relative z-20"
          >
            <Section
              icon={<HiOutlineSquares2X2 />}
              accent={ACCENT.variants}
              title="Variants"
              badge={
                <button
                  type="button"
                  onClick={() =>
                    append({
                      name: "",
                      value: "",
                      priceAdjustment: 0,
                      stock: 0,
                      sku: "",
                    })
                  }
                  className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full cursor-pointer shrink-0"
                  style={{
                    backgroundColor: `${ACCENT.variants}18`,
                    color: ACCENT.variants,
                  }}
                >
                  <HiOutlinePlusCircle className="text-sm" />
                  ADD
                </button>
              }
            >
              {fields.length === 0 ? (
                <p className="text-xs text-[#2F4F3E]/40 italic py-1">
                  No variants yet — optional (e.g. Size, Color).
                </p>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {fields.map((fieldItem, index) => (
                      <motion.div
                        key={fieldItem.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="rounded-lg p-3.5 space-y-2.5"
                        style={{ backgroundColor: `${ACCENT.variants}0d` }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-semibold text-[#2F4F3E]/60">
                            {t("variant")} {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-[#A5432A] cursor-pointer p-0.5"
                          >
                            <HiOutlineTrash className="text-sm" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <FormInput
                            field={`variants.${index}.name`}
                            placeHolder="Size / Color"
                            label={t("variantName")}
                          />
                          <FormInput
                            field={`variants.${index}.value`}
                            placeHolder="Large / Red"
                            label={t("variantValue")}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </Section>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="relative z-10"
          >
            <Section
              icon={<HiOutlineDocumentText />}
              accent={ACCENT.details}
              title="Details"
            >
              <FormInput
                field="description"
                placeHolder={t("enterDetailofYourProduct")}
                label={t("description")}
                type="textarea"
                className="w-full border border-[#D4A017]/40 rounded-md px-3 py-2.5"
              />
              <FormInput
                field="keywords"
                placeHolder={t("keywordsCommaSeparated") + " " + t("optional")}
                label={t("keywords") + " " + t("optional")}
              />
            </Section>
          </motion.div>
        </div>

        {/* Sticky submit bar */}
        <div
          className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-[#D4A017]/20 px-4 sm:px-6 pt-3"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#A5432A] hover:bg-[#A5432A]/85 text-[#FAF3E3] rounded-lg py-3 font-medium transition-colors cursor-pointer shadow-md disabled:opacity-60"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            onClick={form.handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              t("submitting") + "..."
            ) : (
              <>
                <HiOutlineCheckCircle className="text-lg" />
                {edit ? t("updateProduct") : t("addProduct")}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </FormProvider>
  );
}
