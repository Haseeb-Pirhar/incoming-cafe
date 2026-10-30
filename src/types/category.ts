/** Mirrors the backend ICategory schema (models/Category.ts).
 * _id / parent / ancestors are strings on the frontend since ObjectIds
 * are serialized to hex strings over the API. `parent` may come back
 * populated (an object) on GET requests — see the union type below. */
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string | Category | null;
  ancestors?: string[];
  isActive: boolean;
  sortOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryResponse {
  state: boolean;
  error?: string;
  data?: Category;
  message?: string;
}
