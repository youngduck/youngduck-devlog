---
title: "[Jest] Matchers 함수정리"
excerpt: "Jest의 Matchers를 활용한 예제 모음집입니다."
coverImage: "/assets/blog/posts/jest/cover.png"
date: "2024-04-01T21:29:00"
category: "Jest"
ogImage:
  url: "/assets/blog/posts/jest/cover.png"
---

## 예제

```jsx
const fn = {
  add: (num1, num2) => num1 + num2,
  makeUser: (name, age, gender) => ({ name, age, gender: undefined }),
  throwErr: () => {
    throw new Error("error발생");
  },
};

module.exports = fn;
```

## Matcher

### 원시값 비교

```
// 기본적인 원시값을 비교할땐 toBe를 사용합니다.
test('2+3은 5다',()=>{
    expect(fn.add(2,3)).toBe(5)
})

test('3+3은 5가 아니다',()=>{
    expect(fn.add(3,3)).toBe(5)
})

test('3+3은 5가 아니다',()=>{
    expect(fn.add(3,3)).not.toBe(5)
})
```

### 참조값 비교

```jsx
// 배열이나 객체의 경우 JavaScript에서 참조값이므로 toEqual을 사용해 테스트해야합니다.
/*makeUser의 반환값
	{name:"yd",age:22,gender:undefined}
*/

test("참조값을 다룰땐 toEqual을 사용", () => {
  expect(fn.makeUser("yd", 22)).toEqual({
    name: "yd",
    age: 22,
  });
});

// toEqual보다는 엄격하게 toStrictEqual사용을 권장한다고합니다.
test("엄격한 비교를 진행하는 toStrictEqual", () => {
  expect(fn.makeUser("yd", 22)).toStrictEqual({
    name: "yd",
    age: 22,
  });
});
```

### Null, True, False, Defined, Undefined

```jsx
test("null은 null이다.", () => {
  expect(null).toBeNull();
});

test("문자는 true입니다.", () => {
  expect("hello world").toBeTruthy();
});

test("문자는 false입니다", () => {
  expect(false).toBeFalsy();
});

test("문자는 defined입니다", () => {
  expect("hello world").toBeDefined();
});

test("undefined는 undefined입니다", () => {
  expect(undefined).toBeUndefined();
});
```

### 크기 비교

```jsx
/*
toBeGreaterThan() 크다
toBeGreaterThanOrEqual() 이상
toBeLessThan() 작다
toBeGreaterThanOrEqual() 이하
*/

test("ID는 10자 이하", () => {
  const id = "kim yd";
  expect(id.length).toBeLessThan(10);
});
```

### 소수 덧셈

```jsx
//JavaScript는 2진법을 사용해 소숫점을 정확히 계산못합니다.
test("에러발생", () => {
  expect(fn.add(0.1, 0.2)).toBe(0.3);
});

test("소수 계산은 toBeCloseTo 이용", () => {
  expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3);
});
```

### 정규 표현식

```jsx
test("Hello world 에 a 글자가 있는가?", () => {
  expect("hello world").toMatch(/a/);
});

test("Hello world 에 h 글자가 있는가?", () => {
  expect("Hello world").toMatch(/h/i);
});
```

### 배열 존재여부

```jsx
test("유저배열에 kim이 있는가?", () => {
  const user = "kim";
  const userList = ["lee", "kim", "park"];
  expect(userList).toContain(user);
});
```

### 에러 발생 여부

```jsx
//test 성공
test("에러발생함수가 error발생문구 에러를 발생시키는지", () => {
  expect(() => fn.throwErr()).toThrow("error발생");
});

//test 실패
test("에러발생함수가 발생 에러를 발생시키는지", () => {
  expect(() => fn.throwErr()).toThrow("발생");
});
```

## 참고

[공식문서](https://jestjs.io/docs/expect)

[코딩앙마 jest 강의](https://www.youtube.com/watch?v=_36vt4fBjOQ)
