---
title: "[리트코드] - Validate Binary Search Tree 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 2주차 - 트리 & DFS"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-11-11T08:40:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

이진 검색 트리(Binary Search Tree)는 모든 노드에 대해

- 왼쪽 서브트리의 모든 값 < 현재 노드 값
- 오른쪽 서브트리의 모든 값 > 현재 노드 값

조건을 만족해야 합니다. 루트 노드가 주어졌을 때, 해당 트리가 유효한 이진 검색 트리인지 판별하세요.

**예시 1**

```
Input: root = [2,1,3]
Output: true
```

**예시 2**

```
Input: root = [5,1,4,null,null,3,6]
Output: false
설명: 루트의 오른쪽 자식 4가 루트보다 작으므로 BST 조건 위반
```

**제약 조건**

- 노드 수 범위: [1, 10^4]
- 노드 값 범위: [-2^31, 2^31 - 1]

## 내 풀이: DFS + 범위 제한

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = val === undefined ? 0 : val;
 *   this.left = left === undefined ? null : left;
 *   this.right = right === undefined ? null : right;
 * }
 */

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
  const recurValidBST = (node, min, max) => {
    if (node === null) return true;
    if (max !== null && node.val >= max) return false;
    if (min !== null && node.val <= min) return false;

    return (
      recurValidBST(node.left, min, node.val) &&
      recurValidBST(node.right, node.val, max)
    );
  };

  return recurValidBST(root, -Infinity, Infinity);
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- 모든 노드를 한 번씩 방문하며 조건을 확인합니다.
- n은 트리의 노드 수입니다.

### 공간복잡도: O(h)

- 재귀 호출 스택 깊이는 트리의 높이 h에 비례합니다.
- 편향 트리의 최악의 경우 h = n, 균형 트리는 h = log n 수준입니다.

## 핵심 포인트

### 범위 제한 방식

- 각 노드는 자신을 기준으로 왼쪽/오른쪽 자식이 지켜야 할 최소·최대 범위를 전달받습니다.
- 왼쪽 자식은 max를 현재 노드 값으로 제한하고, 오른쪽 자식은 min을 현재 노드 값으로 갱신합니다.

###`null vs -Infinity/Infinity

- 문제에서 값 범위가 제한되어 있어 초기 구간을 (-Infinity, Infinity)로 설정하면 모든 케이스를 포괄할 수 있습니다.
- 범위 값이 실제 노드 값과 같아지는 순간 조건을 빠르게 판별할 수 있습니다.

### Inorder 순회 대안

- 중위 순회 결과가 오름차순인지 확인하는 방식도 가능

## 스터디에 참여하고 싶다면

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
- [원문](https://leetcode.com/problems/validate-binary-search-tree/description/)
