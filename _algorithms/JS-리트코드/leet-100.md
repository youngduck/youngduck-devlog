---
title: "[리트코드] - Same Tree 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 12주차 - 이진 트리, 재귀, DFS"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-10-13T06:30:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
두 이진 트리 p와 q의 루트가 주어졌을 때, 두 트리가 같은지 확인하는 함수를 작성하세요.

두 이진 트리는 구조적으로 동일하고 노드의 값이 같으면 동일한 것으로 간주됩니다.

&nbsp;
**예시 1:**

![같은 트리 예시](/assets/algorithms/JS-리트코드/leet-100/1.jpg)

입력: p = [1,2,3], q = [1,2,3]
출력: true

&nbsp;
**예시 2:**

![다른 트리 예시](/assets/algorithms/JS-리트코드/leet-100/2.jpg)

입력: p = [1,2], q = [1,null,2]
출력: false

&nbsp;
**예시 3:**

![다른 트리 예시](/assets/algorithms/JS-리트코드/leet-100/3.jpg)

입력: p = [1,2,1], q = [1,1,2]
출력: false

&nbsp;
**제약 조건:**

- 두 트리의 노드 수는 [0, 100] 범위에 있습니다.
- -104 <= Node.val <= 104

&nbsp;

## 내풀이: 재귀

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  // 둘 다 null이면 같음
  if (p === null && q === null) return true;

  // 하나만 null이면 다름
  if (p === null || q === null) return false;

  // 값이 다르면 다름
  if (p.val !== q.val) return false;

  // 왼쪽 자식들과 오른쪽 자식들이 모두 같아야 함
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(N)

- **N**: 두 트리 중 더 작은 트리의 노드 수
- **최악의 경우**: 두 트리가 완전히 동일할 때 모든 노드를 방문: O(N)
- **최선의 경우**: 루트 노드에서 바로 다르다고 판단: O(1)
- **각 노드를 최대 한 번씩만 방문**
- 따라서 전체 시간복잡도는 **O(N)**

### 공간복잡도: O(H)

- **H**: 트리의 높이 (재귀 호출 스택의 깊이)
- **균형 트리**: O(log N) - 높이가 log N
- **편향 트리**: O(N) - 높이가 N (최악의 경우)
- 재귀 호출 스택에 저장되는 최대 깊이만큼 공간 사용
- 따라서 전체 공간복잡도는 **O(H)**

## 핵심 포인트

### 재귀적 접근 (DFS - Depth First Search)

- **기본 케이스**: 두 노드가 모두 null이면 같음
- **조기 종료**: 하나만 null이거나 값이 다르면 즉시 false 반환
- **재귀 호출**: 왼쪽 서브트리와 오른쪽 서브트리를 각각 비교

### 트리 비교 조건

1. **구조적 동일성**: 두 트리의 모양이 같아야 함
2. **값의 동일성**: 같은 위치의 노드들이 같은 값을 가져야 함
3. **순서**: 왼쪽 자식과 오른쪽 자식의 순서도 일치해야 함

### 경계 조건 처리

- **빈 트리**: 두 트리가 모두 비어있으면 같은 트리로 간주
- **단일 노드**: 하나의 노드만 있는 경우도 올바르게 처리
- **null 체크**: null 참조 에러를 방지하기 위한 사전 검사

### 재귀 호출 순서

```javascript
// 현재 노드 비교 → 왼쪽 서브트리 비교 → 오른쪽 서브트리 비교
return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
```

- **AND 연산**: 왼쪽과 오른쪽 모두 true여야 true 반환
- **단축 평가**: 왼쪽이 false면 오른쪽은 평가하지 않음

## 알고리즘 동작 예시

```javascript
// 예시: p = [1,2,3], q = [1,2,3]
//     1           1
//    / \         / \
//   2   3       2   3

// 호출 순서:
isSameTree(1, 1)              // val 비교: 1 === 1 ✓
├─ isSameTree(2, 2)           // val 비교: 2 === 2 ✓
│  ├─ isSameTree(null, null)  // 둘 다 null → true
│  └─ isSameTree(null, null)  // 둘 다 null → true
└─ isSameTree(3, 3)           // val 비교: 3 === 3 ✓
   ├─ isSameTree(null, null)  // 둘 다 null → true
   └─ isSameTree(null, null)  // 둘 다 null → true

// 결과: true
```

## 대안 해결법

### BFS (반복문 사용)

```javascript
var isSameTree = function (p, q) {
  const queue = [[p, q]];

  while (queue.length > 0) {
    const [node1, node2] = queue.shift();

    if (node1 === null && node2 === null) continue;
    if (node1 === null || node2 === null) return false;
    if (node1.val !== node2.val) return false;

    queue.push([node1.left, node2.left]);
    queue.push([node1.right, node2.right]);
  }

  return true;
};
```

- **시간복잡도**: O(N)
- **공간복잡도**: O(W) - W는 트리의 최대 너비
- **장점**: 스택 오버플로우 위험 없음
- **단점**: 큐를 사용한 추가 공간 필요

## 스터디 정보 & 문제 출처

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
- [리트코드 문제](https://leetcode.com/problems/same-tree/description/)
