import A4Page from "./_components/a4-page";
import Section from "./_components/section";
import PrintToolbar from "./_components/print-button";
import ResumeHeader from "./_components/blocks/resume-header";
import SkillGroups from "./_components/blocks/skill-groups";
import ExperienceItem from "./_components/blocks/experience-item";
import { resume2026 as r } from "./_data/resume-2026";

const SIDE_LOGO: Record<string, { src: string; w: number; h: number }> = {
  "YD-Tech": { src: "/assets/resume/logos/side-yd-tech.svg", w: 30, h: 31.541 },
  "보돌코 스코어드": { src: "/assets/resume/logos/side-bodolco.png", w: 30, h: 30 },
  "@youngduck/yd-ui": { src: "/assets/resume/logos/side-yd-ui.png", w: 30, h: 30 },
};

/** name(14px medium) + 여러 줄(12px regular) 세로 묶음 — Activity/Career/Certificate 공통 */
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

/**
 * ③ 배치 계층 — 피그마 exact 스펙(px·색상·폰트웨이트)으로 블록을 A4에 적재.
 */
export default function ResumePage() {
  return (
    <div className="resume-viewport">
      <PrintToolbar />

      {/* ===== A4 1페이지 ===== */}
      <A4Page>
        <ResumeHeader
          name={r.name}
          photoSrc="/assets/resume/logos/photo-removed.png"
          strongPoints={r.strongPoints}
        />

        {/* 섹션 영역: 피그마 좌 10px / 우 22px 여백 */}
        <div className="pl-[10px] pr-[22px] pt-[10px]">
          <Section title="Posting" borderTop>
            <div className="flex items-start justify-between">
              {r.postings.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] font-medium leading-[19px] text-black underline"
                >
                  {p.title}
                </a>
              ))}
            </div>
          </Section>

          <Section title="Profile">
            <div className="flex items-start gap-[19px]">
              <div className="flex items-start gap-[10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/resume/logos/ic-github.svg"
                  alt=""
                  className="mt-[3px] shrink-0"
                  style={{ width: 30, height: 29.259 }}
                />
                <div className="flex flex-col">
                  <p className="text-[14px] font-medium leading-[18px] text-black">
                    {r.profile[0].label}
                  </p>
                  <a
                    href={r.profile[0].href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-normal leading-[18px] text-black underline"
                  >
                    {r.profile[0].value}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-[10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/resume/logos/ic-catholic.png"
                  alt=""
                  className="mt-[8px] shrink-0 object-contain"
                  style={{ width: 30, height: 22 }}
                />
                <div className="flex flex-col">
                  <p className="text-[14px] font-medium leading-[18px] text-black">
                    {r.profile[1].value}
                  </p>
                  <p className="text-[12px] font-normal leading-[18px] text-black">
                    학점 {r.profile[2].value}
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Activity">
            <div className="flex items-start justify-between">
              {r.activities.map((a) => (
                <Stack
                  key={a.name}
                  title={a.name}
                  lines={[`${a.type} | ${a.desc}`, a.period]}
                />
              ))}
            </div>
          </Section>

          {/* Career(386) + Certificate(177) 나란히 — 제목 24px */}
          <div className="flex">
            <Section title="Career" headingSize={24} className="w-[386px]">
              <div className="flex items-start gap-[60px]">
                {r.career.map((c) => (
                  <Stack
                    key={c.company}
                    title={c.company}
                    lines={[c.role, c.period]}
                  />
                ))}
              </div>
            </Section>
            <Section title="Certificate" headingSize={24} className="w-[177px]">
              <div className="flex items-start justify-between">
                {r.certificates.map((c) => (
                  <Stack key={c.name} title={c.name} lines={[c.date]} />
                ))}
              </div>
            </Section>
          </div>

          <Section title="Skill">
            <SkillGroups />
          </Section>

          <Section title="Side Project">
            <div className="flex items-center justify-between">
              {r.sideProjects.map((s) => (
                <div key={s.name} className="flex items-center gap-[10px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SIDE_LOGO[s.name]?.src ?? ""}
                    alt=""
                    className="shrink-0 object-contain"
                    style={{
                      width: SIDE_LOGO[s.name]?.w ?? 30,
                      height: SIDE_LOGO[s.name]?.h ?? 30,
                    }}
                  />
                  <div className="flex flex-col">
                    <p className="text-[14px] font-medium leading-[18px] text-black underline">
                      {s.name}
                    </p>
                    <p className="text-[12px] font-normal leading-[18px] text-black">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </A4Page>

      {/* ===== A4 2페이지: Work Experience ===== */}
      <A4Page>
        <div className="flex flex-col gap-[12px] px-[18px] pt-[20px]">
          <h2 className="resume-heading text-[20px] font-semibold leading-none">
            Work Experience
          </h2>
          {r.experiences.map((exp, i) => (
            <ExperienceItem key={i} data={exp} />
          ))}
        </div>
      </A4Page>
    </div>
  );
}
