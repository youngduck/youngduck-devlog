import { MetadataRoute } from "next";

const Robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://youngduck-devlog.vercel.app/sitemap.xml",
  };
};

export default Robots;
