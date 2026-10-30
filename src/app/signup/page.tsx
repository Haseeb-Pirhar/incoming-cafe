"use client";

import React from "react";
import Link from "next/link";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useSignupForm } from "./form";
import { FormProvider } from "react-hook-form";
import OnboardingLayout from "@/components/OnboardingLayout";
import { useSignup } from "./useSignup";
import { FormInput } from "@/components/FormInput";

const SignupPage = () => {
  const { onSignup } = useSignup();
  const form = useSignupForm();

  return (
    <>
      <FormProvider {...form}>
        <OnboardingLayout>
          <Flex direction="column" gap="6" justify="between">
            <Flex direction="column" gap="4" justify="between">
              <FormInput label="Email" field="email" placeHolder="Enter your email"/>
              <FormInput
                label="Password"
                field="password"
                type="password"
                placeHolder="Enter your password"
                eye
              />
            </Flex>
            <Flex direction="column" gap="2" align="center">
              <Box>
                <Button
                  variant="solid"
                  radius="full"
                  onClick={form.handleSubmit(onSignup)}
                  className="py-5! px-6! cursor-pointer! bg-[#F25822]! hover:bg-[#e14d18]! transition-colors min-w-48!"
                >
                  Signup
                </Button>
              </Box>
              <Text>
                Already have an account?
                <Link href="/auth/store-login" className="underline font-bold">
                  {" "}
                  Login
                </Link>
              </Text>
            </Flex>
          </Flex>
        </OnboardingLayout>
      </FormProvider>
    </>
  );
};

export default SignupPage;
