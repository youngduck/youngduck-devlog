---
title: "8,800KB 웹폰트 FOUT 현상 해결 도전기"
excerpt: "폰트 깜빡임을 잡기 위해 TTF vs WOFF2, CDN vs 셀프호스팅, preload를 시도하며 알아낸 것들"
coverImage: "/assets/blog/posts/react/react-3/cover.png"
date: "2026-05-07T15:00:00"
ogImage:
  url: "/assets/blog/posts/react/react-3/cover.png"
---

> 사이드 프로젝트 개발중 발견한 웹 폰트 깜빡임(FOUT)현상을 해결 해보면서 알게 된 것들을 정리한 글입니다.

## 폰트가 왜 깜빡이지?

![4G네트워크속도에서 화면 진입 시 폰트가 늦게 적용되는 모습](/assets/blog/posts/react/react-3/fout-before.gif)

사이드 프로젝트 [보돌코 스코어드](https://bdks.vercel.app/)를 운영하면서 페이지를 접속하면 헤더의 "보돌코 스코어드" 텍스트가 먼저 렌더링되었다가, 잠시 후 신라문화체 폰트가 적용되면서 텍스트가 깜빡이는 현상을 발견했습니다.

&nbsp;
이후의 동작부터는 캐시가 적용되어 괜찮은데(~~유저가 캐싱기능안쓰면 안괜찮음~~)
사이트 이용시 유저경험을 해치는것은 곧 프론트엔드에게는 직무유기 아니겠습니까?
유저경험을 해칠 수 있겠다는 생각이 들어 바로 원인을 파악해보기로 했습니다.

## FOUT과 FOIT

구글링해보니 이러한 이슈관련해서 **FOUT (Flash of Unstyled Text)** , **FOIT (Flash of Invisible Text)** 라는 두가지 현상을 알 수 있었습니다.

| 용어 | 현상                           | 사용자 경험                 |
| ---- | ------------------------------ | --------------------------- |
| FOUT | fallback 폰트 → 웹 폰트로 교체 | 텍스트가 깜빡이며 바뀜      |
| FOIT | 텍스트 안 보임 → 웹 폰트 적용  | 빈 공간이었다가 텍스트 등장 |

왜 이런 현상이 발생하는지 브라우저 렌더링과정에서 폰트가 어떻게 처리되고 있는지 알아보겠습니다.

## 브라우저 렌더링간 폰트는 비동기 다운로드다

![브라우저 렌더링 파이프라인](/assets/blog/posts/react/react-3/browser-render.png)

저는 평소 @font-face를 사용하면서 별 생각 없이 사용해 왔었는데 이번에 자세히 알아보니
CSS를 파싱하면서 CSSOM트리를 만들때 @font-face로 선언된 폰트가 동기적으로 로드되는것이 아니라, **비동기**로 다운로드가 진행된다는 것을 새로 알았습니다. 비동기로 처리되어있기때문에 브라우저는 CSS 파싱이 끝나면 폰트 다운로드 완료를 기다리지 않고 렌더 트리를 구성하고 화면을 그리기 시작하는데, 이 시점에 폰트 파일은 아직 다운로드 중일 경우, fallback 폰트를 보여주는것입니다.

&nbsp;
저는 이슈를 발견하고 FOUT이 더치명적이라 생각해서 FOIT으로 개선을 해야겠다고 생각했는데 기술블로그를 찾아보니 아니었습니다. [FOUT이 더 나은 UX인이유-네이버기술블로그](https://d2.naver.com/helloworld/4969726) 이러한 사례(요약하자면 일단 보이는게 유저경험에 낫다는 결론)때문에 FOUT으로 제공하는것이 조금 더 나은 전략이라고 합니다.

### 더군다나 폰트용량이 크다

![신라문화체 VS 원티드체 용량차이](/assets/blog/posts/react/react-3/self-hosting-ttf.png)

더군다나 제가 포인트를 주는 용도로 사용하고 있는 신라문화체.ttf는 현재 8,800kb로 기본글꼴로 사용하고 있는 원티드체(minify등 최적화되어있음)와 비교했을때 평균 약 40배정도 무겁고 약 8배 느렸습니다.

## font-display 속성 정리

개발할때 font-face를 쓰면 font-display속성을 같이 지정해줄텐데요. 이번에 한번 속성을 제대로 공부해 보았습니다.
[MDN공식문서](https://developer.mozilla.org/ko/docs/Web/CSS/Reference/At-rules/@font-face/font-display)에 따르면 font-display는
@font-face에서 폰트 로딩 중에 텍스트를 어떻게 보여줄지를 결정하는 CSS 속성입니다.

폰트 로드 시작부터 3가지 기간이 순차적으로 진행됩니다.

1. 폰트 차단 기간 (Block Period) — 폰트 미로드 시 텍스트가 **보이지 않음** (투명한 fallback 폰트로 렌더링). 이 기간에 폰트가 도착하면 즉시 적용
2. 폰트 교체 기간 (Swap Period) — 폰트 미로드 시 **fallback 폰트로 텍스트 표시**. 이 기간에 폰트가 도착하면 교체
3. 폰트 실패 기간 (Failure Period) — 폰트 로드 실패로 간주, fallback 폰트를 영구 유지

## 해결 시도 1: font-display: swap 추가

&nbsp;

앞서 FOUT가 FOIT보다 나은 UX라는 것을 확인했으니, FOIT이 발생하지 않도록 확실히 선언해 주었습니다. 기존에는 명시하지않아 auto상태였고 swap을 지정하여 어떤 브라우저에서든 FOUT이 발생하도록 설정 해 주었습니다.

```css
@font-face {
font-family: "Shilla\*Culture";
src: url("...Shilla_CultureB-Medium.woff2") format("woff2");
font-weight: 500;
font-style: normal;

+ font-display: swap;
  }
```

## 해결 시도 2: TTF 대신 WOFF2로 교체

&nbsp;

현재 저는 폰트를 공식 다운로드 눈누 사이트에서 제공하는 TTF 파일을 그대로 public/fonts 폴더에 넣어 사용하고 있었습니다. TTF확장자로 파일 크기가 8,800KB나 됐습니다.

보통 폰트 최적화를 할 경우에는 WOFF2 폰트로 확장자로 변환하는데요.
**WOFF2**는 동일한 폰트를 Brotli로 압축한 웹 전용 포맷으로, 보통 30~70% 크기가 감소를 기대할 수 있다고 합니다.
그래서 기존 TTF 파일을 제거하고, WOFF2 파일을 다운받아 public/fonts 폴더에 교체해 주었습니다.

![신라문화체.woff2 용량](/assets/blog/posts/react/react-3/self-hosting-woff2.png)

|              | TTF (기존) | WOFF2 (교체 후) |
| ------------ | ---------- | --------------- |
| 파일 크기    | 8,800 kB   | 2,405 kB        |
| 4G 기준 속도 | 7.96초     | 6.66초          |

&nbsp;

포맷 교체로 파일 크기 73% 감소, 로딩 속도도 약 16% 개선되었습니다.
하지만 4G 기준으로 사용자에게 여전히 최악의 UX를 주기때문에 추가 개선이 반드시 필요했습니다.

## 해결 시도 3: preload — 폰트 렌더링 시점을 앞당기면 되지 않을까?

&nbsp;

폰트가 비동기로 다운로드된다면, link preload로 HTML 파싱 시점에 미리 폰트 다운로드를 시작하면 되지 않을까 라는 생각이 들었습니다.

```html
<head>
  <link
    rel="preload"
    as="font"
    type="font/woff2"
    crossorigin
    href="/fonts/Shilla_CultureM-Medium.woff2"
  />
  <link
    rel="preload"
    as="font"
    type="font/woff2"
    crossorigin
    href="/fonts/Shilla_CultureB-Bold.woff2"
  />
  <link rel="stylesheet" href="/src/shared/style/root.css" />
</head>
```

적용이후 **화면 렌더링이 느려졌습니다.** preload로 인해 2,405 kB짜리 폰트의 다운로드 우선순위가 높아지면서 CSS/JS 같은 critical resource들과 대역폭 경합이 발생한 거였습니다. [web.dev](https://web.dev/learn/performance/optimize-web-fonts?hl=en)에서도 _"Overuse of the preload directive may divert bandwidth from other critical resources"_, _"Large font files can take a while to download and negatively affect First Contentful Paint (FCP)"_ 라고 언급하고 있습니다. 실제로 제 상황을 언급하고 있어서 우선 롤백을 진행했습니다.

## 해결 시도 4: 서브셋 — 근본 원인인 폰트 크기줄이기

여러 방법을 시도하면서 결국 중요한 건, **폰트 파일 크기**였습니다. FOUT가 안 보이는 WantedSans는 split 서브셋으로 개당 18~45KB인 반면, 신라문화체는 한글 2,574자가 통째로 들어있어 2,405KB나 됐습니다. 실제로 프로젝트에서 사용하는 글자는 총 9글자이기때문에 나머지 글자는 다운할 필요가 없어서 서브셋처리를 통해 최적화를 해보기로 했습니다.

그래서 npm에 올라가있는 [subset-font](https://www.npmjs.com/package/subset-font) 라이브러리를 설치하고, 제가 사용중인 9글자만 추출하는 스크립트를 돌려봤습니다.

```bash
pnpm add -D subset-font
```

```js
const subsetFont = require("subset-font");
const fs = require("fs");

async function run() {
  const chars = "보돌코스코어드선수관리";

  const boldBuffer = fs.readFileSync("public/fonts/Shilla_CultureB-Bold.woff2");
  const boldSubset = await subsetFont(boldBuffer, chars, {
    targetFormat: "woff2",
  });
  fs.writeFileSync("public/fonts/Shilla_CultureB-Bold.woff2", boldSubset);

  const mediumBuffer = fs.readFileSync(
    "public/fonts/Shilla_CultureM-Medium.woff2",
  );
  const mediumSubset = await subsetFont(mediumBuffer, chars, {
    targetFormat: "woff2",
  });
  fs.writeFileSync("public/fonts/Shilla_CultureM-Medium.woff2", mediumSubset);
}
run();
```

일회성 작업이라 서브셋 파일을 만든 뒤에는 라이브러리를 제거했습니다. 결과가 놀라웠는데요.

| 폰트   | 서브셋 전 | 서브셋 후 | 감소율 |
| ------ | --------- | --------- | ------ |
| Bold   | 2,404 KB  | 11.6 KB   | 99.5%  |
| Medium | 2,317 KB  | 10.2 KB   | 99.5%  |

**2,405 kB → 약 11KB.** WantedSans의 split 파일(18~45KB)보다도 작아졌습니다.
(WantedSans는 단순히 파일이 작은 것이 아니라, unicode-range 기반으로 폰트가 여러 개의 subset 파일로 분리되어 있음)
실제로 빠른 4G 네트워크 기준으로 비교해보니 차이가 확연했습니다.

![서브셋 전후 네트워크 비교](/assets/blog/posts/react/react-3/subset-before-after.png)

|           | 파일 크기 | 로딩 시간 (빠른 4G) |
| --------- | --------- | ------------------- |
| 서브셋 전 | 2,406 KB  | 7.51초              |
| 서브셋 후 | 12.2 KB   | 193ms               |

**7.51초 → 193ms**, 약 **97% 속도 개선**입니다. 이 정도 크기라면 preload를 적용하더라도 다른 critical resource에 미치는 영향이 상대적으로 훨씬 적었습니다. 하지만 저는 조금이라도 더 나은 FCP를 위해서 preload를 적용하지는 않았습니다.

## 시도한 것들 정리

| 시도                  | 효과                                     | 적용 여부                         |
| --------------------- | ---------------------------------------- | --------------------------------- |
| 1. font-display: swap | FOIT 방지                                | 적용                              |
| 2. TTF → WOFF2 교체   | 8,800KB → 2,405KB / 7.96초 → 6.66초      | 적용                              |
| 3. preload            | 다운로드 시점 앞당김                     | 롤백 처리 - 서브셋 후 재검토 필요 |
| 4. 서브셋 추출        | 2,404KB → 11.6KB / 7.51초 → 193ms (97%↓) | 적용                              |

## 마치며

font-display: swap + 셀프호스팅 WOFF2까지 적용했을때는 빠른 4G 기준 폰트 로딩 시간이 **7.96초 → 6.66초**로 약 16% 개선에 그쳤는데, 서브셋까지 적용하고 나니 **2,404KB → 11.6KB**로 줄어들어 p90정도의 네트워크 속도를 가진 유저도 FOUT을 사실상 체감할 수 없는 서비스를 만들 수 있게 되었습니다. 읽어주셔서 감사합니다
