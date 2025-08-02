---
title: "[리트코드] - Valid Anagram 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 2주차 - 해쉬,맵"
coverImage: "/assets/algorithms/JS-리트코드/cover.png"
date: "2025-07-28T09:08:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/cover.png"
---

## 문제

&nbsp;
두 문자열 s와 t가 주어졌을 때, t가 s의 애너그램이면 true를 반환하고, 그렇지 않으면 false를 반환하세요.
&nbsp;
예시 1:
입력: s = "anagram", t = "nagaram"
출력: true
&nbsp;
예시 2:
입력: s = "rat", t = "car"
출력: false
&nbsp;
제약 조건:
1 <= s.length, t.length <= 5 \* 104
s와 t는 소문자 영문자로만 구성됩니다.
&nbsp;
추가 질문: 입력에 유니코드 문자가 포함되어 있다면 어떻게 해결하시겠습니까? 이런 경우에 어떻게 해결책을 적용하시겠습니까?
&nbsp;

&nbsp;
[원문](https://leetcode.com/problems/valid-anagram/description/)

## 풀이

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const mapS = new Map();
  const mapT = new Map();

  [...s].map((item) => {
    if (mapS.has(item)) {
      const itemCount = mapS.get(item);
      mapS.set(item, itemCount + 1);
    } else {
      mapS.set(item, 1);
    }
  });

  [...t].map((item) => {
    if (mapT.has(item)) {
      const itemCount = mapT.get(item);
      mapT.set(item, itemCount + 1);
    } else {
      mapT.set(item, 1);
    }
  });

  // NOTE -  t가 s의 anagram이라는 뜻을 갯수가 같지않아도 된다고 이해했으나 anagram정의는 s구성원을 모자람,남김없이 t를만들 수 있는 상태
  if (mapS.size !== mapT.size) {
    return false;
  }

  for (const [key, value] of mapS) {
    if (mapT.get(key) !== value) {
      return false;
    }
  }

  return true;
};
// follow up: 유니코드 테스트 케이스. 큰 의미는 없음
console.log(isAnagram("😀😀", "😀😀😀"));
// false
console.log(isAnagram("한글글", "글한글"));
// true
console.log(isAnagram("café", "éfac"));
// true
console.log(isAnagram("Hello世界", "世界Hello"));
// true
console.log(isAnagram("안녕 하세요", "하세요 안녕"));
// true
console.log(isAnagram("Café", "éfac"));
// false
console.log(isAnagram("Café", "Éfac"));
// false
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- 문자열 s와 t를 각각 한 번씩 순회: O(n) + O(n) = O(2n) = O(n)
- Map 비교를 위한 순회: O(k), 여기서 k는 고유 문자 개수
- 따라서 전체 시간복잡도는 **O(n)**

### 공간복잡도: O(1)

- 두 개의 Map 객체 생성: mapS와 mapT
- 각 Map은 최대 k개의 고유 문자를 저장 (k는 고유 문자 개수)
- **소문자 영문자만 사용하므로 k ≤ 26 (a-z)**
- 따라서 전체 공간복잡도는 **O(1)** (상수 시간)

### 최적화 고려사항

- 현재 구현은 두 개의 Map을 사용하지만, 하나의 Map만 사용하여 공간복잡도를 절반으로 줄일 수 있음
- 첫 번째 문자열의 문자 빈도를 증가시키고, 두 번째 문자열의 문자 빈도를 감소시키는 방식으로 구현 가능
