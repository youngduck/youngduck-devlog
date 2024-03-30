---
title: "[NextJS] ESLint, Prettier, Recoil, React-Query, Storybook, Jest 설정 - 1편"
excerpt: "NextJS의 ESLint, Prettier, Husky를 세팅하는 글입니다."
coverImage: "/assets/blog/posts/nextjs-eslint-prettier-husky/cover.png"
date: "2024-03-30T15:16:00"
category: "NextJS"
ogImage:
  url: "/assets/blog/posts/nextjs-eslint-prettier-husky/cover.png"
---

> 1편은 NextJS에 TypeScript, Tailwind, ESLint, Prettier, Husky를 설정하는 내용입니다.

## 1. NextJS, TypeScript, TypeScript 설치

```bash
npx create-next-app@latest
```

![Untitled](/assets/blog/posts/nextjs-eslint-prettier-husky/1.png)

## 2. ESLint (airbnb 방식) 설정

### eslint-config-airbnb 라이브러리,패키지 설치

```bash
npx install-peerdeps --dev eslint-config-airbnb
```

### eslint에 필요한 타입스크립트 추가

```bash
npm install -D eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser --legacy-peer-deps
```

### eslint-config-airbnb-base 설정

```bash
npx install-peerdeps --dev eslint-config-airbnb-base
```

.eslintrc.json 설정 변경

```bash
{
  "env": {"browser": true,"node": true},
  "extends":"airbnb-base",
  "rules": {
    "linebreak-style": 0
  }
}
```

## 3. Prettier 설치, ESLint 연결

### Prettier, 플러그인 설치

```bash
npm install -D prettier eslint-plugin-prettier eslint-config-prettier
```

- eslint-plugin-prettier : eslint에서 prettier랑 충돌하는 규칙 비활성화
- eslint-config-prettier : 포매팅시 prettier 사용

### .prettierrc 파일 생성 후 코드추가

```bash
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,

}
```

- Nextjs는 세미콜론을 기본적으로 사용하지 않는다고합니다.
- [속성 정리 링크](https://velog.io/@dltmdwls15/.Prettier-%EC%98%B5%EC%85%98-%EC%A2%85%EB%A5%98)
- [속성 예제](https://hj-blog.github.io/frontend/Prettier/)

### eslintrc.json 설정

- [리액트 컴포넌트 eslint 옵션](https://velog.io/@nemo/Function-component-is-not-a-function-declaration)

```bash
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "parserOptions": {
    "project": "tsconfig.json",
    "createDefaultProgram": true
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "ignorePatterns": ["node_modules/"],
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": 0,
    "@typescript-eslint/semi": "off",
    "react/jsx-filename-extension": ["warn", { "extensions": [".ts", ".tsx"] }],
    "no-useless-catch": "off",
    "react/function-component-definition": [
      2,
      { "namedComponents": ["arrow-function", "function-declaration"] }
    ]
  }
}

```

## 4. Husky, lint-stated로 commit 파일 eslint, prettier 자동실행

### husky 설치 ( 주의 git repo랑 연결되어있어야 합니다.)

> git hook(커밋,푸시 등) 제어하는 라이브러리

```bash
npx husky-init && npm install
```

### lint-staged

> staged된 파일만 특정 명령어 실행하는 도구

package.json에 해당 명령어 설정 (commit 파일 prettier,eslint 적용)

```bash
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
```

### .husky/pre-commit 에 명령어 추가

```bash
#!/usr/bin/env sh. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged # 추가
```

### 실행화면

![Untitled](/assets/blog/posts/nextjs-eslint-prettier-husky/3.png)
git commit을 실행하게되면 eslint,prettier가 체크되는 모습

### Result 공유

[nextjs 세팅 Github](https://github.com/youngduck/next-eslint-prettier-husky-boilersetting/releases/tag/1.0)

## 참고자료

- [eslint,Prettier 설정](https://velog.io/@xmun74/Next.js-TS%EC%97%90%EC%84%9C-ESLint-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
- [https://velog.io/@picpal/코드에-eslint-prettier-자동-적용하기-근대-이제-github-커밋-체크까지-곁들인](https://velog.io/@picpal/%EC%BD%94%EB%93%9C%EC%97%90-eslint-prettier-%EC%9E%90%EB%8F%99-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-%EA%B7%BC%EB%8C%80-%EC%9D%B4%EC%A0%9C-github-%EC%BB%A4%EB%B0%8B-%EC%B2%B4%ED%81%AC%EA%B9%8C%EC%A7%80-%EA%B3%81%EB%93%A4%EC%9D%B8)
- [husky 공식문서](https://typicode.github.io/husky/get-started.html)
- [tsconfig's path parameter and ESLint 오류](https://stackoverflow.com/questions/62474451/tsconfigs-path-parameter-and-eslint)
