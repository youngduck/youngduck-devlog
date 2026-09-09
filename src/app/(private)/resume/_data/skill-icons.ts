/**
 * Skill 아이콘 — 피그마 원본 export 에셋을 순서·치수 그대로 사용(픽셀 일치).
 * (파일: public/assets/resume/logos/*)
 */
export interface IconAsset {
  src: string;
  w: number;
  h: number;
  /** 가로로 넓은 원본을 정사각 박스에 크롭해서 보여줄 때(예: GSAP 배지) */
  crop?: { w: string; left: string };
}

const P = "/assets/resume/logos";

export interface SkillIconGroup {
  category: string;
  icons: IconAsset[];
}

export const SKILL_ICONS: SkillIconGroup[] = [
  {
    category: "FrontEnd",
    icons: [
      { src: `${P}/fe-ts.png`, w: 30, h: 30 },
      { src: `${P}/fe-react.png`, w: 30, h: 26 },
      { src: `${P}/fe-next.png`, w: 30, h: 30 },
      { src: `${P}/fe-tailwind.png`, w: 30, h: 18 },
      { src: `${P}/fe-05.png`, w: 30, h: 30 },
      { src: `${P}/fe-zustand.png`, w: 31, h: 18 },
      { src: `${P}/fe-07.png`, w: 30, h: 26 },
      { src: `${P}/fe-vitest.png`, w: 30, h: 27 },
      { src: `${P}/fe-09.png`, w: 30, h: 30 },
      { src: `${P}/fe-10.png`, w: 30, h: 30 },
      { src: `${P}/fe-11.png`, w: 30, h: 30, crop: { w: "190.48%", left: "-45.08%" } },
    ],
  },
  {
    category: "BackEnd",
    icons: [
      { src: `${P}/be-01.png`, w: 30, h: 30 },
      { src: `${P}/be-02.png`, w: 30, h: 30 },
      { src: `${P}/be-postgres.png`, w: 30, h: 30 },
      { src: `${P}/be-04.png`, w: 30, h: 30 },
      { src: `${P}/be-05.png`, w: 30, h: 30 },
      { src: `${P}/be-06.png`, w: 30, h: 30 },
      { src: `${P}/be-07.png`, w: 30, h: 30 },
    ],
  },
];

/** 포트폴리오(가로) Skill — 동일 에셋, 20px 기준 치수 */
export const SKILL_ICONS_PF: SkillIconGroup[] = [
  {
    category: "FrontEnd",
    icons: [
      { src: `${P}/fe-ts.png`, w: 20, h: 20 },
      { src: `${P}/fe-react.png`, w: 20, h: 17 },
      { src: `${P}/fe-next.png`, w: 20, h: 20 },
      { src: `${P}/fe-tailwind.png`, w: 20, h: 12 },
      { src: `${P}/fe-05.png`, w: 20, h: 20 },
      { src: `${P}/fe-zustand.png`, w: 31, h: 18 },
      { src: `${P}/fe-07.png`, w: 20, h: 17 },
      { src: `${P}/fe-vitest.png`, w: 20, h: 18 },
      { src: `${P}/fe-09.png`, w: 20, h: 20 },
      { src: `${P}/fe-10.png`, w: 20, h: 20 },
      { src: `${P}/fe-11.png`, w: 20, h: 20, crop: { w: "190.48%", left: "-45.08%" } },
    ],
  },
  {
    category: "BackEnd",
    icons: [
      { src: `${P}/be-01.png`, w: 20, h: 20 },
      { src: `${P}/be-02.png`, w: 20, h: 20 },
      { src: `${P}/be-postgres.png`, w: 20, h: 21 },
      { src: `${P}/be-04.png`, w: 20, h: 20 },
      { src: `${P}/be-05.png`, w: 20, h: 20 },
      { src: `${P}/be-06.png`, w: 20, h: 20 },
      { src: `${P}/be-07.png`, w: 20, h: 20 },
    ],
  },
];
