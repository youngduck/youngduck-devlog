import { Meta, StoryObj } from "@storybook/react";
import Profile from "./profile";
import GridBoxWrapper from "@/app/home/components/grid-box-wrapper/grid-box-wrapper";

const meta: Meta<typeof Profile> = {
  title: "Domains/Profile",
  component: Profile,
  decorators: [
    (Story) => (
      <div className="grid w-full grid-cols-1 grid-rows-1 gap-[20px] md:grid-cols-[250px_600px] md:grid-rows-[110px_350px_350px] lg:h-[480px] lg:grid-cols-[250px_600px_310px] lg:grid-rows-[110px_350px]">
        <GridBoxWrapper className="rounded-t-none border-t-0 bg-contain md:col-[1/2] md:row-[1/3] lg:col-[1/2] lg:row-[1/3]">
          <Story />
        </GridBoxWrapper>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Profile>;

export const Desktop: Story = {
  args: {},
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
