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
  preview?: boolean;
};
