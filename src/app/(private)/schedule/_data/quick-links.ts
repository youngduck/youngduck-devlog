/**
 * 일정관리 상단 바로가기 카드.
 * 카드 = 프로젝트, 아이콘 = 그 프로젝트의 운영 도구 링크.
 * 아이콘 이미지는 public/assets/schedule/links/ (Simple Icons 브랜드 SVG).
 */
import { PROJECT_META } from "./projects";

export interface QuickTool {
  name: string;
  icon: string;
  href: string;
}

export interface QuickProject {
  name: string;
  desc: string;
  logo: string;
  home: string;
  tools: QuickTool[];
}

const ICON = (slug: string) => `/assets/schedule/links/${slug}.svg`;

export const QUICK_PROJECTS: QuickProject[] = [
  {
    name: PROJECT_META["youngduck-devlog"].label,
    desc: "youngduck-devlog · Next.js",
    logo: PROJECT_META["youngduck-devlog"].logo,
    home: "https://youngduck-devlog.vercel.app/",
    tools: [
      { name: "GitHub", icon: ICON("github"), href: "https://github.com/youngduck/youngduck-devlog" },
      { name: "Vercel", icon: ICON("vercel"), href: "https://vercel.com/youngducks-projects/youngduck-devlog" },
      { name: "Sentry", icon: ICON("sentry"), href: "https://sentry.io/auth/login/yd-sentry-labs/" },
      {
        name: "Chromatic",
        icon: ICON("chromatic"),
        href: "https://www.chromatic.com/builds?appId=6763900058319587c2573609",
      },
    ],
  },
  {
    name: PROJECT_META["yd-ui"].label,
    desc: "@youngduck/yd-ui · 디자인 시스템",
    logo: PROJECT_META["yd-ui"].logo,
    home: "https://yds-yd-ui.vercel.app/",
    tools: [
      { name: "GitHub", icon: ICON("github"), href: "https://github.com/youngduck/yd-ui" },
      { name: "npm", icon: ICON("npm"), href: "https://www.npmjs.com/package/@youngduck/yd-ui" },
      {
        name: "Storybook",
        icon: ICON("storybook"),
        href: "https://main--690969bfd75edb1c2e672267.chromatic.com/?path=/story/foundations-colors--all-colors",
      },
      {
        name: "Chromatic",
        icon: ICON("chromatic"),
        href: "https://www.chromatic.com/builds?appId=690969bfd75edb1c2e672267",
      },
    ],
  },
  {
    name: PROJECT_META["bdks-fe"].label,
    desc: "bdks-fe · 실시간 평점 서비스",
    logo: PROJECT_META["bdks-fe"].logo,
    home: "https://bdks.vercel.app/",
    tools: [
      { name: "GitHub", icon: ICON("github"), href: "https://github.com/BorussiaDortmundKorea-Scored/bdks-fe" },
      {
        name: "Supabase",
        icon: ICON("supabase"),
        href: "https://supabase.com/dashboard/project/abxgeyabzwzrorecsjcd",
      },
      { name: "Sentry", icon: ICON("sentry"), href: "https://sentry.io/auth/login/yd-sentry-labs/" },
      {
        name: "Google Analytics",
        icon: ICON("googleanalytics"),
        href: "https://analytics.google.com/analytics/web/#/a385394288p525729562/reports/intelligenthome?params=_u..nav%3Dmaui",
      },
    ],
  },
];
