---
title: "AWS S3로 React배포하기"
excerpt: "Github action CI/CD구축을 위한 빌드업"
coverImage: "/assets/blog/posts/aws-s3-deploy/cover.jpg"
date: "2024-03-17"
ogImage:
  url: "/assets/blog/posts/aws-s3-deploy/cover.jpg"
---

## 0. AWS S3로 배포하는데 사용한것

> IAM, S3, CloudFront, Route 53, 가비아

### IAM

- Identity and Access Management로 AWS 리소스에 대한 엑세스를 안전하게 제어할 수 있는 웹 서비스
- 리소스를 사용하도록 인증 및 권한 부여된 대상을 제어

### S3

- Simple Storage Service(S3)는 최고의 확장성, 데이터 가용성, 보안 및 성능을 제공하는 객체 스토리지 서비스
- 데이터를 버킷 내의 객체(해당 파일을 설명하는 모든 메타데이터)로 저장하는 객체 스토리지 서비스

### CloudFront

- .html, .css, .js 및 이미지 파일과 같은 정적 및 동적 웹 콘텐츠를 사용자에게 더 빨리 배포하도록 지원하는 웹 서비스
- CDN(Content Delivery Network or Content Distribution Network) : 콘텐츠를 효율적으로 전달하기 위해 여러 노드를 가진 네트워크에 데이터를 저장해서 제공하는 시스템
- Edge Location이라고 하는 데이터 센터의 전 세계 네트워크를 통해 콘텐츠를 제공
- 중간 캐시 서버에서 콘텐츠 전달 - 캐싱을 통해 사용자에게 더 빠른 전송 속도를 제공 (서버 부하 감소)
- 손쉽게 http 요청을 https로 리다이렉션 가능

### Route 53

• 도메인 등록, DNS 라우팅, 상태 확인 등을 실행할 수 있는 Domain Name System (DNS) 웹 서비스

### 가비아

• 도메인 구매 사이트

## 1. IAM 사용자 생성

1. 사용자생성 - 이름입력

![Untitled](/assets/blog/posts/aws-s3-deploy/1.png)

1. 권한정책 - AmazonS3FullAccess, CloudFrontFullAccess 체크 - 생성된 csv 다운로드

![Untitled](/assets/blog/posts/aws-s3-deploy/2.png)

## 2. S3 버킷 만들기

1. 버킷만들기 - 이름입력 - ACL활성화 - 모든퍼블릭 엑세스차단 체크버튼 해제! - 현재설정으로 인해~ 부분만 체크 - 버킷만들기

![Untitled](/assets/blog/posts/aws-s3-deploy/3.png)

![Untitled](/assets/blog/posts/aws-s3-deploy/4.png)

1. 생성한 버킷의 속성탭으로 이동

![Untitled](/assets/blog/posts/aws-s3-deploy/5.png)

정적웹사이트 호스팅탭 - 편집 이동 - 활성화 체크 - 인덱스문서, 오류문서 index.html로 설정해주고 저장.

1. 생성한 버킷의 권한탭으로 이동

![Untitled](/assets/blog/posts/aws-s3-deploy/6.png)

버킷정책 탭 - 편집 - 정책 생성기

![Untitled](/assets/blog/posts/aws-s3-deploy/7.png)

Step 1 : S3 Bucket Policy 체크

Step 2 : Effect = Allow, Principal = _, Actions = GetObject , ARN = 정책탭의 버킷 ARN을 그대로 가져와서 /_ 를 붙여줍니다

![Untitled](/assets/blog/posts/aws-s3-deploy/8.png)

generate policy후 생성된 json 복사 - 버킷 정책탭에가서 붙여넣기

![Untitled](/assets/blog/posts/aws-s3-deploy/9.png)

여기서 해당 버킷에들어가서 빌드파일 업로드 해도됩니다.

## 3. S3에 코드 업로드

AWS CLI사용을 통한 간편업로드

https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/getting-started-install.html
문서를 참고해 운영체제에 맞게 AWS CLI설치

AWS CLI 설치가 완료되면 터미널에 다음과 같은 명령어를 입력한다

aws configure --profile [IAM 사용자 이름]

Key ID : IAM 사용자 추가할 때 다운받았던 CSV 파일의 Access key ID

Access Key : IAM 사용자 추가할 때 다운받았던 CSV 파일의 Secret access key

region name : ap-northeast-2

output format : json

입력하면 사용자 설정 완료!!

이후 아래명령어를 입력하면 버킷 배포완료

aws s3 sync ./build s3://[S3 버킷 이름] --profile=[IAM 사용자 이름]

![Untitled](/assets/blog/posts/aws-s3-deploy/10.png)

## 4. CloudFront 설정

![Untitled](/assets/blog/posts/aws-s3-deploy/11.png)

Origin domain = 만든 버킷 도메인 입력

원본 액세스 = Legacy access identities 체크, 원본 OAI가 없으면 생성해주고 선택

뷰어 프로토콜 정책 = Redirect HTTP to HTTPS 체크

도메인설정 Route53으로 해줄예정이므로 CloudFront 킵해두고 Route53으로 이동

## 4. Route53 설정

![Untitled](/assets/blog/posts/aws-s3-deploy/12.png)

![Untitled](/assets/blog/posts/aws-s3-deploy/13.png)

호스팅 영역생성 - 도메인이름(저는 가비아에서 구매한 도메인입력했습니다)

## 5. 다시 CloudFront 이동

대체 도메인에 도메인 입력 - 인증서요청(aws certificate manager로 이동합니다)

![Untitled](/assets/blog/posts/aws-s3-deploy/14.png)

도메인입력 - 요청

![Untitled](/assets/blog/posts/aws-s3-deploy/15.png)

검증대기중인 도메인탭에서 Route 53에서 레코드 생성을 선택에서 CNAME생성해야한다

![Untitled](/assets/blog/posts/aws-s3-deploy/16.png)

30분정도 기다리면 검증대기중에서 발급됨으로 변경된다고 한다.(1시간이지나도 안되는 상황 - [가비아 도메인 연결안해놓고 삽질…](https://velog.io/@whljm1003/AWS-S3%EB%B0%B0%ED%8F%AC%EB%B6%80%ED%84%B0-HTTPS%EC%A0%81%EC%9A%A9%EA%B9%8C%EC%A7%80-2))

발급완료 이후 - CloudFront로 이동해서 SSL인증서 선택 - 기본값 루트객체 index.html 설정 후 배포

![Untitled](/assets/blog/posts/aws-s3-deploy/17.png)

cloudFront 무효화탭 이동후 무효화 생성 경로 /\* 등록

## 6. Route53 A레코드 추가

CloudFront 주소와 Route 53 도메인 연결 해주기위해 A레코드를 추가해야한다고한다

레코드 유형 A
트래픽 라우팅 대상 CloudFront
선택후 레코드생성.

결과물
https://ht-global-test.store/

## 참고자료

- [https://velog.io/@krkorklo58/AWS-S3로-React-배포하기#3-s3에-코드-업로드](https://velog.io/@krkorklo58/AWS-S3%EB%A1%9C-React-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0#3-s3%EC%97%90-%EC%BD%94%EB%93%9C-%EC%97%85%EB%A1%9C%EB%93%9C)
- [https://velog.io/@whljm1003/AWS-S3배포부터-HTTPS적용까지-2](https://velog.io/@whljm1003/AWS-S3%EB%B0%B0%ED%8F%AC%EB%B6%80%ED%84%B0-HTTPS%EC%A0%81%EC%9A%A9%EA%B9%8C%EC%A7%80-2)
