---
title: "[리트코드] Reverse Linked List 자바스크립트 풀이"
excerpt: "알고리즘 재활훈련 - 연결리스트"
coverImage: "/assets/algorithms/JS-리트코드/cover.png"
date: "2026-05-27T10:53:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/cover.png"
---

## 문제

단일 연결 리스트(singly linked list)의 head가 주어질 때, 리스트를 뒤집은 후 그 head를 반환하는 문제입니다.
[문제출처](https://leetcode.com/problems/reverse-linked-list/)

**예시 1:**

입력: head = [1,2,3,4,5]  
출력: [5,4,3,2,1]

![reverse-linked-list-1](/assets/algorithms/JS-리트코드/leet-206/1.png)

&nbsp;
**예시 2:**

입력: head = [1,2]  
출력: [2,1]

![reverse-linked-list-2](/assets/algorithms/JS-리트코드/leet-206/2.png)
&nbsp;
**예시 3:**

입력: head = []  
출력: []

## 내풀이 1차

### 접근: 일단 단순무식하게 구현

### 코드

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // input값 없을때 처리
  if (!head) {
    return head;
  }

  // 배열로 평탄화 후 다시 연결리스트 생성
  let current = head;
  let arr = [];
  while (current) {
    arr.push(current.val);
    current = current.next;
  }

  let newHead = null;

  for (let i = 0; i < arr.length; i++) {
    newHead = new ListNode(arr[i], newHead);
  }

  return newHead;
};
```

### 복잡도

- 시간 복잡도: O(n) — 노드 n개를 한 번 순회해 배열에 넣고, 배열을 한 번 더 순회해 리스트를 만듦 (총 2n이지만 계수는 상수)
- 공간 복잡도: O(n) — 값을 담는 배열 arr가 O(n), 새로 만드는 ListNode도 n개라 O(n)

## 내풀이 2차

### 접근: 같은 O(n)인데 n계수줄일수있음

### 코드

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // input값 없을때 처리
  if (!head) {
    return head;
  }

  // 최적화 : 조회하자마자 바로넣으면 뒤집어짐
  let current = head;
  let newHead = null;

  while (current) {
    newHead = new ListNode(current.val, newHead);
    current = current.next;
  }

  return newHead;
};
```

### 복잡도

- 시간 복잡도: O(n) — current로 리스트를 한 번만 순회하며 prepend (1차 대비 순회 횟수·상수 계수 감소)
- 공간 복잡도: O(n) — 보조 배열은 없지만 새 ListNode를 n개 생성 (포인터 변수 current, newHead만 보면 O(1), 노드 할당까지 포함하면 O(n))

## 인터넷풀이 : 재귀

### 접근: 끝까지 내려가서 돌아오며 포인터 뒤집기

- 베이스 케이스: head가 null이거나, head.next가 null(마지막 노드)이면 그대로 반환
- 재귀 호출: head.next부터 뒤집어서, 뒤집힌 리스트의 새로운 head를 받음
- 포인터 재연결:
  - head.next.next = head (다음 노드가 현재 노드를 가리키도록 뒤집기)
  - head.next = null (현재 노드가 앞으로 새지 않게 끊기)
- 최종 반환: 재귀에서 받은 newHead(뒤집힌 리스트의 head) 이걸 그대로 출력하면됨

### 코드

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head || !head.next) return head;

  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};
```

### 복잡도

- 시간 복잡도: O(n) — 각 노드를 한 번씩 방문
- 공간 복잡도: O(n) — 재귀 호출 스택이 최대 n까지 쌓임 (추가 노드를 생성하지는 않음)
