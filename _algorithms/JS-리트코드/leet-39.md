---
title: "[리트코드] - Combination Sum 자바스크립트 풀이"
excerpt: "Dale 리트코드 스터디 5기 3주차 - 백트래킹"
coverImage: "/assets/algorithms/JS-리트코드/dale-cover.png"
date: "2025-08-07T17:42:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/dale-cover.png"
---

## 문제

&nbsp;
서로 다른 정수들의 배열 candidates와 목표 정수 target이 주어집니다. 선택된 숫자들의 합이 target이 되는 모든 고유한 조합의 리스트를 반환하세요. 조합은 어떤 순서로든 반환할 수 있습니다.

같은 숫자를 candidates에서 무제한으로 선택할 수 있습니다. 두 조합은 선택된 숫자 중 적어도 하나의 빈도가 다르면 고유합니다.

테스트 케이스는 주어진 입력에 대해 합이 target이 되는 고유한 조합의 수가 150개 미만이 되도록 생성됩니다.

&nbsp;
**예시 1:**

입력: candidates = [2,3,6,7], target = 7
출력: [[2,2,3],[7]]
설명:

- 2와 3은 후보이고, 2 + 2 + 3 = 7입니다. 2는 여러 번 사용할 수 있습니다.
- 7은 후보이고, 7 = 7입니다.
- 이것들이 유일한 두 조합입니다.

**예시 2:**

입력: candidates = [2,3,5], target = 8
출력: [[2,2,2,2],[2,3,3],[3,5]]

**예시 3:**

입력: candidates = [2], target = 1
출력: []

**제약 조건:**

- 1 <= candidates.length <= 30
- 2 <= candidates[i] <= 40
- candidates의 모든 요소는 서로 다릅니다.
- 1 <= target <= 40

&nbsp;
[원문](https://leetcode.com/problems/combination-sum/description/)

## 내풀이: 백트래킹

```javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  // 작은숫자 부터 더해서, 더 큰 숫자를 더해볼필요없이 미리 리턴시키기위한용도, 중복값도 방지가능
  candidates.sort();
  const result = [];

  const sumArr = (arr) => {
    if (arr.length === 0) return 0;
    else {
      const sum = arr.reduce((acc, cur) => acc + cur);
      return sum;
    }
  };

  const backtrack = (targetArr, startIndex) => {
    const sumData = sumArr(targetArr);

    if (sumData === target) {
      result.push([...targetArr]);
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      if (sumData > target) {
        break;
      }

      backtrack([...targetArr, candidates[i]], i);
    }
  };

  // 백트래킹 방식으로 풀예정 (재귀+break)
  // target보다 작을경우 계속 더함. 클경우 재귀멈춤 backtrack인수에
  // targetArr만줬더니 result에 중복값이 생김. ex) 7을만들때[2,2,3],[2,3,2]같은 중복생김
  // 자기자신 이상의 index를 타게하기위해서 startIndex 넣어줌
  backtrack([], 0);

  return result;
};
```

## 시간복잡도 및 공간복잡도

### 시간복잡도: O(k \* 2^n)

- **k**: 각 조합의 평균 길이
- **2^n**: 가능한 모든 조합의 수 (각 요소를 선택하거나 선택하지 않는 경우)
- 각 조합을 생성할 때마다 배열 복사와 합계 계산이 필요하므로 **O(k \* 2^n)**

### 공간복잡도: O(target/min(candidates))

- 재귀 호출 스택의 깊이는 target을 가장 작은 후보로 나눈 값만큼 깊어질 수 있음
- 각 재귀 호출마다 새로운 배열이 생성되므로 **O(target/min(candidates))**

## 핵심 포인트

### 백트래킹의 핵심

- **조기 종료**: sumData > target일 때 break로 불필요한 탐색 차단
- **중복 방지**: startIndex를 사용하여 [2,2,3]과 [2,3,2] 같은 중복 조합 방지
- **정렬 활용**: 정렬된 배열의 특성을 활용한 최적화

### 최적화 고려사항

- 현재 구현은 매번 배열을 복사하여 메모리 사용량이 큼
- 조기 종료 조건으로 불필요한 탐색을 줄임
- 백트래킹 패턴을 사용하여 push → 재귀 → pop 방식으로 최적화 가능하다고함

## 스터디에 참여하고 싶다면

- [Dale - 리트코드 스터디](https://github.com/DaleStudy/leetcode-study)
