import { z } from "zod";

export const completeProfileSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  dob: z.any().optional(),
  image: z.any(),
  coverImage: z.any(),
  otp: z.string(),
  phone: z
    .string()
    .regex(/^\+\d{11,13}$/, {
      message:
        "Phone number must start with a country code (e.g., +96) and contain 11-13 digits",
    })
    .refine(
      (val) =>
        val.replace(/\D/g, "").length >= 11 &&
        val.replace(/\D/g, "").length <= 13,
      {
        message: "Phone number must have 11-13 digits (including country code)",
      },
    ),
  fullName: z.string().min(1, { message: "Store name is required" }),
  storeName: z.string().optional(),
  username: z.string().min(1, { message: "Username is required" }),
  gender: z.string().optional(),
  interests: z.string().optional(),
  country: z.string().optional(),
  currency: z.string().min(1, "Currency is required"),
  state: z.string().optional(),
  zip: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
});

export type CompleteProfileFormType = z.infer<typeof completeProfileSchema>;
