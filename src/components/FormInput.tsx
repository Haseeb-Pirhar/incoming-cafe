"use client";
import React, { useEffect, useState } from "react";
import { TextField, Text, Flex, Checkbox } from "@radix-ui/themes";
import { useFormContext, Controller } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { validateUsername } from "@/api/api-call/auth-api";
import { BsPatchCheck, BsPatchExclamation } from "react-icons/bs";

interface FormInputProps {
  label?: string;
  type?: "text" | "password" | "number" | "date" | "textarea" | "search" | "checkbox";
  field: string;
  value?: string;
  required?: boolean;
  autoFocus?: boolean;
  placeHolder?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  eye?: boolean;
  minDateField?: string;
  maxDateField?: string;
  noPastDate?: boolean;
  rows?: number;
}

const FormInput = ({
  label,
  type = "text",
  field,
  value,
  required = true,
  autoFocus,
  placeHolder,
  disabled,
  className,
  maxLength,
  eye = false,
  minDateField,
  maxDateField,
  noPastDate = false,
  rows = 4,
}: FormInputProps) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [isUsernameValid, setisUsernameValid] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const form = useFormContext();

  const isPasswordType = type === "password" && eye;
  const toggleVisibility = () => setHidePassword(!hidePassword);

  const minDate = minDateField ? form.watch(minDateField) : undefined;
  const maxDate = maxDateField ? form.watch(maxDateField) : undefined;
  const today = new Date().toISOString().split("T")[0];

  const commonProps = {
    required,
    autoFocus,
    placeholder: placeHolder,
    disabled,
    maxLength,
    className: `w-full  border-[#D0DAEE] border-[0.5px] rounded-lg text-sm ${className || ""
      }`,
    ...(type === "number"
      ? form.register(field, { valueAsNumber: true })
      : form.register(field)),
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(form.watch(field));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [form.watch(field)]);

  useEffect(() => {
    const validate = async () => {
      const value = form.watch(field);
      if (field === "username" && value) {
        const response = await validateUsername(value);
        setisUsernameValid(response ? "valid" : "invalid");

        if (response === false) {
          form.setError(field, {
            type: "manual",
            message: response ? "" : "Username is already taken",
          });
        } else {
          form.clearErrors(field);
        }
      }
    };
    validate();
  }, [debouncedValue]);

  if (type === "checkbox") {
    return (
      <div className="flex flex-col gap-2">
        <Flex gap="2" align="center" className="w-fit">
          <Controller
            name={field}
            control={form.control}
            render={({ field: { value, onChange } }) => (
              <>
                <Checkbox
                  checked={value || false}
                  onCheckedChange={onChange}
                  disabled={disabled}
                  className={`cursor-pointer! ${className}`}
                  color="orange"
                  size="2"
                />
                <Text
                  as="label"
                  size="2"
                  className="cursor-pointer select-none"
                  onClick={() => {
                    if (!disabled) {
                      const currentValue = form.watch(field);
                      form.setValue(field, !currentValue);
                    }
                  }}
                >
                  {label}
                </Text>
              </>
            )}
          />
        </Flex>

      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Text
          htmlFor={field}
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          {label}
        </Text>
      )}
      <Flex
        direction="column"
        justify="center"
        align="center"
        className="relative w-full"
      >
        {type === "textarea" ? (
          <textarea
            {...commonProps}
            rows={rows}
            value={form.watch(field) ?? value ?? ""}
          />
        ) : (
          <TextField.Root
            type={isPasswordType ? (hidePassword ? "password" : "text") : type}
            {...form.register(field)}
            defaultValue={value ?? ""}
            size="3"
            placeholder={placeHolder}
            disabled={disabled}
            min={
              type === "date"
                ? minDate || (noPastDate ? today : undefined)
                : undefined
            }
            max={type === "date" ? maxDate : undefined}
            className={`w-full border-[#D0DAEE] !border-[0.5px] outline-none rounded-lg text-sm ${className}`}
          />
        )}
        {isUsernameValid && form.watch(field) && !disabled && (
          <Text
            align="left"
            className={`absolute right-3 text-sm  ${isUsernameValid === "valid" ? "text-green-500" : "text-red-500"
              }`}
          >
            {isUsernameValid === "valid" ? (
              <BsPatchCheck size="1rem" />
            ) : (
              <Flex align="center" gap="1">
                <BsPatchExclamation size="1rem" /> username taken
              </Flex>
            )}
          </Text>
        )}
        {isPasswordType && (
          <Flex
            className="absolute right-3 cursor-pointer text-gray-500"
            onClick={toggleVisibility}
          >
            {!hidePassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export { FormInput };
