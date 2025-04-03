import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { ThemeProvider } from "../src/app/shared/_components/provider/theme-provider";
import React from "react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { handlers } from "../src/mocks/handlers";

// MSW 가져오기
import { initialize, mswLoader } from "msw-storybook-addon";

// MSW 초기화
initialize({
  onUnhandledRequest: "bypass",
});

const withThemeProvider = (Story: React.ComponentType, context: any) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Story {...context} />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "responsive",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: {
        ...handlers,
      },
    },
  },
  decorators: [withThemeProvider],
  loaders: [mswLoader],
};

export default preview;
