import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/api";

export default function sitemap(): MetadataRoute.Sitemap {
  const results: MetadataRoute.Sitemap = [];
  const posts = getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASED_URL;

  results.push({
    url: `${baseUrl}`,
    lastModified: new Date(),
  });

  for (let i = 0; i < posts.length; i++) {
    results.push({
      url: `${baseUrl}posts/${posts[i].slug}`,
      lastModified: new Date(),
    });
  }

  return results;
}
