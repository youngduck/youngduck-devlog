import { getAllPosts } from "@/lib/api";
import RSS from "rss";
const baseUrl = process.env.NEXT_PUBLIC_BASED_URL;

export const generateRSS = () => {
  try {
    const posts = getAllPosts();

    const feed = new RSS({
      title: "김영덕 기술블로그",
      description: "천천히 기록해나가는 개발일지입니다.",
      copyright: "All rights reserved 2024, Kim YoungDuck",
      feed_url: `${baseUrl}/rss.xml`,
      site_url: baseUrl as string,
      language: "ko",
      pubDate: new Date(),
    });

    posts.forEach((post) => {
      const url = `${baseUrl}/posts/${post.slug}`;

      feed.item({
        title: post.title,
        url,
        description: post.excerpt,
        author: "김영덕",
        guid: url,
        date: new Date(post.date.replace("/", "-")),
        custom_elements: [{ "content:encoded": post.content }],
      });
    });

    return feed.xml();
  } catch (err) {
    console.error("Error generating Rss feed", err);
    return null;
  }
};

export const GET = async () => {
  const feedXml = generateRSS();

  if (feedXml) {
    return new Response(feedXml, {
      headers: { "Content-Type": "application/xml" },
    });
  } else {
    return new Response("Error generating RSS feed", { status: 500 });
  }
};
