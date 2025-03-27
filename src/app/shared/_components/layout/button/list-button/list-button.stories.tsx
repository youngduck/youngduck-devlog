import { Meta, StoryObj } from "@storybook/react";
import ListButton from "./list-button";

const meta: Meta<typeof ListButton> = {
  title: "Components/Layout/ListButton",
  component: ListButton,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof ListButton>;

export const Mobile: Story = {
  args: {
    onClick: () => console.log("Button clicked"),
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "iphone6",
    },
  },
};
