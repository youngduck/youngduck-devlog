import { Meta, StoryObj } from "@storybook/react";
import Header from "./header";

const meta: Meta<typeof Header> = {
  title: "Components/Layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "Header",
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export const Ipad11Pro: Story = {
  parameters: {
    viewport: {
      defaultViewport: "ipad11p",
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone6",
    },
  },
};
