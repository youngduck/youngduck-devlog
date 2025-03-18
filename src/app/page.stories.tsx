import { Meta, StoryObj } from "@storybook/react";
import Home from "./page";
import { ThemeProvider } from "@/app/shared/_components/provider/theme-provider";
import Header from "@layout/header/header";
import Footer from "@/app/shared/_components/layout/footer";

const meta: Meta<typeof Home> = {
  title: "pages/Home",
  component: Home,
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

type Story = StoryObj<typeof Home>;

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
