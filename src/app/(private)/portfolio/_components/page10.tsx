import Diagram, { DiagramStage } from "./diagram/diagram";
import type { DiagramIcon, DiagramItem, DiagramTheme } from "./diagram/types";

/** 9페이지(DD-Architecture)와 같은 컴포넌트·치수로 그린 YD-Tech 블로그 설계도 */
const P9 = "/assets/resume/logos/p9";
const P10 = "/assets/resume/logos/p10";
const png = (n: string, w = 65, h = 65): DiagramIcon => ({ src: `${P9}/${n}.png`, w, h });
const svg = (n: string, w = 60, h = 60): DiagramIcon => ({ src: `${P10}/${n}.svg`, w, h });

/** YD-Tech 톤 — 노란 테두리, 그림자 없음 */
const THEME: DiagramTheme = {
  border: "#f1c93b",
  text: "#5c4205",
  arrow: "#d4a21a",
  frameBg: "#fffdf5",
  panelBg: "#fffaea",
};

/** 상단: 글 작성 → 배포 / UI 리뷰 흐름 */
const WORKFLOW: DiagramItem = {
  type: "group",
  cols: "auto 1fr auto auto auto auto auto auto auto",
  style: { width: 1331, paddingLeft: 62, paddingRight: 20 },
  items: [
    {
      type: "group",
      justify: "center",
      style: { marginTop: 3 },
      items: [
        { type: "node", size: "lg", label: "Content", name: "Markdown", icon: svg("markdown", 90, 75) },
        { type: "arrow", axis: "v", length: 52 },
      ],
    },
    { type: "spacer" },
    {
      type: "group",
      justify: "center",
      rowGap: 24,
      items: [
        { type: "node", label: "Code & Post", name: "Github", icon: png("github") },
        { type: "arrow", axis: "v", length: 80 },
      ],
    },
    { type: "arrow", length: 80, text: "push", textGap: 23, alignToBox: true, style: { margin: "0 14px" } },
    { type: "node", label: "CI/CD & Host", name: "Vercel", icon: png("vercel") },
    { type: "spacer", style: { width: 60 } },
    { type: "node", label: "Workflow", name: "GH Actions", icon: svg("githubactions") },
    { type: "arrow", length: 80, text: "UI Review", textGap: 23, alignToBox: true, style: { margin: "0 14px" } },
    { type: "node", label: "Visual Test", name: "Chromatic", icon: svg("chromatic") },
  ],
};

const TOOLBOX: DiagramItem = {
  type: "group",
  tone: "box",
  w: 640,
  h: 150,
  padding: "6px 0 0 31px",
  cols: "repeat(5, 100px)",
  colGap: 20,
  items: [
    { type: "node", label: "Package Manager", name: "npm", icon: svg("npm") },
    { type: "node", label: "Linter", name: "ESlint", icon: png("eslint", 63.26, 65) },
    { type: "node", label: "Formatter", name: "Prettier", icon: png("prettier", 60, 60) },
    { type: "node", label: "Language", name: "Typescript", icon: png("ts") },
    { type: "node", label: "CSS", name: "Tailwind", icon: png("tailwind", 65, 39.81) },
  ],
};

/** FrontEnd 좌측: 개발 보조 도구 ⇄ Client Framework */
const FE_SIDE: DiagramItem = {
  type: "group",
  cols: "130px 31px 100px 61px",
  rowGap: 16,
  style: { marginTop: 20 },
  items: [
    { type: "spacer" },
    { type: "spacer" },
    { type: "node", label: "UI Catalog", name: "Storybook", icon: svg("storybook") },
    { type: "arrow", head: "pair", length: 45, alignToBox: true, style: { marginLeft: 9 } },

    { type: "spacer" },
    { type: "spacer" },
    { type: "node", label: "API Mocking", name: "MSW", icon: svg("mockserviceworker") },
    { type: "arrow", head: "pair", length: 45, alignToBox: true, style: { marginLeft: 9 } },

    { type: "spacer" },
    { type: "spacer" },
    { type: "node", label: "Comment", name: "Giscus", icon: png("github") },
    { type: "arrow", head: "start", length: 45, alignToBox: true, style: { marginLeft: 9 } },
  ],
};

