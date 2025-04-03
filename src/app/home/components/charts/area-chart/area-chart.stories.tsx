import GridBoxWrapper from "../../grid-box-wrapper/grid-box-wrapper";
import ChartsFunnel from "../charts-funnel/ChartsFunnel";
import AreaChart from "./area-chart";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AreaChart> = {
  title: "pages/Home/Components/Charts/AreaChart",
  component: AreaChart,
  decorators: [
    (Story) => (
      <main className="mx-auto h-auto w-full transform animate-fade-up duration-500 md:max-w-container-md lg:max-w-container-lg">
        <div className="grid w-full gap-[20px] sm:grid-cols-1 sm:grid-rows-1 md:grid-cols-[250px_600px] md:grid-rows-[110px_350px_350px] lg:grid-cols-[250px_600px_310px] lg:grid-rows-[110px_350px]">
          <GridBoxWrapper className="border-2 md:col-[2/3] md:row-[2/3] lg:col-[2/3] lg:row-[2/3]">
            {/* <ChartsFunnel> */}
            {Story()}
            {/* </ChartsFunnel> */}
          </GridBoxWrapper>
        </div>
      </main>
    ),
  ],
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
