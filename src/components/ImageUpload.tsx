"use client";

import React from "react";
import Image from "next/image";
import { Flex, Text } from "@radix-ui/themes";
import { useFormContext } from "react-hook-form";
import { Input } from "react-aria-components";
import { PlayCircle, Plus, X } from "lucide-react";

interface ImageUploadProps {
  field: string;
  isMultiple?: boolean;
  accept?: string;
}

type PreviewItem = {
  uri: string;
  type: string;
  fileName?: string;
  file?: File;
  isExisting?: boolean;
};

const ImageUpload = ({
  field,
  isMultiple = false,
  accept = ".jpg,.jpeg,.png,.mp4",
}: ImageUploadProps) => {
  const form = useFormContext();
  const fieldValue = form.watch(field);

  const mediaList: any[] = isMultiple
    ? Array.isArray(fieldValue) ? fieldValue : []
    : fieldValue ? [fieldValue] : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    let filesArray = Array.from(e.target.files);
    if (filesArray.length > 10) filesArray = filesArray.slice(0, 10);

    if (!isMultiple) {
      form.setValue(field as any, filesArray[0]);
    } else {
      form.setValue(field as any, [...mediaList, ...filesArray]);
    }
  };

  const removeMedia = (item: PreviewItem) => {
    if (!isMultiple) {
      form.setValue(field as any, null);
      return;
    }

    const updated = mediaList.filter((m) => {
      if (item.isExisting) return m?.uri !== item.uri;
      return m !== item.file;
    });

    form.setValue(field as any, updated);
  };

  const previews: PreviewItem[] = mediaList
    .map((m): PreviewItem | null => {
      if (!m) return null;

      if (m instanceof File) {
        return {
          uri: URL.createObjectURL(m),
          type: m.type,
          file: m,
          fileName: m.name,
          isExisting: false,
        };
      }

      if (m?.uri) {
        return {
          uri: m.uri,
          type: m.type,
          fileName: m.fileName,
          isExisting: true,
        };
      }

      return null;
    })
    .filter(Boolean) as PreviewItem[];

  const renderPreview = (item: PreviewItem, idx: number) => {
    const src = item?.uri;
    if (!src) return null;

    const isVideo =
      (typeof src === "string" && src.endsWith(".mp4")) ||
      (item?.type && item.type.includes("video"));

    return (
      <div
        key={idx}
        className="relative w-24 h-24 border rounded-md overflow-hidden"
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeMedia(item);
          }}
          className="absolute top-1 right-1 z-10 bg-black/60 text-white rounded-full p-1"
        >
          <X size={14} />
        </button>

        {isVideo ? (
          <>
            <video src={src} className="w-full h-full object-cover" />
            <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white" />
          </>
        ) : (
          <Image
            src={src}
            width={150}
            height={150}
            className="w-full h-full object-cover"
            alt="Preview"
          />
        )}
      </div>
    );
  };

  const placeholder = (
    <Flex
      justify="center"
      align="center"
      className="border w-24 h-24 rounded-md"
    >
      <Plus width={60} height={60} strokeWidth={1} />
    </Flex>
  );

  return (
    <Flex
      justify="center"
      align="center"
      gap="3"
      className="overflow-y-auto flex-wrap max-h-40"
    >
      <Text as="label" htmlFor={field} className="cursor-pointer">
        <Flex gap="2" wrap="wrap">
          {isMultiple ? (
            <>
              {placeholder}
              {previews.map((item, idx) => renderPreview(item, idx))}
            </>
          ) : previews[0] ? (
            renderPreview(previews[0], 0)
          ) : (
            placeholder
          )}
        </Flex>
      </Text>

      <Input
        type="file"
        id={field}
        accept={accept}
        multiple={isMultiple}
        onChange={handleFileChange}
        className="hidden"
      />
    </Flex>
  );
};

export { ImageUpload };