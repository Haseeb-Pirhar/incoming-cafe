import { Pagination } from "./api";

export interface ProductVariant {
  name: string;
  value: string;
  priceAdjustment?: number;
  stock?: number;
  sku?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  category:
    | string
    | {
        _id: string;
        name: string;
      };
  media: string[];
  price: number;
  discountPrice?: number;
  stock: number;
  sku?: string;
  brand?: string;
  variants: ProductVariant[];
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductResponse {
  message: string;
  data: Product[];
  error: string | null;
  success: boolean;
  pagination: Pagination;
}

export interface TotalProductResponse {
  message: string;
  data: Product | Product[];
  pagination: Pagination;
}

export interface ResponseForProducts {
  state: boolean;
  error?: null | string;
  data: TotalProductResponse;
}
