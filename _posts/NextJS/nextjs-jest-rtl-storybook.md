---
title: "[NextJS] ESLint, Prettier, Recoil, React-Query, Storybook, Jest 설정 - 2편"
excerpt: "NextJS의 Jest, React-Test-Library, Storybook을 세팅하는 글입니다."
coverImage: "/assets/blog/posts/nextjs-jest-rtl-storybook/cover.png"
date: "2024-03-30T21:38:00"
ogImage:
  url: "/assets/blog/posts/nextjs-jest-rtl-storybook/cover.png"
---

> 2편에서는 NextJS에 Jest, React-Testing-Library, Storybook을 설정하는 내용입니다.

## 1. Jest, React-Testing-Library 설치

[공식문서](https://nextjs.org/docs/app/building-your-application/testing/jest)를 참고해 설치했습니다.(eslint와 충돌이 많이 발생해 꽤나 번거롭습니다.)

Jest, RTL 라이브러리 설치

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

typescript 사용하시는 분들은 아래 코드를 추가적으로 입력해 주어야합니다.

```jsx
 npm i ts-node
```

루트 폴더에 jest.setup.ts 생성 후 해당 코드 입력

```jsx
import "@testing-library/jest-dom";
```

루트 폴더에 jest.config.ts 생성 후 해당 코드 입력

```jsx
import type { Config } from "jest";
// eslint-disable-next-line import/extensions
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**",
  ],
  // 절대 경로 사용시
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
```

### eslint cr 에러

![Untitled](/assets/blog/posts/nextjs-jest-rtl-storybook/1.png)

해당 이슈(Delete ␍ eslint prettier/prettier)는 문장의끝 end line sequence에 대한 양식이 지켜지지 않아서 나타난다고 합니다.

\*\*\*\*eslintrc.json의 rule에 해당 규칙을 추가해주어 해결했습니다.

```jsx
rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
```

## 2. Jest,React-Test-Library 기본사용법

저같은 경우는 test폴더를 따로만들지않고 직관적이게 하나의 폴더에 두는 편입니다. (~~TMI~~)

![Untitled](/assets/blog/posts/nextjs-jest-rtl-storybook/2.png)

```tsx
//dashboard/index.tsx
const DashBoard = () => {
  return (
    <div>
      <h1>하이 대쉬보드야</h1>
      <div>ㅇㅇ</div>
    </div>
  );
};

export default DashBoard;
```

```tsx
//dashboard/index.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashBoard from "@/app/components/dashboard";

describe("Dashboard", () => {
  it("shourd dashboard ", () => {
    render(<DashBoard />);

    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent("하이 대쉬보드야");
  });
});
```

![Untitled](/assets/blog/posts/nextjs-jest-rtl-storybook/3.png)

## 3. Storybook 설치하기

```bash
npx storybook@latest init
```

스토리북 설치는 해당명령어만 입력하면 알아서 프로젝트의 프레임워크를 파악해서 설치해줍니다. (~~Jest도 분발합시다~~)

![Untitled](/assets/blog/posts/nextjs-jest-rtl-storybook/4.png)

- main.ts - 전반적인설정
- preview.ts - 미리보기화면에 대한 설정

![Untitled](/assets/blog/posts/nextjs-jest-rtl-storybook/5.png)

- src폴더의 stories안에서 index.stories.ts 양식으로 사용합니다.

![Untitled](/assets/blog/posts/nextjs-jest-rtl-storybook/6.png)

- storybook 은 6006번 포트를 사용합니다.
- build-storybook을 통해 원격 서버에 배포하기도 합니다.

### Storybook ESLint 충돌 이슈

또 eslint랑 충돌이 발생했습니다.

(like "--ignore-pattern '!<relative/path/to/filename>'”) to ovveride

![Untitled](/assets/blog/posts/nextjs-jest-rtl-storybook/7.png)

### 해결방법

.eslintrc.js에 ignorePatterns에 storybook과 연관된 파일들을 등록해주었습니다. 협업을 해보면서 storybook에도 eslint같은 규칙이 필요하다면 다시한번 고쳐보도록 해봐야겠습니다.

## 4. Storybook으로 atomic pattern 구현

Storybook을 알아보면서 취업공고에서도 봤었던 [atomic pattern에 대한 글](https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/)을 볼 수 있었습니다. 이번 프로젝트에서 atomic pattern을 통해 프로젝트를 만들어보는것도 꽤 좋은 경험이지 않을까 싶습니다.

## 5. Result 공유

[nextjs+tailwind+eslint+prettier+husky 코드](https://github.com/youngduck/next-eslint-prettier-husky-boilersetting/releases/tag/1.0)

[nextjs+tailwind+eslint+prettier+husky + Jest + RTL + Storybook 코드](https://github.com/youngduck/next-eslint-prettier-husky-boilersetting/releases/tag/1.0)

## 참고링크

[Testing Library와 Jest에 대해 알아보자](https://velog.io/@wlwl99/Testing-Library-Jest)

[Nextjs Storybook 설치하기](https://cheolsker.tistory.com/82)
