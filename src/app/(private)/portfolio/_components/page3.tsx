import DocSection from "./doc-section";

const P = "/assets/resume/logos/p3";

const SKILLS: { src: string; w: number; h: number }[] = [
  { src: `${P}/sk-react.png`, w: 20, h: 17 },
  { src: `${P}/sk-ts.png`, w: 20, h: 20 },
  { src: `${P}/sk-vasdf.png`, w: 20, h: 20 },
  { src: `${P}/sk-df.png`, w: 20, h: 17 },
  { src: `${P}/sk-zustand.png`, w: 20, h: 11 },
  { src: `${P}/sk-vitest.png`, w: 20, h: 18 },
  { src: `${P}/sk-94.png`, w: 20, h: 20 },
  { src: `${P}/sk-89.png`, w: 20, h: 20 },
  { src: `${P}/sk-54.png`, w: 20, h: 20 },
  { src: `${P}/sk-111.png`, w: 20, h: 20 },
  { src: `${P}/sk-92.png`, w: 20, h: 20 },
  { src: `${P}/sk-91.png`, w: 20, h: 20 },
  { src: `${P}/sk-figma.png`, w: 20, h: 15 },
  { src: `${P}/sk-58.png`, w: 20, h: 20 },
  { src: `${P}/sk-112.png`, w: 20, h: 19 },
];

