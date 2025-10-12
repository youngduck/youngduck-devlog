---
title: "Compound Component? TypeGuard? 디자인패턴을 활용한 SelectBox 만들기"
excerpt: "유연하고 확장 가능한 UI 컴포넌트 설계 해보기"
coverImage: "/assets/blog/posts/DesignSystem/yds-3/cover.png"
date: "2025-09-22T22:37:00"
ogImage:
  url: "/assets/blog/posts/DesignSystem/yds-3/cover.png"
---

> 이번 글은 제가 YD-UI 라이브러리의 SelectBox 컴포넌트를 만들고 다듬어 가는 과정을 시간의 흐름대로 적은 글 입니다.

## 시작: 피그마를 보고 일단 러프하게 만들기

&nbsp;

![yd-ui의 SelectBox 디자인과 요구사항](/assets/blog/posts/DesignSystem/yds-3/1.png)

일단은 피그마를 보고 러프하게 구현을 했습니다.

- 기본적인 select box에 검색옵션을 옵셔널로 제공
- cva를 활용해 조건별 디자인

&nbsp;

```javascript
import { useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

export type SelectBoxOptions = {
  label: string
  value: string
}

export type SelectBoxProps = {
  options: {
    lists: SelectBoxOptions[]
    search?: boolean
  }
  value: SelectBoxOptions | null
  onChange: (option: SelectBoxOptions) => void
} & VariantProps<typeof wrapperVariants>

const wrapperVariants = cva('relative h-12', {
  variants: {
    size: {
      sm: 'w-[200px]',
      md: 'w-[300px]',
      lg: 'w-[400px]',
      full: 'w-full',
    },
  },
  defaultVariants: {
    size: 'full',
  },
})

export function SelectBox({ size, options: { lists, search = false }, onChange, value }: SelectBoxProps) {
  const [isToggleOpen, setIsToggleOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSelectBoxToggle = () => {
    setIsToggleOpen(!isToggleOpen)
  }

  const handleOptionClick = (option: SelectBoxOptions) => {
    onChange(option)
    setIsToggleOpen(false)
    setSearchValue('')
  }

  return (
    <div className={wrapperVariants({ size })}>
      <div
        className="text-primary-100 border-primary-100 text-yds-b1 absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-between rounded-lg border-2 p-3"
        onClick={handleSelectBoxToggle}
      >
        {!value && '선택'}
        {value && value.value}
        <ChevronDown className="text-primary-100 transition-transform duration-300" />
      </div>
      {isToggleOpen && (
        <div className="bg-background-secondary border-primary-100 absolute top-14 left-0 flex h-auto w-full flex-col gap-2 rounded-lg border-2 p-3">
          {search && (
            <div className="border-primary-100 flex h-[40px] items-center border-y-2">
              <Search className="text-primary-100" size={20} />
              <input
                type="text"
                className="w-full p-2 text-white hover:outline-none focus:outline-none"
                value={searchValue}
                placeholder="검색으로 쉽게찾기"
                onChange={e => setSearchValue(e.target.value)}
              />
            </div>
          )}
          {lists
            .filter(option => option.value.includes(searchValue))
            .map(option => (
              <div
                key={option.label}
                className="text-yds-c1m hover:bg-background-primary flex cursor-pointer items-center justify-between text-white"
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
                {value?.label === option.label && <Check className="text-primary-100" size={20} />}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

SelectBox.displayName = 'SelectBox'

```

## 고민1: 어떤 형태로 호출해야 개발자가 편하고 직관적일까?

러프하게 만든 SelectBox컴포넌트를 테스트 하기위해 사이드프로젝트에서 import 하면서 옵션에 들어갈 배열이나 파라미터들을 어떻게 호출해야 개발자가 깔끔하면서도 직관적으로 사용할 수 있을까 라는 고민이 생겼습니다.

&nbsp;

조사를 위해 SchadcnUI, ChakraUI등등 UI라이브러리 사이트들을 들어가보면서 샘플들을 살펴봤습니다.

![UI라이브러리들이 SelectBox 호출하는 예시](/assets/blog/posts/DesignSystem/yds-3/ref.gif)

