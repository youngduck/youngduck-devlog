import { http, HttpResponse } from "msw";
import GridBoxWrapper from "../../grid-box-wrapper/grid-box-wrapper";
import ScrapItem from "./scrap-item";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

const meta: Meta<typeof ScrapItem> = {
  title: "pages/Home/Components/Scrap/ScrapItem",
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

export const LinkClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    canvasElement.addEventListener("click", (e) => {
      e.preventDefault();
    });
    const link = await canvas.findByText("모킹된 스크랩 항목 2");
    await userEvent.click(link);
  },
};

export const Hover: Story = {
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // link 요소를 직접 찾기
    const link = await canvas.findByText("모킹된 스크랩 항목 3");

    // hover 상태 진입
    await userEvent.hover(link);

    // hover 효과를 시각적으로 확인하기 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // hover 상태 해제
    await userEvent.unhover(link);

    // 상태 해제 후 지연
    await new Promise((resolve) => setTimeout(resolve, 3000));
  },
};

export const NoScrapData: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/scrap", () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/scrap", () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};
