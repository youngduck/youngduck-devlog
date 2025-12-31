import PostCard from "./post-card";
import { StoryObj } from "@storybook/react";
export default {
  title: "Components/Post/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "PostCard",
  },
};

type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  args: {
    title: "Post Title",
    slug: "post-slug",
    coverImage: "/assets/blog/posts/react/react-router-rerender/cover.png",
    date: "2024-01-01",
    excerpt: "Post Excerpt",
    category: "Category",
    domain: "blog",
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "이것은 매우 긴 제목입니다. 여러 줄에 걸쳐 표시되어야 하며 모든 내용이 보여야 합니다.",
    slug: "long-title",
    coverImage: "/assets/blog/posts/react/react-router-rerender/cover.png",
    date: "2024-01-01",
    excerpt:
      "이 글의 요약입니다. 제목이 길어지면 이 부분은 줄어들고 말줄임표로 처리됩니다.",
    category: "Category",
    domain: "blog",
  },
};
