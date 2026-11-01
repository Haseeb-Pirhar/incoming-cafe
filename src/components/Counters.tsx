"use client";
import { Text } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const Counters = ({ field, label }: any) => {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  // Ensure field is registered
  useEffect(() => {
    register(field, { valueAsNumber: true });
    if (watch(field) === undefined) {
      setValue(field, 0);
    }
  }, [field, register, setValue, watch]);

  const value = watch(field) || 0;
  const rawError = errors[field]?.message;
  const error = typeof rawError === "number" ? rawError : undefined;

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between items-center mb-1 w-full">
        <Text className="text-sm !text-[#7D7F88]">{label}</Text>
        <div className="flex items-center gap-2 justify-between lg:w-[28%] w-[35%] md:w-[30%]">
          <button
            type="button"
            onClick={() => setValue(field, Math.max(0, value - 1))}
            className={`border-[1.8px] rounded-full px-2 ${value !== 0
                ? "border-black text-black cursor-pointer"
                : "border-[#7D7F88] text-[#7D7F88]"
              }`}
          >
            −
          </button>
          <Text className="text-sm ">

          </Text>
          <button
            type="button"
            onClick={() => setValue(field, value + 1)}
            className="border-[1.8px] rounded-full px-2  border-black text-black cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {error && (
        <Text className="text-sm text-red-500 mt-1 block">{error}</Text>
      )}
    </div>
  );
};

export default Counters;
