import { ResumeData } from "./types";

export const resume2026: ResumeData = {
  name: "김영덕",
  headline: "주도적으로 프론트엔드 생태계를 개선하는 개발자",

  strongPoints: [
    "누적사용자 210K 설문 + 동시접속 1K 웨비나 유지보수 / 리뉴얼 / 성능개선 경험",
    "사내 디자인 시스템 주도 제안·구축 (React 디자인 패턴을 활용한 30+ 컴포넌트)",
    "주도적인 사내 프론트엔드 생태계 구축 경험",
  ],

  profile: [
    { label: "Github", value: "github.com/youngduck", href: "https://github.com/youngduck" },
    { label: "학력", value: "가톨릭대 미디어/컴퓨터공학 복수전공" },
    { label: "학점", value: "3.78 / 4.5 (전공학점 4.11)" },
  ],

  career: [
    { company: "엘리오앤컴퍼니", role: "IT본부 사원 | 풀스택 개발", period: "2024.04 ~ 재직중" },
    { company: "스튜디오얌얌", role: "개발팀 인턴 | 프론트엔드 개발", period: "2023.08 ~ 2023.12" },
  ],

  certificates: [
    { name: "정보처리기사", date: "2023.09" },
    { name: "SQLD", date: "2026.09" },
  ],

  skills: [
    {
      category: "FrontEnd",
      items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "React Query", "Zustand", "Storybook", "Vitest", "GSAP"],
    },
    {
      category: "BackEnd",
      items: ["Spring Boot", "Java", "PostgreSQL", "MySQL", "Supabase", "AWS"],
    },
  ],

  sideProjects: [
    { name: "YD-Tech", desc: "포스팅 40+ 기술블로그" },
    { name: "보돌코 스코어드", desc: "실시간 축구평점 입력 서비스" },
    { name: "@youngduck/yd-ui", desc: "디자인 시스템기반 UI라이브러리" },
  ],

  activities: [
    { name: "달레 리트코드 스터디 5기", type: "스터디", desc: "알고리즘, 자료구조", period: "2025.07 ~ 2025.10" },
    { name: "IT'S TIME 3, 4기", type: "동아리", desc: "프론트엔드(React), 운영진", period: "2023.03 ~ 2024.02" },
    { name: "UMC 3기", type: "동아리", desc: "백엔드(Node)", period: "2022.08 ~ 2023.02" },
  ],

  postings: [
    { topic: "디자인 시스템", title: "사내 디자인 시스템 구축 회고", href: "https://youngduck-devlog.vercel.app/blog/posts/ds-2" },
    { topic: "성능 최적화", title: "번들링과 압축 전송 톺아보기", href: "https://youngduck-devlog.vercel.app/blog/posts/devlog-6" },
    { topic: "UX 개선", title: "8,800KB 웹폰트 FOUT 해결도전기", href: "https://youngduck-devlog.vercel.app/blog/posts/react-3" },
  ],

  intro:
    "210K 사용자 설문 시스템과 실시간 동시접속 1,000명 웨비나 서비스를 운영하며 성능 최적화와 사용자 경험 개선을 경험한 프론트엔드 개발자입니다. 사내 디자인 시스템 도입을 직접 제안하고 구축했으며, CRA→Vite 전환·테스트 코드 도입 등 프론트엔드 개발 환경을 주도적으로 개선해왔습니다.",

  experiences: [
    {
      company: "엘리오앤컴퍼니",
      role: "IT본부 사원",
      period: "2024.04 ~ 재직중",
      achievements: [
        {
          title: "사내 디자인 시스템 도입 및 구축",
          lines: [
            "문제: 디자인 표준안 부재 → 프로젝트마다 컴포넌트 반복 구현, 개발자별 구현 방식 상이로 UX 불일치 및 병목 발생",
            "제안: 업무 최적화 회의에서 디자인 시스템 도입 직접 제안 → 대표 승인",
            "구축: 브랜드팀 리소스 부족 → 기존 시스템 레퍼런스 기반 1인 주도 설계·개발·문서화, 브랜드팀 피드백을 통한 협업",
            "결과: 30+ 공통 컴포넌트, 디자이너·개발자 간 UI/UX 소통 중앙화, 프로젝트별 공통 컴포넌트 구축 병목 제거",
          ],
        },
        {
          title: "누적사용자 210K 설문 시스템 프론트엔드 리뉴얼",
          lines: [
            "문제 : 리뉴얼 배포 후 설문 완료율 등 핵심 지표 전월 대비 하락",
            "해결 : 중장년층 사용자가 자동 문항 전환 UX를 이해하지 못한 것이 원인 → 전환 기능 롤백",
            "결과 : 설문 완료율 회복, 이후 사용자 데이터 기반 UX 의사결정",
            "문제 : 3G/저속 환경에서 답변 제출 버튼 연속 클릭 시 동일 API 중복 호출",
            "해결 : flushSync활용 버튼 즉시 비활성화 + 분산된 데이터 갱신 로직을 공통 함수 1곳으로 응집",
            "결과: 중복 제출 근본 해결, 데이터 갱신 로직 한 곳에 응집",
          ],
        },
        {
          title: "병원 경영관리 BI 시스템 .NET → NextJS 마이그레이션",
          lines: [
            "손익·인건비·KPI·수익예측·실시간 지표 등 50+ 개 화면, 컴포넌트 마이그레이션",
            "Husky, Claude Code·Playwright를 활용 AI·e2e 테스트 기반 마이그레이션 회귀 검증 자동화",
          ],
        },
      ],
    },
    {
      company: "스튜디오얌얌",
      role: "개발팀 인턴",
      period: "2023.08 ~ 2023.12",
      achievements: [
        {
          title: "삼성전자 비즈니스 웨비나 1,2차 개발 및 개선(동시접속 300→1,000명)",
          lines: [
            "문제: 1차 웨비나 RUM 데이터에서 동영상이 채팅보다 1초 이상 늦게 렌더링",
            "해결: 기존 vs 경량 비디오 라이브러리 비교 분석 후 교체",
            "결과: 평균 렌더링 시간 59.4% 단축 (Datadog RUM 측정)",
            "문제: iOS 환경에서 한글 채팅 입력 시 중복 전송 발생",
            "해결: isComposing/debounce 대안 비교 후, 브라우저가 조합 완료를 보장하는 웹 표준(form onSubmit) 선택",
            "결과: 모든 환경(iOS, Android, PC)에서 중복 전송 완전 해결",
            "성과: 2차 웨비나 1,000명 안정 운영, 인턴 종료 후 계약 연장 제안, 추가 웨비나 계약 확보에 기여",
          ],
        },
      ],
    },
  ],
};
