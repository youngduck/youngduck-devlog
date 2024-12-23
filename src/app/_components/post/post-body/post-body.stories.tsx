import { Meta, StoryObj } from "@storybook/react";
import PostBody from "./post-body";

const meta: Meta<typeof PostBody> = {
  title: "Components/Post/PostBody",
  component: PostBody,
};

export default meta;

type Story = StoryObj<typeof PostBody>;

export const H2: Story = {
  args: {
    content: `## 🤔2단계 제목
    `,
  },
};

export const H3: Story = {
  args: {
    content: `### 🤔3단계 제목`,
  },
};

export const Ul: Story = {
  args: {
    content: `- 순서가 없는 목록
- 순서가 없는 목록
- 순서가 없는 목록`,
  },
};

export const Ol: Story = {
  args: {
    content: `1. 순서가 있는 목록
2. 순서가 있는 목록
3. 순서가 있는 목록`,
  },
};

export const Strong: Story = {
  args: {
    content: `**굵은 텍스트**`,
  },
};

export const FullContent: Story = {
  args: {
    content: `
> 인용문

  **굵은 텍스트**

  *기울임 텍스트*

  ## 🤔2단계 제목
  - 순서가 없는 목록
  - 순서가 없는 목록
  - 순서가 없는 목록
  ### 🤔3단계 제목
  1. 순서가 있는 목록
  2. 순서가 있는 목록
  3. 순서가 있는 목록



  
  ### 🤔코드
  \`\`\`typescript
  const example = "TypeScript";
  interface Example {
    name: string;
  }
  \`\`\`

  ### 🤔테이블
  | 헤더1 | 헤더2 | 헤더3 |
  |-------|-------|-------|
  | 데이터1 | 데이터2 | 데이터3 |
  | 데이터1 | 데이터2 | 데이터3 |
  | 데이터1 | 데이터2 | 데이터3 |
  
  ### 🤔링크
  [출처: ](https://www.google.com) 구글
  `,
  },
  parameters: {
    viewport: {
      defaultViewport: "ipad11p",
    },
  },
};
