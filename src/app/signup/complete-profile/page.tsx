"use client";

import React, { useEffect } from "react";
import { Box, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useCompleteProfile } from "./useCompleteProfile";
import { useCompleteProfileForm } from "./form";
import { FormProvider } from "react-hook-form";
import OnboardingLayout from "@/components/OnboardingLayout";
import { ImageUpload } from "@/components/ImageUpload";
import { FormInput } from "@/components/FormInput";
import LocationInput from "@/components/LocationInput";
import { SelectDropdown } from "@/components/Select";

const CompleteProfilePage = () => {
  const { onCompleteProfile } = useCompleteProfile();
  const form = useCompleteProfileForm();

  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem("email");
    const otpFromLocalStorage = localStorage.getItem("otp");
    form.setValue("email", emailFromLocalStorage || "");
    form.setValue("otp", otpFromLocalStorage || "");
  }, []);

  return (
    <>
      <FormProvider {...form}>
        <OnboardingLayout>
          <Flex direction="column" gap="6" justify="between">
            {/* Images */}
            <Flex gap="6" justify="center" className="w-full">
              <Box className="flex flex-col items-center gap-2">
                <Text size="2" weight="medium">
                  Profile Image
                </Text>
                <ImageUpload
                  field="image"
                  accept=".jpg,.jpeg,.png"
                />
              </Box>

              <Box className="flex flex-col items-center gap-2">
                <Text size="2" weight="medium">
                  Cover Image
                </Text>
                <ImageUpload field="coverImage" accept=".jpg,.jpeg,.png" />
              </Box>
            </Flex>

            {/* Form fields */}
            <Box className=" mx-auto w-full bg-white rounded-xl p-6 shadow-sm">
              <Grid columns={{ xs: "1", sm: "2", md: "2" }} gap="4">
                <FormInput
                  label="Email"
                  field="email"
                  disabled
                  className="mb-4"
                />
                <FormInput
                  label="Username"
                  field="username"
                  placeHolder="Enter User Name"
                />
                <FormInput
                  label="Store Name"
                  field="fullName"
                  placeHolder="Enter Full Name"
                />
                <FormInput
                  label="Phone Number"
                  field="phone"
                  placeHolder="(e.g., +911234567890)"
                />
                <FormInput
                  label="Address"
                  field="address"
                  placeHolder="Enter Full Address"
                />
                <SelectDropdown
                  options={[
                    {
                      label: "Syria (SYP £)",
                      value: "SYP",
                    },
                    {
                      label: "United States (USD $)",
                      value: "USD",
                    },
                    {
                      label: "Turkey (TRY ₺)",
                      value: "TRY",
                    },
                    {
                      label: "Eurozone (EUR €)",
                      value: "EUR",
                    },
                    {
                      label: "Kuwait (KWD د.ك)",
                      value: "KWD",
                    },
                    {
                      label: "Saudi Arabia (SAR ﷼)",
                      value: "SAR",
                    },
                    {
                      label: "United Arab Emirates (AED د.إ)",
                      value: "AED",
                    },
                    {
                      label: "Qatar (QAR ر.ق)",
                      value: "QAR",
                    },
                    {
                      label: "Oman (OMR ر.ع.)",
                      value: "OMR",
                    },
                    {
                      label: "Jordan (JOD د.ا)",
                      value: "JOD",
                    },
                    {
                      label: "Egypt (EGP £)",
                      value: "EGP",
                    },
                  ]}
                  heading="Currency"
                  field="currency"
                  placeHolder="Select Currency"
                  type="dropdown"
                />{" "}
              </Grid>
            </Box>
            {/* Actions */}
            <div className="flex justify-center mt-4">
              <Button
                variant="solid"
                radius="full"
                onClick={form.handleSubmit(onCompleteProfile)}
                className="py-5! px-6! cursor-pointer! bg-[#F25822]! hover:bg-[#e14d18]! transition-colors w-fit!"
              >
                Save & Continue
              </Button>
            </div>
          </Flex>
        </OnboardingLayout>
      </FormProvider>
    </>
  );
};

export default CompleteProfilePage;
