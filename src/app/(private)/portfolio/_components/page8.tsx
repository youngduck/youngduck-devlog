import DocSection from "./doc-section";
import { SideBlock, SkillWrap, LinkWrap } from "./project-parts";

const P = "/assets/resume/logos/p8";

const POSTINGS = [
  { href: "https://youngduck-devlog.vercel.app/blog/posts/ds-2", title: "프론트엔드 번들링과 압축 전송 톺아보기" },
  { href: "https://youngduck-devlog.vercel.app/blog/posts/ds-2", title: "사내 디자인 시스템 구축기 회고: 도입제안부터 사용후기 까지" },
  { href: "https://youngduck-devlog.vercel.app/blog/posts/mcp-1", title: "MCP를 통해 Supabase 테스트서버 1시간만에 무료로 구축하기" },
];

export default function PortfolioPage8() {
  return (
    <>
      <p className="absolute whitespace-nowrap text-[10px] text-[#343a46]" style={{ left: 714, top: 20 }}>
        Side Project - 기술블로그
      </p>

      {/* 좌측 사이드바 */}
      <div
        className="absolute flex flex-col items-center justify-center gap-[12px] border-r border-solid border-[var(--resume-border)] p-[12px]"
        style={{ left: 35, top: "calc(50% - 0.78px)", width: 279, transform: "translateY(-50%)" }}
      >
        {/* 헤더 */}
        <div className="flex w-full items-center gap-[10px]">
          <div className="flex items-center justify-center gap-[10px] border-r border-solid border-[var(--resume-border)] px-[12px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${P}/logo.png`} alt="YD-Tech" style={{ width: 30, height: 32 }} className="shrink-0 object-contain" />
            <p className="whitespace-nowrap bg-gradient-to-r from-[#e6b43f] to-[#8c6306] bg-clip-text text-center text-[20px] text-transparent">
              YD - Tech
            </p>
          </div>
          <div className="flex flex-col items-start justify-center whitespace-nowrap text-[12px] text-black">
            <p className="font-semibold">기술블로그</p>
            <p>version : 1.2.2</p>
            <p>2024.03 ~ 기록중</p>
          </div>
        </div>

        {/* 블로그 스크린샷 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${P}/shot.png`} alt="YD-Tech 블로그" style={{ width: 255, height: 296 }} className="object-cover" />

        <SideBlock title="Link">
          <LinkWrap
            links={[
              { icon: `${P}/logo.png`, w: 20, h: 21, label: "홈페이지", href: "https://youngduck-devlog.vercel.app/" },
              { icon: `${P}/github.svg`, w: 20, h: 19.506, label: "Github", href: "https://github.com/BorussiaDortmundKorea-Scored/bdks-fe" },
            ]}
          />
        </SideBlock>

        <SideBlock title="Skill">
          <SkillWrap
            icons={[
              { src: `${P}/sk-next.png`, w: 20, h: 20 },
              { src: `${P}/sk-ts.png`, w: 20, h: 20 },
              { src: `${P}/sk-tailwind.png`, w: 20, h: 12 },
              { src: `${P}/sk-92.png`, w: 20, h: 20 },
              { src: `${P}/sk-vercel.png`, w: 20, h: 20 },
              { src: `${P}/sk-113.png`, w: 20, h: 20 },
            ]}
          />
        </SideBlock>
      </div>

      {/* 우측 문서 */}
      <div className="absolute flex flex-col items-start" style={{ left: 326, top: 35, width: 460 }}>
        <DocSection title="About">
          <p className="leading-[19px]">트러블 슈팅, 알고리즘 풀이, 개발회고등을 기록하는 기술 블로그 입니다.</p>
          <p className="leading-[19px]">포스팅을 통해 지식을 제대로 알고 넘어가는 습관을 기르고 있습니다.</p>
        </DocSection>

        <DocSection title="What did I Do">
          <div className="whitespace-pre-wrap leading-[19px]">
            {`- PWA 학습 및 개발, SEO, RSS 처리
- SVG 애니메이션 컴포넌트, CSS 3D Transform 학습 및 구현
- Grid 활용 반응형 디자인 구현, 다크모드 제공
- Next15 기반 SSR, CSR, RSC, RCC 개념 학습 및 적용
-  마크다운 → React 변환하여 블로그 컨텐츠 정적페이지로 구현`}
          </div>
        </DocSection>

        <DocSection title="Posting" border={false}>
          {POSTINGS.map((p, i) => (
            <p key={i} className="leading-[19px]">
              {"- "}
              <a href={p.href} target="_blank" rel="noreferrer" className="text-[#0d10bc] underline">
                link
              </a>
              <span className="text-[#0d10bc]">{": "}</span>
              {p.title}
            </p>
          ))}
        </DocSection>
      </div>
    </>
  );
}
