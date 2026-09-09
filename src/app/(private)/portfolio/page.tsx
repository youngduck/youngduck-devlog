import A4Page from "../resume/_components/a4-page";
import Section from "../resume/_components/section";
import SkillGroups from "../resume/_components/blocks/skill-groups";
import { SKILL_ICONS_PF } from "../resume/_data/skill-icons";
import PrintToolbar from "./_components/print-button";
import PortfolioPage3 from "./_components/page3";
import PortfolioPage4 from "./_components/page4";
import PortfolioPage5 from "./_components/page5";
import PortfolioPage6 from "./_components/page6";
import PortfolioPage7 from "./_components/page7";
import PortfolioPage8 from "./_components/page8";
import { portfolio2026 as p } from "./_data/portfolio-2026";

const L = "/assets/resume/logos";

/** name(14 medium) + 여러 줄(12 regular) — Career/Activity/Certificate 공통 */
function Stack({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="flex shrink-0 flex-col items-start whitespace-nowrap">
      <p className="text-[14px] font-medium leading-[19px] text-black">{title}</p>
      {lines.map((l, i) => (
        <p key={i} className="text-[12px] font-normal leading-normal text-black">
          {l}
        </p>
      ))}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="resume-viewport">
      <PrintToolbar />

      {/* ===== 1페이지: 커버(가로) ===== */}
      <A4Page orientation="landscape">
        <p
          className="absolute whitespace-nowrap text-[96px] font-semibold text-[#5337c9]"
          style={{ left: 70, top: 150 }}
        >
          {p.name}
        </p>
        <p
          className="absolute whitespace-nowrap text-[52px] font-semibold text-[#5337c9]"
          style={{ left: 70, top: 275 }}
        >
          {p.title}
        </p>
        <div
          className="absolute text-[16px] font-medium text-black"
          style={{ left: 70, top: 347 }}
        >
          {p.subtitle.map((s, i) => (
            <p key={i} className="leading-[22px]">
              {s}
            </p>
          ))}
        </div>
        <div
          className="absolute flex flex-col gap-[12px] rounded-[8px] p-[12px]"
          style={{ left: 605, top: 446 }}
        >
          <p className="text-center text-[24px] font-semibold text-[#5337c9]">
            Contact
          </p>
          <p className="text-center text-[16px] font-medium text-black">
            {p.contact.phone}
          </p>
          <p className="text-center text-[16px] font-medium text-black">
            {p.contact.email}
          </p>
        </div>
      </A4Page>

      {/* ===== 2페이지: 정보(가로) ===== */}
      <A4Page orientation="landscape">
        {/* 좌측 사이드바 */}
        <div
          className="absolute flex flex-col items-center gap-[12px] border-r border-solid border-[var(--resume-border)] p-[12px]"
          style={{ left: 35, top: "50%", height: 555, transform: "translateY(-50%)" }}
        >
          {/* 사진 */}
          <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full border-2 border-solid border-[#5337c9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${L}/photo-removed.png`}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col items-start gap-[12px]">
            <h2 className="resume-heading text-[24px] font-semibold leading-none">
              Profile
            </h2>
            {/* Github */}
            <div className="flex items-start gap-[10px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${L}/ic-github.svg`}
                alt=""
                className="shrink-0"
                style={{ width: 40, height: 39.012 }}
              />
              <div className="flex flex-col">
                <p className="text-[14px] font-medium leading-[18px] text-black">
                  {p.profile[0].label}
                </p>
                <a
                  href={p.profile[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] font-normal leading-[18px] text-black underline"
                >
                  {p.profile[0].value}
                </a>
              </div>
            </div>
            {/* 학력 */}
            <div className="flex items-start gap-[10px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${L}/ic-catholic.png`}
                alt=""
                className="shrink-0 object-contain"
                style={{ width: 40, height: 30 }}
              />
              <div className="flex w-[205px] flex-col">
                <p className="text-[14px] font-medium leading-[18px] text-black">
                  {p.profile[1].value}
                </p>
                <p className="text-[12px] font-normal leading-[18px] text-black">
                  학점 {p.profile[2].value}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-[var(--resume-border)]" />

            <h2 className="resume-heading text-[24px] font-semibold leading-none">
              Side Project
            </h2>
            {p.sideProjects.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-start gap-[10px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.logo}
                  alt=""
                  className="shrink-0 object-contain"
                  style={{ width: s.logoW, height: s.logoH }}
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium leading-[18px] text-black underline">
                    {s.name}
                  </span>
                  <span className="text-[12px] font-normal leading-[18px] text-black">
                    {s.desc}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Strong Point */}
        <div className="absolute" style={{ left: 326, top: 6, width: 481 }}>
          <Section title="Strong Point" headingSize={24}>
            <div className="flex flex-col gap-[12px]">
              {p.strongPoints.map((sp, i) => (
                <p
                  key={i}
                  className="whitespace-pre-wrap text-[18px] font-semibold leading-[22px] text-black"
                >
                  {sp}
                </p>
              ))}
            </div>
          </Section>
        </div>

        {/* Career */}
        <div className="absolute" style={{ left: 326, top: 227, width: 297 }}>
          <Section title="Career" headingSize={24}>
            <div className="flex items-start gap-[19px]">
              {p.career.map((c) => (
                <Stack key={c.company} title={c.company} lines={[c.role, c.period]} />
              ))}
            </div>
          </Section>
        </div>

        {/* Certificate */}
        <div className="absolute" style={{ left: 623, top: 227, width: 184 }}>
          <Section title="Certificate" headingSize={24}>
            <div className="flex items-start">
              {p.certificates.map((c) => (
                <Stack key={c.name} title={c.name} lines={[c.date]} />
              ))}
            </div>
          </Section>
        </div>

        {/* Activity */}
        <div className="absolute" style={{ left: 326, top: 339, width: 481 }}>
          <Section title="Activity" headingSize={24}>
            <div className="flex items-start gap-[19px]">
              {p.activities.map((a) => (
                <Stack
                  key={a.name}
                  title={a.name}
                  lines={[`${a.type} | ${a.desc}`, a.period]}
                />
              ))}
            </div>
          </Section>
        </div>

        {/* Skill */}
        <div className="absolute" style={{ left: 326, top: 450, width: 481 }}>
          <Section title="Skill" headingSize={24} border={false}>
            <SkillGroups groups={SKILL_ICONS_PF} />
          </Section>
        </div>
      </A4Page>

      {/* ===== 3페이지: 엘리오 프로젝트 개요 ===== */}
      <A4Page orientation="landscape">
        <PortfolioPage3 />
      </A4Page>

      {/* ===== 4페이지: 디자인 시스템 딥다이브 ===== */}
      <A4Page orientation="landscape">
        <PortfolioPage4 />
      </A4Page>

      {/* ===== 5페이지: 스튜디오얌얌 프로젝트 개요 ===== */}
      <A4Page orientation="landscape">
        <PortfolioPage5 />
      </A4Page>

      {/* ===== 6페이지: 보돌코 스코어드 ===== */}
      <A4Page orientation="landscape">
        <PortfolioPage6 />
      </A4Page>

      {/* ===== 7페이지: YDS / YD-UI ===== */}
      <A4Page orientation="landscape">
        <PortfolioPage7 />
      </A4Page>

      {/* ===== 8페이지: 기술블로그 YD-Tech ===== */}
      <A4Page orientation="landscape">
        <PortfolioPage8 />
      </A4Page>
    </div>
  );
}