Compound Pattern을 활용해 제공하면 사용자에게 학습곡선이 올라갈 것이라 생각했습니다. 저역시도 ui라이브러리를 사용해볼때 피했던 경험이 있었거든요.

&nbsp;

그래도 옛날에는 이게 Compound Pattern으로 만들어진지 몰랐었는데 이제는 조금 더 성장해서 시야가 넓어진것 같아서 기분이 좋았습니다.

&nbsp;

그리고 추후에 만들 테이블 컴포넌트는 Compound Pattern으로 만드는게 찰떡일 수 있겠다는 생각이 들었습니다. (다른 컴포넌트와 통일성은 좀 고민해봐야겠지만요.)

&nbsp;

또한 SelectBox를 사용하기 위해서는 옵션에 들어갈 배열들이 필연적으로 필요한데요. 이런 선언 부분과 사용부분을 집약적으로 제공하고 싶었습니다. 한줄로요.

&nbsp;

그래서 ui라이브러리는 아니지만 react-hook-form 라이브러리에서 사용하는 패턴과 비슷하게 제공하면 어떨까? 라는 생각을 했고 hook을 사용해서 제공하기로 결정했습니다.

```tsx
// 로직 분리: useSelectBox
const genderSelectHook = useSelectBox({ options: genderOptions, search: true, defaultValue: "기타" })

// UI: SelectBox
<SelectBox size="full" selectBoxHook={genderSelectHook} />

// 비즈니스 로직 접근성
const { value: selectedGender } = genderSelectHook
```

## 이슈1: 외부 클릭 시 자동 닫힘 (ref 활용)

초기 구현에서는 드롭다운을 닫으려면 트리거를 다시 눌러야 했습니다. 아래 스냅샷처럼 외부 영역을 클릭해도 열림 상태가 유지되는 문제가 있었어요.

![ref 미적용으로 외부 클릭 시 닫히지 않는 모습](/assets/blog/posts/DesignSystem/yds-3/ref.gif)

ref + 이벤트 리스너를 활용해 문제를 해결했습니다.

&nbsp;

드롭다운이 열렸을 때만 리스너를 붙이고, 닫히면 깨끗이 정리하도록 했어요. 외부 클릭은 ref.contains(e.target)로 판별하는 방식으로 구현했습니다.

```tsx
// useSelectBox 내부 핵심
useEffect(() => {
  if (!isOpen) return;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearchValue("");
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setSearchValue("");
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEscape);
  };
}, [isOpen]);
```

적용 후, 외부 클릭과 ESC 키로 자연스럽게 닫히는 것을 확인할 수 있었습니다.

![ref 적용으로 외부 클릭 시 정상적으로 닫힘](/assets/blog/posts/DesignSystem/yds-3/ref-success.gif)

## 이슈2: 드롭다운이 다른 컴포넌트에 가려진다 (z-index)

SelectBox를 여러 개 세로로 배치하니 위에 있는 드롭다운이 아래 셀렉트에 묻히는 현상이 생겼습니다.

&nbsp;

상위의 transform/overflow/opacity가 쌓임 맥락을 만들어버린 탓이었고, 이걸 매번 컴포넌트에서 맞붙는 건 소모적이었습니다. 그래서 아예 레이어 정책을 모듈화했습니다.

1. 전역 z-index 레이어 토큰 정의 (globals.css)

```css
@layer utilities {
  .z-backdrop {
    z-index: 1090;
  }
  .z-dropdown {
    z-index: 1100;
  }
  .z-popover {
    z-index: 1050;
  }
  .z-modal {
    z-index: 1200;
  }
  .isolate {
    isolation: isolate;
  }
}
```

2. 루트 컨테이너에 .isolate 적용으로 예기치 않은 전파 최소화, 레이어는 토큰(z-dropdown, z-backdrop, z-modal)로 일관 제어. 필요 시 z-[1000] 같은 커스텀 값도 병행했습니다.

&nbsp;

적용 전/후 비교는 아래와 같습니다.

![z-index 미설정으로 드롭다운이 가려지는 모습](/assets/blog/posts/DesignSystem/yds-3/dropdown.gif)

