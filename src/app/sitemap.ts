import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/api";
import { getAllAlgorithms } from "@/app/api/algorithms/api";

export default function sitemap(): MetadataRoute.Sitemap {
  const results: MetadataRoute.Sitemap = [];
  const posts = getAllPosts();
  const algorithms = getAllAlgorithms();
  const baseUrl = process.env.NEXT_PUBLIC_BASED_URL;

  results.push({
    url: `${baseUrl}`,
    lastModified: new Date(2024, 1, 10, 23, 0),
  });

  for (let i = 0; i < posts.length; i++) {
    results.push({
      url: `${baseUrl}/blog/posts/${posts[i].slug}`,
      lastModified: new Date(posts[i].date),
    });
  }

  for (let i = 0; i < algorithms.length; i++) {
    results.push({
      url: `${baseUrl}/algorithms/ps/${algorithms[i].slug}`,
      lastModified: new Date(algorithms[i].date),
    });
  }

  return results;
}
