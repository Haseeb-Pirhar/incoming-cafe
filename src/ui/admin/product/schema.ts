import { z } from "zod";

const variantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  value: z.string().min(1, "Variant value is required"),
  priceAdjustment: z.number().optional(),
  stock: z.number().optional(),
  sku: z.string().optional(),
});

export const addProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be a positive number"),
  discountPrice: z.number().optional(),
  stock: z.number().min(0, "Stock must be a positive number"),
  sku: z.string().optional(),
  brand: z.string().optional(),
  variants: z.array(variantSchema).default([]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  media: z.any().optional(),
});

// Output type — what you get AFTER zod applies its .default()s during
// validation (e.g. variants is guaranteed to be an array here).
export type AddProductFormType = z.infer<typeof addProductSchema>;

// Input type — what react-hook-form actually holds in form state BEFORE
// validation runs (fields with .default() are optional here). useForm()
// must be typed with this one, not the output type above, or TypeScript
// will reject zodResolver with a Resolver<...> mismatch.
export type AddProductFormInput = z.input<typeof addProductSchema>;
