// "use server";

// import { API_URL } from "@/constants";
// import type {
//   AuthRequest,
//   AuthResponse,
//   PasswordResetData,
//   PasswordResetResponse,
//   ForgotPasswordResponse,
//   User,
//   SimpleResponse,
//   OtpVerificationData,
//   CompleteProfileResponse,
// } from "@/types";
// import { serverAction } from "../server-action";

// // Server action for login - runs on server, secure
// export const storeLogin = async (
//   data: AuthRequest,
// ): Promise<AuthResponse | null> => {
//   try {
//     const response = await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       console.error(
//         "Login failed:",
//         errorData.message || `HTTP ${response.status}`,
//       );
//       return null;
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error during login:", error);
//     return null;
//   }
// };

// export const login = async (
//   data: AuthRequest,
// ): Promise<AuthResponse | null> => {
//   try {
//     const response = await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       console.error(
//         "Login failed:",
//         errorData.message || `HTTP ${response.status}`,
//       );
//       return null;
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error during login:", error);
//     return null;
//   }
// };

// // Server action for logout - runs on server, secure
// export const logout = async (): Promise<boolean> => {
//   try {
//     const response = await fetch(`${API_URL}/auth/logout`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return response.ok;
//   } catch (error) {
//     console.error("Error during logout:", error);
//     return false;
//   }
// };

// // Server action for username validation
// export const validateUsername = async (username: string): Promise<boolean> => {
//   try {
//     const response = await fetch(
//       `${API_URL}/auth/register/username?username=${username}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//     return response.ok;
//   } catch (error) {
//     console.error("Error validating username:", error);
//     return false;
//   }
// };

// // Server action for registration
// export const register = async (data: AuthRequest) => {
//   try {
//     const response = await serverAction({
//       url: "/auth/register",
//       method: "POST",
//       body: data,
//     });

//     return response as SimpleResponse;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return null;
//   }
// };

// // Server action for OTP verification
// export const verifyOtp = async (data: OtpVerificationData) => {
//   try {
//     const response = await serverAction({
//       url: "/auth/otp-verify",
//       method: "POST",
//       body: data,
//     });

//     return response as SimpleResponse;
//   } catch (error) {
//     console.error("Error during OTP verification:", error);
//     return null;
//   }
// };

// // Server action for OTP resend
// export const StoreResendOtp = async (email: string) => {
//   try {
//     const response = await serverAction({
//       url: "/store-auth/otp-resend",
//       method: "POST",
//       body: { email },
//     });

//     return response as SimpleResponse;
//   } catch (error) {
//     console.error("Error during profile completion:", error);
//     return null;
//   }
// };

// // Server action for profile completion
// export const completeProfile = async (data: FormData) => {
//   try {
//     const response = await serverAction({
//       url: "/auth/profile-update",
//       method: "POST",
//       body: data,
//     });

//     return response as CompleteProfileResponse;
//   } catch (error) {
//     console.error("Error during profile completion:", error);
//     return null;
//   }
// };

// export const storeForgotPassword = async (email: string) => {
//   try {
//     const response = await serverAction({
//       url: "/store-auth/forgot-password-otp",
//       method: "POST",
//       body: { email },
//     });
//     return response as ForgotPasswordResponse;
//   } catch (error) {
//     console.error("Error during profile completion:", error);
//     return null;
//   }
// };

// export const storeResetVerifyOtp = async (data: OtpVerificationData) => {
//   try {
//     const response = await serverAction({
//       url: "/store-auth/otp-verify",
//       method: "POST",
//       body: data,
//     });

//     return response as SimpleResponse;
//   } catch (error) {
//     console.error("Error during profile completion:", error);
//     return null;
//   }
// };

// export const storeResetPassword = async (data: PasswordResetData) => {
//   try {
//     const response = await serverAction({
//       url: "/store-auth/reset-password",
//       method: "POST",
//       body: data,
//     });

