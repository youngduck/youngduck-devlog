import ScrapItem from "./scrap-item";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ScrapItem> = {
  title: "Home/ScrapItem",
  component: ScrapItem,
};

export default meta;

type Story = StoryObj<typeof ScrapItem>;

export const Default: Story = {
  args: {},
};
