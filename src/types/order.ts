export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user?: { _id: string; name?: string; email?: string } | string | null;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress?: string;
  source: "user" | "guest";
  customerName?: string;
  whatsapp?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}
