import PostCards from "./post-cards";
import { StoryObj } from "@storybook/react";

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
    title: "굉장히 길게작성한 title제목의 경우 잘리는 현상이 발생하는지 테스트",
    slug: "post-slug",
    coverImage: "/assets/blog/posts/react/react-router-rerender/cover.png",
    date: "2024-01-01",
    excerpt: "Post Excerpt",
    category: "Category",
  },
  {
    title: "Post Title2",
    slug: "post-slug",
    coverImage: "/assets/blog/posts/react/react-router-rerender/cover.png",
    date: "2024-01-01",
    excerpt:
      "굉장히 길게 작성된 excerpt의 길이 잘리는 현상이 발생하는지 테스트",
    category: "Category",
  },
  {
    title: "굉장히 길게작성한 title제목의 경우 잘리는 현상이 발생하는지 테스트",
    slug: "post-slug",
    coverImage: "/assets/blog/posts/react/react-router-rerender/cover.png",
    date: "2024-01-01",
    excerpt:
      "굉장히 길게 작성된 excerpt의 길이 잘리는 현상이 발생하는지 테스트",
    category: "Category",
  },
  {
    title: "Post Title4",
    slug: "post-slug",
    coverImage: "/assets/blog/posts/react/react-router-rerender/cover.png",
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

export const Ipad12Pro: Story = {
  args: {
    posts: commonPosts, // 필요한 만큼만 사용
  },
  parameters: {
    viewport: {
      defaultViewport: "ipad12p",
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
