export type Post = {
  key: string;
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  category: string;
  ogImage: {
    url: string;
  };
  content: string;
  /** 예상 읽기 시간(분) — 블로그 글만 계산 */
  readingMinutes?: number;
  preview?: boolean;
};
