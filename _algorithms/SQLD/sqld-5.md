---
title: "[SQLD] 5장. 관리구문"
excerpt: "DML, TCL, DDL, DCL"
coverImage: "/assets/blog/posts/mysql/cover.png"
date: "2026-08-03T:12:00"
ogImage:
  url: "/assets/blog/posts/mysql/cover.png"
---

## 5.1 DML

- Data Manipulation Language, 데이터 조작 언어
- 테이블의 데이터를 조회/입력/수정/삭제하는 명령어
- COMMIT 전에는 ROLLBACK으로 되돌릴 수 있음

| 명령어 | 설명                       |
| ------ | -------------------------- |
| SELECT | 데이터 조회                |
| INSERT | 데이터 입력                |
| UPDATE | 데이터 수정                |
| DELETE | 데이터 삭제                |
| MERGE  | 조건에 따라 입력 또는 수정 |

### 5.1.1 INSERT

- 테이블에 새로운 행을 추가하는 명령어
- 컬럼 목록을 생략하면 테이블 정의 순서대로 모든 컬럼에 값을 입력해야 함

```sql
INSERT INTO emp (empno, ename, sal)
VALUES (1001, '김영덕', 3000);
```

### 5.1.2 UPDATE

- 기존 행의 컬럼 값을 수정하는 명령어
- WHERE절을 생략하면 테이블의 모든 행이 수정되므로 주의

```sql
UPDATE emp
   SET sal = 3500
 WHERE empno = 1001;
```

### 5.1.3 DELETE

- 테이블의 행을 삭제하는 명령어
- WHERE절을 생략하면 모든 행이 삭제됨 (테이블 구조는 남음)
- TRUNCATE와 달리 롤백이 가능하고, 조건별 삭제가 가능

```sql
DELETE FROM emp
 WHERE empno = 1001;
```

### 5.1.4 MERGE

- 하나의 문장으로 조건에 따라 INSERT와 UPDATE(또는 DELETE)를 함께 수행
- 대상 테이블에 일치하는 행이 있으면 UPDATE, 없으면 INSERT (UPSERT)

```sql
MERGE INTO emp e
USING new_emp n
   ON (e.empno = n.empno)
WHEN MATCHED THEN
     UPDATE SET e.sal = n.sal
WHEN NOT MATCHED THEN
     INSERT (empno, ename, sal)
     VALUES (n.empno, n.ename, n.sal);
```

## 5.2 TCL

- Transaction Control Language, 트랜잭션 제어 언어
- 트랜잭션 : 데이터베이스의 논리적 연산 단위로, 더 이상 나눌 수 없는 하나의 작업 묶음
- COMMIT, ROLLBACK, SAVEPOINT

### 5.2.1 트랜잭션의 특징

- 트랜잭션의 4가지 특성, **ACID**

| 특성                | 설명                                                              |
| ------------------- | ----------------------------------------------------------------- |
| 원자성(Atomicity)   | 트랜잭션의 연산은 모두 반영되거나 전혀 반영되지 않아야 함         |
| 일관성(Consistency) | 트랜잭션 수행 전후로 데이터베이스가 일관된 상태를 유지해야 함     |
| 고립성(Isolation)   | 실행 중인 트랜잭션의 중간 결과가 다른 트랜잭션에 보이지 않아야 함 |
| 지속성(Durability)  | 커밋된 트랜잭션의 결과는 영구적으로 반영되어야 함                 |

### 5.2.2 COMMIT

- 트랜잭션에서 수행한 변경 내용을 데이터베이스에 영구적으로 반영
- 커밋 이후에는 ROLLBACK으로 되돌릴 수 없음

### 5.2.3 ROLLBACK

- 트랜잭션에서 수행한 변경 내용을 취소하고 마지막 COMMIT 시점 상태로 되돌림
- SAVEPOINT를 지정하면 특정 지점까지만 되돌릴 수 있음

### 5.2.4 SAVEPOINT

- 트랜잭션 내에 되돌아갈 수 있는 중간 지점을 지정하는 명령어
- ROLLBACK TO 저장점명으로 해당 지점 이후의 작업만 취소 가능

```sql
SAVEPOINT sp1;
DELETE FROM emp WHERE empno = 1001;
ROLLBACK TO sp1;   -- DELETE만 취소, sp1 이전 작업은 유지
```

## 5.3 DDL

- Data Definition Language, 데이터 정의 언어
- 테이블 등 객체의 구조(스키마)를 정의/변경/삭제하는 명령어
- 실행 즉시 자동 커밋(Auto Commit)되어 롤백이 불가능

| 명령어   | 설명                             |
| -------- | -------------------------------- |
| CREATE   | 객체 생성                        |
| ALTER    | 객체 구조 변경                   |
| DROP     | 객체 삭제                        |
| TRUNCATE | 테이블의 모든 행 삭제(구조 유지) |
| RENAME   | 객체 이름 변경                   |

### 5.3.1 CREATE

- 테이블 등 데이터베이스 객체를 생성하는 명령어
- 컬럼명, 데이터 타입, 제약조건 등을 정의

```sql
CREATE TABLE emp (
    empno  NUMBER PRIMARY KEY,
    ename  VARCHAR2(20) NOT NULL,
    sal    NUMBER DEFAULT 0
);
```

### 5.3.2 ALTER

- 이미 생성된 객체의 구조를 변경하는 명령어

| 구분          | 설명                           |
| ------------- | ------------------------------ |
| ADD           | 컬럼 또는 제약조건 추가        |
| MODIFY        | 컬럼의 데이터 타입/기본값 변경 |
| DROP COLUMN   | 컬럼 삭제                      |
| RENAME COLUMN | 컬럼 이름 변경                 |

```sql
ALTER TABLE emp ADD (hiredate DATE);
ALTER TABLE emp MODIFY (ename VARCHAR2(30));
```

## 5.4 DCL

- Data Control Language, 데이터 제어 언어
- 사용자 생성 및 접근 권한 등 보안과 제어를 다루는 명령어

### 5.4.1 USER 관련 명령어

- 데이터베이스에 접속하는 사용자 계정을 생성/변경/삭제

| 명령어      | 설명                        |
| ----------- | --------------------------- |
| CREATE USER | 사용자 계정 생성            |
| ALTER USER  | 계정 정보 변경(비밀번호 등) |
| DROP USER   | 사용자 계정 삭제            |

```sql
CREATE USER ydkim IDENTIFIED BY password;
```

### 5.4.2 권한 관련 명령어

- 사용자에게 특정 작업을 수행할 권한을 부여하거나 회수

| 명령어 | 설명      |
| ------ | --------- |
| GRANT  | 권한 부여 |
| REVOKE | 권한 회수 |

```sql
GRANT SELECT, INSERT ON emp TO ydkim;
REVOKE INSERT ON emp FROM ydkim;
```

### 5.4.3 ROLE 관련 명령어

- ROLE : 여러 권한을 하나로 묶은 집합으로, 권한 관리를 편리하게 해줌
- 사용자마다 권한을 일일이 부여하는 대신 ROLE 단위로 부여/회수 가능

| 명령어      | 설명                                |
| ----------- | ----------------------------------- |
| CREATE ROLE | 롤 생성                             |
| GRANT       | 롤에 권한 부여 / 사용자에게 롤 부여 |
| REVOKE      | 롤 또는 권한 회수                   |
| DROP ROLE   | 롤 삭제                             |

```sql
CREATE ROLE dev_role;
GRANT SELECT, INSERT ON emp TO dev_role;
GRANT dev_role TO ydkim;
```
