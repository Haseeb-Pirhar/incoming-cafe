import React from "react";
import { Select, Text } from "@radix-ui/themes";
import { useFormContext } from "react-hook-form";
import { FormFieldError } from "@/components/form";

const SelectDropdown = ({
  options,
  field,
  placeHolder,
  heading,
  isdisabled,
  type = "dropdown",
}: any) => {
  const form = useFormContext();
  const value = form.watch(field);

  return (
    <>
      {type === "dropdown" && (
        <div className="flex flex-col gap-2">
          {heading && (
            <Text className="text-sm mb-1" weight="medium">
              {heading}
            </Text>
          )}
          <Select.Root
            size="3"
            value={value}
            onValueChange={(val) => form.setValue(field, val)}
            disabled={isdisabled}
          >
            <Select.Trigger
              placeholder={placeHolder}
              className="!w-full !cursor-pointer"
            />
            <Select.Content
              position="popper"
              highContrast
              // Radix portals this to document.body by default.
              // If a modal/dialog above it has a higher stacking
              // context, the content renders BEHIND it and looks
              // like "the dropdown doesn't show". Force it above.
              className="!w-full !cursor-pointer !z-[9999]"
              style={{ zIndex: 9999 }}
            >
              {options.map((option: any, index: number) => (
                <Select.Item
                  key={index}
                  value={option.value}
                  className="!cursor-pointer"
                >
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <FormFieldError name={field} className="text-red-500" />
        </div>
      )}

      {type === "selectoption" && (
        <div className="flex flex-col gap-2">
          <Text className="text-sm mb-1" weight="medium">
            {placeHolder}
          </Text>
          <div className="flex gap-2 flex-wrap">
            {options.map((option: any) => (
              <button
                key={option.value}
                type="button"
                onClick={() => form.setValue(field, option.value)}
                className={`px-4 py-1.5 text-sm rounded-full cursor-pointer border-[#D0DAEE] border-[0.5px] ${
                  value === option.value
                    ? "bg-[#F65A26] text-white"
                    : "bg-[#F2F2F3] text-gray-700 "
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <FormFieldError name={field} className="text-red-500" />
        </div>
      )}
    </>
  );
};

export { SelectDropdown };
