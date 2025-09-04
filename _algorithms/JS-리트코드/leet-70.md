---
title: "[리트코드] - Climbing Stairs 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 2주차 - DP"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-07-28T18:30:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
계단을 오르고 있습니다. 꼭대기에 도달하려면 n개의 계단을 올라야 합니다.

매번 1개 또는 2개의 계단을 오를 수 있습니다. 꼭대기에 도달하는 서로 다른 방법의 수는 몇 개인가요?
&nbsp;
예시 1:
입력: n = 2
출력: 2
설명: 꼭대기에 도달하는 두 가지 방법이 있습니다.

1. 1계단 + 1계단
2. 2계단
   &nbsp;
   예시 2:
   입력: n = 3
   출력: 3
   설명: 꼭대기에 도달하는 세 가지 방법이 있습니다.
3. 1계단 + 1계단 + 1계단
4. 1계단 + 2계단
5. 2계단 + 1계단
   &nbsp;
   제약 조건:
   1 <= n <= 45
   &nbsp;

&nbsp;
[원문](https://leetcode.com/problems/climbing-stairs/description/)

## 재귀방식 풀이

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // 문제를 보자마자 든 생각: dfs처럼 하나씩,두개씩 가지뻗어가면서? -> 점화식,피보나치처럼 최적화된 형태겠는데? 여기까지는 생각. 근데 2칸전, 1칸전의 덧셈이라는 결론까지 내지는 못함

  // 그래서 default값을 n=1,2,3까지 세팅해놓고 생각했었다. 다른사람의 점화식 풀이 참고 후 역순으로 출발해서 2칸전, 1칸전에 대한 상황에 집중하는 방식 이해 완료. 구현은 내가 직접.
  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  return climbStairs(n - 1) + climbStairs(n - 2);
};
```

## 재귀방식 시간복잡도 및 공간복잡도

### 시간복잡도: O(2^n)

- 재귀 호출로 인해 각 단계에서 2개의 하위 문제를 생성
- 트리의 높이가 n이므로 총 2^n개의 노드가 생성됨
- 따라서 전체 시간복잡도는 **O(2^n)**

### 공간복잡도: O(n)

- 재귀 호출 스택의 깊이가 n-1까지 깊어질 수 있음
- 각 재귀 호출마다 스택 프레임이 생성됨
- 따라서 전체 공간복잡도는 **O(n)**

### 최적화 고려사항

- 현재 구현은 중복 계산이 많이 발생하는 재귀 방식
- 동적 프로그래밍(DP)을 사용하여 O(n) 시간복잡도로 최적화 가능
- 또는 반복문을 사용하여 O(1) 공간복잡도로도 최적화 가능

## DP방식 풀이

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const dp = Array(n).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  if (n >= 3) {
    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
  }

  return dp[n];
};
```

## DP방식 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- 반복문 하나로 n번 순회하므로 **O(n)**

### 공간복잡도: O(n)

- n+1 크기의 배열을 생성하므로 **O(n)**
