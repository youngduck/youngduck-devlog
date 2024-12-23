import PostCards from "./post-cards";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Components/Post/PostCards",
  component: PostCards,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "PostCards",
  },
};

type Story = StoryObj<typeof PostCards>;

// 공통 mock 데이터 정의
const commonPosts = [
  {
    title: "Post Title1",
    slug: "post-slug",
    coverImage: "https://via.placeholder.com/150",
    date: "2024-01-01",
    excerpt: "Post Excerpt",
    category: "Category",
  },
  {
    title: "Post Title2",
    slug: "post-slug",
    coverImage: "https://via.placeholder.com/150",
    date: "2024-01-01",
    excerpt: "Post Excerpt",
    category: "Category",
  },
  {
    title: "Post Title3",
    slug: "post-slug",
    coverImage: "https://via.placeholder.com/150",
    date: "2024-01-01",
    excerpt: "Post Excerpt",
    category: "Category",
  },
  {
    title: "Post Title4",
    slug: "post-slug",
    coverImage: "https://via.placeholder.com/150",
    date: "2024-01-01",
    excerpt: "Post Excerpt",
    category: "Category",
  },
];

export const Desktop: Story = {
  args: {
    posts: commonPosts,
  },
};

export const Ipad11Pro: Story = {
  args: {
    posts: commonPosts, // 필요한 만큼만 사용
  },
  parameters: {
    viewport: {
      defaultViewport: "ipad11p",
    },
  },
};

export const Mobile: Story = {
  args: {
    posts: commonPosts, // 필요한 만큼만 사용
  },
  parameters: {
    viewport: {
      defaultViewport: "iphone6",
    },
  },
};
