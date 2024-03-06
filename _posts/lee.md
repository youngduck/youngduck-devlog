---
title: "ReactQuery의 Staletime,cachetime을 직접 테스트해보자"
excerpt: "요약문이랍니다."
coverImage: "/assets/blog/posts/reactquery-chart.png"
date: "2000/04/13"
category: "React-Query"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

## 안녕하세요

내용들이다.

내용들이다.

내용들이다.

내용들이다.

---

> 아이런

**자바스크립트**

```js
import React from "react";
import ReactDOM from "react-dom";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const markdown = `
# Your markdown here
`;

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector("#content")
);
```

_기울여_
_이탤릭_ , _이탤릭_
**볼드** **볼드**
**_이탤릭볼드_**
**_이탤릭볼드_**
**이렇게 _할수도_**
~~취소선~~

## Lorem Ipsum

### 링크

[스팀잇링크](https://steemit.com)
https://steemit.com
https://youtu.be/aKTH0o8AEtQ

&#128586;

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

Tristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.

![img](/assets/blog/posts/reactquery-chart.png)

- 앙
  - ㅋㅋ
  - ㅇㅇ

1. 첫 번째
2. 두 번째
3. 세 번째
4. 1을 다시 써도 네 번째
