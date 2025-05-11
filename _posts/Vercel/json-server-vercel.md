---
title: "Vercel에서 목서버 사용하기"
excerpt: "json-server를 배포단에서도 사용할 수 있는 유용한 템플릿을 소개합니다."
coverImage: "/assets/blog/posts/json-server-vercel/cover.jpg"
date: "2024-03-19"
ogImage:
  url: "/assets/blog/posts/json-server-vercel/cover.jpg"
---

## 다룰내용

> json-server를 배포단에서도 사용할 수 있는 유용한 템플릿을 소개합니다.

## 적용방법

![](/assets/blog/posts/json-server-vercel/1.png)

- https://github.com/kitloong/json-server-vercel
- 해당 github 템플릿 소스 클론, use this template 클릭
- db.json 부분 자신이 쓰는 db.json으로 교체
- Vercel 로그인
- Add new New Project

![](/assets/blog/posts/json-server-vercel/2.png)

- json-server-vercel 레포지토리 등록
- [example](https://json-server-in.vercel.app/)

### **주의사항**

- json-server-vercel 사용시 return값이 달라지기 때문에 주의할 필요가 있다.
  ![](/assets/blog/posts/json-server-vercel/3.png)
  ![](/assets/blog/posts/json-server-vercel/4.png)
