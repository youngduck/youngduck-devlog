---
title: "VSCode 프론트엔드 세팅추천 - 1"
excerpt: "프론트엔드 개발에 있어 설치하면 좋을만한 방법을 알려주는 간단한 정리글입니다."
coverImage: "/assets/blog/posts/vscode-setting-1/cover.png"
date: "2024-04-22T16:35:00"
ogImage:
  url: "/assets/blog/posts/vscode-setting-1/cover.png"
---

> **VScode**를 사용하며 습관처럼 사용하는 **단축키**와 개발 생산성에 도움을 주는 **꿀팁**을 정리해볼까 합니다.

## 새파일, 새폴더 단축키 설정하기

> **IntelliJ**처럼 단축키(**ctrl+shift+n**, **ctril+n**)를 통해 새파일 새폴더 만들기

### shortcut 등록하기

Command Pallet를 열고(Ctrl + shift + p ) > Open Keyboard shortcut(JSON)에 해당 코드 입력

```jsx
[
  { key: "ctrl+n", command: "explorer.newFile", when: "!editorFocus" },

  { key: "ctrl+shift+n", command: "explorer.newFolder", when: "!editorFocus" },
];
```

## Reactjs code snippets

> **rsc** 단축키를 통해 **React 컴포넌트**를 쉽게 만들 수 있습니다.

VSCode 좌측의 Marketplace를 선택하고 Reactjs code snippets 검색, (제작자,charalampos karypidis) 설치

### Reactjs code snippets 단축키 목록

| 단축키 | 설명                                                     |
| ------ | -------------------------------------------------------- |
| rcc    | 클래스 컴포넌트 생성                                     |
| rrc    | 클래스 컴포넌트와 react-redux를 연결해서 생성            |
| rccp   | 클래스 컴포넌트와 propTypes을 생성                       |
| rcfc   | 클래스 컴포넌트와 모든 라이프사이클 메소드 포함해서 생성 |
| rwwd   | import 없는 클래스 컴포넌트 생성                         |
| rsc    | 화살표 함수형 컴포넌트 생성                              |
| rsf    | 함수형 컴포넌트 생성                                     |

## Thunder Client

> postman없이 **api통신**을 테스트할 수 있습니다.

저의 경우는 postman을 따로 띄어서 api 통신을 테스트 하기보다는 thunder client를 통해 vscode 자체에서 api 호출을 테스트하는 편입니다.

![Untitled](/assets/blog/posts/vscode-setting-1/1.png)

2023-08-18일부로 **유료화**가 되었다고 합니다. (혼자 테스트 하기에는 아직 유용할 것 같습니다.)

## Git bash 기본터미널 설정

### Git 설치

Source Control 탭의 Download Git for windows를 클릭하여 git을 설치해 줍니다.

![Untitled](/assets/blog/posts/vscode-setting-1/2.png)

운영체제 맞는 Setup을 설치해 줍니다.

![Untitled](/assets/blog/posts/vscode-setting-1/3.png)

Git 설치 완료후 Git Bash도 설치하겠냐는 질문에 체크 해주면 세팅끝!

### Git bash 기본 터미널 설정

![Untitled](/assets/blog/posts/vscode-setting-1/4.png)

1. 설정 창 열기: Ctrl + ,
2. terminal.integrated.defaultprofile.windows 입력 후 Windows 기본 터미널 프로필을 Git Bash로 설정
3. VScode 재부팅시 설정 완료
