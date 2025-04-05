---
title: "fs모듈로 만든 서버컴포넌트 Storybook에서 충돌하는 문제"
excerpt: "Nextjs Route Handler를 통해 문제상황 우회하기"
coverImage: "/assets/blog/posts/devlog/devlog-2/cover.png"
date: "2025-04-05T16:30:00"
ogImage:
  url: "/assets/blog/posts/devlog/devlog-2/cover.png"
---

## 문제상황

NextJS에서 FS모듈을 활용해 만든 RSC(리액트 서버 컴포넌트)를 스토리북으로 UI테스트를 실행하면 아래와 같은 에러가 발생하게 됩니다.
&nbsp;

fs_WEBPACK_IMPORTED_MODULE_0\_\_\_default(...).readdirSync

![Untitled](/assets/blog/posts/devlog/devlog-2/1.png)

### 문제상황 분석

기본적으로 fs모듈은 Node.js 환경에서 작동하고 Storybook은 브라우저 환경에서 실행되는데요.

Storybook은 8.0 버전부터 RSC 테스트를 지원해 주지만, 브라우저 환경에서 실행되는 Storybook의 특성상 Node.js 환경의 파일시스템 API를 직접사용할 수 없다고 합니다.

&nbsp;

### 해결을 위한 고민

SSR을 통한 파일 시스템을 직접 접근하면서 스토리북에서 해당 컴포넌트를 어떻게 하면 테스트 할 수 있을지 고민하다 NextJS에서 제공하는 Route Handler기능을 사용하면 기존의 렌더링을 유지하면서 브라우저에서 호출된 API를 통해 컴포넌트를 렌더링하게 되어 스토리북에서 fs모듈을 직접 호출 하지 않게 만들 수 있겠다 생각했습니다.

### 문제해결하기

문제를 해결하기 위해 다음과 같이 아키텍처를 변경했습니다.

1. 컴포넌트에서 파일시스템을 직접 호출하던 방식에서, Next.js의 Route Handler를 활용하여 가져오도록 계층을 추가
2. 스토리북에서는 새로생긴 API주소를 MSW를 사용하여 API요청을 가로채서 목데이터로 만들어서 제공

&nbsp;
이러한 아키텍처 변경으로 기존의 렌더링 방식은 유지하고 RSC컴포넌트를 모킹하여 테스트를 할 수 있게 되었습니다.

![Untitled](/assets/blog/posts/devlog/devlog-2/2.png)
