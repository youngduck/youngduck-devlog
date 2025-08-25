---
title: "[리트코드] - 3Sum 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 2주차 - 투포인터"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-08-02T23:13:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
정수 배열 nums가 주어졌을 때, nums[i] + nums[j] + nums[k] = 0인 모든 고유한 삼중항 [nums[i], nums[j], nums[k]]를 반환하세요.

해답에는 중복된 삼중항이 포함되어서는 안 됩니다.

&nbsp;
예시 1:
입력: nums = [-1,0,1,2,-1,-4]
출력: [[-1,-1,2],[-1,0,1]]
설명:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
고유한 삼중항은 [-1,0,1]과 [-1,-1,2]입니다.
순서는 상관없습니다.

&nbsp;
예시 2:
입력: nums = [0,1,1]
출력: []
설명: 유일한 가능한 삼중항은 합이 3이므로 0이 되지 않습니다.

&nbsp;
예시 3:
입력: nums = [0,0,0]
출력: [[0,0,0]]
설명: 유일한 가능한 삼중항은 합이 0입니다.

&nbsp;
제약 조건:

- 3 <= nums.length <= 3000
- -105 <= nums[i] <= 105

&nbsp;
[원문](https://leetcode.com/problems/3sum/description/)

## 풀이

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  // 최악의 경우 3중 for문이므로 투포인터 기법을써서 최적화 해도 for문 하나는 필요함

  // 결과 배열
  const result = [];

  // 투포인터 기법 사용을 위한 정렬
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // 첫 번째 요소의 중복 건너뛰기
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        // 합이 0인 경우 결과에 추가
        result.push([nums[i], nums[left], nums[right]]);

        // 두 번째, 세 번째 요소의 중복 건너뛰기
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      }
    }
  }

  return result;
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n²)

- 배열 정렬: O(n log n)
- 외부 for문: O(n)
- 내부 while문 (투포인터): O(n)
- 전체: O(n log n) + O(n²) = **O(n²)**

### 공간복잡도: O(1)

- 출력 배열을 제외한 추가 공간: O(1)
- left, right, i 변수만 사용
- 따라서 전체 공간복잡도는 **O(1)** (출력 배열 제외)

### 알고리즘 설명

1. **정렬**: 투포인터 기법 사용을 위해 배열을 오름차순으로 정렬
2. **고정점 설정**: 첫 번째 요소를 고정하고 나머지 두 요소를 투포인터로 탐색
3. **투포인터**: left와 right 포인터를 이용해 합이 0이 되는 조합 탐색
4. **중복 제거**: 동일한 값이 연속으로 나오는 경우 건너뛰어 중복 방지

### 최적화 포인트

- **투포인터 기법**: 3중 for문 O(n³)을 O(n²)로 최적화
- **중복 제거**: 정렬된 배열에서 연속된 중복값을 효율적으로 건너뛰기
- **조기 종료**: 합의 크기에 따라 포인터를 적절히 이동하여 불필요한 연산 제거
