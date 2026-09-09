import DocSection from "./doc-section";
import { SideBlock, SkillWrap, LinkWrap } from "./project-parts";

const P = "/assets/resume/logos/p7";

export default function PortfolioPage7() {
  return (
    <>
      <p className="absolute whitespace-nowrap text-[10px] text-[#343a46]" style={{ left: 704, top: 20 }}>
        Side Project - YDS / YD-UI
      </p>

      {/* 좌측 사이드바 */}
      <div
        className="absolute flex flex-col items-center gap-[12px] border-r border-solid border-[var(--resume-border)] p-[12px]"
        style={{ left: 35, top: "calc(50% + 6.5px)", height: 512, width: 279, transform: "translateY(-50%)" }}
      >
        {/* 헤더 + 스크린샷 */}
        <div className="flex w-full flex-col items-start gap-[12px] pb-[20px]">
          <div className="flex w-full items-center gap-[10px]">
            <div className="flex items-center justify-center gap-[10px] border-r border-solid border-[var(--resume-border)] pr-[12px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${P}/logo.png`} alt="YDS" style={{ width: 45, height: 45 }} className="shrink-0 object-contain" />
              <p
                className="font-zen-maru whitespace-nowrap text-center text-[14px] font-bold text-[#e8bf12]"
                style={{ WebkitTextStroke: "0.6px #5b4600", paintOrder: "stroke" }}
              >
                YDS / YD - UI
              </p>
            </div>
            <div className="flex flex-col items-start justify-center whitespace-nowrap text-[12px] text-black">
              <p className="font-semibold">개인프로젝트</p>
              <p>version : 0.14.1</p>
              <p>2025.08 ~ 관리중</p>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${P}/shot.png`} alt="YD Design System" style={{ width: 255, height: 155.4 }} className="object-cover" />
        </div>

        <SideBlock title="Link">
          <LinkWrap
            links={[
              { icon: `${P}/npm.png`, w: 20, h: 19, label: "패키지", href: "https://www.npmjs.com/package/@youngduck/yd-ui" },
              { icon: `${P}/logo.png`, w: 20, h: 20, label: "패치노트", href: "https://github.com/youngduck/yd-ui/blob/main/CHANGELOG.md" },
              { icon: `${P}/github.svg`, w: 20, h: 19.506, label: "Github", href: "https://github.com/youngduck/yd-ui" },
              { icon: `${P}/figma.png`, w: 20, h: 15, label: "디자인", href: "https://www.figma.com/design/TyMJfL9yvnC7vymBnDgal4" },
            ]}
          />
        </SideBlock>

        <SideBlock title="Skill">
          <SkillWrap
            icons={[
              { src: `${P}/sk-ts.png`, w: 24, h: 24 },
              { src: `${P}/sk-tailwind.png`, w: 24, h: 15 },
              { src: `${P}/sk-92.png`, w: 25, h: 25 },
              { src: `${P}/sk-58.png`, w: 25, h: 25 },
              { src: `${P}/sk-108.png`, w: 28, h: 20 },
            ]}
          />
        </SideBlock>
      </div>

      {/* 우측 문서 */}
      <div className="absolute flex flex-col items-start" style={{ left: 326, top: 48, width: 496 }}>
        <DocSection title="About">
          <p className="leading-[22px]">“UI동작로직은 UI라이브러리에 담아서 제공하자”라는 철학으로</p>
          <p className="leading-[22px]">디자인패턴을 학습하며 구축한 UI컴포넌트 라이브러리 입니다.</p>
        </DocSection>

        <DocSection title="What did I Do">
          <div className="whitespace-pre-wrap leading-[22px]">
            {`- Rollup의 트리쉐이킹을 통한 번들 크기 최적화
- 보돌코스코어드와 병렬적으로 개발하며 라이브러리 점진적 개선
- ESM, CJS 지원 라이브러리 제작
- 유령의존성방지, 디스크 공간 효율성을 위한 PNPM 패키지 매니저 선택
- 웹접근성 지침(WCAG, a11y) 기준을 고려한 컴포넌트 개발
- Context API, useReducer, Compound Pattern등 다양한 구현방식
   트레이드 오프 고민을 통한 컴포넌트 구현`}
          </div>
        </DocSection>

        <DocSection title="Learning Point" border={false}>
          <div className="whitespace-pre-wrap leading-[22px]">
            {`- 디자인 토큰, 파운데이션등 디자인 시스템 개념 습득
- 디자인 패턴을 활용한 컴포넌트 구현 방식 트레이드 오프 고민
- 번들링, 트리쉐이킹, 모듈 시스템 등 라이브러리 구성 및 배포 방식 이해`}
          </div>
        </DocSection>
      </div>
    </>
  );
}
