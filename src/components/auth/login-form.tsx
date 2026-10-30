"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { setClientAuthCookies } from "@/utils/client-cookies";
import { useAuthStore } from "@/store/profileStore";
import { AuthResponse, ForgotPasswordResponse, SimpleResponse } from "@/types";
import Link from "next/link";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PasswordForgotDialog from "@/app/auth/password-forgot/dialog";
import { useForgot } from "@/app/auth/password-forgot/useForgot";
import { ForgotFormType } from "@/app/auth/password-forgot/schema";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  api,
}: {
  api: (data: LoginFormData) => Promise<AuthResponse | null>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const {
    onForgot,
    resetForgotPassword,
    verifyOtp,
    onForgotStore,
    resetForgotPasswordStore,
    verifyOtpStore,
  } = useForgot();

  const forget = async (data: ForgotFormType) => {
    const res = await onForgot(data);
    return res as ForgotPasswordResponse;
  };

  const resetPasswordFunc = async (data: ForgotFormType) => {
    const res = await resetForgotPassword(data);
    return res as SimpleResponse;
  };

  const verifyOtpFunc = async (data: ForgotFormType) => {
    const res = await verifyOtp(data);
    return res as unknown as SimpleResponse;
  };

  // =================== forgot password for store ======================
  const forgetStore = async (data: ForgotFormType) => {
    const res = await onForgotStore(data);
    return res as ForgotPasswordResponse;
  };

  const resetPasswordFuncStore = async (data: ForgotFormType) => {
    const res = await resetForgotPasswordStore(data);
    return res as SimpleResponse;
  };

  const verifyOtpFuncStore = async (data: ForgotFormType) => {
    const res = await verifyOtpStore(data);
    return res as unknown as SimpleResponse;
  };
  // =================== forgot password for store ======================
  // Added show password state
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the real auth API
      const authResponse = await api(data);

      if (authResponse && authResponse.data) {
        const user = authResponse.data;
        setUser(user);
        setToken(user.token || null);
        // Set cookies with the real user data
        setClientAuthCookies({
          user,
          accessToken: user.token || `token_${Date.now()}`,
        });

        // Redirect based on user type
        if (user.type === "superAdmin") {
          router.push("/super-admin/dashboard");
        } else if (user.type === "admin") {
          router.push("/admin/dashboard");
        } else if (user.type === "business") {
          router.push("/store");
        } else if (user.type === "normal") {
          router.push("/public");
        } else {
          router.push("/");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-transparent! my-4 p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Welcome to Bakra Bazaar
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`${
                errors.email ? "border-red-500" : ""
              } border border-[#FA5F38]`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            {/* Password input with show/hide toggle */}
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={`${
                  errors.password ? "border-red-500" : ""
                } border border-[#FA5F38] pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer! absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="flex justify-between items-center w-full mt-4 flex-wrap gap-2 lg:flex-row md:flex-row sm:flex-row flex-col-reverse">
          {pathname === "/auth/store-login" && (
              <Link
                href={`/signup`}
                className=" text-[#4b1406] hover:underline  block text-center font-bold"
              >
                Register your Store{" "}
              </Link>
          )}
          <PasswordForgotDialog
            forgetPassword={
              pathname === "/auth/store-login" ? forgetStore : forget
            }
            verifyOtp={
              pathname === "/auth/store-login"
                ? verifyOtpFuncStore
                : verifyOtpFunc
            }
            resetPassword={
              pathname === "/auth/store-login"
                ? resetPasswordFuncStore
                : resetPasswordFunc
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
