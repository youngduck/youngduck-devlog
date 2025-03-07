---
title: "YD-Tech 폴더구조 개선하기 (게시물조회편)"
excerpt: "작은것부터 하나씩 편하고 직관적으로 만들어보자"
coverImage: "/assets/blog/posts/refactoring/cover.png"
date: "2025-03-07T00:30:00"
ogImage:
  url: "/assets/blog/posts/refactoring/cover.png"
---

안녕하세요!
오늘은 기술블로그를 리뉴얼하면서 게시물 가져오는 부분의 폴더구조를를 개선한 내용을 공유하려고 합니다.
&nbsp;
저는 게시물을 만들기 위해 마크다운 형식으로 작성한 파일을 Node.js의 fs, path 모듈을 활용해 해당 폴더를 조회하는 함수를 만들고 SSG 방식으로 렌더링했습니다. 아직 게시물이 많지 않지만, 게시물이 증가하면 관리가 어려워질 것이라는 생각이 들었습니다.
&nbsp;

```markdown
- 기존에 사용하던 폴더 구조
  algorithms
  ┣ 백준-1번문제-풀이.md
  ┗ sql-평균일일대여요금구하기.md

- 개편하고자 하는 계층형 폴더 구조
  algorithms
  ┣ JavaScript
  ┃ ┗ 백준-1번문제-풀이.md
  ┗ SQL
  ┃ ┗ sql-평균일일대여요금구하기.md
```

&nbsp;
이 문제를 해결하기 위해 '카테고리별로 하위폴더를 만들어 계층화하자'라는 접근법을 선택했습니다. 이를 위해 Node.js의 path 모듈을 추가로 활용하여 재귀 함수로 모든 하위 폴더의 게시물을 가져오는 기능을 구현했습니다.
&nbsp;
폴더별로 저장되어있는 모든 게시물을 가져오기위해 node.js에 내장되어있는 path 모듈을 추가적으로 사용하여 경로값을 parameter로 재귀함수로 구현했습니다.

```tsx
export function getPostSlugs() {
  -  return fs.readdirSync(postsDirectory);
  +  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  +  const files = fs.readdirSync(dirPath);
  +  console.log(files, "files");

  +  files.forEach((file) => {
  +    const filePath = path.join(dirPath, file);
  +    if (fs.statSync(filePath).isDirectory()) {
  +      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
  +    } else {
  +      // 상대 경로로 저장 (예: sql/file.md)
  +      const relativePath = path.relative(postsDirectory, filePath);
  +      arrayOfFiles.push(relativePath);
  +    }
  +  });

  +  return arrayOfFiles;
  + };
  + return getAllFiles(postsDirectory);
}
```

음? 재귀함수? 혹시라도 성능에 영향주는거 아니야? 라는 생각이 들어서 기존의 폴더구조방식과 계층형 폴더구조의 장단점을 비교해봤어요.
&nbsp;

기존폴더구조

장점

1. O(n) 시간복잡도 (n은파일수)
2. 단순한 구현

단점

1. 파일이 많아지면 원하는 게시물을 찾기 어려움
2. 카테고리관리를 수동으로 작업해야함 (md파일내 frontmatter사용중)

계층형 폴더 구조

장점

1. 논리적인 파일 구조화 가능
2. 카테고리 자동화 (하위폴더=카테고리)
3. 추가적인

단점

1. O(n+d) 시간복잡도 (n은파일 수 , d는 하위폴더 수)
2. 재귀 호출로 인한 약간의 메모리 사용

&nbsp;
장단점을 비교해보니 시간복잡도가 기존의 n에서 n+d로 증가하였고 d의 증가비율은 n보다 적을것으로 예상되었어요.
(더 좋은 자료구조 방식이 있다면 댓글로 알려주세요!)
&nbsp;
또한 해당 함수는 SSG로 사용되는 페이지라서 빌드타임에 정적파일로 만들어져 제공되기때문에 실제 사용자 경험에는 영향이 없고 빌드 시간에 미미한 영향이 있을 수 있지만, 파일관리의 편의성과 카테고리 자동화의 이점이 더 크다고 판단해 해당 폴더구조로 개선작업을 진행했습니다.