const FRONTEND: DiagramItem = {
  type: "group",
  tone: "box",
  title: "FrontEnd",
  w: 700,
  h: 600,
  padding: "12px 0 0 28px",
  items: [
    TOOLBOX,
    {
      type: "group",
      cols: "auto auto",
      style: { marginLeft: 17, marginTop: -1 },
      items: [
        FE_SIDE,
        {
          type: "group",
          justify: "center",
          rowGap: 12,
          items: [
            { type: "arrow", axis: "v", length: 53, text: "husky · lint-staged" },
            { type: "node", size: "xl", label: "Client Framework", name: "Next15 App Router", icon: png("next", 200, 200) },
          ],
        },
      ],
    },
  ],
};

/** 화면 라이브러리 + FrontEnd ↔ Route Handler 통신 */
const MIDDLE: DiagramItem = {
  type: "group",
  justify: "center",
  rowGap: 15,
  w: 160,
  style: { marginTop: 140, marginLeft: 24 },
  items: [
    { type: "node", label: "Stats Chart", name: "Chart.js", icon: svg("chartdotjs") },
    { type: "node", label: "Animation", name: "GSAP", icon: svg("greensock") },
    { type: "arrow", head: "both", length: 160, text: "fetch", textGap: 20, style: { margin: "6px 0" } },
    { type: "node", label: "Offline Cache", name: "next-pwa", icon: svg("pwa") },
  ],
};

/** Route Handler: 파일 기반 게시글 + Notion 스크랩 */
const BACKEND: DiagramItem = {
  type: "group",
  tone: "box",
  title: "Route Handler",
  w: 360,
  h: 360,
  padding: "26px 0 0 32px",
  cols: "100px 90px 100px",
  rows: "121px 60px 121px",
  style: { marginTop: 40, marginLeft: 19 },
  items: [
    { type: "node", label: "REST-API", name: "/api/blog", icon: png("next") },
    { type: "arrow", length: 71, text: "fs read", textGap: 14, alignToBox: true, style: { marginLeft: 10 } },
    { type: "node", label: "Post Files", name: "gray-matter", icon: svg("markdown", 65, 40) },
    { type: "spacer" },
    { type: "spacer" },
    { type: "spacer" },
    { type: "node", label: "REST-API", name: "/api/scrap", icon: png("next") },
    { type: "arrow", length: 71, text: "fetch", textGap: 14, alignToBox: true, style: { marginLeft: 10 } },
    { type: "node", label: "Scrap DB", name: "Notion API", icon: svg("notion") },
  ],
};

const MONITOR: DiagramItem = {
  type: "group",
  justify: "center",
  rowGap: 6,
  style: { marginTop: 20 },
  items: [
    { type: "arrow", axis: "v", head: "start", length: 30 },
    { type: "node", label: "Error Tracking", name: "Sentry", icon: svg("sentry") },
  ],
};

const ROOT: DiagramItem = {
  type: "group",
  tone: "frame",
  w: 1440,
  h: 960,
  padding: "14px 0 0 61px",
  rowGap: 12,
  items: [
    WORKFLOW,
    {
      type: "group",
      tone: "panel",
      w: 1331,
      h: 669,
      padding: "4px 0 0 10px",
      cols: "auto auto auto",
      items: [
        FRONTEND,
        MIDDLE,
        { type: "group", justify: "center", items: [BACKEND, MONITOR] },
      ],
    },
  ],
};

export default function PortfolioPage10() {
  return (
    <DiagramStage background="#fffdf8" caption="Architecture - 기술블로그 YD-Tech">
      <Diagram root={ROOT} theme={THEME} />
    </DiagramStage>
  );
}
