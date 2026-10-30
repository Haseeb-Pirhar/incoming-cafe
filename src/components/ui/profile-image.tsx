"use client";
import React from "react";

interface ProfileImageProps {
  size?: number;
  imageUrl?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  size = 40,
  imageUrl,
}) => {
  return (
    <img
      src={imageUrl || "/default-avatar.png"} // fallback
      alt="User Avatar"
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
};
