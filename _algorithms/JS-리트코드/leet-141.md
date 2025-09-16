---
title: "[리트코드] - Linked List Cycle 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 9주차 - 플로이드의 토끼와 거북이 알고리즘"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-09-16T08:15:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
연결 리스트의 head가 주어졌을 때, 연결 리스트에 순환이 있는지 판단하세요.

연결 리스트에 순환이 있다는 것은 next 포인터를 계속 따라가면서 다시 도달할 수 있는 노드가 있다는 의미입니다. 내부적으로 pos는 tail의 next 포인터가 연결된 노드의 인덱스를 나타내는 데 사용됩니다. pos는 매개변수로 전달되지 않습니다.

연결 리스트에 순환이 있으면 true를 반환하고, 그렇지 않으면 false를 반환하세요.

&nbsp;
**예시 1:**

입력: head = [3,2,0,-4], pos = 1
출력: true
설명: 연결 리스트에 순환이 있으며, tail이 1번째 노드(0-indexed)에 연결됩니다.

&nbsp;

**예시 2:**

입력: head = [1,2], pos = 0
출력: true
설명: 연결 리스트에 순환이 있으며, tail이 0번째 노드에 연결됩니다.

&nbsp;

**예시 3:**

입력: head = [1], pos = -1
출력: false
설명: 연결 리스트에 순환이 없습니다.

&nbsp;

**제약 조건:**

- 연결 리스트의 노드 수는 [0, 104] 범위에 있습니다.
- -105 <= Node.val <= 105
- pos는 -1이거나 연결 리스트의 유효한 인덱스입니다.

&nbsp;

**Follow up:** O(1) (즉, 상수) 메모리를 사용하여 해결할 수 있나요?

## 내풀이: 플로이드의 토끼와 거북이 알고리즘

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  // 순환탐지 기법
  // 1. 플로이드 토끼와 거북이 (포인터2개)
  // 2. 집합을 통한 중복검사

  ////////풀이///////

  // 노드 0개 1개면 순환불가
  if (!head || !head.next) {
    return false;
  }

  // 토끼, 거북이 설정
  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    // 두칸전진시 노드 존재 체크
    if (!fast || !fast.next) {
      return false;
    }

    slow = slow.next;
    fast = fast.next.next;
  }

  return true;
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- **최악의 경우**: 순환이 없는 경우 전체 리스트를 한 번 순회 O(n)
- **순환이 있는 경우**: slow와 fast 포인터가 만날 때까지 최대 n번 반복
- **전체**: **O(n)**

### 공간복잡도: O(1)

- **변수들**: slow, fast 포인터 2개만 사용
- **추가 자료구조 없음**: 입력 리스트 외에 별도 공간 사용하지 않음
- **전체**: **O(1)**

## 핵심 포인트

### 플로이드의 토끼와 거북이 알고리즘 (Floyd's Cycle Detection)

- **기본 아이디어**: 서로 다른 속도로 움직이는 두 포인터를 사용
- **slow 포인터**: 한 번에 한 노드씩 이동 (거북이)
- **fast 포인터**: 한 번에 두 노드씩 이동 (토끼)
- **순환 감지**: 두 포인터가 만나면 순환이 존재함을 의미

### 경계 조건 처리

- **빈 리스트**: head가 null인 경우 false 반환
- **단일 노드**: head.next가 null인 경우 false 반환
- **fast 포인터 안전성**: fast.next.next 호출 전에 fast.next 존재 여부 확인

## 대안 해결법

### 해시셋을 이용한 방법

```javascript
var hasCycle = function (head) {
  const visited = new Set();
  let current = head;

  while (current) {
    if (visited.has(current)) {
      return true;
    }
    visited.add(current);
    current = current.next;
  }

  return false;
};
```

- **시간복잡도**: O(n)
- **공간복잡도**: O(n) - 해시셋 사용
- **장점**: 직관적이고 이해하기 쉬움
- **단점**: 추가 메모리 공간 필요

## 스터디 정보 & 문제 출처

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
- [리트코드 문제](https://leetcode.com/problems/linked-list-cycle/description/)
