import { Box, Button, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { useForgotForm } from "./form";
import { OtpVerificationData, SimpleResponse } from "@/types";
import {
  resendOtp,
  resetVerifyOtp,
  StoreResendOtp,
} from "@/api/api-call/auth-api";
import { ForgotFormType } from "./schema";
import toast from "react-hot-toast";
import { useForgot } from "./useForgot";
import { usePathname } from "next/navigation";

type FormData = {
  otp: string;
  email: string;
};

const OtpVerify = ({
  setCurrentStep,
  steps,
  verifyOtp,
}: {
  verifyOtp: (data: ForgotFormType) => Promise<SimpleResponse>;
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>;
  steps: {
    FormForgot: string;
    OtpVerification: string;
    ResetPassword: string;
  };
}) => {
  const { handleSubmit, control } = useForm<FormData>();
  const form = useForgotForm();
  const [email, setEmail] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    (() => {
      const storedEmail = sessionStorage.getItem("email");
      form.setValue("email", storedEmail || "");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: ForgotFormType) => {
    await verifyOtp({
      ...data,
      email: email,
    } as OtpVerificationData);
    sessionStorage.setItem("otp", data.otp || "");
    setCurrentStep(steps.ResetPassword);
  };

  const handleReSendOtp = async () => {
    const result =
      pathname === "/auth/store-login"
        ? await StoreResendOtp(email)
        : await resendOtp(email);
    if (result?.error || !result?.data) {
      toast.error(result?.error || "Request Failed");
      return;
    }
    toast.success(result?.data?.message || "OTP Resent Successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="5" justify="between">
        <Flex direction="column" gap="5" justify="between">
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
                  renderSeparator={<span className="mx-2  text-lg"></span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="border border-gray-300 rounded-md p-2 text-center w-10! h-[2.3rem]! lg:w-18! md:w-12! lg:h-[2.6rem]! text-lg focus:outline-none focus:border-blue-500"
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
          <Box>
            <div
              onClick={handleReSendOtp}
              className="cursor-pointer! w-fit border px-2 py-1 rounded-md bg-blue-900 text-white hover:bg-blue-800"
            >
              Resend OTP
            </div>
          </Box>
        </Flex>
        <Flex direction="column" gap="2" align="center">
          <Box>
            <Button
              variant="solid"
              radius="full"
              className="min-w-48! px-2! py-5! cursor-pointer!"
              type="submit"
            >
              Confirm
            </Button>
          </Box>
        </Flex>
      </Flex>
    </form>
  );
};

export default OtpVerify;
