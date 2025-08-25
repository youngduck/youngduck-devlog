---
title: "[리트코드] - Number of 1 Bits 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 3주차 - 진법 변환"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-08-04T09:23:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
양의 정수 n이 주어졌을 때, 이진수 표현에서 1인 비트의 개수(해밍 가중치)를 반환하는 함수를 작성하세요.

&nbsp;
예시 1:
입력: n = 11
출력: 3
설명: 입력값의 이진수 표현 1011에는 총 3개의 1 비트가 있습니다.

&nbsp;
예시 2:
입력: n = 128
출력: 1
설명: 입력값의 이진수 표현 10000000에는 총 1개의 1 비트가 있습니다.

&nbsp;
예시 3:
입력: n = 2147483645
출력: 30
설명: 입력값의 이진수 표현 1111111111111111111111111111101에는 총 30개의 1 비트가 있습니다.

&nbsp;
제약 조건:

- 1 <= n <= 2^31 - 1

&nbsp;
추가 질문: 이 함수가 여러 번 호출된다면, 어떻게 최적화하시겠습니까?

&nbsp;
[원문](https://leetcode.com/problems/number-of-1-bits/description/)

## 풀이

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  // 이진수 변환함수 시간복잡도: O(1)
  const bin = n.toString(2);

  // replace, replaceAll 시간복잡도: O(n)
  const result = bin.replaceAll("0", "").length;

  // 시간복잡도: O(n), 공간복잡도: O(1)

  return result;
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- 이진수 변환: O(1)
- 문자열 조작(replaceAll): O(n), 여기서 n은 이진수의 길이
- 따라서 전체 시간복잡도는 **O(n)**

### 공간복잡도: O(1)

- 이진수 문자열 저장: O(1)
- 결과값 저장: O(1)
- 따라서 전체 공간복잡도는 **O(1)**

### 알고리즘 설명

1. **이진수 변환**: 주어진 숫자를 이진수 문자열로 변환
2. **0 제거**: 모든 0을 제거하여 1만 남김
3. **길이 계산**: 남은 문자열의 길이가 1의 개수

### 최적화 포인트

- **내장 함수 활용**: toString(2)와 replaceAll로 간단한 구현

## 스터디에 참여하고 싶다면

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
