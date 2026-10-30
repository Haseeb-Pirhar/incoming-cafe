import { Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useForgot } from "./useForgot";
import { useForgotForm } from "./form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/FormInput";
import { ForgotFormType } from "./schema";
import { SimpleResponse } from "@/types";

const ResetPassword = ({
  resetPassword,
}: {
  resetPassword: (data: ForgotFormType) => Promise<SimpleResponse>;
}) => {
  const { resetForgotPassword } = useForgot();
  const form = useForgotForm();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  useEffect(() => {
    (() => {
      const storedEmail = sessionStorage.getItem("email");
      const storedOtp = sessionStorage.getItem("otp");
      form.setValue("email", storedEmail || "");
      form.setValue("otp", storedOtp || "");
      if (storedEmail && storedOtp) {
        setEmail(storedEmail);
        setOtp(storedOtp);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = form.handleSubmit(async (data) => {
    const res = await resetPassword({ ...data, email: email, otp: otp });
    if (res?.data || !res?.error) {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("otp");
      window.location.reload();
    }
  });

  return (
    <FormProvider {...form}>
      <Flex
        direction="column"
        width="100%"
        className="bg-white rounded-lg max-w-md"
      >
        <Flex direction="column" gap="4" className="my-2">
          <FormInput
            label="New Password"
            field="newPassword"
            type="password"
            eye
          />
        </Flex>

        <Flex gap="3" mt="6" justify="end">
          <Button
            className="cursor-pointer! bg-[#0090FF] px-4!"
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default ResetPassword;