참고: Tailwind z-index 유틸 사용법은 공식 문서를 기준으로 했습니다. [Tailwind z-index](https://tailwindcss.com/docs/z-index)

## 이슈3: 수정 모달 초깃값이 비어있다? useEffect와의 타협

관리자페이지에서 수정 모달을 열 때 SelectBox가 초기화된 상태로 보이는 문제를 발견했습니다.

&nbsp;

원인은 훅 인스턴스가 이미 살아 있고(selectedOption 유지), 그 이후에 편집 대상 값이 주입되기 때문이었습니다. 해결책은 두 가지였고, 최종적으로 사용자 편의성을 위해 내부 동기화를 채택했습니다.

&nbsp;

- 외부에서 세팅: 모달 열기 전에 훅을 새로 만들거나, 열기 직후에 setSelectedOption을 직접 주입
- 내부에서 동기화(채택): useEffect([defaultValue, options])로 변경을 감지해서 selectedOption 자동 갱신

&nbsp;

예시 (핵심만 발췌):

```ts
// 내부 동기화
useEffect(() => {
  if (!defaultValue) {
    setSelectedOption(EMPTY_OPTION);
    return;
  }
  const next =
    options.find((o) => o.value === defaultValue || o.label === defaultValue) ||
    EMPTY_OPTION;
  setSelectedOption(next);
}, [defaultValue, options]);
```

평소엔 useEffect를 아껴 쓰는 편이지만, 이번 건은 사용자 편의가 더 중요하다 생각했습니다. 라이브러리 내부에서 작동하니 사용자가 인지할 수 없는 영역이기 때문에...

&nbsp;

수정 모달을 열면 값이 자동으로 채워져 있어야 하니까요. 그래서 내부 동기화를 택했고, 훗날 컨트롤드 완전 전환이나 상태 기계로 바꾸는 것도 열어두었습니다.

## 이슈4: 옵션이 길면 자연스럽게 스크롤

리스트가 길어지면 화면을 덮어 UX가 망가집니다.

&nbsp;

이건 기능 플래그보다 기본값이 중요하다고 봤어요. 그래서 "적당한 높이를 넘으면 자동 스크롤"을 기본으로 넣었습니다. 필요할 때만 커스터마이즈하면 되도록요.

예시 (핵심만 발췌):

```tsx
<div
  className="bg-background-secondary border-primary-100 z-dropdown rounded-lg border-2 p-3"
  style={{ maxHeight: 280, overflowY: 'auto' }}
>
  {/* 옵션 리스트 */}
  {options.map(...)}
  {/* 필요 시 search 영역 포함 */}
</div>
```

적용 모습:

![옵션 길어짐에 따른 내부 스크롤 제공](/assets/blog/posts/DesignSystem/yds-3/select-scroll.gif)

## 선언적 코드로 고쳐보기

### 1) 파생값을 선언형으로 이전하기

링크드인에서 '선언적 프로그래밍' 글을 보고 "이걸 내 코드에 바로 적용해보자" 싶었습니다.

&nbsp;

핵심은 "관계 중심"이더군요. 그래서 UI 표시/필터링을 **파생값**으로 빼서 선언적으로 만들었습니다. 순서 대신 관계를 드러내는 방향으로요.

&nbsp;
참고: [선언적 프로그래밍에 대한 착각과 오해](https://evan-moon.github.io/2025/09/07/declarative-programming-misconceptions-and-essence/)

핵심 변경:

```ts
// useSelectBox 내부 - 파생값 선언
const filteredOptions = useMemo(() => {
  const term = searchValue.toLowerCase();
  if (!term) return options;
  return options.filter((opt) => opt.value.toLowerCase().includes(term));
}, [options, searchValue]);

const selectedText = useMemo(() => {
  return hasOption ? selectedOption.value : "선택";
}, [hasOption, selectedOption.value]);
```

컴포넌트는 파생값만 사용한다:

```tsx
// SelectBox 렌더
<div onClick={handleToggle}>{selectedText}</div>;

{
  isOpen && (
    <div>
      {filteredOptions.map((option) => (
        <div key={option.label} onClick={() => handleClickOption(option)}>
          {option.value}
        </div>
      ))}
    </div>
  );
}
```

효과: UI가 "무엇을 보여줄지"만 기술하게 되어 가독성과 테스트 용이성이 높아졌습니다.

&nbsp;

검색 로직이나 표시 문자열 계산은 훅 내부의 순수 계산으로 한 곳에 모이게 되었어요.

### 2) 외부 클릭/ESC 부작용을 전용 훅으로 분리하기

부작용(Outside/Escape 닫기)을 상태 전이와 분리했습니다.

&nbsp;

드롭다운 열림 여부만 의존하고, 닫기 로직은 handleClose로 단일화했어요. 이렇게 하면 렌더 로직은 "무엇을 보여줄지"만 선언하면 되고, 효과는 훅에 격리됩니다.

핵심 코드:

```ts
// useDismiss.ts
export function useOutsideDismiss(ref, enabled, onDismiss) {
  /* mousedown 리스너 등록/해제 */
}
export function useEscapeDismiss(enabled, onDismiss) {
  /* keydown(Escape) 처리 */
}

// useSelectBox.ts
const handleClose = useCallback(() => {
  setIsOpen(false);
  setSearchValue("");
}, []);
useOutsideDismiss(containerRef, isOpen, handleClose);
useEscapeDismiss(isOpen, handleClose);
```

효과: 컴포넌트 외부 영역 클릭/ESC 닫기 규칙이 한 곳에 모여 재사용 가능해졌고, 테스트도 쉬워졌습니다.

&nbsp;

렌더는 선언적으로 유지되었어요.

### 5) 리듀서로 이벤트 → 상태 전이 테이블화

위에 언급한 글을 읽고 시간적 순서가 부여될 필요가 없는 소스들에게 시간적 순서를 부여하고 있다는 것을 깨달을 수 있었습니다. 완전 앞으로의 코드스타일의 변화를 줄만한 인사이트 였습니다.

&nbsp;

(열림/검색)상태를 리듀서로 통합해 "무엇이 바뀌는가(액션)"를 중심으로 선언했습니다. 이렇게 하면 시간적 순서 대신 상태 전이 관계가 코드에 드러나게 됩니다.

핵심 코드:

```ts
type UiState = { isOpen: boolean; searchValue: string };
type Action =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "SEARCH"; term: string }
  | { type: "RESET_SEARCH" };

const [ui, dispatch] = useReducer(
  (s: UiState, a: Action): UiState => {
    switch (a.type) {
      case "OPEN":
        return { ...s, isOpen: true };
      case "CLOSE":
        return { isOpen: false, searchValue: "" };
      case "TOGGLE":
        return { ...s, isOpen: !s.isOpen };
      case "SEARCH":
        return { ...s, searchValue: a.term };
      case "RESET_SEARCH":
        return { ...s, searchValue: "" };
    }
  },
  { isOpen: false, searchValue: "" },
);

// 선언적 핸들러
const handleToggle = () => dispatch({ type: "TOGGLE" });
const handleSearch = (term: string) => dispatch({ type: "SEARCH", term });
const handleClose = () => dispatch({ type: "CLOSE" });
```

효과: 전이 규칙이 하나의 테이블에 모여 가독성/확장성이 좋아졌습니다(예: 키보드 내비게이션 액션 추가가 쉬움).

&nbsp;

또한 테스트에서 액션 단위로 상태 검증이 수월해졌어요.

## 마무리

SelectBox 컴포넌트를 만들면서 다양한 이슈들을 해결하고, 선언적 프로그래밍 원칙을 적용해보는 과정을 거쳤습니다.

&nbsp;

처음에는 단순한 드롭다운 컴포넌트 였지만, 실제 프로젝트에서 사용해보면서 발생한 문제들을 하나씩 해결하다 보니 훨씬 견고하고 유지보수하기 좋은 컴포넌트가 된것 같습니다. 특히 ref 활용, z-index 레이어 토큰 관리, 그리고 리듀서를 활용한 상태 관리 등은 다른 컴포넌트 개발에도 적용할 수 있는 좋은 패턴이었습니다. 또한 드롭다운 관련 로직들을 SelectBox에 몰아 넣을 수 있으니 이를 활용할 프로젝트도 깔끔하게 개발할 수 있다는 장점을 제공할 수 있어서 UI라이브러리 개발에 좀 더 집중하게 되는것 같습니다.

&nbsp;

앞으로도 더 좋은 컴포넌트를 만들기 위해 계속 고민하고 발전시켜 나가겠습니다!
