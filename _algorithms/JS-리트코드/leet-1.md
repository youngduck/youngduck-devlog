---
title: "[리트코드] TWO SUM 자바스크립트 풀이"
excerpt: "알고리즘 재활훈련 - 투포인터"
coverImage: "/assets/algorithms/JS-리트코드/cover.png"
date: "2025-02-11T19:56:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/cover.png"
---

## 문제

주어진 정수 배열 nums와 목표값 target이 있을 때, 두 숫자의 합이 target이 되는 두 숫자의 인덱스를 반환하는 문제입니다.
각 입력에는 정확히 하나의 해답만 존재하며, 같은 요소를 두 번 사용할 수 없습니다.
답은 어떤 순서로 반환해도 상관없습니다.

&nbsp;
예시 1:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Input: nums = [2,7,11,15], target = 9
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Output: [0,1]
&nbsp;
예시 2:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Input: nums = [3,2,4], target = 6
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Output: [1,2]
&nbsp;
예시 3:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Input: nums = [3,3], target = 6
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Output: [0,1]
&nbsp;

follow-up: 시간 복잡도가 O(n²)보다 낮은 알고리즘을 생각해 낼 수 있나요?
&nbsp;

[원문](https://leetcode.com/problems/two-sum/description/)

## 풀이

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  /* 투포인터 풀이 
    1. left와 right가 같으면 안되는조건이 있으므로 right값은 1에서 시작
    2. 초기화 조건에서도 right값은 left보다 1크게
  */
  let left = 0;
  let right = 1;
  const result = [];

  while (left < nums.length - 1) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      result.push(left, right);
      break;
    } else if (sum !== target && right !== nums.length - 1) {
      right += 1;
    } else {
      left += 1;
      right = left + 1;
    }
  }
  return result;
};

twoSum([2, 7, 11, 15], 9);
twoSum([3, 2, 4], 6);
twoSum([3, 3], 6);
```
