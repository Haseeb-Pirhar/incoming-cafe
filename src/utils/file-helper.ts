export const getAttachmentMessage = (data: {
  content: string;
  attachments?: string[];
}): string => {
  if (data.attachments && data.attachments.length) {
    const photoExts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const videoExts = [".mp4", ".mov", ".avi", ".webm", ".mkv"];
    let photoCount = 0;
    let videoCount = 0;
    data.attachments.forEach((link: string | undefined) => {
      if (!link) return;
      const lowerLink = link.toLowerCase();
      if (photoExts.some((ext) => lowerLink.endsWith(ext))) photoCount++;
      else if (videoExts.some((ext) => lowerLink.endsWith(ext))) videoCount++;
    });

    if (photoCount > 0 && videoCount > 0) {
      return `${photoCount} ${photoCount > 1 ? "Photos" : "Photo"}, ${videoCount} ${videoCount > 1 ? "Videos" : "Video"}`;
    } else if (photoCount > 0) {
      return `${photoCount} ${photoCount > 1 ? "Photos" : "Photo"}`;
    } else if (videoCount > 0) {
      return `${videoCount} ${videoCount > 1 ? "Videos" : "Video"}`;
    }
  }
  return data.content;
};

export const getMediaType = (url: string): string => {
  const ext = url.match(/\.([a-zA-Z0-9]+)(\?.*)?$/)?.[1]?.toLowerCase();
  if (!ext) return "application/octet-stream";

  const imageMimeMap: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
  };

  const videoMimeMap: Record<string, string> = {
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    webm: "video/webm",
    mkv: "video/x-matroska",
  };

  return imageMimeMap[ext] || videoMimeMap[ext] || "application/octet-stream";
};
