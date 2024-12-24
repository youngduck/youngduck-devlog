---
title: "라우터속 컴포넌트는 언제 리렌더링이 일어날까요?"
excerpt: "선언적컴포넌트에 State를 할당하다 발견한 문제점에 대해 공유합니다."
coverImage: "/assets/blog/posts/react/react-router-rerender/cover.png"
date: "2024-12-24T18:35:00"
category: "React"
ogImage:
  url: "/assets/blog/posts/react/react-router-rerender/cover.png"
---

## 📢 문제상황 발생전

> 사내 프로젝트를 진행하면서 React-Query를 활용해 서버에서 가져온 데이터를 선언적([참고](https://f-lab.kr/insight/understanding-react-declarative-ui-20240802))으로 렌더링 해주었고 URL 파라미터값에 따라 리렌더링이 진행되게끔 만들었습니다. 다음과 같이 말이죠.

```tsx
// src/Router.tsx
import { Routes, Route } from "react-router-dom";
import PublicRoute from "@/shared/route/PublicRoute";

const PeopleDetailPage = React.lazy(() => import("@/pages/PeopleDetailPage"));

const Router = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/Msw/:id" element={<PeopleDetailPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
```

```tsx
// src/pages/PeopleDetailPage.tsx
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import Loading from "@/shared/layout/Loading";
import ErrorFallback from "@/components/json-test/ErrorFallback";
import PeopleDetail from "@/components/People/PeopleDetail";

const PeopleDetailPage = () => {
  return (
    <main>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loading />}>
              <PeopleDetail />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
};

export default PeopleDetailPage;
```

```tsx
// src/components/PeopleDetail.tsx
import { useGetPeopleDetail } from "@/hooks/api/people/useGetPeopleDetail";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface IMswTestDetail {}

const PeopleDetail: React.FC<IMswTestDetail> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetPeopleDetail(id ?? "");
  /* data 형태
		  [
		    {
		      "id": "1",
		      "name": "lee",
		      "country": "ko",
		      "lang": "react"
		    },
		    {
		      "id": "2",
		      "name": "jay",
		      "country": "eu",
		      "lang": "vue"
		    },
		    {
		      "id": "3",
		      "name": "mark",
		      "country": "us",
		      "lang": "spring"
		    }
		  ]
   */

  return (
    <div>
      <div>이름: {data.name}</div>
      <div>국가: {data.country}</div>
      <div>언어: {data.lang}</div>
      <div onClick={() => navigate(`/Msw/${Number(id) - 1}`)}>이전사람보기</div>
      <div onClick={() => navigate(`/Msw/${Number(id) + 1}`)}>다음사람보기</div>
    </div>
  );
};

export default PeopleDetail;
```

의도한 대로 URL의 id값을 변경하면 아래 사진처럼 해당 정보가 잘 나오는 모습입니다.

![Untitle](/assets/blog/posts/react/react-router-rerender/1.gif)

## ⚠️ 문제상황 발생

하지만 여기서 name이라는 값의 제어가 필요해 data.name값을 state에 담아보면 어떻게 렌더링 될까요?

```tsx
// src/components/PeopleDetail.tsx
import { useGetPeopleDetail } from "@/hooks/api/people/useGetPeopleDetail";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface IMswTestDetail {}

const PeopleDetail: React.FC<IMswTestDetail> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetPeopleDetail(id ?? "");
  + const [testName,setTestName] = useState(data.name);

  return (
    <div>
      + <div>이름: {testName}</div>
      - <div>이름: {data.name}</div>
      <div>국가: {data.country}</div>
      <div>언어: {data.lang}</div>
      <div onClick={() => navigate(`/Msw/${Number(id) - 1}`)}>이전사람보기</div>
      <div onClick={() => navigate(`/Msw/${Number(id) + 1}`)}>다음사람보기</div>
    </div>
  );
};

export default PeopleDetail;

```

![2.gif](/assets/blog/posts/react/react-router-rerender/2.gif)

URL이 변경되어도 testName은 초기값에서 변경되지 않았습니다. 다른 데이터들은 정상적으로 업데이트되는데 말이죠. 컴포넌트 리렌더링이 일어나서 값을 모두 새로 가져오는데 어째서 useState의 값 은 재할당이 일어나지 않을까라는 궁금증이 생겼습니다.

## 👀 해결방법검토

1. useEffect를 활용해 data를 의존성배열로추가하여 data값이 바뀔때마다 setTestName을 트리거 (id별로 변하고자 의도한 컴포넌트에서 해당방식을 택하는것은 리로드를 시키는것 과 다름없고 제어하고자 하는 state값이 늘어나면 비례하여 set함수도 늘어나야 하기때문에 배제.)
2. 컴포넌트 생명주기(componentDidMount, componentDidUpdate, componentWillUnmount)에 대한 개념이 부족한것이다. 확실하게 다시 공부해와라.
3. PeopleDetailPage 컴포넌트속 PeopleDetail 컴포넌트 호출부에 확실하게 다른 컴포넌트임을 인식 시켜주기 (원인도 모른체)

## ❗️깨달음

이런 저런 이유를 분석하다 컴포넌트 리렌더링이 일어나는 것이 확실한건가? 라는 생각이 들었습니다. 코드를 다시한번 분석해보니 데이터를 가져올때 사용하는 useSuspensQuery는 querykey를 의존성 배열로 사용하기때문에 useState에 의존성배열을 담아서 사용하는것과 똑같이 작동하고 있다는것을 깨달았습니다.

**_아!! 그렇다면?_**

컴포넌트가 페이지 이동에 따라 리렌더링 되는것이아니라 딱한번 렌더링되고 의존성 배열에 따라 값만 바뀌는 동일컴포넌트를 재사용 하고있다는 것을 깨닫게 되었습니다. ( 즉, msw/1에서 msw/2, msw2에서 msw/3으로 이동해도 PeopleDetail 컴포넌트의 렌더링은 단한번 일어나고 있는 것입니다.)

원인을 깨닫고, 파라미터에 따라 컴포넌트가 새로 마운트 되도록 PeopleDetailPage에 key값에 id를 추가해주어 다른컴포넌트로 인식하도록 문제를 해결했습니다.

## 💡 최종 결론

서칭을해도 잘나오지않아 추가적으로 이러한 분석이 맞는지 클로드와 지피티에게 교차검증을 해보니 받은 답변은 다음과 같습니다. (오개념일시 댓글로 지적 부탁드립니다.)

### 클로드3.5

동일한 라우트 패턴일 경우

- URL 파라미터만 변경되면 (예: /users/1 → /users/2) 컴포넌트는 언마운트되지 않고 재사용됩니다.
- 이는 성능 최적화를 위한 의도된 동작입니다.

### GPT-4o

- React Router를 사용하여 페이지를 전환할 때, URL이 변경되면 해당 URL에 매핑된 컴포넌트가 마운트됩니다.
- 그러나 같은 컴포넌트가 재사용되는 경우, React는 해당 컴포넌트를 다시 마운트하지 않고 상태를 유지합니다. 이로 인해 성능이 향상되고 불필요한 리렌더링을 방지할 수 있습니다.
- 만약 URL의 파라미터가 변경되어도 같은 컴포넌트를 사용하고 있다면, 해당 컴포넌트의 상태는 초기화되지 않고, 이전 상태를 유지하게 됩니다.
- 이러한 동작은 React의 효율적인 렌더링 방식 중 하나로, 개발자가 의도한 대로 동작하도록 하기 위해서는 필요에 따라 key prop을 사용하여 컴포넌트를 강제로 리렌더링할 수 있습니다.

저는 리액트에서 라우터가 변경되면 무조건 해당 컴포넌트도 리렌더링 될것이라 생각하며 개발을 진행 해 왔습니다. 그동안 프로젝트를 진행하면서 URL이 변경되어도 같은 컴포넌트를 쓰게되는 경우가 여러번 존재했는데 이번 학습을 통해 더 최적화 된 프로젝트를 만들 수 있을것 같습니다.

ps. 해당 글은 React(v18), Tanstack-Query(v5)를 활용했습니다.
