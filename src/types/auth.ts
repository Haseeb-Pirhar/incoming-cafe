import { User, UserResponse } from "./user";

interface AuthRequest {
  email: string;
  password: string;
}

export interface SimpleResponse {
  state: boolean;
  data?: { message: string };
  error?: string;
}

interface AuthResponse {
  message: string;
  data: User;
}
interface CompleteProfileResponse {
  state: boolean;
  data?: UserResponse;
  error?: string;
}

interface AuthCookies {
  user: User;
  accessToken: string;
}

// Profile completion types
interface ProfileUpdateData {
  fullName?: string;
  username?: string;
  city?: string;
  dob?: string;
  interests?: string[];
  image?: File;
}

interface ProfileUpdateResponse {
  message: string;
  data: User;
}

// Password reset types
interface PasswordResetData {
  email: string;
  otp: string;
  newPassword: string;
}

interface PasswordResetResponse {
  message: string;
  success: boolean;
}

// OTP verification types
interface OtpVerificationData {
  email: string;
  otp: string;
  newEmail?: string; // Optional for email change verification
}

interface OtpVerificationResponse {
  message: string;
  success: boolean;
  data?: User;
}

// Forgot password types
interface ForgotPasswordResponse {
  state: boolean;
  data?: UserResponse;
  error?: string;
}

export type {
  User,
  AuthRequest,
  AuthResponse,
  CompleteProfileResponse,
  AuthCookies,
  ProfileUpdateData,
  ProfileUpdateResponse,
  PasswordResetData,
  PasswordResetResponse,
  OtpVerificationData,
  OtpVerificationResponse,
  ForgotPasswordResponse,
};
