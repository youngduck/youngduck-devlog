---
title: "VSCode Snippets으로 사내 코드 표준화하기"
excerpt: "VSCode Snippets을 활용해 사내 코드 표준화를 자동화하고, Extension으로 배포한 경험을 공유합니다."
coverImage: "/assets/blog/posts/vscode-snippet-extension/cover.gif"
date: "2024-12-13T18:35:00"
category: "VSCode"
ogImage:
  url: "/assets/blog/posts/vscode-snippet-extension/cover.gif"
---

## VSCode Snippets으로 사내 코드 표준화하기

> 프로젝트를 진행하면서 코드 표준화의 중요성을 깨닫고, VSCode Snippets을 활용해 사내 코드를 표준화한 경험을 공유합니다.

## SNIPPETS이란?

코드 조각(Snippet)은 자주 사용되는 코드 블록을 단축키로 빠르게 입력할 수 있게 해주는 기능입니다. 반복적인 코드 작성을 줄이고 일관된 코드 스타일을 유지하는데 매우 유용합니다.

## 왜 Snippets을 만들게 되었나?

우리 회사는 MVC 패턴 기반의 코드베이스에 체계적인 주석 시스템이 잘 갖춰져 있었습니다. 개발 스택을 React/Spring으로 전환하면서, 이전처럼 체계적인 코드 관리가 다소 아쉬운 상황이었습니다. 새로운 환경에서도 기존의 좋은 관행을 이어가고 싶었고, 프로젝트를 진행하면서 느꼈던 다음 세 가지 사항을 개선하고자 Snippets을 직접 만들게 되었습니다.

1. **코드 구조화**: ESLint, Prettier, Husky 등으로 기본적인 컨벤션은 확보했으나, 컴포넌트 내부의 영역별 구조화 (상태관리, 메서드, 훅)

2. **문서화 강화**: 주석 템플릿을 통한 코드 설명 의무화

3. **생산성 향상**: 템플릿 생성수준의 반복코드 작업 자동화

## Extension 개발 및 배포 과정

### 1. 개발 환경 설정

```json
# VS Code Extension 개발을 위한 도구 설치
npm install -g yo generator-code

# Extension 프로젝트 생성
yo code

# Snippet Extension 선택
> New Code Snippets
```

### 2. Snippet 작성

```json
{
  "kyd": {
    "prefix": ["kyd", "KYD"],
    "body": [
      "",
      "/**",
      " * 작성자: KYD",
      " * 기능: ",
      " * 프로세스 설명(복잡한 로직시 노션링크)",
      " * 1. ",
      " * 2. .",
      " */",
      "import React from 'react';",
      "",
      "interface I$TM_FILENAME_BASE{}",
      "",
      "const $TM_FILENAME_BASE: React.FC<I$TM_FILENAME_BASE> = () => {",
      "//SECTION HOOK호출 영역",
      "",
      "//!SECTION HOOK호출 영역",
      ""
      // ... 코드 생략
      "",
      "export default $TM_FILENAME_BASE;"
    ],
    "description": "기본 리액트 컴포넌트 생성"
  }
}
```

- [name]: snippet의 이름
- prefix: 자동완성 키워드로 배열형식으로 복수의 값을 지정가능
- body: 자동완성될 코드
- description: 설명
- $TM_FILENAME_BASE : 현재 파일명
- $1,$2…$n: snippet을 불러온뒤 tap키를통해 해당위치로 커서이동을 가능하도록 설정가능

### 3. package.json 설정

```json
{
  "name": "your-snippet-library",
  "version": "1.0.0",
  "publisher": "your-name",
  "engines": {
    "vscode": "^1.60.0"
  },
  "categories": ["Snippets"],
  "contributes": {
    "snippets": [
      {
        "language": "typescript",
        "path": "./snippets/snippets.json"
      },
      {
        "language": "typescriptreact",
        "path": "./snippets/snippets.json"
      }
      // 추가 코드 생략
    ]
  }
}
```

### 4. 배포 준비

1. Azure DevOps 계정 생성
2. Personal Access Token 발급 ([링크](https://learn.microsoft.com/ko-kr/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows)참고)

### 5. VS Code Marketplace 배포

```json
# vsce 설치
npm install -g vsce

# vsce 로그인 //발급한 토큰 입력
vsce login [퍼블리싱 id]

# 패키징
vsce package

# 배포
vsce publish

# 배포 이후 업데이트
vsce publish patch  # 패치 버전 증가 (0.0.x)
vsce publish minor  # 마이너 버전 증가 (0.x.0)
vsce publish major  # 메이저 버전 증가 (x.0.0)
```

## 참고 자료

- [https://velog.io/@junman95/Visual-Studio-Code-Extension-배포하기](https://velog.io/@junman95/Visual-Studio-Code-Extension-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)
