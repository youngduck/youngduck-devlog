import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ListButton from "./list-button";

const meta: Meta<typeof ListButton> = {
  title: "Components/Layout/ListButton",
  component: ListButton,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ListButton>;

export const Default: Story = {
  render: () => <ListButton />,
};