/** VCS·SCAN 처럼 아이콘+텍스트 2개 svg로 구성된 로고 */
function Composite({
  w,
  h,
  a,
  b,
}: {
  w: number;
  h: number;
  a: { src: string; inset: string };
  b: { src: string; inset: string };
}) {
  return (
    <div className="relative shrink-0" style={{ width: w, height: h }}>
      {[a, b].map((part, i) => (
        <div key={i} className="absolute" style={{ inset: part.inset }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={part.src} alt="" className="block h-full w-full" />
        </div>
      ))}
    </div>
  );
}

function Proj({
  logo,
  lines,
}: {
  logo: React.ReactNode;
  lines: string[];
}) {
  return (
    <div className="flex flex-col items-start gap-[5px]">
      {logo}
      <div className="text-[13px] leading-[18px] text-black">
        {lines.map((l, i) => (
          <p key={i} className="whitespace-nowrap leading-[18px]">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage3() {
  return (
    <>
      <p
        className="absolute whitespace-nowrap text-[10px] text-[#343a46]"
        style={{ left: 674, top: 30 }}
      >
        Work Experience - 엘리오앤컴퍼니
      </p>

      {/* 좌측 사이드바 */}
      <div
        className="absolute flex flex-col items-center gap-[12px] border-r border-solid border-[var(--resume-border)] px-[12px] pb-[12px]"
        style={{ left: 33, top: "calc(50% + 5px)", height: 555, transform: "translateY(-50%)" }}
      >
        {/* 회사 헤더 */}
        <div className="flex w-full items-center justify-center gap-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${P}/elio.png`} alt="ELIO&COMPANY" style={{ width: 130, height: 70 }} className="object-contain" />
          <div className="flex flex-col items-start justify-center border-l border-solid border-[var(--resume-border)] px-[10px] text-black">
            <p className="text-[12px] font-semibold leading-[16px]">IT본부 사원</p>
            <p className="text-[10px] leading-[14px]">풀스택 개발</p>
            <p className="text-[10px] leading-[14px]">2024.04 ~ 재직중</p>
          </div>
        </div>

        {/* Project */}
        <div className="flex flex-col items-start gap-[12px] pb-[12px]">
          <p className="text-[24px] font-semibold leading-none text-black">Project</p>
          <div className="flex flex-col items-start gap-[12px] pl-[8px]">
            <Proj
              logo={
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`${P}/eds.png`} alt="EDS" style={{ width: 57, height: 18 }} className="object-contain" />
              }
              lines={["디자인 시스템 도입 제안 및", "UI 라이브러리 책임 개발"]}
            />
            <Proj
              logo={
                <Composite
                  w={60}
                  h={18}
                  a={{ src: `${P}/vcs-a.svg`, inset: "0% 69.62% 0% 0.08%" }}
                  b={{ src: `${P}/vcs-b.svg`, inset: "12.55% -0.44% 12.45% 42.05%" }}
                />
              }
              lines={["컨설팅 형상관리 시스템 풀스택 개발"]}
            />
            <Proj
              logo={
                <Composite
                  w={77}
                  h={18}
                  a={{ src: `${P}/scan-a.svg`, inset: "0% 75.06% 0% 1.13%" }}
                  b={{ src: `${P}/scan-b.svg`, inset: "11.02% -0.54% 11.01% 35.57%" }}
                />
              }
              lines={["누적사용자 210K 병원 고객만족도설문 시스템", "프론트엔드 리뉴얼"]}
            />
            <Proj
              logo={
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`${P}/hyean.png`} alt="HYEAN" style={{ width: 84, height: 18 }} className="object-contain" />
              }
              lines={["대학병원 경영진 BI 시스템 마이그레이션"]}
            />
          </div>
        </div>

        {/* Skill */}
        <div className="flex w-[255px] flex-col items-start justify-center gap-[12px] border-t border-solid border-[var(--resume-border)] pt-[12px]">
          <p className="text-[20px] font-semibold leading-none text-black">Skill</p>
          <div className="flex w-full flex-wrap items-center gap-[12px]">
            {SKILLS.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={s.src} alt="" className="shrink-0 object-contain" style={{ width: s.w, height: s.h }} />
            ))}
          </div>
        </div>
      </div>

      {/* 우측 문서 */}
      <div
        className="absolute flex flex-col items-start"
        style={{ left: 324, top: "50%", width: 517, transform: "translateY(-50%)" }}
      >
        <DocSection title="About">
          <p className="leading-[22px]">대학병원에 특화된 헬스케어 컨설팅펌에서</p>
          <p className="leading-[22px]">기술스택을 React, Spring으로 전환하는 시기에 입사하여</p>
          <p className="leading-[22px]">
            풀스택 개발과 함께{" "}
            <span className="font-bold">주도적으로 사내 프론트엔드 생태계를 구축</span>했습니다.
          </p>
        </DocSection>

        <DocSection title="Contribute">
          {[
            "- 사내 React 표준코드를 위한 VSCode 스니펫 제작 및 공유",
            "- UX향상, 비용절감을 위한 상황별 서버데이터 캐싱 처리",
            "- 생산성제고, 균일한 UX제공을 위한 디자인 시스템 도입안 발표 및 총괄 개발",
            "- 코드 안정성을 위한 Vitest + Msw + Storybook 테스트 코드 기반 개발",
            "- CRA → Vite 전환, TypeScript도입, 선언적 코드 작성",
            "- 팀 코드 품질 관리를 위해 Husky를 활용한 자동 검증 프로세스 도입",
            "- 생산성, 품질 향상을 위한 디자인시스템 & AI 도구(MCP, CLI) 연계",
          ].map((l, i) => (
            <p key={i} className="leading-[22px]">
              {l}
            </p>
          ))}
        </DocSection>

        <DocSection title="Learning Point & Key Achievement" border={false}>
          <p className="leading-[22px]">
            - 대학병원 고객 만족도 설문을 리뉴얼하며 디자인으로 인한 전월 대비 지표 하락, 저속 네트워크
            환경에서만 나타나는 이슈, 새로운 추가 문항 도입 등 다양한 문제 상황을 마주했습니다. 단순히
            기술적으로 완벽한 솔루션이 아닌, 회사의 리소스와 제약을 고려한 실용적인 해결책을 도출하며
            고객 중심의 사고와 비즈니스 효율성을 동시에 고려하는 개발자로 성장하고 있습니다.
          </p>
        </DocSection>
      </div>
    </>
  );
}
