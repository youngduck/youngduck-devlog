---
title: "[백준] Add Two Numbers 자바스크립트 풀이"
excerpt: "알고리즘 재활훈련 - 연결리스트"
coverImage: "/assets/algorithms/JS-리트코드/cover.png"
date: "2025-02-24T19:56:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/cover.png"
---

## 문제

&nbsp;
두 개의 비어있지 않은 연결 리스트가 주어집니다.
각 연결 리스트는 음이 아닌 정수를 나타냅니다.
각 리스트의 자릿수는 역순으로 저장되어 있으며, 각 노드는 한 자릿수를 포함합니다.
두 수를 더한 결과를 연결 리스트 형태로 반환하세요.
&nbsp;
예를 들어:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;첫 번째 연결 리스트가 2->4->3이면 이는 숫자 342를 나타냅니다.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;두 번째 연결 리스트가 5->6->4이면 이는 숫자 465를 나타냅니다.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;342 + 465 = 807이므로, 결과 연결 리스트는 7->0->8이 됩니다.
&nbsp;
[원문](https://leetcode.com/problems/add-two-numbers/)

## 풀이

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  /* 
      연결리스트 풀때 temp, node로 두어서 주로 푼다고함 
      why?> node는 결과물을보기 위한 시작부분 포인터,
         temp는 포인터를 변경시키며 값을 변경시키는 용도인듯함.
    */
  const node = new ListNode();
  let temp = node;
  let carry = 0;

  while (l1 || l2 || carry) {
    let SumData = carry;
    if (l1) {
      SumData += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      SumData += l2.val;
      l2 = l2.next;
    }
    carry = Math.floor(SumData / 10);
    temp.next = new ListNode(SumData % 10);
    temp = temp.next;
  }
  return node.next;
};
```
