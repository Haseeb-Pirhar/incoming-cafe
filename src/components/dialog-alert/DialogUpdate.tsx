import React from "react";
import { Dialog } from "@radix-ui/themes";
import { VscChromeClose } from "react-icons/vsc";
import { Pencil } from "lucide-react";

const DialogUpdate = ({ optimisticallyUpdate, type, data, id }: any) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer! relative!">
        <div className="p-2 rounded-full hover:bg-[#D4A017]/80 bg-[#D4A017] transition shadow-sm">
          <Pencil size="1rem" color="#2F4F3E" />
        </div>
      </Dialog.Trigger>
      <Dialog.Content
        size="2"
        height="700px"
        className="!bg-[#FAF3E3] !border !border-[#D4A017]/30"
      >
        <Dialog.Title
          className="!text-[#2F4F3E]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {type}
        </Dialog.Title>
        <Dialog.Close className="absolute top-4 right-5 z-50 cursor-pointer">
          <VscChromeClose size="1.2rem" color="#2F4F3E" fontWeight="bold" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogUpdate;
