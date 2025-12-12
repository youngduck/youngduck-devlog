# Changelog

**시맨틱 버저닝 적용 안내**

본 프로젝트는 [시맨틱 버저닝(Semantic Versioning)](https://semver.org/lang/ko/) 규칙을 따릅니다. 버전 표기 방식은 `MAJOR.MINOR.PATCH`(예: 1.2.3)입니다.

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
