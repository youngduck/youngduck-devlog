---
title: "AWS S3, Github Action 으로 CI/CD 구축하기"
excerpt: "Github action yaml 작성방법 편"
coverImage: "/assets/blog/posts/aws-s3-githubaction/cover.png"
date: "2024-03-20"
ogImage:
  url: "/assets/blog/posts/aws-s3-githubaction/cover.png"
---

## 개발환경

> React, Vite, pnpm, aws s3, Iam, cloudfront

## 0. Github Action CI/CD 구축에앞서

yaml 키값 입력을 위해서는 AWS S3, Iam등을 미리 만들어 키를 발급해야한다.

자세한 방법은 [여기](https://youngduck-devlog.vercel.app/posts/aws-s3-deploy)를 참고해주세요

## 1. github action 파일 생성

![Untitled](/assets/blog/posts/aws-s3-githubaction/1.png)

- 루트폴더에 .github> workflows> front-build.yaml 파일 생성
- 파일명은 자유롭게 설정하셔도 됩니다.

## 2.yaml 파일 기본내용 작성하기

```yaml
# name 자유롭게 설정해주면 됩니다.
name: Front Deployment

# main 브랜치에 push가 되었을때!, develop등 다양한 브랜치로 설정가능
on:
  push:
    branches:
      - main

# jobs: 여기서부터 트리거에따라 실행되는 파트
# runs on: ubuntu 환경
jobs:
  build:
    name: Build and Deploy
    runs-on: ubuntu-latest
```

## 3. pnpm 빌드코드 작성하기

```yaml
# pnpm의 경우는 아래코드로 yaml 빌드를 설정해야합니다.
steps:
  - name: Checkout
    uses: actions/checkout@v3

  - name: Setup pnpm
    uses: pnpm/action-setup@v2
    with:
      version: 8

  - name: install dependencies and build
    run: pnpm install --frozen-lockfile && pnpm run build
```

## 4. AWS 연동코드 작성하기

```yaml
 - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_S3_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_S3_SECRET_ACCESS_KEY_ID }}
          aws-region: ap-northeast-2

      - name: Upload to S3
        env:
          BUCKET_NAME: ${{ secrets.AWS_S3_BUCKET_NAME}}
        run: |
          aws s3 sync \
            ./dist s3://$BUCKET_NAME

      - name: CloudFront Invalidation
        env:
          CLOUD_FRONT_ID: ${{ secrets.AWS_CLOUDFRONT_ID}}
        run: |
          aws cloudfront create-invalidation \
            --distribution-id $CLOUD_FRONT_ID --paths /*
```

## 5. Github env값 등록해주기

- Github 레포지토리 Settings 이동

- Security탭 - Actions 이동 - New repository secret 클릭

![Untitled](/assets/blog/posts/aws-s3-githubaction/2.png)

- 이후 아래의 aws 값들을 넣어줍니다.

> **AWS_S3_ACCESS_KEY_ID** : aws iam에서 발급받은 엑세스 키**AWS_S3_SECRET_ACCESS_KEY_ID** : aws iam 에서 발급받은 시크릿 키**AWS_S3_BUCKET_NAME** : S3 버킷 이름 <br> **AWS_CLOUDFRONT_ID** : cloudfront Id

## 5. 결과 코드

```jsx
name: Front Deployment

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build and Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: install dependencies and build
        run: pnpm install --frozen-lockfile && pnpm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_S3_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_S3_SECRET_ACCESS_KEY_ID }}
          aws-region: ap-northeast-2

      - name: Upload to S3
        env:
          BUCKET_NAME: ${{ secrets.AWS_S3_BUCKET_NAME}}
        run: |
          aws s3 sync \
            ./dist s3://$BUCKET_NAME

      - name: CloudFront Invalidation
        env:
          CLOUD_FRONT_ID: ${{ secrets.AWS_CLOUDFRONT_ID}}
        run: |
          aws cloudfront create-invalidation \
            --distribution-id $CLOUD_FRONT_ID --paths /*
```

## 출처

- [pnpm yaml 작성법](https://jonghoonpark.com/2023/08/26/firebase-hosting-deploy-via-github-aciton-with-pnpm)
- [React 프로젝트 Github action으로 cicd 구축하기](https://s0ojin.tistory.com/48)
