"use client";

import React from "react";
import toast, { Toast } from "react-hot-toast";
import { TOAST_STYLES } from "./styles";
import { ProfileImage } from "../profile-image";

export type ToastType = "success" | "error" | "warning" | "info";

// const TOAST_ICONS: Record<ToastType, React.FC> = {
//   success: SuccessToastSvg,
//   error: ErrorToastSvg,
//   warning: WarningToastSvg,
//   info: InfoToastSvg,
// };

interface CustomToastProps {
  t: Toast;
  type: ToastType;
  title?: string;
  message?: string;
  image?: string;
  onClick?: () => void;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  t,
  type,
  title,
  message,
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-[300px] p-2 rounded-md border flex justify-between shadow-sm cursor-pointer ${TOAST_STYLES[type]}`}
    >
      <div className="flex w-full">
        <div className="flex items-center flex-1">
          <ProfileImage size={40} imageUrl={image} />
          <div className="mx-3 flex-1">
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            <p className="text-sm text-gray-800">
              {message && message.length > 30
                ? message.slice(0, 30) + "..."
                : message}
            </p>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering onClick
            toast.dismiss(t.id);
          }}
          className="text-gray-400 hover:text-gray-600 mt-[-12] text-2xl"
        >
          ×
        </div>
      </div>
    </div>
  );
};
