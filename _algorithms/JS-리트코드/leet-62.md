---
title: "[리트코드] Unique Paths 자바스크립트 풀이"
excerpt: "알고리즘 재활훈련 - 동적 계획법"
coverImage: "/assets/algorithms/JS-리트코드/cover.png"
date: "2026-06-01T19:40:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/cover.png"
---

## 문제

m x n 크기의 격자가 있습니다. 로봇은 처음에 **왼쪽 위 모서리 (0, 0)** 에 있습니다. 로봇은 **오른쪽 아래 모서리 (m - 1, n - 1)** 로 이동하려고 합니다.

로봇은 한 번에 **아래** 또는 **오른쪽**으로만 이동할 수 있습니다.

정수 m, n이 주어질 때, 로봇이 오른쪽 아래 모서리에 도달할 수 있는 **서로 다른 경로의 수**를 반환하세요.

[문제출처](https://leetcode.com/problems/unique-paths/description/)

**예시 1:**

입력: m = 3, n = 7  
출력: 28

&nbsp;

**예시 2:**

입력: m = 3, n = 2  
출력: 3

설명: 왼쪽 위에서 오른쪽 아래까지 가는 방법은 총 3가지입니다.

1. 오른쪽 → 아래 → 아래
2. 아래 → 아래 → 오른쪽
3. 아래 → 오른쪽 → 아래

&nbsp;

**제약 조건:**

- 1 <= m, n <= 100

## 내풀이 1차

### 접근: 조합

문제를 읽고 확률과통계가 딱떠올랐다.
오랜만이라 기억이 가물가물한데 조합방식으로 풀면 문제가 해결되겠다고 생각이 들었다.
m x n 격자에서 (0,0) → (m-1, n-1)까지 가려면 총 이동 횟수는 언제나 동일하기 때문에

- 아래로 가야 하는 횟수: m - 1
- 오른쪽으로 가야 하는 횟수: n - 1
- 총 이동 횟수: m + n - 2

예시 1 (m=3, n=7)일때 **아래 2번, 오른쪽 6번**을 **어떤 순서로 섞을지**만 생각 해주면 되는 문제다.
즉 RRRRRRDD, RRRRRDRD, … 처럼 **8칸짜리 줄에서 2개의 위치를 고르는 것**과 같다.

&nbsp;

### 코드

```javascript
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const factorial = (num) => {
    if (num <= 1) {
      return 1;
    }
    return num * factorial(num - 1);
  };

  return factorial(m + n - 2) / (factorial(n - 1) * factorial(m - 1));
};
```

&nbsp;

### 복잡도

- 시간 복잡도: O(m + n) — factorial을 3번 호출하며, 가장 큰 인자 m + n - 2 기준으로 재귀 깊이만큼 연산
- 공간 복잡도: O(m + n) — factorial 재귀 호출 스택 (최대 m + n - 2까지 쌓임)

## 내풀이 2차

### 접근: 동적 계획법 (2차원 DP)

특정 칸 (i, j)에 도달하는 경로 수는 **위에서 오는 경로 + 왼쪽에서 오는 경로**의 합이다.

- dp[i][j]: (i, j)에 도달하는 서로 다른 경로의 수
- 점화식: dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
- 초기값: 첫 행·첫 열은 오른쪽/아래만 갈 수 있으므로 모두 1
- 답: dp[m - 1][n - 1]

&nbsp;

### 코드

```javascript
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
};
```

&nbsp;

### 복잡도

- 시간 복잡도: O(m × n) — 격자 전체를 한 번씩 채움
- 공간 복잡도: O(m × n) — dp 2차원 배열 (1차원 배열로 줄이면 O(n)까지 가능)
