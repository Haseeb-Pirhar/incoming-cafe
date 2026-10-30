"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import OnboardingLayout from "@/components/OnboardingLayout";
import OTPInput from "react-otp-input";
import { useRouter } from "next/navigation";
import { StoreResendOtp, verifyOtp } from "@/api/api-call/auth-api";
import toast from "react-hot-toast";

type FormData = {
  otp: string;
  email: string;
};
const VerifyOtpPage = () => {
  const { handleSubmit, control } = useForm<FormData>();
  const { push } = useRouter();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    const response = await verifyOtp({ ...data, email: email });
    if (response?.error || !response?.data) {
      toast.error(response?.error || "OTP Verification failed");
      return;
    }
    toast.success(response?.data?.message || "OTP Verified Successfully");
    localStorage.setItem("otp", data.otp);
    push("/signup/complete-profile");
  };

  const handleReSendOtp = async () => {
    const result = await StoreResendOtp(email);
    if (result?.error || !result?.data) {
      toast.error(result?.error || "OTP Resend failed");
      return;
    }
    toast.success(result?.data?.message || "OTP Resent Successfully");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <OnboardingLayout heading="Verify OTP">
          <Flex direction="column" gap="6" justify="between">
            <Flex direction="column" gap="6" justify="between">
              <Controller
                name="otp"
                control={control}
                defaultValue=""
                rules={{ required: "OTP is required" }}
                render={({ field, fieldState }) => (
                  <div className="flex justify-center flex-col items-center px-2 ">
                    <OTPInput
                      value={field.value}
                      onChange={field.onChange}
                      numInputs={6}
                      renderSeparator={
                        <span className="lg:mx-4 mx-2 md:mx-3 text-lg"></span>
                      }
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="border border-gray-300 rounded-md p-2 text-center !w-[2.5rem] !h-[2.3rem] lg:!w-[4.5rem] md:!w-[3rem] lg:!h-[2.6rem] text-lg focus:outline-none focus:border-blue-500"
                        />
                      )}
                    />
                    {fieldState.error && (
                      <p style={{ color: "red", marginTop: "4px" }}>
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Box
                onClick={handleReSendOtp}
                className="cursor-pointer underline text-blue-600 "
              >
                Resend OTP
              </Box>
            </Flex>
            <Flex direction="column" gap="2" align="center">
              <Box>
                <Button
                  variant="solid"
                  radius="full"
                  type="submit"
                  className="py-5! px-6! cursor-pointer! bg-[#F25822]! hover:bg-[#e14d18]! transition-colors min-w-48!"
                >
                  Confirm
                </Button>
              </Box>
            </Flex>
          </Flex>
        </OnboardingLayout>
      </form>
    </>
  );
};

export default VerifyOtpPage;
