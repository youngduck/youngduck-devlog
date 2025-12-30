import PostToc from "./post-toc";
import { StoryObj, Decorator } from "@storybook/react";
const withHeadings: Decorator = (Story) => (
  <>
    <div id="storybook-headings" style={{ display: "none" }}>
      <h2 id="section1">Section 1</h2>
      <h3 id="section1-1">Section 1.1</h3>
      <h3 id="section1-1">
        매우길게 작성된 h3 컨텐츠 입니다. 매우길게 작성되었어요
      </h3>
      <h2 id="section2">매우길게 작성된 section 2 입니다아아아아.</h2>
      <h3 id="section2-1">Section 2.1</h3>
      <h3 id="section2-1">Section 2.2</h3>
      <h3 id="section2-1">Section 2.3</h3>
    </div>
    <Story />
  </>
);

export default {
  title: "Components/Post/PostToc",
  component: PostToc,

  decorators: [withHeadings],
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "PostToc",
  },
};

type Story = StoryObj<typeof PostToc>;

export const Default: Story = {
  args: {},
};
