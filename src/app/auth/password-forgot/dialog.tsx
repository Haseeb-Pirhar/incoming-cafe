"use client";
import React, { useState } from "react";
import { Dialog, Text } from "@radix-ui/themes";
import { Forgotpassword } from "./password-forgot";
import ResetPassword from "./password-reset";
import OtpVerify from "./password-otpVerify";
import { VscChromeClose } from "react-icons/vsc";
import { ForgotPasswordResponse, SimpleResponse } from "@/types";
import { ForgotFormType } from "./schema";

const PasswordForgotDialog = ({
  forgetPassword,
  verifyOtp,
  resetPassword,
}: {
  forgetPassword: (data: ForgotFormType) => Promise<ForgotPasswordResponse>;
  verifyOtp: (data: ForgotFormType) => Promise<SimpleResponse>;
  resetPassword: (data: ForgotFormType) => Promise<SimpleResponse>;
}) => {
  const STEPS = {
    FormForgot: "FormForgot",
    OtpVerification: "OtpVerification",
    ResetPassword: "ResetPassword",
  };
  const [currentStep, setCurrentStep] = useState<string>(STEPS.FormForgot);
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Text className="underline cursor-pointer">Forgot Password?</Text>
      </Dialog.Trigger>
      <Dialog.Content className="flex justify-center items-center flex-col min-h-fit">
        <Dialog.Close className="absolute top-4 right-5 z-50 cursor-pointer">
          <VscChromeClose
            size="1.2rem"
            color="black"
            fontWeight="bold"
            onClick={() => setCurrentStep(STEPS.FormForgot)}
          />
        </Dialog.Close>
        <Dialog.Title weight="bold" size="5" align="center">
          Reset Password
        </Dialog.Title>

        {currentStep === STEPS.FormForgot && (
          <Forgotpassword
            setCurrentStep={setCurrentStep}
            steps={STEPS}
            forgetPassword={forgetPassword}
          />
        )}
        {currentStep === STEPS.OtpVerification && (
          <OtpVerify
            setCurrentStep={setCurrentStep}
            steps={STEPS}
            verifyOtp={verifyOtp}
          />
        )}
        {currentStep === STEPS.ResetPassword && (
          <ResetPassword resetPassword={resetPassword} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PasswordForgotDialog;
