import { Pagination } from "./api";
import { User } from "./user";

export interface Location {
  latitude: number;
  longitude: number;
}

export type RecentItem = {
  _id: string;
  title: string;
  name: string;
  owner: string;
  description: string;
  location: Location;
  address: string;
  category: string;
  city: string;
  condition: string;
  country: string;
  listingType: "Property" | "Vehicle" | "Marketplace";
  media: string[];
  price: number;
  state: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  area?: number;
  interiorFeatures?: any[];
  kitchenAppliances?: any[];
  outdoorFeatures?: any[];
  type?: string;
  comfort?: string[];
  ecofriendly?: string[];
  feature?: boolean;
  manufacturer?: string;
  model?: string;
  modelYear?: string;
  safety?: string[];
};

export interface Likes {
  _id: string;
  item: RecentItem;
  owner: User;
  type: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RecentItemsResponse {
  message: string;
  data: RecentItem[];
  pagination: Pagination;
}

export interface LikesResponse {
  data: Likes[];
}
