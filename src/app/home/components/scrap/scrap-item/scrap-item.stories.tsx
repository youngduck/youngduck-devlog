import GridBoxWrapper from "../../grid-box-wrapper/grid-box-wrapper";
import ScrapItem from "./scrap-item";
import { Meta, StoryObj } from "@storybook/react";
import { handlers } from "@/mocks/handlers";

const meta: Meta<typeof ScrapItem> = {
  title: "Home/Components/Scrap/ScrapItem",
  component: ScrapItem,
  decorators: [
    (Story) => (
      <main className="mx-auto h-auto w-full transform animate-fade-up duration-500 md:max-w-container-md lg:max-w-container-lg">
        <div className="grid w-full grid-cols-1 grid-rows-1 gap-[20px] md:grid-cols-[250px_600px] md:grid-rows-[110px_350px_350px] lg:h-[480px] lg:grid-cols-[250px_600px_310px] lg:grid-rows-[110px_350px]">
          <GridBoxWrapper
            title="최근 스크랩한 게시글"
            className="border-2 sm:h-[350px] md:col-[1/3] md:row-[3/4] md:h-auto lg:col-[3/4] lg:row-[2/3] lg:h-auto"
          >
            <Story />
          </GridBoxWrapper>
        </div>
      </main>
    ),
  ],
  // parameters: {
  //   msw: {
  //     handlers: handlers,
  //   },
  // },
};

export default meta;

type Story = StoryObj<typeof ScrapItem>;

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
