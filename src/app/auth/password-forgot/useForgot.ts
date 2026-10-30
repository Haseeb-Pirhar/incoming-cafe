import {
  forgotPassword,
  resetPassword,
  resetVerifyOtp,
  storeForgotPassword,
  storeResetPassword,
  storeResetVerifyOtp,
} from "@/api/api-call/auth-api";
import { ForgotFormType } from "./schema";
import { OtpVerificationData, PasswordResetData } from "@/types";
import toast from "react-hot-toast";

const useForgot = () => {
  const onForgot = async (data: ForgotFormType) => {
    const result = await forgotPassword(data.email);
    if (result?.error || !result?.data) {
      toast.error(result?.error || "Request Failed");
      return;
    }
    toast.success(result?.data?.message || "OTP Sent Successfully");
    sessionStorage.setItem("email", data.email);

    return result;
  };

  const resetForgotPassword = async (data: ForgotFormType) => {
    const result = await resetPassword(data as PasswordResetData);
    if (result?.error || !result?.data) {
      toast.error(result?.error || "Password Reset failed");
      return;
    }
    toast.success(result?.data?.message || "Password Reset Successfully");
    sessionStorage.setItem("otp", data.otp || "");

    return result;
  };

  const verifyOtp = async (data: ForgotFormType) => {
    const result = await resetVerifyOtp({
      ...data,
      email: data.email,
    } as OtpVerificationData);
    if (result?.error || !result?.data) {
      toast.error(result?.error || "OTP Verification failed");
      return;
    }
    toast.success(result?.data?.message || "OTP Verified Successfully");
  };

  // ====================== forgot password for store ======================
  const onForgotStore = async (data: ForgotFormType) => {
    const result = await storeForgotPassword(data.email);
    if (result?.error || !result?.data) {
      toast.error(result?.error || "Request Failed");
      return;
    }
    toast.success(result?.data?.message || "OTP Sent Successfully");
    sessionStorage.setItem("email", data.email);

    return result;
  };

  const resetForgotPasswordStore = async (data: ForgotFormType) => {
    const result = await storeResetPassword(data as PasswordResetData);
    if (result?.error || !result?.data) {
      toast.error(result?.error || "Password Reset failed");
      return;
    }
    toast.success(result?.data?.message || "Password Reset Successfully");
    sessionStorage.setItem("otp", data.otp || "");

    return result;
  };

  const verifyOtpStore = async (data: ForgotFormType) => {
    const result = await storeResetVerifyOtp({
      ...data,
      email: data.email,
    } as OtpVerificationData);
    if (result?.error || !result?.data) {
      toast.error(result?.error || "OTP Verification failed");
      return;
    }
    toast.success(result?.data?.message || "OTP Verified Successfully");
  };
  // ====================== forgot password for store ======================

  return {
    onForgot,
    resetForgotPassword,
    verifyOtp,
    onForgotStore,
    resetForgotPasswordStore,
    verifyOtpStore,
  };
};

export { useForgot };
