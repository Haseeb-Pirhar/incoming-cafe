"use client";

import React from "react";
import { Button, Flex } from "@radix-ui/themes";
import { FormProvider } from "react-hook-form";
import { useForgotForm } from "./form";
import { FormInput } from "@/components/FormInput";
import { ForgotPasswordResponse } from "@/types";

const Forgotpassword = ({
  setCurrentStep,
  steps,
  forgetPassword,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>;
  steps: {
    FormForgot: string;
    OtpVerification: string;
    ResetPassword: string;
  };
  forgetPassword: (data: any) => Promise<ForgotPasswordResponse>;
}) => {
  const form = useForgotForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    const res = await forgetPassword(data);
    if (res?.error || !res?.data) {
      setCurrentStep(steps.FormForgot);
      return;
    }
    setCurrentStep(steps.OtpVerification);
  });
  return (
    <FormProvider {...form}>
      <Flex
        direction="column"
        width="100%"
        className="bg-white rounded-lg max-w-md"
      >
        <Flex direction="column" gap="4" className="my-2">
          <FormInput label="Email" field="email" />
        </Flex>

        <Flex gap="3" mt="6" justify="end">
          <Button
            className="cursor-pointer! bg-[#0090FF] px-4!"
            onClick={handleSubmit}
          >
            Send OTP
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export { Forgotpassword };
