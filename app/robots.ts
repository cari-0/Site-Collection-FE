import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const blocked = ["/admin", "/submit", "/ads"];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: blocked,
      },
      {
        userAgent: "Yeti",
        allow: "/",
        disallow: blocked,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
