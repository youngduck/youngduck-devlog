import Diagram, { DiagramStage } from "./diagram/diagram";
import type { DiagramIcon, DiagramItem, DiagramTheme } from "./diagram/types";

/** 피그마: 엘리오 홈페이지 > DD-Architecture (1177:153) */
const P = "/assets/resume/logos/p9";
const ic = (n: string, w = 65, h = 65): DiagramIcon => ({ src: `${P}/${n}.png`, w, h });

const THEME: DiagramTheme = {
  border: "#1a5d1a",
  text: "#1a5d1a",
  arrow: "#1a5d1a",
  shadow: "#f1c93b",
  frameBg: "#f7f6f9",
  panelBg: "#f6f8f9",
};

/** 상단 협업·배포 흐름 (Design ↓ / Jira ↔ Github ↔ Vercel, Lighthouse) */
const WORKFLOW: DiagramItem = {
  type: "group",
  cols: "auto 1fr auto auto auto auto auto auto",
  style: { paddingLeft: 62, paddingRight: 20 },
  items: [
    {
      type: "group",
      justify: "center",
      style: { marginTop: 3 },
      items: [
        { type: "node", size: "lg", label: "Design", name: "Figma", icon: ic("figma", 100, 75) },
        { type: "arrow", axis: "v", length: 52 },
      ],
    },
    { type: "spacer" },
    { type: "node", label: "Automatic Branch", name: "Jira", icon: ic("jira", 62.83, 65) },
    { type: "arrow", head: "both", length: 80, text: "ticket driven", textGap: 23, alignToBox: true, style: { margin: "0 14px" } },
    {
      type: "group",
      justify: "center",
      rowGap: 24,
      style: { marginTop: 1 },
      items: [
        { type: "node", label: "Code Manage", name: "Github", icon: ic("github") },
        { type: "arrow", axis: "v", head: "both", length: 80 },
      ],
    },
    { type: "arrow", head: "both", length: 80, alignToBox: true, style: { margin: "1px 31px 0 32px" } },
    { type: "node", label: "CI/CD & Host", name: "Vercel", icon: ic("vercel"), style: { marginTop: 1 } },
    { type: "node", label: "Optimization", name: "Lighthouse", icon: ic("lighthouse"), style: { marginTop: 1, marginLeft: 20 } },
  ],
};

/** FrontEnd 상단 툴 박스 */
const TOOLBOX: DiagramItem = {
  type: "group",
  tone: "box",
  w: 640,
  h: 150,
  padding: "6px 0 0 31px",
  cols: "repeat(5, 100px)",
  colGap: 20,
  items: [
    { type: "node", label: "Package Manager", name: "yarn berry", icon: ic("yarn") },
    { type: "node", label: "Linter", name: "ESlint", icon: ic("eslint", 63.26, 65) },
    { type: "node", label: "Formatter", name: "Prettier", icon: ic("prettier", 60, 60) },
    { type: "node", label: "Language", name: "Typescript", icon: ic("ts") },
    { type: "node", label: "css in js", name: "Tailwind", icon: ic("tailwind", 65, 39.81) },
  ],
};

/** FrontEnd 좌측: 소셜 — Next-Auth ⇄ / Vitest ← / Recoil ⇄ (Client Framework 방향) */
const FE_SIDE: DiagramItem = {
  type: "group",
  cols: "130px 31px 100px 61px",
  rowGap: 16,
  style: { marginTop: 20 },
  items: [
    {
      type: "node",
      box: { w: 130, h: 70 },
      icon: [ic("kakao", 60, 33.33), ic("naver", 60, 11.52)],
      alignToBox: true,
    },
    { type: "arrow", head: "none", length: 30, alignToBox: true },
    { type: "node", label: "Session Login", name: "Next-Auth", icon: ic("next") },
    { type: "arrow", head: "pair", length: 45, angle: 20, alignToBox: true, style: { marginLeft: 9 } },

    { type: "spacer" },
    { type: "spacer" },
    { type: "node", label: "Unit test", name: "Vitest", icon: ic("vitest", 65, 59.37) },
    { type: "arrow", head: "start", length: 45, alignToBox: true, style: { marginLeft: 9 } },

    { type: "spacer" },
    { type: "spacer" },
    { type: "node", label: "Status Management", name: "Recoil", icon: ic("recoil") },
    { type: "arrow", head: "pair", length: 45, alignToBox: true, style: { marginLeft: 9 } },
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
            { type: "arrow", axis: "v", length: 53 },
            { type: "node", size: "xl", label: "Client Framework", name: "Next14 app routes", icon: ic("next", 200, 200) },
          ],
        },
      ],
    },
  ],
};

/** FrontEnd ↔ BackEnd 사이 통신 계층 */
const NETWORK: DiagramItem = {
  type: "group",
  justify: "center",
  w: 160,
  style: { marginTop: 206, marginLeft: 24 },
  items: [
    { type: "node", label: "API통신", name: "Axios", icon: ic("axios", 65, 16.48) },
    { type: "arrow", head: "both", length: 160, style: { margin: "-2px 0 -5px" } },
    { type: "node", label: "Cache", name: "React-Query", icon: ic("react-query", 65, 57.98) },
  ],
};

const BACKEND: DiagramItem = {
  type: "group",
  tone: "box",
  title: "BackEnd",
  w: 360,
  h: 360,
  padding: "26px 0 0 32px",
  cols: "100px 90px 100px",
  rows: "121px 60px 121px",
  style: { marginTop: 204, marginLeft: 19 },
  items: [
    { type: "node", label: "REST-API", name: "Next-API", icon: ic("next") },
    { type: "arrow", length: 71, text: "문서화", textGap: 14, alignToBox: true, style: { marginLeft: 10 } },
    { type: "node", label: "API Doc", name: "Swagger", icon: ic("swagger") },
    { type: "arrow", axis: "v", head: "pair", length: 40, style: { alignSelf: "center", justifySelf: "center" } },
    { type: "spacer" },
    { type: "spacer" },
    { type: "node", label: "DB", name: "MongoDB", icon: ic("mongo") },
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
    { ...WORKFLOW, style: { ...(WORKFLOW.style ?? {}), width: 1331 } },
    {
      type: "group",
      tone: "panel",
      w: 1331,
      h: 669,
      padding: "4px 0 0 10px",
      cols: "auto auto auto",
      items: [FRONTEND, NETWORK, BACKEND],
    },
  ],
};

export default function PortfolioPage9() {
  return (
    <DiagramStage background="#f5f5f5" caption="Architecture - 엘리오 홈페이지">
      <Diagram root={ROOT} theme={THEME} />
    </DiagramStage>
  );
}
