export interface CartItem {
  productId: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  stock?: number;
  category?: string;
}

export interface Cart {
  _id?: string;
  userId?: string;
  items: CartItem[];
  totalItems?: number;
  totalPrice?: number;
}

export const emptyCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};
