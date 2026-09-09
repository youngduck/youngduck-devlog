const P = "/assets/resume/logos/p4";

interface CardLabel {
  text: string;
  top: number;
  left?: number;
}

/** 번호 pill: 원 배경(ellipse) + 흰 숫자 + 보라 제목 */
function Pill({ num, title }: { num: string; title: string }) {
  return (
    <div className="absolute" style={{ left: 12, top: 12, width: 85, height: 20 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${P}/ellipse.svg`}
        alt=""
        className="absolute block"
        style={{ left: "0%", top: 0, width: "23.53%", height: "100%" }}
      />
      <span
        className="absolute whitespace-nowrap text-[14px] font-semibold text-white"
        style={{ left: "calc(50% - 36.5px)", top: "calc(50% - 8px)" }}
      >
        {num}
      </span>
      <span
        className="absolute whitespace-nowrap text-[14px] font-semibold text-[#5337c9]"
        style={{ left: "29.41%", top: "10%" }}
      >
        {title}
      </span>
    </div>
  );
}

/** 프로세스 카드: 145x133 보라 테두리 박스 + pill + 라벨(또는 이미지) */
function ProcCard({
  num,
  title,
  labels = [],
  image,
}: {
  num: string;
  title: string;
  labels?: CardLabel[];
  image?: boolean;
}) {
  return (
    <div className="relative shrink-0" style={{ width: 145, height: 133 }}>
      <div className="absolute inset-0 rounded-[12px] border border-solid border-[#5337c9]" />
      <Pill num={num} title={title} />
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${P}/image124.png`}
          alt=""
          className="absolute object-contain"
          style={{ left: 12, top: 40, width: 121, height: 80 }}
        />
      )}
      {labels.map((l, i) => (
        <p
          key={i}
          className="absolute whitespace-nowrap text-[12px] font-medium leading-none text-black"
          style={{ left: l.left ?? 22, top: l.top }}
        >
          {l.text}
        </p>
      ))}
    </div>
  );
}

export default function PortfolioPage4() {
  return (
    <>
      <p
        className="absolute whitespace-nowrap text-[10px] text-[#343a46]"
        style={{ left: 674, top: 30 }}
      >
        Work Experience - 엘리오앤컴퍼니
      </p>

      <div
        className="absolute flex flex-col items-start"
        style={{
          left: "calc(50% + 0.5px)",
          top: "calc(50% + 0.5px)",
          width: 799,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex w-full flex-col items-start gap-[8px] border-b border-solid border-[var(--resume-border)] p-[12px]">
          <p className="text-[24px] font-semibold leading-none text-black">
            엘리오 디자인 시스템 도입 및 운영 v1.7.1, +80PR
          </p>

          {/* 5개 프로세스 카드 */}
          <div className="flex w-full items-center justify-between overflow-clip">
            <ProcCard
              num="1"
              title="문제 발견"
              labels={[
                { text: "디자인 표준안 부재", top: 46 },
                { text: "반복 구현 / 디자인", top: 64 },
                { text: "UX / DX 불일치", top: 82 },
                { text: "프로젝트 병목 발생", top: 100 },
              ]}
            />
            <ProcCard num="2" title="PPT 제안발표" image />
            <ProcCard
              num="3"
              title="구축"
              labels={[
                { text: "Compound Pattern", top: 43 },
                { text: "토큰, 번들링, 최적화", top: 61 },
                { text: "WCAG접근성", top: 79 },
                { text: "문서화, 라이브러리 배포", top: 97 },
              ]}
            />
            <ProcCard
              num="4"
              title="실사용 & 재설계"
              labels={[
                { text: "컴포넌트를 더잘게", top: 46 },
                { text: "문서화를 이중화", top: 64 },
                { text: "클로드코드 스킬에 탑재", top: 82 },
                { text: "SSR지원", top: 100 },
              ]}
            />
            <ProcCard
              num="5"
              title="결과"
              labels={[
                { text: "v1.7.1 배포, 80+PR 기여", top: 43, left: 17 },
                { text: "프로젝트 병목시간 제거", top: 61, left: 17 },
                { text: "직군간 소통 중앙화", top: 79, left: 17 },
                { text: "컴포넌트 고도화 기반 마련", top: 97, left: 17 },
              ]}
            />
          </div>

          <p className="text-[20px] font-semibold leading-none text-black">
            UI/UX 소통 중앙화와 개발 병목 제거를 위한 디자인 시스템 도입
          </p>
          <div className="w-full text-[14px] text-black">
            {[
              "- 문제 : 디자인 표준안 부재 → 프로젝트마다 컴포넌트 반복 디자인 / 구현. 개발자별 구현 방식 상이 및 리소스 파악시간 프로젝트 병목 발생",
              "- 제안 : 업무 최적화 회의에서 직접 디자인시스템 도입의 필요성 제안 → 대표 승인",
              "- 구축 : 브랜드팀 리소스 부족 → 기존 시스템들을 레퍼런스 삼아 토큰 체계부터 1인 주도 설계·개발·문서화, 브랜드팀에게 리뷰·피드백을 받는 구조로 협업",
              "- 결과 : 디자인 토큰 체계 수립, 30개 공통 컴포넌트 제공 → 디자이너·개발자 간 UI/UX 소통이 중앙화되고, 프로젝트마다 공통 컴포넌트를 구축하는 병목 제거, 개발자별 상이한 구현으로 인한 코드 파악 비용 감소",
            ].map((l, i) => (
              <p key={i} className="leading-[18px]">
                {l}
              </p>
            ))}
          </div>

          <p className="text-[20px] font-semibold leading-none text-black">
            아키텍처 및 도구 선택 과정
          </p>
          <div className="w-full text-[14px] text-black">
            {[
              "- 컴포넌트 구현 방식 선택: UI 프레임워크(MUI, Ant Design)는 불필요한 번들 포함 + 테마 오버라이드 과정 불필요 판단, Headless UI(Radix UI, React Aria)는 스타일은 자유지만 DOM 구조·Portal 패턴을 강제해 추후 구현할 컴포넌트에 걸림돌이 될 수 있다 판단→ 초기 비용이 크더라도 사내 컴포넌트 현황에 맞춘 직접 구현 선택",
              "- 배포 방식: 여러 독립 프로젝트에서 버전 단위로 사용하기 위해 모노레포 대신 npm private 패키지 채택",
              "- 번들러 선택 : Rollup은 JS 기반 번들링으로 컴포넌트 수 증가 시 빌드 속도가 선형 증가 → tsup(esbuild 기반)은 Go 네이티브 병렬 파싱으로 빌드 속도가 압도적으로 빠르고, ESM/CJS/dts 동시 출력을 간편하게 설정 가능, 컴포넌트별 서브패스 +export로 트리쉐이킹 보장의 이점을 얻고자 tsup 선택",
            ].map((l, i) => (
              <p key={i} className="leading-[18px]">
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
