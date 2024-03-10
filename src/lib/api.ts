import { Post } from "../interfaces/posts";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getFilteredPosts(): Post[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  const filteredPost = posts.filter((post) => post.category === "회고");
  console.log(filteredPost.length);
  return posts;
}

export function getAllCategories(): any {
  const posts = getAllPosts();
  const categoryMap = new Map();

  categoryMap.set("AllPost", posts.length);
  posts.map((item) => {
    const category = item.category;
    categoryMap.has(category)
      ? categoryMap.set(category, categoryMap.get(category) + 1)
      : categoryMap.set(category, 1);
  });

  return Array.from(categoryMap.entries());
}
