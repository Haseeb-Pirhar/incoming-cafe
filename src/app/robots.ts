import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/super-admin",
          "/store",
          "/auth",
          "/api-v1",
          "/user",
          "/dashboard$", // sirf exact "/dashboard" block, sub-pages nahi
        ],
      },
    ],
    sitemap: "https://www.happylifepure.com/sitemap.xml",
  };
}
