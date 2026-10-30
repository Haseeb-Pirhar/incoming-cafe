export interface ISplashProduct {
  _id: string;
  name: string;
  slug: string;
  media: string[];
  price: number;
  discountPrice?: number;
  stock: number;
  isActive: boolean;
}

export interface ISplash {
  _id: string;
  title?: string;
  products: ISplashProduct[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SplashResponse {
  message: string;
  data: ISplash | null;
}

export interface ResponseForSplash {
  state: boolean;
  error?: string;
  data?: ISplash;
}
