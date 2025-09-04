---
title: "[리트코드] - Container With Most Water 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 6주차 - 투 포인터"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-08-27T20:15:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
길이가 n인 정수 배열 height가 주어집니다. n개의 수직선이 그려져 있으며, i번째 선의 두 끝점은 (i, 0)과 (i, height[i])입니다.

x축과 함께 컨테이너를 형성하는 두 선을 찾아서, 컨테이너가 가장 많은 물을 담을 수 있도록 하세요.

컨테이너가 저장할 수 있는 최대 물의 양을 반환하세요.

컨테이너를 기울일 수 없다는 점에 유의하세요.

![물통 사진](/assets/algorithms/JS-리트코드/leet-11-1.jpg)

&nbsp;
**예시 1:**

입력: height = [1,8,6,2,5,4,8,3,7]
출력: 49
설명: 위의 수직선들은 배열 [1,8,6,2,5,4,8,3,7]로 표현됩니다. 이 경우, 컨테이너가 담을 수 있는 물의 최대 면적(파란색 부분)은 49입니다.

**예시 2:**

입력: height = [1,1]
출력: 1

**제약 조건:**

- n == height.length
- 2 <= n <= 105
- 0 <= height[i] <= 104

## 내풀이: 투 포인터

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // 단순히 세로값만 길다고 물을 많이 담을 수 있는게 아님.
  // 가로값도 중요함.
  // 그래서 최악(브루트포스 O(n^2)), 최적(투포인터? 등)활용하면서 max용량 찾아 나가면 될것같음

  // 투포인터인데 최대 너비에서 좁혀갈거임
  // 좁힐때 낮은쪽을 버려야 높이가 높아지는것을 기대할 수 있음(용량이 커질 수 있다는 말과 같다)
  // 예외상황 : 양쪽높이가 같을때? 더이상 작아질일밖에없으니 반복문 탈출시키면 될것 같음
  // -> 틀린 생각이였음. 겁나높은 두높이가 안에 존재할경우 최댓값이 뒤집힐 수 있음.
  let left = 0;
  let right = height.length - 1;

  let maxWater = 0;

  while (left < right) {
    const w = right - left;
    const h = Math.min(height[left], height[right]);
    const size = w * h;
    maxWater = Math.max(maxWater, size);

    if (height[left] < height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return maxWater;
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(n)

- **배열 순회**: O(n) - 두 포인터가 한 번씩만 이동하며 전체 배열을 탐색
- **각 반복에서의 연산**: 너비 계산, 높이 계산, 면적 계산 모두 O(1)
- **전체**: **O(n)**

### 공간복잡도: O(1)

- **변수들**: left, right, maxWater, w, h, size 모두 고정 크기
- **추가 자료구조 없음**: 입력 배열 외에 별도 공간 사용하지 않음
- **전체**: **O(1)**

## 핵심 포인트

### 투 포인터 알고리즘

- **초기 설정**: 배열의 양 끝에서 시작 (최대 너비)
- **포인터 이동**: 더 낮은 높이를 가진 쪽의 포인터를 안쪽으로 이동
- **최대값 갱신**: 각 단계에서 현재 면적과 최대 면적을 비교하여 갱신

### 물의 높이 계산

- **핵심**: 물의 높이는 두 벽 중 **더 낮은 벽**에 의해 결정됨
- **Math.min() 사용**: Math.min(height[left], height[right])로 제한 높이 계산

### 포인터 이동 전략

- **더 낮은 쪽 이동**: 높은 쪽을 유지하고 낮은 쪽을 이동시켜야 더 큰 면적 가능성 존재
- **같은 높이일 때**: 어느 쪽을 이동해도 상관없으므로 한쪽(여기서는 right) 이동. break시키려했으나 잘못된 생각이였음
- **잘못된 생각**: 양쪽 높이가 같아도 내부에 엄청나게 높은 벽이 2개 있을 수 있으므로 끝까지 탐색 해야함

## 스터디 정보 & 문제 출처

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
- [리트코드 문제](https://leetcode.com/problems/container-with-most-water/description/)
