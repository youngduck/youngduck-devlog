import { Post } from "../../../interfaces/posts";
import fs from "fs";
import matter from "gray-matter";
import path, { join } from "path";
import RSS from "rss";

const postsDirectory = join(process.cwd(), "_algorithms");

export function getPostSlugs() {
  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      } else {
        const relativePath = path.relative(postsDirectory, filePath);
        arrayOfFiles.push(relativePath);
      }
    });

    return arrayOfFiles;
  };
  return getAllFiles(postsDirectory);
}

export function getPostBySlug(slug: string) {
  // 1. 모든 파일 목록 가져오기
  const allFiles = getPostSlugs();

  // 2. URL 디코딩 처리
  const decodedSlug = decodeURIComponent(slug);

  // 3. slug와 일치하는 파일 찾기 (파일명만 비교)
  const targetFile = allFiles.find((file) => {
    const fileName = path.basename(file, ".md");
    return fileName === decodedSlug;
  });

  // 3-1 파일이 없는 경우 예외 처리
  if (!targetFile) {
    console.error(`File not found: ${decodedSlug}`);
    return null; // 에러 던지는 대신 null 반환하여 컴포넌트에서 처리
  }

  // 4. 파일 읽기
  const fullPath = join(postsDirectory, targetFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // 5. 카테고리는 상위 폴더명으로 설정
  const category = path.dirname(targetFile);

  return {
    ...data,
    slug: decodedSlug, // 디코딩된 slug 사용
    category: category === "." ? "ETC" : category,
    content,
  } as Post;
}

export function getAllAlgorithms(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(path.basename(slug, ".md")))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getFilteredAlgorithms(filterWord: string): Post[] {
  const posts = getAllAlgorithms();
  const filteredPost = posts.filter(
    (post) => post.category === decodeURIComponent(filterWord),
  );
  return filteredPost;
}

export function getAllCategoriesArray(): any {
  const posts = getAllAlgorithms();
  const categoryMap = new Map();

  categoryMap.set("All Algorithms", posts.length);
  posts.map((item) => {
    const category = item.category;
    categoryMap.has(category)
      ? categoryMap.set(category, categoryMap.get(category) + 1)
      : categoryMap.set(category, 1);
  });

  return Array.from(categoryMap.entries());
}

export function getAllCategoriesID(): string[] {
  const posts = getAllAlgorithms();
  const categoryMap = new Map();

  categoryMap.set("All Algorithms", posts.length);
  posts.map((item) => {
    const category = item.category;
    categoryMap.has(category)
      ? categoryMap.set(category, categoryMap.get(category) + 1)
      : categoryMap.set(category, 1);
  });

  return Array.from(categoryMap.keys());
}

export const generateRSS2 = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASED_URL;

  try {
    const posts = getAllAlgorithms();

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
