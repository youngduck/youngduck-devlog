import DocSection from "./doc-section";

const P = "/assets/resume/logos/p5";

const SKILLS: { src: string; w: number; h: number }[] = [
  { src: `${P}/sk-react.png`, w: 24, h: 21 },
  { src: `${P}/sk-ts.png`, w: 24, h: 24 },
  { src: `${P}/sk-scss.png`, w: 20, h: 15 },
  { src: `${P}/sk-110.png`, w: 20, h: 21 },
  { src: `${P}/sk-94.png`, w: 20, h: 20 },
  { src: `${P}/sk-107.png`, w: 20, h: 20 },
  { src: `${P}/sk-109.png`, w: 20, h: 20 },
  { src: `${P}/sk-sl.png`, w: 20, h: 20 },
];

export default function PortfolioPage5() {
  return (
    <>
      <p
        className="absolute whitespace-nowrap text-[10px] text-[#343a46]"
        style={{ left: 683, top: 20 }}
      >
        Work Experience - 스튜디오얌얌
      </p>

      {/* 좌측 사이드바 */}
      <div
        className="absolute flex flex-col items-center gap-[16px] border-r border-solid border-[var(--resume-border)] p-[12px]"
        style={{ left: 35, top: "calc(50% - 13.5px)", height: 520, width: 279, transform: "translateY(-50%)" }}
      >
        {/* 회사 헤더 */}
        <div className="flex items-center justify-center gap-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${P}/yamyam.png`} alt="STUDIO YAMYAM" style={{ width: 150, height: 52.164 }} className="object-contain" />
          <div className="flex flex-col items-start justify-center border-l border-solid border-[var(--resume-border)] px-[10px] text-black">
            <p className="text-[12px] font-semibold leading-[16px]">개발팀 현장실습</p>
            <p className="text-[10px] leading-[14px]">프론트엔드 개발</p>
            <p className="text-[10px] leading-[14px]">2023.08 ~ 2023.12</p>
          </div>
        </div>

        {/* Project */}
        <div className="flex w-full flex-col items-start gap-[12px] py-[12px]">
          <p className="text-[24px] font-semibold leading-none text-black">Project</p>
          <div className="flex w-full flex-col items-start gap-[12px]">
            {/* 삼성 웨비나 스크린샷 */}
            <div className="relative w-full overflow-hidden" style={{ height: 129.773 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${P}/samsung.png`}
                alt="삼성전자 웨비나"
                className="absolute max-w-none"
                style={{ height: "111.57%", width: "104.34%", left: "-4.34%", top: "-11.57%" }}
              />
            </div>
            {/* 삼성 웨비나 텍스트 */}
            <div className="flex items-center gap-[10px] pl-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${P}/image114.png`} alt="" style={{ width: 28, height: 26 }} className="shrink-0 object-contain" />
              <div className="text-[14px] leading-[18px] text-black">
                <p className="leading-[18px]">삼성전자 비즈니스 웨비나 1,2차</p>
                <p className="leading-[18px]">프론트엔드 개발 담당</p>
              </div>
            </div>
            {/* 한경 웨비나우 */}
            <div className="flex items-center gap-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${P}/hankyung.png`} alt="" style={{ width: 40, height: 40 }} className="shrink-0 object-contain" />
              <div className="text-[14px] leading-[18px] text-black">
                <p className="leading-[18px]">한경웨비나우</p>
                <p className="leading-[18px]">프론트엔드 유지보수</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skill */}
        <div className="flex w-[255px] flex-col items-start justify-center gap-[12px] border-t border-solid border-[var(--resume-border)] pt-[12px]">
          <p className="text-[20px] font-semibold leading-none text-black">Skill</p>
          <div className="flex flex-wrap items-center gap-[12px]">
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
        style={{ left: 326, top: "calc(50% + 1px)", width: 516, transform: "translateY(-50%)" }}
      >
        <DocSection title="About">
          <p className="leading-[22px]">
            개발팀(팀장,FE1, BE1)의 초기 프론트엔드 멤버로 합류하여 외주코드를 유지보수 하였습니다.
          </p>
          <p className="leading-[22px]">
            고객사별 맞춤 웨비나 제공을 위해 모노레포를 채택하고 핵심 컴포넌트를 모듈화, 배포
            파이프라인을 구축했습니다.
          </p>
        </DocSection>

        <DocSection title="Contribute">
          <div className="whitespace-pre-wrap leading-[22px]">
            {`- 삼성전자 웨비나 개선
   - 1차 웨비나 모니터링, 피드백 기반 개선사항을 적용하여 성공적인 2차 웨비나 진행
    문제: 동영상이 채팅보다 1초이상 늦게 렌더링 되는것을 확인
    해결: 라이브러리 비교 및 교체를 통한 경량화로 평균 렌더링 시간 59.4% 단축
    문제: ios 환경에서 한글채팅 입력시 중복호출현상 발견. (onKeydown, onKeypress)
    해결: 웹 표준 권장 방법인 (Form, onSubmit)을 사용하여 채팅 입력 이슈 해결
- 한경웨비나우 유지보수
    - 웨비나 종료 시점 결과 데이터 Excel 추출 자동화, 웨비나 유료시청 기능 개발
    - 동영상 컴포넌트 원격 제어를 위한 ref연결을 통한 DOM 조작 구현`}
          </div>
        </DocSection>

        <DocSection title="Learning Point & Key Achievement" border={false}>
          <div className="whitespace-pre-wrap leading-[22px]">
            {`- 현장실습 종료 후 인턴 계약 연장 제의를 받았고, 주최측의 만족스러운 반응과 함께
   추가웨비나 계약을 따내는 성과를 올렸습니다.
- 실제 서비스를 탄탄하게 제공하기 위해서 크로스 브라우징 체크, 모니터링등 고객입장의
   설계가 필요하다는 것을 배웠습니다.`}
          </div>
        </DocSection>
      </div>
    </>
  );
}
