import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { ThemeProvider } from "../src/app/_components/provider/theme-provider";
import React from "react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

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
  },
  decorators: [withThemeProvider],
};

export default preview;
