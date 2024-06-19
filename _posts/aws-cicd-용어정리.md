---
title: "AWS CI/CD 용어정리"
excerpt: "AWS로 CI/CD를 구축하며 배운 용어정리글 입니다."
coverImage: "/assets/blog/posts/aws-cicd-words/cover.png"
date: "2024-06-19T18:07:00"
category: "AWS"
ogImage:
  url: "/assets/blog/posts/aws-cicd-words/cover.png"
---

## 🤔 Bastion 호스트/서버

- Bastion : 수호자, 보루, 요새
- 인프라, 네트워크의 입구에서 허용된 사람만 출입할 수 있는 역할을 수행
- DB에는 중요한 정보들이 가득해 퍼블릭한 접근을 불허해야 함
- 하지만 개발시 로컬에서 접근해 간편하게 접근을 해야하는 경우 존재
- Bastion서버를 통해 특정 서버에서만 DB접근을 허용해 간편하게 사용

## 🤔 IAM (Identity and Access Management)

- 액세스 관리: AWS 서비스와 리소스에 대한 접근 권한을 관리
- 사용자 및 그룹: 사용자와 그룹을 생성하고, 각기 다른 권한을 할당합니다.
- 정책: 세밀한 권한 관리를 위해 JSON 형식의 정책을 사용하여 액세스를 제어합니다.
- 이를 통해 AWS 서비스와 리소스에 대한 올바른 권한을 가진 사용자 및 역할 설정

## 🤔 S3 (Simple Storage Service)

- AWS에서 제공하는 파일 저장 서비스
- Bucket 이라는 단위로 구성
- 스토리지: 파일, 이미지, 비디오 등을 저장할 수 있는 객체 스토리지
- 백업 및 복구: 데이터 안전하게 백업, 복구
- 호스팅: 정적 웹사이트 호스팅 지원
- Github Actions에서 빌드된 결과물(zip)이 업로드 되는 장소

## 🤔 CodeDeploy

- 자동 배포: 애플리케이션을 EC2, Lambda, 온프레미스 서버에 자동으로 배포
- 배포 전략: 블루/그린, 롤링 업데이트 등 다양한 배포 전략을 지원
- S3 버킷에 저장된 결과물(zip)을 다운로드하여 EC2 인스턴스에 배포

## 🤔 로드밸런서 (Elastic Load Balancing)

- 서버에 가해지는 부하를 분산해주는 장치, 기술
- 클라이언트와 서버풀(분산 네트워클르 구성하는 서버들의 그룹) 사이에 위치 한 대의 서버로 부하가 집중되지 않도록 트래픽을 관리. 이를 관리하는 2가지 방법 존재
- Scale-up: 서버 자체의 성능을 확장
- Scale-out: 기존 서버와 동일하거나 낮은 성능의 서버를 두 대 이상 증설하여 운영하는것을 의미, 로드밸런싱이 반드시 필요

## 🤔 오토 스케일링

- 클라우드의 유연성을 돋보이게 하는 핵심 기술
- CPU, 메모리, 디스크, 네트웍 트래픽과 같은 시스템 자원들의 메트릭 값을 모니터링 하여 서버 사이즈를 자동으로 조절
- 트래픽 급증시 자동으로 인스턴스 추가

## 📂 출처

- https://aws.amazon.com/ko/s3/faqs/
- [https://velog.io/@ghldjfldj/AWS-S3란-무엇인가](https://velog.io/@ghldjfldj/AWS-S3%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
- [https://velog.io/@moduri/로드밸런싱과-오토-스케일링](https://velog.io/@moduri/%EB%A1%9C%EB%93%9C%EB%B0%B8%EB%9F%B0%EC%8B%B1%EA%B3%BC-%EC%98%A4%ED%86%A0-%EC%8A%A4%EC%BC%80%EC%9D%BC%EB%A7%81)
