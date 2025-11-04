---
title: "[리트코드] - House Robber 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 1주차 - DP"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-11-01T16:21:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
당신은 도로를 따라 집을 털 계획을 세우는 전문 도둑입니다. 각 집에는 일정 금액의 돈이 숨겨져 있으며, 인접한 두 집을 같은 밤에 털면 보안 시스템이 작동하여 경찰에 신고됩니다.

정수 배열 nums가 각 집의 돈을 나타낼 때, 경찰에 알리지 않고 오늘 밤에 훔칠 수 있는 최대 금액을 반환하세요.

&nbsp;

**예시 1:**

입력: nums = [1,2,3,1]
출력: 4
설명: 집 1(돈 = 1)과 집 3(돈 = 3)을 털면 됩니다.
총 훔칠 수 있는 금액 = 1 + 3 = 4

**예시 2:**

입력: nums = [2,7,9,3,1]
출력: 12
설명: 집 1(돈 = 2), 집 3(돈 = 9), 집 5(돈 = 1)을 털면 됩니다.
총 훔칠 수 있는 금액 = 2 + 9 + 1 = 12

**제약 조건:**

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 400

&nbsp;

## 내풀이: 동적 프로그래밍 (DP)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // TOP-DOWN은 재귀호출을 써야하지만, BOTTOM-UP 방향인 DP로 문제 해결
  // 빈배열에 하나씩 배열의 크기를 늘려가면서 DP배열에 최대금액을 저장한 후
  // 하나씩 DP배열에 최대값을 추가해주는 형태로 구현

  const DP = new Array(nums.length + 1).fill(0);
  DP[0] = 0;
  DP[1] = nums[0];

  for (let i = 2; i < DP.length; i++) {
    // DP[i-1]: 현재 집을 털지 않는 경우 (이전까지의 최대값)
    // DP[i-2] + nums[i-1]: 현재 집을 털는 경우 (전전 집까지의 최대값 + 현재 집)
    DP[i] = Math.max(DP[i - 1], DP[i - 2] + nums[i - 1]);
  }

  return DP[DP.length - 1];
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- `nums` 배열을 한 번 순회하며 각 위치에서 최대값을 계산
- n은 `nums` 배열의 길이
- 각 반복마다 상수 시간 연산(`Math.max`, 배열 접근)만 수행

### 공간복잡도: O(n)

- DP 배열을 `nums.length + 1` 크기로 생성
- n은 `nums` 배열의 길이
- 추가 공간은 DP 배열에 사용됨

## 핵심 포인트

### DP 점화식

- **DP[i]**: 첫 번째 집부터 i번째 집까지 고려했을 때 훔칠 수 있는 최대 금액
- **점화식**: `DP[i] = Math.max(DP[i-1], DP[i-2] + nums[i-1])`
  - `DP[i-1]`: 현재 집을 털지 않는 경우 (이전까지의 최대값 유지)
  - `DP[i-2] + nums[i-1]`: 현재 집을 털는 경우 (전전 집까지의 최대값 + 현재 집의 돈)

### BOTTOM-UP 접근 방식

- 작은 문제부터 시작하여 큰 문제로 확장
- 재귀 호출 없이 반복문으로 해결하여 스택 오버플로우 위험 제거
- 각 단계에서 최적해를 저장하여 중복 계산 방지

## 스터디에 참여하고 싶다면

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
- [원문](https://leetcode.com/problems/house-robber/description/)
