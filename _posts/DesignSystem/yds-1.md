---
title: "내가 만든 UI 라이브러리가 로컬에서만 적용되는 이슈"
excerpt: "라이브러리 배포 시 CSS 연동 실패 분석 및 Rollup extract 설정을 통한 근본적 해결"
coverImage: "/assets/blog/posts/DesignSystem/yds-1/cover.png"
date: "2025-08-04T18:37:00"
ogImage:
  url: "/assets/blog/posts/DesignSystem/yds-1/cover.png"
---

> 이 글은 UI 라이브러리 개발중 배포 결과물에 생긴 문제의 해결 과정을 다루고 있습니다.

## 문제 상황: 로컬에서만 적용되는 UI 라이브러리

안녕하세요! YD-Tech 개발자 김영덕입니다.
&nbsp;

저는 요즘 보돌코(사이드프로젝트)를 개발하면서 YD-UI라는 UI 라이브러리를 함께 개발하고 있는데요, 당황스러운 문제를 겪었습니다. 로컬 개발 환경에서는 라이브러리 스타일이 적용되는데, 프로덕션 빌드 환경에서는 스타일이 전혀 적용되지 않는 현상이었습니다.
&nbsp;

![로컬(좌)에서는 YD-UI 버튼 스타일이 적용되지만, 빌드(우)에서는 적용되지 않는 모습](/assets/blog/posts/DesignSystem/yds-1/1.png)

![개발자도구: 주석처리되어있는 빌드(우)화면](/assets/blog/posts/DesignSystem/yds-1/3.png)

### 문제가 된 설정

저는 JavaScript 라이브러리를 번들링하는 도구인 Rollup을 통해 라이브러리를 만들고 있는데요. 다음과 같이 소스코드를 작성해 주었습니다.

```javascript
// YD-UI/rollup.config.js - 문제가 있던 설정
postcss({
  config: {
    path: './postcss.config.js',
  },
  extensions: ['.css'],
  minimize: true,
  inject: true, // CSS를 JS에만 주입
  // extract 설정이 없어서 별도 CSS 파일이 생성되지 않음
}),
```

&nbsp;
이 설정으로는 CSS가 JavaScript 번들에만 주입되어, 보돌코 프로젝트에서 CSS 파일을 별도로 import할 수 없었습니다. 즉 보돌코 프로젝트에서 가져온 JavaScript 번들에 yds-button은 할당되어 있지만 매핑될 yds-button의 css자체가 없어 사용할 수가 없는 상황이었습니다.

&nbsp;

실마리를 찾은 이후 JS 번들링과 CSS 파일을 연동여부를 확인하기 위해 YD-UI의 dist 파일을 찾아보니, dist 파일에 CSS가 비어있다는 것을 발견했습니다. 하지만 로컬 개발환경에서는 왜 문제없이 실행되었는지는 아직까지도 파악하지 못했습니다.

&nbsp;

[rollup-plugin-postcss 공식 문서](https://github.com/egoist/rollup-plugin-postcss)에 따르면 inject: true 옵션은 CSS를 JavaScript 번들에 포함시키고 런타임에 head태그에 주입합니다. 라고 하는데 추후 분석을 좀 더 해보고 포스트를 업로드해보도록 하겠습니다.

### 프로젝트별 상황

- **YD-UI 라이브러리**: inject: true 설정으로 인해 CSS가 JS번들에 포함되고, 별도 CSS 파일은 생성하지 않음

- **보돌코 프로젝트 (로컬 개발환경)**: YD-UI를 import했을 때 JS번들만 있고 별도CSS를 IMPORT하지 않아도 라이브러리 디자인이 자동으로 적용됨

- **보돌코 프로젝트 (프로덕션 빌드)**: 동일한 YD-UI를 import했는데 JS번들만 있는 상태에서는 디자인이 적용되지 않음

**의문점**: 공식문서에 따르면 inject는 환경과 무관하게 동작해야 하는데, 왜 로컬에서는 번들자체만으로 디자인이 적용되고 빌드에서는 적용이 안 되는지 정확한 원인을 파악하지 못했습니다.

**해결 방향**: 우선은 원인 분석은 후순위로 미루고 extract:true를 추가하여 별도 CSS 파일을 생성하여 명시적으로 CSS를 import하는 방식으로 문제를 근본적으로 해결했습니다.

### 해결된 설정

```javascript
// YD-UI/rollup.config.js - 해결된 설정
postcss({
  config: {
    path: './postcss.config.js',
  },
  extensions: ['.css'],
  minimize: true,
  inject: true,        // JS에도 주입하고
  extract: 'index.css' // 별도 CSS 파일도 생성
}),
```

## 추가로 작업한 설정

### 1. package.json 파일 배포 설정

```json
// YD-UI/package.json
{
  "files": ["dist", "dist/index.css"], // CSS 파일도 npm 패키지에 포함
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/index.css", // import로 사용할 CSS경로 커스텀
    "./dist/*": "./dist/*",
    "./package.json": "./package.json"
  }
}
```

### 2. 보돌코 프로젝트에서 CSS import 하기

```css
/* 보돌코/src/shared/style/root.css */
@import url("https://fastly.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css");
@import "tailwindcss";
@import "@youngduck/yd-ui/styles"; /* YD-UI CSS 스타일 import */
```

## 적용 결과 (문제해결과 새로운 문제)

![문제 해결 후 로컬과 빌드 모두에서 YD-UI 스타일이 정상 적용되는 모습](/assets/blog/posts/DesignSystem/yds-1/2.png)

이렇게 처리를 한 이후 로컬 개발 환경과 프로덕션 빌드 모두에서 YD-UI 스타일이 적용되는것을 드디어 확인 할 수 있었습니다.

&nbsp;
ui라이브러리의 rollup 부분을 막 고치면서 싱크를 맞추는 과정에서 yd-ui를 배포해야 보돌코 프로젝트에서 테스트를 해볼 수 있다보니 yd-ui라이브러리의 버전이 **무진장** 치솟았습니다.

&nbsp;
당장은 해당 이슈를 고치는데 집중하였고 다음에 이러한 문제를 해결해보는것이 좋겠다 생각했습니다.

## 문제를 해결하며 궁금했던 부분들

1. **로컬 개발 환경에서의 로컬 단계의 라이브러리 테스트**: 실무에서는 로컬에서 업데이트되는 라이브러리를 어떻게 테스트하고 개발할까?

## 추후 다뤄볼 부분들

1. npm link를 활용한 로컬 개발 환경 구성?
2. alpha/beta 태그를 활용한 버전 관리 전략?
3. 효율적인 라이브러리 CI/CD 파이프라인 구성 방법?

## 배운 점

1. **라이브러리 개발 시 Rollup 설정의 중요성**: inject와 extract 옵션을 모두 사용해야 번들링된 js와 css를 연동시킬 수 있다.

2. **package.json exports 필드 활용**: "./styles": "./dist/index.css" 설정으로 CSS를 import시 네이밍을 커스텀 할 수 있다.

3. 생각보다 이 문제를 해결하는데 시간을 썼는데요. 왜 디자인 시스템 채용공고에 라이브러리 개발경험에 대한 우대사항이 있었는지 이해할 수 있었습니다😅
