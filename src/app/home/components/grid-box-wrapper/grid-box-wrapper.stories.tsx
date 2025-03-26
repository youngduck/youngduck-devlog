import { Meta, StoryObj } from "@storybook/react";
import BoxWrapper from "./grid-box-wrapper";
import PostCard from "../../../shared/_components/post/post-card/post-card";

const meta: Meta<typeof BoxWrapper> = {
  title: "Components/Layout/BoxWrapper",
  component: BoxWrapper,
  argTypes: {
    children: {},
  },
};

export default meta;

type Story = StoryObj<typeof BoxWrapper>;

export const Default: Story = {
  args: {
    children: <div>하하</div>,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
export const BoxInText: Story = {
  args: {
    children: <div>하하</div>,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
export const BoxInPostCards: Story = {
  args: {
    children: (
      <PostCard
        key={1}
        slug="post-slug"
        title="포스트 제목"
        coverImage="https://via.placeholder.com/150"
        date="2024-01-01"
        excerpt="포스트 내용 미리보기"
        category="포스트 카테고리"
        domain="blog"
      />
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: "ipad12p",
    },
  },
};