//     return response as SimpleResponse;
//   } catch (error) {
//     console.error("Error during password reset:", error);
//     return null;
//   }
// };

// // ================= forgot password for admin ======================

// // Server action for forgot password
// export const forgotPassword = async (email: string) => {
//   try {
//     const response = await serverAction({
//       url: "/auth/forgot-password-otp",
//       method: "POST",
//       body: { email },
//     });
//     return response as ForgotPasswordResponse;
//   } catch (error) {
//     console.error("Error during profile completion:", error);
//     return null;
//   }
// };

// export const resendOtp = async (email: string) => {
//   try {
//     const response = await serverAction({
//       url: "/auth/otp-resend",
//       method: "POST",
//       body: { email },
//     });

//     return response as SimpleResponse;
//   } catch (error) {
//     console.error("Error during profile completion:", error);
//     return null;
//   }
// };

// // Server action for reset OTP verification
// export const resetVerifyOtp = async (data: OtpVerificationData) => {
//   try {
//     const response = await serverAction({
//       url: "/auth/otp-verify",
//       method: "POST",
//       body: data,
//     });
//     return response as SimpleResponse;
//   } catch (error) {
//     console.error("Error during profile completion:", error);
//     return null;
//   }
// };

// // Server action for password reset
// export const resetPassword = async (data: PasswordResetData) => {
//   try {
//     const response = await serverAction({
//       url: "/auth/reset-password",
//       method: "POST",
//       body: data,
//     });

//     return response as SimpleResponse;
//   } catch (error) {
//     console.error("Error during password reset:", error);
//     return null;
//   }
// };

// // ================= forgot password for admin ======================

// export const changePassword = async (
//   data: PasswordResetData,
// ): Promise<PasswordResetResponse | null> => {
//   try {
//     const response = await serverAction({
//       url: `/profile/change-password`,
//       method: "PUT",
//       body: data,
//     });
//     if (!response.state) {
//       console.error("Password reset failed:", response.error);
//       return null;
//     }

//     return (await response.data) as PasswordResetResponse;
//   } catch (error) {
//     console.error("Error during password reset:", error);
//     return null;
//   }
// };

// export const storeChangePassword = async (
//   data: PasswordResetData,
// ): Promise<PasswordResetResponse | null> => {
//   try {
//     const response = await serverAction({
//       url: `/store-profile/change-password`,
//       method: "PUT",
//       body: data,
//     });
//     if (!response.state) {
//       console.error("Password reset failed:", response.error);
//       return null;
//     }

//     return (await response.data) as PasswordResetResponse;
//   } catch (error) {
//     console.error("Error during password reset:", error);
//     return null;
//   }
// };

// export const updateProfile = async (data: FormData): Promise<User | null> => {
//   try {
//     const response = await serverAction({
//       url: "/store-profile/update-profile",
//       method: "PUT",
//       body: data,
//     });

//     if (response.state && response.data) {
//       const userData = (response.data as { data: User }).data;
//       return userData || null;
//     }

//     return null;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return null;
//   }
// };

// interface Currency {
//   state: boolean;
//   error?: null | string;
//   data?: {
//     message: string;
//   };
// }

// export const updateCurrency = async (currency: string) => {
//   try {
//     const response = await serverAction({
//       url: "/store-profile/update-currency",
//       method: "PUT",
//       body: { currency },
//     });

//     return response as Currency;
//   } catch (error) {
//     console.error("Error updating currency:", error);
//     return null;
//   }
// };

// export const updateSuperAdminProfile = async (
//   data: FormData,
// ): Promise<User | null> => {
//   try {
//     const response = await serverAction({
//       url: "/profile",
//       method: "PUT",
//       body: data,
//     });

//     if (response.state && response.data) {
//       const userData = (response.data as { data: User }).data;
//       return userData || null;
//     }

//     return null;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return null;
//   }
// };

// // Remove the object export - only export individual functions in "use server" files
