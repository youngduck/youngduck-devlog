import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const theme = create({
  base: "light", // 또는 'dark'

  // 브랜드
  brandTitle: "YD-DEVLOG",
  brandUrl: "https://youngduck-devlog.vercel.app/",
  brandImage:
    "https://youngduck.github.io/youngduck-devlog/assets/logo/logo.png",
  brandTarget: "_blank",
});

addons.setConfig({
  theme: theme,
});
