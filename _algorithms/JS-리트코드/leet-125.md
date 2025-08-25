---
title: "[리트코드] - Valid Palindrome 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 3주차 - 문자열, 정규식"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-08-04T10:23:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
구문은 모든 대문자를 소문자로 변환하고 모든 영숫자가 아닌 문자를 제거한 후 앞으로 읽는 것과 뒤로 읽는 것이 같으면 팰린드롬입니다. 영숫자 문자에는 문자와 숫자가 포함됩니다.

문자열 s가 주어졌을 때, 팰린드롬이면 true를, 그렇지 않으면 false를 반환하세요.

&nbsp;
예시 1:
입력: s = "A man, a plan, a canal: Panama"
출력: true
설명: "amanaplanacanalpanama"는 팰린드롬입니다.

&nbsp;
예시 2:
입력: s = "race a car"
출력: false
설명: "raceacar"는 팰린드롬이 아닙니다.

&nbsp;
예시 3:
입력: s = " "
출력: true
설명: 영숫자가 아닌 문자를 제거한 후 s는 빈 문자열 ""입니다.
빈 문자열은 앞으로 읽는 것과 뒤로 읽는 것이 같으므로 팰린드롬입니다.

&nbsp;
제약 조건:

- 1 <= s.length <= 2 \* 10^5
- s는 출력 가능한 ASCII 문자로만 구성됩니다.

&nbsp;
[원문](https://leetcode.com/problems/valid-palindrome/description/)

## 풀이

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  // 1. toLowerCase() - O(n)
  // 2. replace(/[^a-z0-9]/g, '') - O(n)
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  // 3. [...clean] 스프레드 연산자 - O(n)
  // 4. reverse() - O(n)
  // 5. join('') - O(n)
  const reverse = [...clean].reverse().join("");

  // 6. 문자열 비교 - O(n)
  return clean === reverse;
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- toLowerCase(): O(n)
- replace() 정규식 처리: O(n)
- 스프레드 연산자: O(n)
- reverse(): O(n)
- join(): O(n)
- 문자열 비교: O(n)
- 따라서 전체 시간복잡도는 **O(6n) = O(n)**

### 공간복잡도: O(n)

- clean 문자열: O(n)
- reverse 문자열: O(n)
- 스프레드 연산자로 생성된 배열: O(n)
- 따라서 전체 공간복잡도는 **O(n)**

### 알고리즘 설명

1. **문자열 정제**: 대문자를 소문자로 변환하고 영숫자가 아닌 문자 제거
2. **배열 변환**: 정제된 문자열을 배열로 변환
3. **뒤집기**: 배열을 뒤집어서 문자열로 다시 변환
4. **비교**: 원본과 뒤집은 문자열을 비교하여 팰린드롬 여부 판단

### 최적화 포인트

- **투 포인터 방식**: 양 끝에서 시작하여 중앙으로 이동하며 비교하면 공간복잡도 O(1) 달성 가능
- **정규식 최적화**: 문자별 검사로 대체하여 성능 향상 가능

## 스터디에 참여하고 싶다면

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
