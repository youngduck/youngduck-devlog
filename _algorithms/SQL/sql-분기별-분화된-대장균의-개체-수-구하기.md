---
title: "[프로그래머스 LV.2] - SQL: 분기별 분화된 대장균의 개체 수 구하기"
excerpt: "분기별 분화된 대장균의 개체 수 구하기 문제풀이"
coverImage: "/assets/blog/posts/mysql/cover.png"
date: "2024-06-07T10:25:00"
ogImage:
  url: "/assets/blog/posts/db/cover.png"
---

## 문제

### 문제 설명

대장균들은 일정 주기로 분화하며, 분화를 시작한 개체를 부모 개체, 분화가 되어 나온 개체를 자식 개체라고 합니다.

다음은 실험실에서 배양한 대장균들의 정보를 담은 **ECOLI_DATA** 테이블입니다. **ECOLI_DATA** 테이블의 구조는 다음과 같으며, **ID**, **PARENT_ID**, **SIZE_OF_COLONY**, **DIFFERENTIATION_DATE**, **GENOTYPE** 은 각각 대장균 개체의 ID, 부모 개체의 ID, 개체의 크기, 분화되어 나온 날짜, 개체의 형질을 나타냅니다.

| Column name          | Type    | Nullable |
| -------------------- | ------- | -------- |
| ID                   | INTEGER | FALSE    |
| PARENT_ID            | INTEGER | TRUE     |
| SIZE_OF_COLONY       | INTEGER | FALSE    |
| DIFFERENTIATION_DATE | DATE    | FALSE    |
| GENOTYPE             | INTEGER | FALSE    |

최초의 대장균 개체의 **PARENT_ID** 는 NULL 값입니다.

---

### 문제

각 분기(**QUARTER**)별 분화된 대장균의 개체의 총 수(**ECOLI_COUNT**)를 출력하는 SQL 문을 작성해주세요. 이때 각 분기에는 'Q' 를 붙이고 분기에 대해 오름차순으로 정렬해주세요. 대장균 개체가 분화되지 않은 분기는 없습니다.

---

### 예시

예를 들어 **ECOLI_DATA** 테이블이 다음과 같다면

| ID  | PARENT_ID | SIZE_OF_COLONY | DIFFERENTIATION_DATE | GENOTYPE |
| --- | --------- | -------------- | -------------------- | -------- |
| 1   | NULL      | 10             | 2019/01/01           | 5        |
| 2   | NULL      | 2              | 2019/05/01           | 3        |
| 3   | 1         | 100            | 2020/01/01           | 4        |
| 4   | 2         | 17             | 2022/04/01           | 4        |
| 5   | 2         | 10             | 2020/09/01           | 6        |
| 6   | 4         | 101            | 2021/12/01           | 22       |

각 분기별로 분화된 대장균 개체는 다음과 같습니다.

1분기 : ID 1, ID 3

2분기 : ID 2, ID 4

3분기 : ID 5

4분기 : ID 6

따라서 결과는 다음과 같아야 합니다

| QUARTER | ECOLI_COUNT |
| ------- | ----------- |
| 1Q      | 2           |
| 2Q      | 2           |
| 3Q      | 1           |
| 4Q      | 1           |

## MySQL 정답1

```sql
SELECT CASE WHEN MONTH(DIFFERENTIATION_DATE) <= 3 THEN '1Q'
            WHEN MONTH(DIFFERENTIATION_DATE) <= 6 THEN '2Q'
            WHEN MONTH(DIFFERENTIATION_DATE) <= 9 THEN '3Q'
            ELSE '4Q'
            END AS QUARTER
     , COUNT(*) AS ECOLI_COUNT
FROM ECOLI_DATA
GROUP BY QUARTER
ORDER BY QUARTER
```

## MySQL 정답2

```sql
SELECT CONCAT(CEIL(MONTH(DIFFERENTIATION_DATE)/3),'Q') AS QUARTER
     , COUNT(*) AS ECOLI_COUNT
FROM ECOLI_DATA
GROUP BY QUARTER
ORDER BY QUARTER
```

## 알게된것

- CASE문, CONCAT과 CEIL을 활용한 두가지 처리방식
- COUNT(\*), COUNT(1), COUNT(컬럼), COUNT(DISTINCT 컬럼) 차이
  - COUNT(\*), COUNT(1) : 두 명령문 모두 동일한 방식으로 작동, 성능상 차이없음, 가독성을 위해 \* 권장
  - COUNT(컬럼) : 컬럼이 NULL이 아닌 값을 제외하고 카운트
  - COUNT(DISTINCT 컬럼) : 컬럼이 NULL이아닌 UNIQUE(고유)한 값만 카운트
- 날짜와 관련된 데이터추출 함수
  - YEAR(컬럼명) = ‘2024’, MONTH(컬럼명) = ‘12’, DAYOFMONTH(컬럼명) = ‘31’
  - DATEDIFF(A,B) : A날짜에서 B날짜를 뺀 값 반환
  - CURDATE() : 오늘 날짜를 추출 해준다

## 출처

[**[SQL] 날짜와 관련된 데이터추출(YEAR,MONTH,DAYOFMONTH)**](https://marketinga.tistory.com/13)

[**[Database] count(\*) count(1) 어떤 차이가 있을까?**](https://annajang.tistory.com/54)
