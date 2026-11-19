# Changelog

**시맨틱 버저닝 적용 안내**

본 프로젝트는 [시맨틱 버저닝(Semantic Versioning)](https://semver.org/lang/ko/) 규칙을 따릅니다. 버전 표기 방식은 `MAJOR.MINOR.PATCH`(예: 1.2.3)입니다.

## [1.4.1] - 2026-11-19

**Branch**: `YD-v1.4.1-일정관리개선`

### 추가

- feat: 미완료 할 일 자동 이월 — 지난 날짜에 체크 안 된 항목을 화면을 열 때 오늘로 옮기고 Notion `이월` 횟수 +1 (`↻n` 표시)
- feat: 할 일 기한·놓침 — Notion `기한`(date)·`놓침`(checkbox) 속성 추가. 기한이 지나면 이월하지 않고 놓침 처리(기한 날에 기록), `D-n`·"오늘 마감" 표시
- feat: "못 함" 버튼 — 기한 전이라도 직접 놓침 처리해 이월을 멈추고, 되돌리기 가능. 놓친 항목을 늦게 체크하면 완료로 전환
- feat: 할 일 추가 시 기한 입력 (선택)
- feat: 달력 위 바로가기 카드 — 기술블로그·YD-UI·보돌코 스코어드별 홈 버튼 + 운영 도구 아이콘 링크 (GitHub·Vercel·Sentry·Chromatic·npm·Storybook·Supabase·GA), 모두 새 탭으로 열림
- feat: 달레스터디 리트코드 2~15주차 문제를 Notion 일정에 월~금 1문제씩 배정, 기한 = 해당 주 일요일 (`리트코드` 프로젝트)

### 변경

- refactor: 할 일 체크·추가·삭제를 React Query 낙관적 업데이트로 전환 — Server Action 의 `revalidatePath`(페이지 전체 재렌더, 약 1.4초) 제거, 화면 반영 약 0.1초
- refactor: 할 일 재조회용 `/schedule/api/todos` 라우트 추가, 추가 시 Notion 이 돌려준 항목으로 임시 항목 교체
- style: 프로젝트 필터·상세 패널에 저장소 영문 이름 대신 한글 이름과 로고 표시 (`_data/projects.ts`)
- style: 휴대폰 반응형 — 바로가기 카드 1열, 필터 가로 스크롤, 달력 칸은 점·커밋 수로 요약, 날짜 탭 시 상세 패널로 스크롤, 입력창 16px(iOS 확대 방지), 터치 기기에서 삭제·못 함 버튼 항상 표시
- chore: `@tanstack/react-query` 추가 (일정관리 화면에만 QueryClientProvider 적용)
- chore: `scripts/setup-schedule-db.mjs` 가 `기한`·`놓침` 속성도 추가

### 수정

- fix: 휴대폰에서 필터(`fieldset` 기본 최소 폭)와 입력창 기본 폭 때문에 페이지가 화면보다 넓어지던 문제

### 제거

---

## [1.4.0] - 2026-11-18

**Branch**: `YD-v1.4.0-일정관리라우터`

### 추가

- feat: 비공개 일정관리 라우터 추가 (`/schedule`) — 월 달력 + 날짜별 할 일 체크리스트
- feat: Notion API(YD-DEV 워크스페이스 DB)를 저장소로 사용해 할 일 조회·추가·체크·삭제 (Server Actions)
- feat: GitHub 커밋 검색 API로 그 날 push 한 커밋을 "자동 완료" 항목으로 표시 (공개 저장소, 10분 캐시)
- feat: 프로젝트별 필터 (저장소 이름 = Notion `프로젝트` 선택지, 숨긴 프로젝트는 브라우저에 기억)
- feat: `middleware.ts` Basic Auth 게이트 — `/schedule` 접근 시 계정 필요 (env 미설정 시 전부 차단)
- feat: Notion DB 셋업 스크립트 (`scripts/setup-schedule-db.mjs`) — 페이지 하위 DB 탐색·속성 추가

### 변경

### 수정

### 제거

---

## [1.3.0] - 2026-09-09

**Branch**: `YD-v1.3.0-이력서포트폴리오라우터`

### 추가

- feat: 이력서/포트폴리오 문서함 라우터 추가 (`/private` 허브 → `/resume`, `/portfolio`)
- feat: React 컴포넌트 적재 기반 A4 문서 시스템 (595px 캔버스 → A4 스케일, 브라우저 인쇄로 PDF 추출)
- feat: Figma 디자인 픽셀 재현 — 이력서 2p(세로), 포트폴리오 8p(가로, 커버·프로필·프로젝트 상세)
- feat: 포트폴리오 YD-UI 타이틀 Zen Maru Gothic 폰트 적용

### 변경

### 수정

### 제거

---

## [1.2.2] - 2025-12-29

**Branch**: `YD-v1.2.2-YD-DATAS컨텐츠추가`

### 추가

- feat: side-proejcts컴포넌트추가
- feat: eslint 규칙 고도화

### 변경

- refactor: 컴포넌트이름변경 area-chart -> posting-data-chart
- refactor: 미사용 interafce선언 제거 및 상위폴더명변경 charts -> yd-datas
- refactor: eslint 규칙 고도화에 따른 소스코드 대규모 수정

### 수정

### 제거

---

## [1.2.1] - 2025-12-12

**Branch**: `YD-v1.2.1-포스팅가지치기`

### Added 새로운 기능

- docs: v1.2.1작업내용문서

### Changed 기존 기능의 변경사항

### Deprecated 곧 지워질 기능

### Removed 지금 지워진 기능

- posting: 옛날에 쓴 단순 정보성 블로그들 전체삭제

### Fixed 버그 픽스

### Security 취약점이 있는 경우

---

## [1.1.3] - 2025-12-02

**Branch**: `YD-v1.1.3-반응형헤더컴포넌트제작`

### Added 새로운 기능

- feat: 반응형 헤더 추가

### Changed 기존 기능의 변경사항

### Deprecated 곧 지워질 기능

### Removed 지금 지워진 기능

### Fixed 버그 픽스

### Security 취약점이 있는 경우

---

## [1.1.2] - 2025-11-12

**Branch**: `YD-v1.1.2-반응형디자인조정: 모바일 홈페이지화면`

### Added 새로운 기능

### Changed 기존 기능의 변경사항

- 메인홈페이지 의 `main.tsx`에 모바일화면에서 padding을 부여하여 전체적인 그리드 컨텐츠들이 집약적으로 보이도록 수정

### Deprecated 곧 지워질 기능

### Removed 지금 지워진 기능

### Fixed 버그 픽스

### Security 취약점이 있는 경우

---

## [1.1.1] - 2025-11-12

**Branch**: `YD-v1.1.1-반응형디자인조정: 모바일 게시글화면`

### Added 새로운 기능

### Changed 기존 기능의 변경사항

- `styled-markdown.tsx` 디자인 수정
  - 이미지 태그 모바일화면 화면크기보다 커지는 현상 수정 100vw -> 100%
  - p 태그 글자크기 tailwind text-lg -> font 16px, line-height 28px로 변경
  - h2,h3태그 글자크기 tailwind text-3xl,2xl -> text2xl, xl 변경
  - h2,h3태그 패딩탑 모바일화면에서 60px -> 20px
  - quote태그 패딩 p-4 -> p-2
  - ul,ol,li태그 간격 조정
  - a태그 undeline 부여
- posts/slug 의 `main.tsx`에 모바일화면에서 padding을 부여하여 전체적인 컨텐츠들이 집약적으로 보이도록 수정

- husky 커밋규칙명 docs 추가

### Deprecated 곧 지워질 기능

### Removed 지금 지워진 기능

- about페이지 더미코드 제거

### Fixed 버그 픽스

### Security 취약점이 있는 경우

---
