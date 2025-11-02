---
title: "[리트코드] - Top K Frequent Elements 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 - 해시테이블"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-11-02T14:10:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
정수 배열 nums와 정수 k가 주어질 때, 가장 자주 나타나는 k개의 요소를 반환하세요. 답은 어떤 순서로든 반환할 수 있습니다.

&nbsp;

**예시 1:**

입력: nums = [1,1,1,2,2,3], k = 2
출력: [1,2]

**예시 2:**

입력: nums = [1], k = 1
출력: [1]

**예시 3:**

입력: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
출력: [1,2]

**제약 조건:**

- 1 <= nums.length <= 105
- -104 <= nums[i] <= 104
- k는 배열의 고유 요소 수 범위 내입니다
- 답은 고유하게 보장됩니다

**Follow up:** 알고리즘의 시간 복잡도는 O(n log n)보다 좋아야 합니다.

&nbsp;

## 내풀이: 해시테이블 + 정렬

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const hashMap = new Map();

  // 각 숫자의 빈도수를 Map에 저장
  for (let i = 0; i < nums.length; i++) {
    if (hashMap.get(nums[i])) {
      hashMap.set(nums[i], hashMap.get(nums[i]) + 1);
    } else {
      hashMap.set(nums[i], 1);
    }
  }

  // Map을 배열로 변환하고 빈도수 내림차순 정렬 후 상위 k개 추출
  const sortedArray = Array.from(hashMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((item) => item[0]);

  return sortedArray;
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n log n)

- nums 배열을 한 번 순회하며 빈도수 계산: O(n)
- Map을 배열로 변환: O(u) (u는 고유 요소 수)
- 정렬: O(u log u)
- slice 및 map: O(k)
- **전체**: O(n + u log u) = O(n log n) (최악의 경우 u = n)

### 공간복잡도: O(u)

- Map에 각 고유 요소와 빈도수 저장: O(u)
- 배열 변환 및 정렬을 위한 추가 공간: O(u)
- u는 배열의 고유 요소 수

## 핵심 포인트

### 1. 해시테이블을 이용한 빈도수 카운팅

- Map을 사용하여 각 숫자의 등장 횟수를 효율적으로 계산
- O(1) 시간에 접근 및 업데이트 가능

### 2. 정렬 후 슬라이싱

- Array.from(hashMap.entries()): Map을 [key, value] 형태의 배열로 변환
- .sort((a, b) => b[1] - a[1]): 빈도수(두 번째 요소) 기준 내림차순 정렬
- .slice(0, k): 상위 k개만 추출
- .map(item => item[0]): 숫자만 추출

## 스터디에 참여하고 싶다면

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
- [원문](https://leetcode.com/problems/top-k-frequent-elements/description/)
