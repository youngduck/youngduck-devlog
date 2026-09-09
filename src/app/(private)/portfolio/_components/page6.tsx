import DocSection from "./doc-section";
import { SideBlock, SkillWrap, LinkWrap } from "./project-parts";

const P = "/assets/resume/logos/p6";

export default function PortfolioPage6() {
  return (
    <>
      <p className="absolute whitespace-nowrap text-[10px] text-[#343a46]" style={{ left: 694, top: 20 }}>
        Side Project - 보돌코 스코어드
      </p>

      {/* 좌측 사이드바 */}
      <div
        className="absolute flex flex-col items-center justify-center gap-[12px] border-r border-solid border-[var(--resume-border)] p-[12px]"
        style={{ left: 35, top: "50%", height: 527, width: 279, transform: "translateY(-50%)" }}
      >
        {/* 헤더 */}
        <div className="flex w-full items-start gap-[10px]">
          <div className="flex items-start justify-center gap-[10px] border-r border-solid border-[var(--resume-border)] px-[12px]">
            <div className="text-center text-[20px] font-bold leading-tight text-[#e8bf12]">
              <p>보돌코</p>
              <p>스코어드</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${P}/logo.png`} alt="보돌코" style={{ width: 45, height: 45 }} className="shrink-0 object-contain" />
          </div>
          <div className="flex flex-col items-start justify-center whitespace-nowrap text-[12px] text-black">
            <p className="font-semibold">개인프로젝트</p>
            <p>version : 1.6.12</p>
            <p>2025.07 ~ 관리중</p>
          </div>
        </div>

        {/* 앱 스크린샷 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${P}/shot.png`} alt="보돌코 스코어드 화면" style={{ width: 255, height: 159 }} className="shrink-0 object-cover" />

        <SideBlock title="Link">
          <LinkWrap
            links={[
              { icon: `${P}/logo.png`, w: 20, h: 20, label: "홈페이지", href: "https://bdks.vercel.app/" },
              { icon: `${P}/logo.png`, w: 20, h: 20, label: "패치노트", href: "https://github.com/BorussiaDortmundKorea-Scored/bdks-fe/blob/main/CHANGELOG.md" },
              { icon: `${P}/github.svg`, w: 20, h: 19.506, label: "Github", href: "https://github.com/BorussiaDortmundKorea-Scored/bdks-fe" },
              { icon: `${P}/figma.png`, w: 20, h: 15, label: "디자인", href: "https://www.figma.com/design/TyMJfL9yvnC7vymBnDgal4" },
            ]}
          />
        </SideBlock>

        <SideBlock title="Skill">
          <SkillWrap
            icons={[
              { src: `${P}/sk-react.png`, w: 20, h: 17 },
              { src: `${P}/sk-ts.png`, w: 20, h: 20 },
              { src: `${P}/sk-tailwind.png`, w: 20, h: 12 },
              { src: `${P}/sk-gsap.png`, w: 20, h: 20, crop: { w: "190.48%", left: "-45.08%" } },
              { src: `${P}/sk-vitest.png`, w: 20, h: 18 },
              { src: `${P}/sk-92.png`, w: 20, h: 20 },
              { src: `${P}/sk-images1.png`, w: 20, h: 20 },
              { src: `${P}/sk-sentry.svg`, w: 20, h: 18 },
            ]}
          />
        </SideBlock>
      </div>

      {/* 우측 문서 */}
      <div className="absolute flex flex-col items-start" style={{ left: 338, top: 34, width: 460 }}>
        <DocSection title="About">
          <div className="flex flex-col gap-[10px] leading-[22px]">
            <p>제가 좋아하는 도르트문트의 팬들을 위한 실시간 축구평점 입력 서비스입니다.</p>
            <p>
              단순히 콘텐츠를 소비하는 것을 넘어, 팬들이 적극적으로 참여하고 소통할 수 있는
              인터랙티브한 경험을 만들고자 했습니다.
            </p>
          </div>
        </DocSection>

        <DocSection title="Architecture">
          {[
            "- 기획, 디자인, DB설계 및 개발 100% 제작",
            "- 실시간 평점 기능구현을 위한 supabase의 realtime, broadcast 방식 사용",
            "- 유저행동 엣지 케이스, 에러상황 관측을 위한 에러모니터링(Sentry) 구축",
            "- 테스트 인프라 구축 (Vitest, MSW, Storybook) 및 빌드 최적화",
            "- 관리자 페이지, 권한 관리를 통한 시스템 구축",
            "- AI 코드리뷰 연동 및 피드백 반영을 통한 실무환경 재현 및 코드 품질 향상",
            "- YD-UI 디자인 시스템 기반 컴포넌트 구현을 통한 일관된 UI/UX 제공",
          ].map((l, i) => (
            <p key={i} className="leading-[22px]">{l}</p>
          ))}
        </DocSection>

        <DocSection title="Learning Point & Key Achievement" border={false}>
          {[
            "- 신규 유저 유치 및 유저 잔존율 향상을 위한 마케팅 고민",
            "- 도메인 기반 아키텍처 설계를 통한 응집도 향상",
            "- BaaS 환경을 통한 인프라 관리 비용 0원",
            "- Lighthouse 성능 평균 지표: 성능 92, 접근성 92, 권장사항100, 검색엔진 92점 달성",
          ].map((l, i) => (
            <p key={i} className="leading-[22px]">{l}</p>
          ))}
        </DocSection>
      </div>
    </>
  );
}
