---
title: "Big O Notation - 시간복잡도와 공간복잡도"
excerpt: "자료구조 복습"
coverImage: "/assets/blog/CS기초/cover.png"
date: "2026-03-16T00:00:00"
ogImage:
  url: "/assets/blog/CS기초/cover.png"
---

> Colt Steele의 JavaScript Algorithms and Data Structures Masterclass 강의를 보고 정리한 글입니다.

&nbsp;

## Big O Notation이란?

알고리즘의 성능을 **단일 숫자(레이블)** 로 일반화하는 방법.

- 코드의 효율성을 비교하는 공통 언어
- 입력값 n이 커질수록 알고리즘이 얼마나 느려지는지를 나타냄
- 정확한 연산 횟수보다 **전체적인 추세(트렌드)** 에 집중

&nbsp;

---

## 시간복잡도 (Time Complexity)

### Big O 계산 규칙

**1. 상수는 무시한다**

```javascript
// O(2n) → O(n)
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {    // n번
    console.log(arr[i]);
  }
  for (let j = 0; j < arr.length; j++) {    // n번
    console.log(arr[j]);
  }
}
```

**2. 작은 항은 무시한다**

```javascript
// O(n² + n) → O(n²)
function example(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {  // n²번
      console.log(i, j);
    }
  }
  for (let k = 0; k < arr.length; k++) {    // n번 (무시)
    console.log(k);
  }
}
```

&nbsp;

### Big O 복잡도 종류 (빠른 순서)

| 표기 | 이름 | 설명 |
|------|------|------|
| O(1) | 상수 | 입력 크기와 무관하게 항상 동일한 시간 |
| O(log n) | 로그 | 이진 탐색처럼 탐색 범위가 절반씩 줄어듦 |
| O(n) | 선형 | 입력 크기에 비례 |
| O(n log n) | 선형 로그 | 효율적인 정렬 알고리즘 (merge sort 등) |
| O(n²) | 이차 | 중첩 반복문 |
| O(2ⁿ) | 지수 | 피보나치 재귀 등 |
| O(n!) | 팩토리얼 | 순열 탐색 등 |

```
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
```

&nbsp;

### O(1) - 상수 시간

```javascript
function addUpTo(n) {
  return (n * (n + 1)) / 2; // 연산이 3번 → 항상 O(1)
}
```

&nbsp;

### O(n) - 선형 시간

```javascript
function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) { // n번 반복
    total += i;
  }
  return total;
}
```

&nbsp;

### O(n²) - 이차 시간

```javascript
// 중첩 반복문 → O(n * n) = O(n²)
function printAllPairs(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}
```

&nbsp;

---

## 공간복잡도 (Space Complexity)

입력값이 커질수록 **추가로 필요한 메모리** 가 얼마나 증가하는지.

> 입력값 자체가 차지하는 공간은 제외 (Auxiliary Space Complexity)

&nbsp;

### 자바스크립트 공간복잡도 규칙

| 타입 | 공간 |
|------|------|
| boolean, number, undefined, null | O(1) |
| string | O(n) — 문자열 길이에 비례 |
| 배열 (Array) | O(n) — 배열 길이에 비례 |
| 객체 (Object) | O(n) — 키 개수에 비례 |

&nbsp;

### O(1) 공간복잡도 예시

```javascript
function sum(arr) {
  let total = 0;               // 숫자 변수 1개
  for (let i = 0; i < arr.length; i++) { // 숫자 변수 1개
    total += arr[i];
  }
  return total;
}
// 변수 2개만 사용 → 입력 크기와 무관 → O(1)
```

&nbsp;

### O(n) 공간복잡도 예시

```javascript
function double(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(2 * arr[i]); // 입력 배열 크기만큼 새 배열 생성
  }
  return newArr;
}
// newArr의 크기 = arr의 크기 → O(n)
```

&nbsp;

---

## 배열(Array)의 성능

| 연산 | 복잡도 | 이유 |
|------|--------|------|
| 접근 arr[i] | O(1) | 인덱스로 직접 접근 |
| 탐색 (search) | O(n) | 전체를 순회해야 함 |
| 삽입 - 끝 push | O(1) | 맨 뒤에 추가 |
| 삽입 - 앞 unshift | O(n) | 기존 인덱스 전부 재정렬 |
| 삭제 - 끝 pop | O(1) | 맨 뒤 제거 |
| 삭제 - 앞 shift | O(n) | 기존 인덱스 전부 재정렬 |
| concat | O(n) | |
| slice | O(n) | |
| splice | O(n) | |
| sort | O(n log n) | |
| forEach / map / filter / reduce | O(n) | |

> **핵심**: 배열의 앞쪽을 건드리는 연산(unshift, shift)은 O(n)이므로 되도록 피한다.

&nbsp;

---

## 객체(Object)의 성능

순서가 없는 키-값 구조. 순서가 필요 없을 때 대부분 최적의 선택.

| 연산 | 복잡도 |
|------|--------|
| 삽입 | O(1) |
| 삭제 | O(1) |
| 접근 | O(1) |
| 탐색 (값 검색) | O(n) |
| Object.keys() | O(n) |
| Object.values() | O(n) |
| Object.entries() | O(n) |
| hasOwnProperty | O(1) |
