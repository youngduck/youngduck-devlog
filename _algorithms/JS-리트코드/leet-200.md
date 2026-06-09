---
title: "[리트코드] Number of Islands 자바스크립트 풀이"
excerpt: "알고리즘 재활훈련 - 그래프 탐색"
coverImage: "/assets/algorithms/JS-리트코드/cover.png"
date: "2026-06-01T20:00:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/cover.png"
---

## 문제

m x n 크기의 2차원 이진 그리드 grid가 주어집니다. grid는 '1'(땅)과 '0'(물)로 이루어진 지도를 나타냅니다.

섬의 개수를 반환하세요.

섬은 물에 둘러싸여 있으며, 가로 또는 세로로 인접한 땅들을 연결해 형성됩니다. 그리드의 네 변은 모두 물로 둘러싸여 있다고 가정해도 됩니다.

[문제출처](https://leetcode.com/problems/number-of-islands/)

**예시 1:**

입력: grid = [
["1","1","1","1","0"],
["1","1","0","1","0"],
["1","1","0","0","0"],
["0","0","0","0","0"]
]
출력: 1

&nbsp;

**예시 2:**

입력: grid = [
["1","1","0","0","0"],
["1","1","0","0","0"],
["0","0","1","0","0"],
["0","0","0","1","1"]
]
출력: 3

&nbsp;

**제약 조건:**

- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j]는 '0' 또는 '1'이다.

## 내풀이

### 접근: 이중 for문 + DFS(재귀)로 연결된 땅 제거

- grid 전체를 이중 for문으로 순회
- "1"을 만나면 새로운 섬 → result += 1
- recursive로 상하좌우 탐색하며 연결된 "1"을 "0"으로 바꿈 (visited 대신 grid 자체를 수정)
- 경계 밖(row/col < 0 또는 >= end)이면 return

&nbsp;

### 코드

```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let result = 0;
  const end_row = grid.length;
  const end_col = grid[0].length;

  const recursive = (row, col) => {
    if (row < 0 || row >= end_row || col < 0 || col >= end_col) {
      return;
    }

    // 재귀 타면서 연결된 땅은 0으로 변환 → for문에서 같은 섬을 다시 세지 않도록
    if (grid[row][col] === "1") {
      grid[row][col] = "0";
      recursive(row - 1, col);
      recursive(row, col - 1);
      recursive(row + 1, col);
      recursive(row, col + 1);
    }
  };

  for (let m = 0; m < grid.length; m++) {
    for (let n = 0; n < grid[0].length; n++) {
      if (grid[m][n] === "1") {
        recursive(m, n);
        result += 1;
      }
    }
  }

  return result;
};
```

&nbsp;

### 복잡도

- 시간 복잡도: O(m × n) — 각 칸을 최대 1번 방문
- 공간 복잡도: O(m × n) — 재귀 호출 스택 (최악: 섬이 한 줄로 길게 이어질 때)
