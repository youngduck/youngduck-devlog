import PostCard from "./post-card";
import { Meta, StoryObj } from "@storybook/react";
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
  },
};
