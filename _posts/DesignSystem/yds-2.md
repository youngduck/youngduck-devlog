---
title: "배포 없이 프로젝트와 라이브러리 병렬적으로 개발하기"
excerpt: "라이브러리랑 프레임워크를 함께 개발하는 방법"
coverImage: "/assets/blog/posts/DesignSystem/yds-2/cover.png"
date: "2025-09-04T18:37:00"
ogImage:
  url: "/assets/blog/posts/DesignSystem/yds-2/cover.png"
---

> 이 글은 pnpm link를 통해, 프로젝트와 UI 라이브러리를 병렬로 개발·적용하는 과정을 간단히 정리한 글입니다.

## 문제 상황: 테스트를 위해 매번 배포했던 라이브러리

&nbsp;

[저번 글](https://youngduck-devlog.vercel.app/blog/posts/yds-1)에서 라이브러리와 사이드 프로젝트간의 문제를 해결하기위해,

라이브러리를 수정하고, 배포한 후에 프로젝트에서 라이브러리 업데이트를 통해 테스트를 진행했었습니다.

그러다 보니 YD-UI 라이브러리의 버전이 쉴 새 없이 올라가는 상황이 반복됐습니다.

&nbsp;

실제 테스트서버 같은 개념이 라이브러리 개발할때도 있지 않을까 싶어서
서칭을 해보았고 link 기능을 찾을 수 있었습니다.

&nbsp;
npm,yarn,pnpm,burn 가릴것 없이 패키지 관리 사이트에서 기본적으로 제공해주는 기능인 것 같습니다.

## pnpm link의 작동 원리

작동원리와 사용방법은 굉장히 간단합니다.

&nbsp;
라이브러리의 symlink(심볼릭 링크)를 만들어고 연결을 통해 package.json에 적혀있는 node_modules/@youngduck/yd-ui 경로가 로컬 PC C드라이브의 개발 중인 yd-ui 라이브러리 소스코드를 바라보게 됩니다. 즉, 프로젝트에서 import하는 라이브러리가 로컬상에 설치된 경로를 참조하게 바꾸는 것이져.

사용방법은 더 간단합니다.

## 1단계: 기본 pnpm link 설정

```bash
# YD-UI 레포지토리에서
pnpm link --global

# BDKS-FE 레포지토리에서
pnpm link --global @youngduck/yd-ui
```

## 문제 발생: Peer Dependencies 충돌

저의 경우에는 bdks-fe는 react 18 버전을 사용하고 있었고 yd-ui는 react 19버전이었기때문에 peer dependency 오류가 발생했습니다.

![peer dependency 불일치 경고](/assets/blog/posts/DesignSystem/yds-2/1.png)

이때 [pnpm 공식문서](https://pnpm.io/ko/cli/link)를 찾아보니 대안으로 file: 프로토콜 연결 방식에 대한 내용이 있었습니다.

![공식문서에서 peer depth관련해서 file프로토콜 권장하는내용](/assets/blog/posts/DesignSystem/yds-2/2.png)

peer dependencies 이슈 발생시는 file 프로토콜 방식을 사용하라고 하는데, 저의 경우 앞으로 사용할 ui라이브러리를 만드는 상황이라, 다른 프로젝트간의 의존문제가 생길 확률이 적었습니다.
또한 병렬적으로 만들고 있는 프로젝트는 react 19버전이기때문에 ui라이브러리의 react버전을 19로 업그레이드 하는 것이 맞겠다고 판단해 업데이트를 진행했습니다.

## 2단계: YD-UI의 peerDependencies 업데이트

```json
// YD-UI/package.json
// YD-UI의 peerDependencies를 React 19로 업데이트 해줬습니다.
// 재설치 cli는 생략..
{
  "peerDependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

## 3단계: 실제 테스트해보기

```bash
# YD-UI 디렉토리에서 watch모드 실행
pnpm rollup -c -w

# BDKS-FE 디렉토리에서 평소와 같이 실행
pnpm run dev:dev
```

### 3-1: 테스트결과

![라이브러리에서 새로 만든 INPUT 컴포넌트가 배포없이도 프로젝트에서 잘 import 되는 모습](/assets/blog/posts/DesignSystem/yds-2/3.png)
이제 배포하지 않아도 라이브러리 개발과 프로젝트 개발을 병렬적으로 진행할 수 있게 되었습니다.

## 4단계: 개발 완료 후 링크 해제작업 & 업데이트 처리

```bash
# ------- 완료 후 링크 정리 -------
pnpm unlink --global @youngduck/yd-ui  # BDKS-FE에서
pnpm unlink --global                   # YD-UI에서

# ------- YD-UI 배포 -------
npx publish


# ------- 프로젝트에서 YD-UI 연결해주기 -------
pnpm update @youngduck/yd-ui@latest  # 배포된 UI라이브러리 설치
```

## 배운 점

1. **pnpm link**: 로컬 개발 환경에서 라이브러리와 프로젝트를 동시에 개발할 수 있는 효율적인 도구가 역시나 있었다.

2. **의존성**: 버전 관리는 항상 중요하다.

3. **file: 프로토콜의 활용**: peer dependencies 충돌 시 대안으로 사용할 수 있는 방법도 있다.

&nbsp;
이제 더 이상 라이브러리 버전이 무진장 치솟는 일은 없을 것 같습니다😅
