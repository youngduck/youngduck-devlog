---
title: "[리트코드] - Valid Parentheses 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 6주차 - 스택"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-08-25T10:15:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
문자 '(', ')', '{', '}', '[' 및 ']'만 포함하는 문자열 s가 주어집니다. 입력 문자열이 유효한지 판단하세요.

입력 문자열은 다음 조건을 만족할 때 유효합니다:

1. 여는 괄호는 같은 유형의 괄호로 닫혀야 합니다.
2. 여는 괄호는 올바른 순서로 닫혀야 합니다.
3. 모든 닫는 괄호는 같은 유형의 해당하는 여는 괄호가 있어야 합니다.

&nbsp;
**예시 1:**

입력: s = "()"
출력: true

**예시 2:**

입력: s = "()[]{}"
출력: true

**예시 3:**

입력: s = "(]"
출력: false

**예시 4:**

입력: s = "([])"
출력: true

**예시 5:**

입력: s = "([)]"
출력: false

**제약 조건:**

- 1 <= s.length <= 104
- s는 괄호 문자 '()[]{}'로만 구성됩니다.

## 내풀이: 스택

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // stack문제. open,close에 따라 스택처리
  // 최종 stack 비워져있는지 마지막 확인까지.
  const stack = [];
  // open,close Bracket index 위치로 짝궁 판단할예정
  const openBracket = ["(", "[", "{"];
  const closeBracket = [")", "]", "}"];
  // 반환할 결과값 flag
  let result = true;

  [...s].map((item) => {
    // indexOf자체는 선형검색이라 O(n)이지만 데이터 양이 3으로 고정되어있으므로 O(1)로 볼 수 있음
    const itemIndexAtOpenBracket = openBracket.indexOf(item);
    const itemIndexAtCloseBracket = closeBracket.indexOf(item);
    // openBracket 타입
    if (itemIndexAtOpenBracket > -1) {
      // push,pop 모두 O(1) 시간복잡도를 가짐. 끝에 요소 추가제거이므로
      stack.push(item);
    }
    // closeBracket 타입
    else if (itemIndexAtCloseBracket > -1) {
      const target = stack.pop();
      if (target !== openBracket[itemIndexAtCloseBracket]) {
        result = false;
      }
    }
  });

  if (stack.length !== 0) {
    result = false;
  }

  return result;
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- **문자열 순회**: O(n) - 각 문자를 한 번씩 처리
- **스택 연산**: push(), pop() 모두 O(1)
- **indexOf()**: indexOf는 선형검색이라 O(n)이지만, 배열 크기가 3으로 고정되어 있어 O(1)
- **전체**: O(n) × O(1) = **O(n)**

### 공간복잡도: O(n)

- **스택 공간**: 최악의 경우 모든 문자가 여는 괄호일 때 O(n)
- **문자열을 배열로 변환**: O(n)
- **고정 배열들**: openBracket, closeBracket은 O(1)
- **전체**: **O(n)**

## 핵심 포인트

### 스택의 활용

- **LIFO (Last In, First Out)**: 가장 최근에 열린 괄호가 가장 먼저 닫혀야 함
- **여는 괄호**: 스택에 push
- **닫는 괄호**: 스택에서 pop하여 짝이 맞는지 확인

### 유효성 검사 조건

1. **괄호 짝 맞추기**: 닫는 괄호와 스택에서 pop한 여는 괄호가 같은 유형인지 확인
2. **스택 비우기**: 모든 문자 처리 후 스택이 비어있어야 함
3. **조기 종료**: 짝이 맞지 않으면 즉시 false 반환

### 최적화 고려사항

- **조기 반환**: 짝이 맞지 않을 때 즉시 false 반환하여 불필요한 처리 방지
- **객체 맵 사용**: indexOf() 대신 객체 맵을 사용하면 더 효율적
- **문자열 직접 순회**: 배열 변환 없이 for...of 사용 가능

## 스터디 정보 & 문제 출처

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
- [리트코드 문제](https://leetcode.com/problems/valid-parentheses/description/)
