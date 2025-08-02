---
title: "[리트코드] - Product of Array Except Self 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 2주차 - 배열, 누적곱"
coverImage: "/assets/algorithms/JS-리트코드/cover.png"
date: "2025-07-31T09:25:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/cover.png"
---

## 문제

&nbsp;
정수 배열 nums가 주어졌을 때, answer[i]가 nums[i]를 제외한 모든 요소의 곱과 같은 배열 answer를 반환하세요.

nums의 모든 접두사 또는 접미사의 곱은 32비트 정수에 맞는 것이 보장됩니다.

O(n) 시간에 실행되고 나눗셈 연산을 사용하지 않는 알고리즘을 작성해야 합니다.

&nbsp;
예시 1:
입력: nums = [1,2,3,4]
출력: [24,12,8,6]
설명: answer[0] = 2×3×4 = 24, answer[1] = 1×3×4 = 12, answer[2] = 1×2×4 = 8, answer[3] = 1×2×3 = 6

&nbsp;
예시 2:
입력: nums = [-1,1,0,-3,3]
출력: [0,0,9,0,0]
설명: answer[0] = 1×0×(-3)×3 = 0, answer[1] = (-1)×0×(-3)×3 = 0, answer[2] = (-1)×1×(-3)×3 = 9, answer[3] = (-1)×1×0×3 = 0, answer[4] = (-1)×1×0×(-3) = 0

&nbsp;
제약 조건:

- 2 <= nums.length <= 105
- -30 <= nums[i] <= 30
- 입력은 answer[i]가 32비트 정수에 맞는 것이 보장되도록 생성됩니다.

&nbsp;
추가 질문: O(1) 추가 공간 복잡도로 문제를 해결할 수 있습니까? (출력 배열은 공간 복잡도 분석에서 추가 공간으로 계산되지 않습니다.)

&nbsp;
[원문](https://leetcode.com/problems/product-of-array-except-self/description/)

## 풀이

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const numsLength = nums.length;

  const result = new Array(numsLength).fill(1);

  // for문 하나로 처리할경우 O(n^2).
  // for문 두개로 나눠서 처리할경우 O(n). 누적곱 개념을 활용해줘야함

  let left = 1;
  let right = 1;

  for (let i = 0; i < numsLength; i++) {
    result[i] *= left;
    left *= nums[i];

    result[numsLength - i - 1] *= right;
    right *= nums[numsLength - i - 1];
  }

  // 시간복잡도: O(n), 공간복잡도: O(1)

  return result;
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- 배열을 한 번만 순회: O(n)
- 각 인덱스에서 왼쪽과 오른쪽 누적곱을 동시에 계산
- 따라서 전체 시간복잡도는 **O(n)**

### 공간복잡도: O(1)

- 출력 배열을 제외한 추가 공간: O(1)
- left, right 변수만 사용
- 따라서 전체 공간복잡도는 **O(1)** (출력 배열 제외)

### 알고리즘 설명

1. **누적곱 활용**: 각 인덱스 i에 대해 nums[i]를 제외한 모든 요소의 곱을 계산
2. **양방향 순회**: 한 번의 순회로 왼쪽과 오른쪽 누적곱을 동시에 계산
3. **나눗셈 연산 없음**: 곱셈만 사용하여 문제 조건 만족
4. **공간 최적화**: 출력 배열 외 추가 공간을 O(1)로 유지

### 최적화 포인트

- **단일 순회**: 배열을 한 번만 순회하여 O(n) 시간복잡도 달성
- **누적곱 개념**: 각 위치에서 왼쪽과 오른쪽의 누적곱을 미리 계산
- **공간 효율성**: 출력 배열 외 추가 공간을 최소화
