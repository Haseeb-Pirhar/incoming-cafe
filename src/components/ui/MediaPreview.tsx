"use client";
import React from "react";
import Image from "next/image";

interface MediaPreviewProps {
  src?: string;
  alt?: string;
  className?: string;
  height?: number;
  width?: number;
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
}

const isValidSrc = (src?: string | null) => {
  if (!src || typeof src !== "string") return false;
  const s = src.trim();
  if (!s) return false;
  // absolute URL
  if (
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("blob:")
  )
    return true;
  // local public path
  if (s.startsWith("/")) return true;
  return false;
};

const MediaPreview: React.FC<MediaPreviewProps> = ({
  src,
  alt = "Media content",
  className = "",
  height = 60,
  width = 60,
  videoProps,
}) => {
  const mediaSrc = isValidSrc(src) ? src!.trim().replace(/\\/g, "/") : null;

  const videoExts = [".mp4", ".mov", ".webm", ".mkv", ".ogg"];
  const isVideo =
    !!mediaSrc && videoExts.some((ext) => mediaSrc.toLowerCase().endsWith(ext));

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-100 ${className}`}
      style={{ height, width }}
    >
      {!mediaSrc ? (
        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
          No media
        </div>
      ) : isVideo ? (
        <video
          src={mediaSrc}
          controls
          className="w-full h-full object-cover"
          {...videoProps}
        />
      ) : (
        <Image
          fill
          src={mediaSrc}
          alt={alt}
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, 60px"
          unoptimized={
            mediaSrc.startsWith("blob:") || mediaSrc.startsWith("data:")
          }
        />
      )}
    </div>
  );
};

export default MediaPreview;
