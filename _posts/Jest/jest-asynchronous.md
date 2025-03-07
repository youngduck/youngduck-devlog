---
title: "[Jest] 비동기함수 테스트 하기"
excerpt: "Jest에서 비동기함수를 테스트하는 방법에 대한 글입니다."
coverImage: "/assets/blog/posts/jest/cover.png"
date: "2024-04-03T16:37:00"
ogImage:
  url: "/assets/blog/posts/jest/cover.png"
---

> 이 글은 코딩앙마님의 Jest 강의를 보고 정리한 글입니다.

## &#128161; 테스트 코드에 사용한 메서드

```jsx
/*
- getName(callback함수)
- getAgeResolves(Promise resolve값을 반환)
- getAgeRejects(Promise reject값을 반환)
*/

const fn = {
  getName: (callback) => {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 3000);
  },
  getAgeResolves: () => {
    const age = 30;
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(age);
      }, 3000);
    });
  },
  getAgeRejects: () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej("error");
      }, 3000);
    });
  },
};

module.exports = fn;
```

## &#128161; Callback 함수

```jsx
//callback 함수 테스트 - 비동기 코드를 기다리게 하기위해 done 키워드를 사용.
test("3초 후 받아온 이름이 Mike", (done) => {
  function getNameCallback(name) {
    try {
      expect(name).toBe("Mike");
      done();
    } catch (error) {
      done();
    }
  }

  fn.getName(getNameCallback);
});
```

## &#128161; Promise

```jsx
// Promise를 반환하는 함수의 경우 1 - done 사용없이 return을 사용
test("3초 후 받아온 나이는 30", () => {
  return fn.getAgeResolves().then((age) => {
    expect(age).toBe(30);
  });
});

//Promise를 반환하는 함수의 경우 2 - Matcher(resolves,rejects)를 사용

//resolves
test("3초 후 받아온 데이터는 성공값 30", () => {
  return expect(fn.getAgeResolves()).resolves.toBe(30);
});
//rejects
test("3초 후 받아온 데이터는 에러", () => {
  return expect(fn.getAgeRejects()).rejects.toMatch("error");
});
```

## &#128161; Async/Await

```jsx
//Promise를 반환하는 함수의 경우 3 - Async Await 방식
test("3초 후 받아온 데이터는 성공값 30 async await", async () => {
  const age = await fn.getAgeResolves();
  return expect(age).toBe(30);
});

//Promise를 반환하는 함수의 경우 4 - Async Await 축약형
test("3초 후 받아온 데이터는 성공값 30 async await 축약", async () => {
  await expect(fn.getAgeResolves()).resolves.toBe(30);
});
```

## &#128226; 용어 정리

### Callback 함수

- Callback 함수는 다른 함수의 인자로 전달되어 특정 작업이 완료되었을 때 호출되는 함수
- 비동기 작업에서 주로 사용. 예를 들어, 파일을 읽거나 네트워크 요청을 보내는 작업을 수행할 때 사용.

### Promise

- Promise는 비동기 작업의 성공 또는 실패와 같은 결과를 나타내는 객체
- 성공적으로 작업이 완료되면(resolve), 데이터가 전달되며, 실패했을 때(reject)는 에러를 전달
- then(), catch() 메서드를 사용하여 성공 또는 실패 시의 처리를 구현 합니다.

### async/await

- async/await는 Promise를 기반으로 한 비동기 코드를 더 읽기 쉽고 동기식 코드처럼 작성할 수 있게 해주는 문법
- async 함수는 항상 Promise를 반환하며, await 키워드는 Promise가 처리될 때까지 기다린후 다음 코드를 실행

## 참고

[코딩앙마 jest 비동기코드 강의](https://www.youtube.com/watch?v=snFRUjYR6j4&list=PLZKTXPmaJk8L1xCg_1cRjL5huINlP2JKt&index=3)
