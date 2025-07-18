---
title: "[NextJS] ESLint, Prettier, Recoil, React-Query, Storybook, Jest 설정 - 3편"
excerpt: "NextJS의 React-Query, Recoil을 세팅하는 글입니다."
coverImage: "/assets/blog/posts/nextjs-reactquery-recoil/cover.png"
date: "2024-03-31T18:40:00"
ogImage:
  url: "/assets/blog/posts/nextjs-reactquery-recoil/cover.png"
---

> 3편은 NextJS에 React-Query, Recoil을 설정하는 내용입니다.

## React-Query, React-Query-Devtools 설치

```bash
npm i @tanstack/react-query @tanstack/react-query-devtools
```

### TanstackProvider 컴포넌트 생성

```tsx
"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
```

### TanstackProvider layout 적용

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "./components/providers/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
```

## Recoil 설치

```bash
npm i recoil
```

### RecoilRootProvider 컴포넌트 생성

```tsx
"use client";

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface RecoilRootProviderProps {
  children: ReactNode;
}

const RecoilRootProvider: React.FC<RecoilRootProviderProps> = ({
  children,
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootProvider;
```

### RecoilRootProvider layout 적용

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "./components/providers/TanstackProvider";
import RecoilRootProvider from "./components/providers/RecoilRootProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <RecoilRootProvider>{children}</RecoilRootProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
```

### Recoil 예제

자세한 내용은 [공식문서](https://recoiljs.org/ko/)에 자세히 나와있습니다.

```tsx
import { atom } from "recoil";

export const sampleAtom = atom<string>({
  key: "sampleAtom",
  default: "",
});
```

```tsx
"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { sampleAtom } from "./recoil/atom";

const Home = () => {
  const sample = useRecoilValue(sampleAtom);

  return (
    <div>
      <div>Recoil 값: {sample}</div>
    </div>
  );
};

export default Home;
```

## Result 공유

> 필요에따라 클론해서 사용하시면 좋을거같습니다.

- [3편까지 세팅](https://github.com/youngduck/next-eslint-prettier-husky-boilersetting/releases/tag/1.2)

- [2편까지 세팅](https://github.com/youngduck/next-eslint-prettier-husky-boilersetting/releases/tag/1.1)

- [1편까지 세팅](https://github.com/youngduck/next-eslint-prettier-husky-boilersetting/releases/tag/1.0)

## 실행 결과

![](/assets/blog/posts/nextjs-reactquery-recoil/1.png)
