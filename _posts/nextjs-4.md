---
title: "[짧] 기술블로그 게시물 가져오는방식 개선하기"
excerpt: ""
coverImage: "/assets/blog/posts/aws-cicd-words/cover.png"
date: "2025-03-07T00:30:00"
category: "AWS"
ogImage:
  url: "/assets/blog/posts/aws-cicd-words/cover.png"
---

안녕하세요!
오늘은 기술블로그를 리뉴얼하면서 게시물 가져오는 방법을 개선한 내용을 공유 할 예정입니다.
저는 다른 Nextjs 블로그들과 똑같이 루트폴더에서 마크다운게시물을 가져왔었습니다.
아직 몇개 없는 게시물이지만 게시물이 많아지면 관리하기 곤란하겠는데? 라는 생각이 들었어요.
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
별고민 없이 '도메인별로 하위폴더를 만들자'라고 생각했고 실천에 돌입했어요.
&nbsp;
폴더별로 저장되어있는 모든 게시물을 가져오기위해 node.js에 내장되어있는 path 모듈을 활용하여 재귀함수로 구현했어요.

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

단점

1. O(n+d) 시간복잡도 (n은파일 수 , d는 하위폴더 수)
2. 재귀 호출로 인한 약간의 메모리 사용

&nbsp;
장단점을 비교해보니 시간복잡도가 n+d시간이라면 문제없이 사용해도 괜찮다는 생각이 들었어요.
(더 좋은 자료구조 방식이 있다면 댓글로 알려주세요!)
&nbsp;
또한 해당 함수는 SSG로 사용되는 페이지라서 빌드타임에 정적파일로 만들어져 제공되기때문에 실제 사용자 경험에는 영향이 없었어요. 물론 빌드시간에는 영향을 주겠지만 미미하다 판단했어요.
&nbsp;

추가적으로 계층형 폴더 구조로 바꾸면서 바뀐 추가적인 함수들이 있는데요. 마찬가지로 path 모듈을 활용해 데이터를 수정해주었어요.
&nbsp;

자세한 소스는 해당 링크에 소스코드를 참고해주세요
