---
title: "네트워크 2편"
excerpt: "네트워크 대역폭, TCP/UDP, 에 대해 공부합니다."
coverImage: "/assets/blog/posts/cs-study/cover.png"
date: "2024-10-07"
category: "Computer Science"
ogImage:
  url: "/assets/blog/posts/cs-study/cover.png"
---

## 대역폭 Bandwidth

> 공학에서는 대역폭을 특정 기능을 수행 할 수 있는 주파수 범위의 폭으로 정의한다. 신호 주파수의 높고 낮음과는 관계가 없다.
> 네트워크에서 대역폭이란 단위시간당 전송할 수 있는 데이터의 최대 용량을 의미한다.단위시간당 전송 용량이라는 용어에 많은 사람들이 네트워크 속도와 연관지어 설명한다. 네트워크 속도가 대역폭값에 근접할 경우 대역폭을 늘리면 속도가 빨라질 가능성이 있으나 무조건적인 조건은 아니다. 데이터 처리량과 네트워크 성능, 속도에 큰 영향을 미치지만 실제로 대역폭은 용량Capacity과 더 밀접한 관계를 가지고 있다.

1. 단위 [bps]

- bps bits per second 초당 '비트'수
  - 일부 BPS 혹은 Bps 등으로 표기하는 경우 잘못된 표기
  - BPS, Bps는 Bytes per second

2. 유/무선 인터넷에서 대역폭

- 유선 인터넷에서 주파수 대역폭
  - 인터넷 회선 약정시 500M급 100M급 인터넷이라고 표현하는데 이는 데이터 전송 대역폭을 표현
  - 10Gbit 이더넷을 사용하더라도 네트워크 상황에 따라 성능이 저하될 가능성이 있다.
- 무선 인터넷에서 주파수 대역폭
  - 흔히 사용하는 Wifi는 통상 2.4GHz(2.4~2.462GHz), 5GHz(5.180~5.850GHz) 두가지 주파수를 사용한다.
  - 간혹 미디어나 일상에서 2.4GHz 대역폭, 5GHz 대역폭이라고 표현하는데 이는 틀린 표현

3. 네트워크 처리량과 대역폭 관계

- 처리량은 단위시간당 실제로 처리되는 데이터의 양을 나타내고 대역폭 용량을 초과할 수 없다.
  - 물탱크에서 수도까지 펌프를 통해 물이 흐르는 파이프가 있다고 가정했을때 흐르는 물의 양은 처리량, 파이프를 통해 최대로 흐를 수 있는 물의 양이 대역폭
  - 파이프를 100% 다 사용하는 경우 파이프 내경이 클수록 더 많은 물이 흐르지만 언제나 100% 다 사용하지 못하는것과 같은 것

4. 대역폭에 따른 병목현상 발생 가능성

- 100의 네트워크 출력을 가진 노드가 대역폭이 1인 회선을 이용하는경우 최대 출력으로 데이터 전송 하는 경우
- 다수 노드로부터 한 노드에 집중되는 트래픽이 회선 대역폭을 초과하는 경우 등

## 대역폭 예상질문

- 대역폭이 낭비되는 경우, 원인에는 어떤게 있을까?
  - 주파수 분할 다중화기를 사용하는경우 일정한 대역폭 안에서 연결된 노드별로 대역폭을 할당한다. 이 때 신호 간섭을 예방하기위해 대역별 마진을 두는데 이로인한 대역폭 손실이 발생한다. ex) 라디오, TV
  - 다만 최근 IT 기기들은 보통 시분할방식을 기반으로 채널을 나눈다. 이는 대역폭 낭비가 아닌 점유 시간 손실로 해석해야함
- 모바일/웹 사용자 인증을 위해 사용되는 JWT 토큰의 길이가 길어질수록 매 통신마다 큰 데이터를 주고 받아야하므로 대역폭의 낭비가 심화될 수 있다.

## TCP / UDP 란?

> 전송계층에서 사용하는 프로토콜

## 참고자료

- https://github.com/devSquad-study/2023-CS-Study/blob/main/Network/network_bandwidth.md