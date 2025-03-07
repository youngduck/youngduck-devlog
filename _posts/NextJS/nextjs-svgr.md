---
title: "[NextJS] SVG파일 React Component로 사용하기"
excerpt: "SVGR을 사용해 SVG 쉽게 관리하는 방법에 대해 소개합니다."
coverImage: "/assets/blog/posts/nextjs-svgr/cover.png"
date: "2024-03-25"
ogImage:
  url: "/assets/blog/posts/nextjs-svgr/cover.png"
---

## **0. SVGR 이란?**

SVG를 **React 컴포넌트**로 변환시켜주는 기능으로 NextJS는 CRA와다르게 SVG 기본사용을 지원하지 않아 따로 설정해주어야합니다.

Next.js Remix, webpack, Command Line, Node.js 환경을 지원하고 있습니다.

이글에서는 Next.js에서 사용하는 방법에 대해서설명하겠습니다.

[공식문서](https://react-svgr.com/docs/getting-started) 참조

## **1. 라이브러리 설치**

```bash
npm install --save-dev @svgr/webpack
```

```bash
yarn add --dev @svgr/webpack
```

## 2. 환경설정 추가

next.config.js 에 다음과 같은 코드를 추가해줍니다.

![Untitled](/assets/blog/posts/nextjs-svgr/1.png)

## 3. 사용하기

![Untitled](/assets/blog/posts/nextjs-svgr/2.png)

SVGR을 사용하면 속성값만 주어서 svg 크기, 색깔등을 쉽게 변경할 수 있습니다.
