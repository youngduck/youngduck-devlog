---
title: "SVG로 애니메이션 컴포넌트 만들어보기 feat.피그마,GSAP"
excerpt: "PNG 이미지를 애니메이션으로 만들기"
coverImage: "/assets/blog/posts/GSAP/gsap-1/cover.gif"
date: "2025-05-11T18:37:00"
ogImage:
  url: "/assets/blog/posts/GSAP/gsap-1/cover.gif"
---

> 이번 글은 PNG를 SVG로 변환하고, GSAP라이브러리를 활용해 애니메이션을 구현한 과정을 담은 글입니다.

## 새로운 블로그 캐릭터의 탄생

저는 요즘 블로그 썸네일을 만들때 whisk가 만들어주는 생성형이미지를 사용하고 있습니다.
최근에 스토리북 [오류해결과정](https://youngduck-devlog.vercel.app/blog/posts/devlog-2)을 작성하면서 "오리캐릭터와 스토리북과 파일시스템모듈, NextJs 구조도를 함께 그린 썸네일을 만들어 줘" 라는 질의로 썸네일 생성을 요청했는데요.

![whisk가 만들어준 블로그 썸네일 자료](/assets/blog/posts/GSAP/gsap-1/1.png)

썸네일 속 오리가 매우 마음에 들어 블로그의 메인 캐릭터로 교체하기로 결정 했습니다.
그리고 예전부터 구현해보고 싶었던 애니메이션을 어떻게 만드는건지 방법을 찾아보기로 했어요.

## 웹사이트에 애니메이션을 넣는 방법들

웹사이트에 애니메이션을 구현하는 방법은 여러가지가 있습니다. 대표적으로 로티(Lottie), SVG 애니메이션, GIF 등이 있는데요. 이 중에서 저는 SVG 애니메이션을 선택했습니다. ~~개발자니까~~

&nbsp;

SVG 애니메이션을 선택한 이유:

1. **화질이 깨지지 않음** - 벡터 기반이라 어떤 해상도에서도 선명합니다
2. **파일 크기가 작음** - GIF나 동영상 대비 용량이 작아 로딩이 빠릅니다
3. **세부 요소 제어 가능** - 각 요소를 코드로 제어할 수 있어 인터랙티브한 애니메이션 구현이 가능합니다
4. **개발자 친화적** - 로티처럼 디자인 툴이 아닌 코드로 제어할 수 있어 개발자가 직접 다루기 편합니다

## PNG 확장자 -> SVG로 만들기

### 1. Cursor한테 이미지 참조해서 SVG로 만들어 달라하기

커서에디터를 통해 클로드3.7 버전에 이미지를 주고 SVG로 렌더링 해달라 요청했습니다.

클로드에서 반환해준 SVG 값을 화면에 렌더링 해봤더니 결과물은 다음과 같았는데요.

![커서가 만들어준 블로그 썸네일 자료](/assets/blog/posts/GSAP/gsap-1/2.png)

…WHAT?
평소 퍼블리싱 요청시에는 괜찮은 컴포넌트들을 반환해줘서 기대했었는데 생각지못한 퀄리티에 아쉬웠습니다.
&nbsp;
++ 반복해서 질문하다보니 퀄리티가 좋게 나올때가 있었습니다. 하지만 원하는 수준의 퀄리티 까지는 구현이 안되는 것 같았어요.
SVG,이미지 변환에 강점이있는 AI툴을 사용하면 아마 원하는 형태로 뽑아낼 수 도 있을것 같습니다. 아니면 1,2개월만 지나도 커서나 자체 LLM들이 좋은 퀄리티로 뽑아주지 않을까 싶습니다.

### 2. PNG TO SVG 변환 사이트 이용

AI툴 이전에 제가 대학시절부터 자주 사용했었던 사이트인데요. png to jpg 같은 변환 사이트를 직접 이용해보면 어떨까 싶었습니다.

svg로 변환해본건 이번이 처음인데요. 기대감을 안고 png 이미지 변환을 요청해보았습니다.

![확장자 변환사이트가 만들어준 블로그 썸네일 자료](/assets/blog/posts/GSAP/gsap-1/3.png)

총 5개의 그룹(좌우 눈, 좌우콧구멍, 나머지전부)으로 매우 유사하게 그려주었는데요. 이대로 사용하기에는 2가지 문제가 있었습니다.

1.  양쪽 볼이 뭉특하게 표현되는 디테일 문제
2.  더 세세한 그룹으로 쪼개길 원했기 때문에 원하는 형태로 커스텀이 불가능함

&nbsp;
즉 부리에만 색상을 칠한다거나, 제가 구상하고 있는 애니메이션을 제작하기에는 적합하지 않았어요.

### 3. 직접 피그마로 누끼따서 SVG 만들기

![파란선으로 누끼를 따고 그룹핑을 해준 모습](/assets/blog/posts/GSAP/gsap-1/4.png)

저는 부위 별로 세세하게 애니메이션을 넣고 새로운 텍스쳐들도 만들고 싶었기 때문에 어떤 방법이 있을까 고민하다가 직접 피그마로 누끼를 딴따면 만들 수 있지 않을까 라는 생각이 들었습니다.

당장 실행에 옮겨 피그마에 이미지를 놓고 누끼를 따기 시작했습니다. 1학년때 포토샾을 살짝배운 영향덕에 누끼는 금방 딸 수 있었습니다. (~~유튜브도 살짝봄~~)
&nbsp;

~~옆통수가 살짝 삐뚤했지만~~ 각 부위별로 이름을 주고 그룹핑을 해줬습니다. 이렇게 한 후 나중에 애니메이션이나 스타일을 줄 때 각각의 요소를 쉽게 선택하고 제어할수 있도록 SVG코드 각 요소에 id,class를 지정해주었습니다.

```html
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 머리 -->
  <path d="중략" stroke="black" fill="white" />
  <!-- 윗입 -->
  <path d="중략" fill="#F8AB3E" stroke="black" />

  <!-- 아랫입 -->
  <path d="중략" fill="#F5AB3F" stroke="black" />
  <!-- handThumbUp 엄지척 -->
  <path d="중략" stroke="black" fill="white" />
  <!-- 왼쪽눈 -->
  <ellipse class="leftEye" id="leftEye" d="중략" fill="black"/>
  <!-- 오른쪽눈 -->
  <ellipse class="rightEye" id="rightEye" d="중략"" fill="black" />
  <!-- 콧주름 -->
  <path d="중략" stroke="black" />
  <!-- 별1 -->
  <path d="중략" fill="#FBF58B" />
  <!-- 별2 -->
  <path d="중략" fill="#ECF93A" />
  <!-- 별3 -->
  <path d="중략" fill="#FB9F1D" />
  <!-- 감은눈 왼쪽 -->
  <path d="중략" stroke="black" stroke-width="2" />
  <!-- 감은눈 오른쪽 -->
  <path d="중략" stroke="black" stroke-width="2" />
  <!-- 왼쪽콧구멍 -->
  <circle cx="44.3487" cy="64.5" r="1" fill="black" />
  <!-- 오른쪽콧구멍 -->
  <circle cx="61.3487" cy="64.5" r="1" fill="black" />
</svg>
```

## 무엇으로 SVG 애니메이션을 만들까?

SVG를 만들었으니 이제 애니메이션을 구현할 차례입니다. SVG 애니메이션을 구현할 수 있는 주요 라이브러리들을 찾아 보았습니다.

### Framer Motion

선언적인 API와 React 친화적인 컴포넌트 기반 접근 방식이 장점. 간단한 애니메이션과 인터랙션을 빠르게 구현하기 좋음.

### GSAP (GreenSock Animation Platform)

웹 애니메이션 분야에서 가장 강력하고 성능이 좋다고 알려진 라이브러리. 복잡한 타임라인 제어, 시퀀스 애니메이션, SVG 모핑 등 고급 기능을 제공합니다. 학습 곡선이 있지만 세밀한 제어가 필요할 때 최고의 선택.

### CSS Keyframe

별도의 라이브러리 없이 순수 CSS만으로 구현 가능. 가장 가볍고 빠르지만, 복잡한 시퀀스나 동적인 제어가 필요한 경우에는 한계점 존재.

**결론: GSAP 선택**

GSAP은 애니메이션 구현에 특화되어 있고 공식문서도 보기 좋고 퍼포먼스 최적화(후술할 useGSAP)도 잘 되어 있는 점이 인상적이었습니다. 또 여러 디자인 시스템 채용공고에서도 GSAP 경험을 우대하는 경우를 많이 봤어요. 그래서 이번 작업에 **GSAP**이 가장 적합하다고 판단했습니다.

## GSAP으로 만들어보기

먼저 GSAP 라이브러리를 설치해줍니다.

```bash
npm i gsap
npm i @gsap/react
```

### useGSAP 훅을 사용해야 하는 이유

GSAP [공식문서](https://gsap.com/resources/React/)를 살펴보니 React, Next.js를 사용할 때 useGSAP 훅을 사용하는 것을 권장한다고 합니다.

&nbsp;
useGSAP의 장점:

1. **자동 클린업** - 컴포넌트가 언마운트될 때 애니메이션을 자동으로 정리해줍니다
2. **메모리 누수 방지** - contextSafe를 통해 이벤트 핸들러도 안전하게 관리합니다
3. **useLayoutEffect 내장** - React의 useLayoutEffect와 useEffect를 적절히 혼용해서 사용할 필요가 없습니다
4. **SSR 대응** - Next.js와 같은 SSR 환경에서도 안전하게 작동합니다

기존에는 useLayoutEffect, useEffect를 직접 혼용해서 사용했어야 했는데, useGSAP의 도입으로 라이브러리측 내부단에서 최적화를 처리해주니 훨씬 편리하게 사용할 수 있다고 합니다.

### 애니메이션 시나리오 구상하기

구현하고 싶은 애니메이션의 시나리오를 먼저 정리했습니다:

타임라인 시나리오

1. **오리 외곽선 등장 (0.5초)**: 머리, 뜬 눈, 콧구멍, 콧주름이 동시에 나타남 → 눈 깜빡임 시작
2. **부리 등장 (0.5초)**: 부리(윗입,아랫입)가 나타남
3. **엄지척 등장 (0.5초)**: 엄지척 손이 나타남
4. **별 이펙트 (0.8초)**: 3개의 별이 동시에 바깥으로 등장하면서 퍼짐
5. **유지 (4.5초)**: 완성된 모습 유지
6. **초기화 (0.5초)**: 모든 요소가 사라지며 눈 깜빡임 정지
7. **1초 대기 후 반복**

눈 깜빡임 타임라인 시나리오

- 뜬 눈 ↔ 감은 눈 (0.1초)

### 타임라인 구현하기

GSAP의 timeline 기능을 활용하면 여러 애니메이션을 순차적으로 제어할 수 있습니다. 저는 메인 애니메이션과 눈 깜빡임을 독립적으로 관리하기 위해 두 개의 타임라인을 생성했어요.

&nbsp;
1단계 : 초기 설정 및 타임라인 생성

```tsx
// 초기 상태: 모든 요소를 투명하게 설정
gsap.set([head, eyes, mouth, hand, stars, ...], {
  opacity: 0,
  scale: 1,
});

// 메인 타임라인: 무한 반복, 1초 대기 후 재시작
const timeline = gsap.timeline({
  repeat: -1,
  repeatDelay: 1,
});

// 눈 깜빡임 타임라인: 정지 상태로 생성
const blinkTimeline = gsap.timeline({
  repeat: -1,
  repeatDelay: 1,
  paused:true
});
```

&nbsp;

2단계 : 눈 깜빡임 애니메이션

눈 깜빡임은 뜬 눈과 감은 눈을 빠르게 전환하여 자연스러운 깜빡임 효과를 만들어 봤습니다.

```tsx
blinkTimeline
  .to([leftOpenEye, rightOpenEye], {
    opacity: 0,
    duration: 0.1,
  })
  .to(
    [closeLeftEye, closeRightEye],
    {
      opacity: 1,
      duration: 0.1,
    },
    "<",
  ) // 동시 실행
  .to(
    [closeLeftEye, closeRightEye],
    {
      opacity: 0,
      duration: 0.1,
    },
    "+=0.1",
  )
  .to(
    [leftOpenEye, rightOpenEye],
    {
      opacity: 1,
      duration: 0.1,
    },
    "<",
  ); // 동시 실행
```

&nbsp;
3단계 : 메인 애니메이션 순차 구현

```tsx
// 1. 오리 머리 부분 등장
timeline.to([head, leftOpenEye, rightOpenEye, leftNostril, rightNostril, noseWrinkle], {
  opacity: 1,
  scale: 1,
  duration: 0.5,
  ease: "power1.inOut",
  onComplete: () => {
    blinkTimeline.play(); // 오리가 나타나면 눈 깜빡임 시작
  },
});

// 2. 입 등장 (>는 이전 애니메이션 완료 후 시작)
timeline.to([mouseTop, mouseBottom], {
  opacity: 1,
  scale: 1,
  duration: 0.5,
  ease: "power1.inOut",
}, ">");

// 3. 엄지척 손 등장
timeline.to(handThumbUp, {
  opacity: 1,
  scale: 1,
  duration: 0.5,
  ease: "power1.inOut",
}, ">");

// 4. 별 3개가 바깥으로 퍼지며 등장
timeline
  .set([star1, star2, star3], { opacity: 1, scale: 1 }, "-=0.3")
  .to([star1, star2, star3], {
    x: (i) => [+10, -10, +5][i], // 각 별마다 다른 x 이동
    y: (i) => [-15, -5, +10][i],  // 각 별마다 다른 y 이동
    duration: 0.8,
    ease: "power1.out",
  }, "<");

// 5. 완성된 모습 유지
timeline.to({}, { duration: 4.5 });

// 6. 초기화
timeline.to([head, mouseTop, mouseBottom, handThumbUp, eyes, stars, ...], {
  opacity: 0,
  duration: 0.5,
  ease: "power1.inOut",
  onStart: () => {
    blinkTimeline.pause(); // 사라질 때 눈 깜빡임 정지
  },
});
```

### GSAP 애니메이션 컴포넌트 결과물

![완성된 오리 애니메이션](/assets/blog/posts/GSAP/gsap-1/6.gif)

SVG의 각 요소에 id를 부여하고, GSAP의 타임라인으로 순차적인 애니메이션을 구현하니 생각보다 간단하게 원하는 결과물을 만들 수 있었어요.

## 마무리

PNG 이미지에서 시작해 SVG로 변환하고, GSAP으로 애니메이션까지 구현하는 과정을 진행해봤습니다.

처음에는 AI 도구나 변환 사이트를 활용해봤지만, 세밀한 제어가 필요한 경우에는 역시 직접 만드는 것이 아직까지는 최선인 것 같습니다.

특히 GSAP의 타임라인 기능은 복잡한 시퀀스 애니메이션을 직관적으로 관리할 수 있게 해주어서 약간 영상편집하는 느낌도 나고 매우 재밌었습니다. 앞으로도 애니메이션 기능이 필요할때마다 애용하는 라이브러리가 될것 같습니다.

## 참고자료

- [GSAP 공식 문서 - React 가이드](https://gsap.com/resources/React/)
- [SVG 애니메이션 튜토리얼](https://wdnote.tistory.com/183)
- [GSAP 타임라인 기초](https://www.youtube.com/watch?v=UTHgr6NLeEw)
