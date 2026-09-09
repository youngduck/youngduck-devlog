import { resume2026 } from "../../resume/_data/resume-2026";

const L = "/assets/resume/logos";

export interface PfSideProject {
  name: string;
  desc: string;
  href: string;
  logo: string;
  logoW: number;
  logoH: number;
}

export const portfolio2026 = {
  name: "김영덕",
  title: "Portfolio",
  subtitle: [
    "사용자와 개발자 모두를 위한 경험을 설계하는",
    "2년 6개월 경력의 개발자 김영덕입니다",
  ],
  contact: {
    phone: "010-3899-5839",
    email: "dudejr5839@naver.com",
  },

  // 포트폴리오 전용 강점(이력서와 문구 다름)
  strongPoints: [
    "누적사용자 210K 설문 + 동시접속 1K 웨비나 유지보수 / 리뉴얼 / 성능개선 경험",
    "디자인 시스템 도입 제안 →  디자인패턴, 오픈소스 기반 30여개 컴포넌트 구축 → 실사용 피드백 기반 유지보수",
    "테스트 자동화, AI 코드리뷰, 디자인 시스템 AI 연동 등 프론트엔드 생태계 주도적으로 구축",
  ],

  // 이력서와 동일한 내용 재사용
  profile: resume2026.profile,
  career: resume2026.career,
  activities: resume2026.activities,

  // 정보처리기사 + SQLD (이력서와 동일)
  certificates: resume2026.certificates,

  sideProjects: [
    {
      name: "@youngduck/yd-ui",
      desc: "디자인 시스템기반 UI라이브러리",
      href: "https://www.npmjs.com/package/@youngduck/yd-ui",
      logo: `${L}/side-yd-ui.png`,
      logoW: 40,
      logoH: 40,
    },
    {
      name: "YD - Tech",
      desc: "포스팅 40+ 기술블로그",
      href: "https://youngduck-devlog.vercel.app/",
      logo: `${L}/side-yd-tech.svg`,
      logoW: 40,
      logoH: 42.054,
    },
    {
      name: "보돌코 스코어드",
      desc: "DAU 100+ 실시간 축구평점 입력 서비스",
      href: "https://bdks.vercel.app/",
      logo: `${L}/side-bodolco.png`,
      logoW: 40,
      logoH: 40,
    },
  ] as PfSideProject[],
};
