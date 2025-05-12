---
title: "useEffect 없이 예측 가능한 코드 작성하기"
excerpt: "useEffect 지옥에서 탈출해 예측 가능한 코드를 작성합시다."
coverImage: "/assets/blog/posts/react/react-2/cover.png"
date: "2025-02-25T23:36:00"
ogImage:
  url: "/assets/blog/posts/react/react-2/cover.png"
---

## useEffect를 써야하나?

> React 개발을 하다 막혀 'useEffect를 써야하나' 라는 생각을 해보신적 있으신가요?

&nbsp;
컴포넌트가 의도한 대로 동작하지 않거나 컴포넌트의 생명주기와 관련된 로직을 다룰 때,
useEffect를 통해 해결하려고 합니다. 이번 글에서는 useEffect를 적절하게 사용하는 방법과 대체할 수 있는 더 나은 해결책들을 소개해드리려고 합니다.

## useEffect가 13개?

최근 레거시 프로젝트에 새로운 도메인을 추가하는 작업을 진행하면서 아찔한 안티패턴을 발견했습니다. 프로젝트에서 공통으로 사용되는 Header 컴포넌트에는 무려 13개의 **useEffect**가 존재했습니다. useEffect가 많이쓰이는 경우 다음과 같은 문제점들을 발견할 수 있었습니다.
&nbsp;

- 서로 얽혀있는 의존성 배열로 인한 사이드 이펙트 추적이 어려움
- data가 없음을 가정하고 useEffect를 통해 리렌더링,데이터 리페칭을 하는 불필요한 로직
- 코드의 실행 흐름을 예측하기 어려움, 복잡도 증가
  &nbsp;
  &nbsp;

## 왜?

왜 이러한 코드가 나오게 되었을까 짧게 생각해본 결과 React를 처음 학습할때 상태 변화에 따른 리렌더링이라는 핵심 개념을 배우게 되는데 useEffect가 이러한 개념을 가장 직관적으로 구현하는 만능 도구라고 생각하게 되는것 같습니다.
&nbsp;
저 또한 최근에 의도한대로 값이 바뀌지 않는 [상황](https://youngduck-devlog.vercel.app/posts/react-router-rerender)을 겪었었는데요. 해결방법으로 useEffect를 제일먼저 생각했었던 경험이 있었습니다.
&nbsp;
&nbsp;
하지만 useEffect를 하나 둘 사용하다보면 **가독성**은 물론이고 해당 컴포넌트의 라이프 사이클에 대한 **이해도**도 떨어지게 됩니다. 그렇다면 이러한 useEffect지옥을 탈출하기 위해서는 어떻게 컴포넌트를 구현하는게 좋을까요?

## 첫번째 방법

첫번째로 useEffect를 줄일 수 있는 방법은 ReactQuery나 SWR같은 서버상태의 값을 가져오는데 도움을 주는 라이브러리를 사용하는 것입니다.
React로 API를 호출할때 다음과 같은 예제를 많이 보셨을 겁니다.
&nbsp;

```tsx
import React, { useState, useEffect } from "react";

const SampleComponent = () => {
  const [data, setData] = useState([{ title: "", body: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
      );
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>{data[0].title}</p>
    </div>
  );
};

export default SampleComponent;
```

&nbsp;
이렇게 작성된 코드가 있을때 생기는 문제는 다음과 같습니다.
&nbsp;

- 해당 컴포넌트의 API 요청이 2개,3개로 변해 다중 API를 요청하게 될 경우 늘어나는 fetchData를 우아하게 구현하기 어려움
- 컴포넌트가 마운트 될 때마다 API 요청이 발생해 서버 부하 및 클라이언트 리소스 낭비 (캐싱 전략 부재)
- 로딩, 에러, 재시도 매커니즘등 데이터 패칭에 필요한 요소를 빠져있음
  &nbsp;

ReactQuery는 다음과 같은 기능들을 제공해 이러한 문제들을 한방에 해결할 수 있게 해줍니다.

```tsx
import { useQuery } from "@tanstack/react-query";

const getData = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();
  return data;
};

const useGetData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getData,
    cacheTime: 0,
    staleTime: 0,
  });
  return { data, isLoading, isError };
};

const DataComponent = () => {
  const { data, isLoading, isError } = useGetData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      <h1>{data[0].title}</h1>
    </div>
  );
};

export default DataComponent;
```

&nbsp;
ReactQuery에서 제공하는 useQuery 메서드를 통해 data의 로딩상태, 에러상태를 제어한 후 data에 집중 할 수 있게 되었습니다.
또한 cacheTime,staleTime을 활용하여 컴포넌트가 마운트 될때 요청되는 API를 캐싱처리할 수 있는 부가적인 효과도 얻을 수 있습니다.
&nbsp;
추가적으로 다중 API요청시 활용할 수 있는 useQueries, 컴포넌트를 선언적으로 부르고 관리하는 useSuspenseQuery등이 있는데 주제와는 맞지 않으므로 해당부분은 후술을 생략하겠습니다.
&nbsp;
또한 다음과 같이 parameter에 따라 갱신되는 API도 useQuery의 queryKey만 추가해주면 useEffect의 의존성 배열 역할을 함과 동시에 캐싱기능을 제공해 주기 때문에 useEffect를 사용하지 않고 서버에서 보내준 값을 가져올 수 있게 됩니다.
&nbsp;

```tsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getData = async (num: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${num}`,
  );
  const data = await response.json();
  return data;
};

