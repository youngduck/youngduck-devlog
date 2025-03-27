import AreaChart from "./area-chart";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AreaChart> = {
  title: "Charts/AreaChart",
  component: AreaChart,
};

export default meta;

type Story = StoryObj<typeof AreaChart>;

export const Desktop: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export const Ipad12Pro: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "ipad12p",
    },
  },
};

export const Mobile: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "iphone6",
    },
  },
};
