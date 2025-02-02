import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RssFeedButton from "./rss-feed-button";

const meta: Meta<typeof RssFeedButton> = {
  title: "Components/Layout/RssFeedButton",
  component: RssFeedButton,
  argTypes: {
    // 필요한 경우 props의 타입을 명시적으로 지정
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RssFeedButton>;

export const Default: Story = {
  render: () => <RssFeedButton />,
};
