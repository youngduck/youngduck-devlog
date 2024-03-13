---
title: "달력동그라미 짧은회고 - 풀스택편"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."
coverImage: "/assets/blog/posts/what-is-zustand/cover.jpg"
date: "2024-03-11"
category: "Zustand"
ogImage:
  url: "/assets/blog/posts/what-is-zustand/cover.jpg"
---

## Stack

> Next.js , Yarn berry, Tanstack Query, Recoil, React-Query ,MongoDB, Tailwind, vitest, Github, Swagger,

## 패키지 매니저

막연히 npm이 가장 큰 패키지 생태계를 가지고 있다 생각해 주구장창 npm만써오던 나에게 yarn, pnpm등은 왜쓰는 걸까라는 궁금함이 있었다.

npm은 찾을때까지 계속 상위 디렉토리의 node_module을 탐색하는

비효율적인 의존성 문제, 유령 의존성등 여러 문제가 존재하였다는 사실을 알게 되었다.

yarn berry 를 도입하여 의존성 문제를 해결하고 zeroinstall을 통해 패키지를 구성해 보기로했다.

- [yarn berry의도입, 기존npm의 문제점](https://toss.tech/article/node-modules-and-yarn-berry)
- [Yarn berry Next.js 세팅](https://velog.io/@creco/next.js-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)

## Jira + github 연동

현장실습을 통해 jira를 처음 사용해보았고 자동으로 브랜치 관리를 할 수 있어서 아주 간편했다.

혼자하는 프로젝트지만 브랜치를 시각화하고 자동화하기 위해 github에 연동후 자동화규칙을 설정해 주었다. 자동화 규칙에 특수문자 : 같은걸넣으면 오류가 발생하니 주의해야한다.
