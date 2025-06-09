---
title: "[리트코드] - Longest Substring Without Repeating Characters 자바스크립트 풀이"
excerpt: "알고리즘 재활훈련 - 투포인터,Map"
coverImage: "/assets/algorithms/JS-리트코드/cover.png"
date: "2025-03-18T01:41:00"
ogImage:
  url: "/assets/algorithms/JS-리트코드/cover.png"
---

## 문제

&nbsp;
문자열 s가 주어졌을 때, 중복되는 문자가 없는 가장 긴 부분 문자열의 길이를 반환하세요.
&nbsp;
예를 들어:
s = "abcabcbb"
가장 긴 중복 없는 부분 문자열은 "abc"로 길이는 3입니다.
&nbsp;
s = "bbbbb"
가장 긴 중복 없는 부분 문자열은 "b"로 길이는 1입니다.
&nbsp;
s = "pwwkew"
가장 긴 중복 없는 부분 문자열은 "wke"로 길이는 3입니다.
"pwke"는 부분 문자열이 아닌 부분 수열이므로 정답이 될 수 없습니다.
&nbsp;

&nbsp;
[원문](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)

## 풀이

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  //투포인터 + 해쉬맵 풀이
  let left = 0;
  let right = 0;
  let max = 0;
  let map = new Map();

  //그리디로 풀기에는 s의길이가 10^4
  //right 포인터가 끝까지 가면 종료
  while (right < s.length) {
    //right 포인터가 가리키는 문자가 해쉬맵에 없으면 추가
    if (!map.has(s[right])) {
      map.set(s[right], 1);
      right += 1;
    } else {
      //right 포인터가 가리키는 문자가 해쉬맵에 있으면 제거
      map.delete(s[left]);
      left += 1;
    }
    //max 값 계속 갱신
    max = Math.max(max, right - left);
  }
  return max;
};
```
