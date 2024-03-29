---
title: "[Frontend] 브라우저 렌더링, Reflow, Repaint 파헤치기"
excerpt: "브라우저 렌더링 과정, Reflow, Repaint 개념에 대한 정리글입니다."
coverImage: "/assets/blog/posts/cs-study/fe-cover.png"
date: "2024-03-29T15:11:00"
category: "Computer Science"
ogImage:
  url: "/assets/blog/posts/cs-study/fe-cover.png"
---

## 브라우저 렌더링 원리

브라우저가 화면에 나타나는 요소를 렌더링할때, **렌더링엔진** (웹킷, 게코, 블링크) 사용.

렌더링엔진 HTML,CSS,JS렌더링시 **CRP** 프로세스 사용.

## CRP(Critical Rendering Path, 중요 렌더링 경로) 과정

- HTML 파싱, DOM트리 구축
- CSS 파싱, CSSOM트리 구축

- JavaScript 실행(HTML중간에 스크립트 존재시 HTML 파싱 중단)

- DOM,CSSOM 조합, 렌더트리 구축
- 뷰포트 기반 렌더트리의 각 노드 위치,크기 계산(Layout 단계)
- 계산한 위치,크기 기반 화면에 그림(Paint 단계)

## Reflow 실행시점

1. DOM 엘리먼트 추가, 제거, 변경
2. CSS 스타일 추가, 제거, 변경
3. CSS 스타일을 직접변경하거나, 클래스 추가시 레이아웃이 변경될 수 있습니다. 엘리먼트의 길이를 변경하면, DOM 트리에 있는 다른 노드에 영향을 줄 수있습니다.
4. CSS 애니메이션,트랜지션. 애니메이션 모든프레임 리플로우발생
5. offsetWidth,offsetHeight 사용. 해당 속성 읽을시 초기 리플로우가 트리거되어 수치계산.
6. hover, 텍스트입력, 창 크기조정 등 유저행동에 의해 트리거

## Repaint 실행시점

- 가시성이 변경되는 순간 EX) opacity, visiblity
- Reflow 가 실행된 순간 뒤에 실행

## 용어정리

### 파싱

파싱은 하나의 프로그램을 런타임환경이 실제로 실행할 수 있는 내부 포맷으로 분석하고 변환하는것.
즉 파싱은 문서의 내용을 토큰으로 분석하고, 문법적의미와 구조를 반영한 파스 트리를 생성하는 과정

### DOM (Document Object Model)

웹 페이지를 이루는 태그들을 자바스크립트가 이용할 수 있게끔 브라우저가 트리구조로 만든 객체모델.
DOM은 HTML과 JavaScript를 서로 이어주는 역할을함.

### CSSOM (CSS Object Model)

DOM처럼 CSS의 내용을 해석하고 노드를 만들어 트리구조로 만든것.

### 렌더트리 (Render Tree)

CSSOM, DOM트리의 결합으로 만들어짐.
Layout계산, Paint 과정 프로세스를 위해 존재

### Layout

뷰포트 내에서 노드의 정확한 위치와 크기 계산하는 단계.

### Paint

렌더링 트리의 각노드를 화면의 실제 픽셀로 변환하는 마지막 단계, '페인팅', '래스터화' 라고함.

### Reflow

생성된 DOM 노드의 레이아웃 수치(너비,높이,위치 등) 변경시 영향받은 모든노드 수치를 다시계산하여, 렌더트리를 재생성하는 과정.

### Repaint

Reflow 과정이끝난후 재생성된 렌더트리를 다시그리게 되는데 이과정을 Repaint라 함.

## 참고 자료

- [프론트엔드 면접질문 중요도별 정리](https://github.com/Esoolgnah/Frontend-Interview-Questions?tab=readme-ov-file)
