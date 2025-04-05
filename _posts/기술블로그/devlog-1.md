---
title: "기술블로그 게시물 폴더구조 개선하기"
excerpt: "폴더구조 계층화 하기"
coverImage: "/assets/blog/posts/devlog/devlog-1/cover.png"
date: "2025-03-07T00:30:00"
ogImage:
  url: "/assets/blog/posts/devlog/devlog-1/cover.png"
---

> 기술블로그를 리뉴얼하면서 게시물폴더의 폴더구조를 개선한 내용을 공유하려고 합니다.

## 문제상황

&nbsp;
저는 게시물을 마크다운 형식으로 작성한 후에 posts라는 루트폴더에 담아두고 Node.js의 fs, path 모듈을 활용해 원하는 게시물을 가져오고 있었습니다.

&nbsp;
아직 게시물이 많지 않았지만, posts폴더의 게시물들을 보면 정돈되지 않아 지저분하다고 느꼈고, 이후 게시물 관리가 어려워질 것이라는 생각이 들어 다음과 같이 폴더구조를 도메인별로 계층화 해야겠다고 생각했습니다.
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
&nbsp;

### 재귀를통한 구현

폴더구조를 계층화 하면서 상위폴더의 폴더명을 카테고리로 활용하면 직접 입력해서 발생할 수 있는 오타나 불일치 문제를 추가적으로 해결 할 수 있겠다 생각했고 해당기능을 Node.js의 path 모듈과 재귀호출을 통해 다음과 같이 구현했습니다.
&nbsp;

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

### 재귀방식의 장단점 비교

음? 재귀함수? 혹시라도 성능에 영향주는거 아니야? 라는 생각이 들어서 기존의 폴더구조방식과 계층형 폴더구조의 장단점을 비교해봤어요.
&nbsp;

기존폴더구조

장점

1. O(n) 시간복잡도 (n은파일수)
2. 단순한 구현

단점

1. 파일이 많아지면 원하는 게시물을 찾기 어려움
2. 카테고리관리를 수동으로 작성해야함, (마크다운에서 frontmatter를 통해 category값을 직접 지정 중)

&nbsp;

계층형 폴더 구조

장점

1. 논리적인 파일 구조화, 게시물 관리의 이점
2. 카테고리 자동화, 카테고리 오기입 문제 방지 (하위폴더=카테고리)

단점

1. O(n+d) 시간복잡도 (n은파일 수 , d는 하위폴더 수)
2. 재귀 호출로 인한 약간의 메모리 사용

&nbsp;
장단점을 비교해보니 시간복잡도가 기존의 n에서 n+d로 증가하였고 d의 증가비율은 n보다 적을것으로 예상되었습니다.
&nbsp;
해당 함수가 쓰이는 페이지는 SSG로 빌드타임에 정적파일로 만들어져 제공되기때문에 실제 사용자 경험에는 영향이 없고 빌드 시간에 영향을 주지만 매우 작게 줄것이라 판단했습니다. 파일관리의 편의성과 카테고리 자동화의 이점이 더 크다고 판단해 해당 폴더구조로 개선작업을 진행했습니다.

&nbsp;

## 마치며

되게 간단한 문제였지만 블로깅을 통해 글쓰는 능력을 기르고 사소한 부분부터 최적의 방법으로 사고하고 관리하는 능력을 기르고자 포스팅을 진행하고 있습니다.
