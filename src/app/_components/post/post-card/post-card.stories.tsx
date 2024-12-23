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
    coverImage: "https://via.placeholder.com/150",
    date: "2024-01-01",
    excerpt: "Post Excerpt",
    category: "Category",
  },
};
