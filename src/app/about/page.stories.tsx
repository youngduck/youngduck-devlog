import { Meta, StoryObj } from "@storybook/react";
import About from "./page";
import { ThemeProvider } from "@/app/shared/_components/provider/theme-provider";
import Header from "@layout/header/header";
import Footer from "@/app/shared/_components/layout/footer";

const meta: Meta<typeof About> = {
  title: "pages/About",
  component: About,
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <Story />
        <Footer />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof About>;

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
