export interface Location {
  latitude: number;
  longitude: number;
  coordinates?: [number, number];
}
export interface User {
  country: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  isVerified: boolean;
  currency: string;
  _id: string;
  email: string;
  interests: string[];
  otp: string;
  otpExpires: string;
  type: "normal" | "business" | "admin" | "superAdmin" | "social";
  location?: Location;
  phone: string;
  channels: string[];
  createdAt: string;
  updatedAt: string;
  city: string;
  dob: string;
  fullName: string;
  image: string;
  coverImage?: string;
  username: string;
  device: string;
  platform: string;
  token: string;
  address?: string;
  cartEnabled: boolean;
}

export interface UserResponse {
  message: string;
  data: User;
}
