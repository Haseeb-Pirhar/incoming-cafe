import { Button, Dialog, Flex, Text, VisuallyHidden } from "@radix-ui/themes";
import React from "react";
import { BsTrash3 } from "react-icons/bs";

interface DialogDeleteProps {
  func: () => void;
  type: string;
  label?: string;
  button?: React.ReactNode;
}

const DialogDelete = ({
  func,
  type,
  label = "Delete",
  button = (
    <Button className="text-sm capitalize !min-w-[30%] cursor-pointer border-none px-3 py-1 !rounded-md font-medium !bg-[#A5432A] !text-[#FAF3E3] hover:!bg-[#A5432A]/85">
      {label}
    </Button>
  ),
}: DialogDeleteProps) => {
  const t = (key: string) => {
    const translations: Record<string, string> = {
      delete: "Delete",
      deleteDescription: "Are you sure you want to delete this",
      cancel: "Cancel",
    };
    return translations[key] || key;
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="!cursor-pointer !relative">
        {button}
      </Dialog.Trigger>
      <Dialog.Content
        size="3"
        maxWidth="430px"
        className="!bg-[#FAF3E3] !border !border-[#D4A017]/30"
      >
        <VisuallyHidden>
          <Dialog.Title>
            {t("delete")} {type}
          </Dialog.Title>
        </VisuallyHidden>
        <Flex
          align="center"
          justify="center"
          className="!w-12 !h-12 !rounded-full !bg-[#A5432A]/10 !mx-auto mb-4"
        >
          <BsTrash3 size="1.5rem" color="#A5432A" fontWeight="bold" />
        </Flex>
        <div>
          <Text as="p" trim="both" size="2" className="!text-[#2F4F3E]">
            {t("deleteDescription")} <strong>{type}</strong>?
          </Text>

          <Flex gap="3" mt="6" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                className="!cursor-pointer !bg-[#2F4F3E]/10 !text-[#2F4F3E]"
              >
                {t("cancel")}
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                variant="classic"
                className="!cursor-pointer !bg-[#A5432A] !text-[#FAF3E3]"
                onClick={func}
              >
                {t("delete")} {type}
              </Button>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogDelete;