const useGetData = (num: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", num], // ✅ num을 queryKey에 포함
    queryFn: () => getData(num),
    staleTime: 0,
    gcTime: 0,
  });
  return { data, isLoading, isError };
};

const DataComponent = () => {
  const [num, setNum] = useState(1);
  const { data, isLoading, isError } = useGetData(num);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      <h1>{data[0].title}</h1>
      <button onClick={() => setNum(num + 1)}>Next</button>
    </div>
  );
};

export default DataComponent;
```

## 두번째 방법

&nbsp;
두번째로 useEffect를 줄이기 위한 방법은 렌더링 특성을 이해하고 활용하는 것입니다.
useEffect 없이도 컴포넌트가 리렌더링된다는 점을 활용하면 많은 로직을 단순화할 수 있습니다.
이 부분만 잘 활용해도 (~~짧은경력주제~~) useEffect가 필요한 순간이 거의 없었던 것 같습니다.
&nbsp;

```jsx
/* 
   filteredList를 useState로 담을 필요없이 items가 렌더링될때 filteredList를 정의
   setItems를 활용하게되면 filteredList에 값에 변화를 주지 않아도 저절로 바뀌는 것을 인지하고 활용해야함.
*/
// ❌ 불필요한 useEffect 사용
useEffect(() => {
  setFilteredList(items.filter((item) => item.active));
}, [items]);

// ✅ 올바른 코드: 렌더링 중에 계산
const filteredList = items.filter((item) => item.active);
```

## 마치며

마지막으로 useEffect를 올바르게 사용하기 위해서는 어떤 경우가 있나 클로드에게 한번 물어봤습니다.
useEffect를 사용해야하는 경우는 다음과 같은 경우가 있다고 합니다.

1. 실시간 업데이트가 필요한 기능
   - 타이머, 현재시간 등 1분,1초단위로 갱신이 필요한 컴포넌트
   - 주기적인 데이터 폴링
2. 외부 시스템과의 연동
   - WebSocket연결
   - 브라우저 API 이벤트 구독
   - 이벤트 리스너 등록/해제

또한 useEffect를 사용한 후 컴포넌트가 언마운트될때 반드시 작업을 정리해주어 메모리 누수나 의도치 않은 동작이 발생하지 않도록 처리해 주어야 한다고 합니다.
