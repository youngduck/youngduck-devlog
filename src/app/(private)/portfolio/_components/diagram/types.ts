import type { CSSProperties } from "react";

/**
 * 아키텍처 다이어그램 데이터 모델 (피그마 DD-Architecture 1920×1080 기준 px).
 * group 이 items 로 다시 DiagramItem 을 품는 재귀 트리이며,
 * 각 group 은 CSS grid 로 자식을 배치한다(좌표 하드코딩 없음).
 */

interface ItemBase {
  /** 미세 조정용 (margin 등) */
  style?: CSSProperties;
  /**
   * 같은 행 노드의 "박스"에 세로 중심을 맞춘다.
   * (노드는 라벨 + 박스로 구성되므로, 라벨 높이만큼 내려서 박스 높이 안에서 가운데 정렬)
   */
  alignToBox?: boolean;
}

export interface DiagramIcon {
  src: string;
  w: number;
  h: number;
}

/** 아이콘 카드 — 라벨(박스 위) + 아이콘·이름(박스 안) */
export interface NodeItem extends ItemBase {
  type: "node";
  /** md: 100 박스 / lg: 130 (Design) / xl: 300 (Client Framework) */
  size?: "md" | "lg" | "xl";
  label?: string;
  name?: string;
  /** 여러 개면 박스 가운데에 세로로 쌓는다 (예: 카카오/네이버) */
  icon?: DiagramIcon | DiagramIcon[];
  /** 프리셋 박스 크기 대신 (예: 소셜 로그인 130×70) */
  box?: { w: number; h: number };
}

/** 컨테이너 — 자식을 grid 로 재귀 렌더 */
export interface GroupItem extends ItemBase {
  type: "group";
  /** frame: 최외곽 / panel: 회색 내부 영역 / box: 흰 박스 / bare: 테두리 없음 */
  tone?: "frame" | "panel" | "box" | "bare";
  title?: string;
  w?: number;
  h?: number;
  /** CSS padding (테두리 안쪽 기준) */
  padding?: string;
  /** grid-template-columns (기본 1열) */
  cols?: string;
  rows?: string;
  colGap?: number;
  rowGap?: number;
  /** align-items / justify-items */
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyItems"];
  items: DiagramItem[];
}

/** 피그마 화살표 — 3px 선 + 열린 꺾쇠 머리 */
export interface ArrowItem extends ItemBase {
  type: "arrow";
  axis?: "h" | "v";
  /**
   * end: → / ↓   start: ← / ↑   both: ↔   none: 선만
   * pair: 서로 반대 방향 화살표 두 개를 나란히 (⇄)
   */
  head?: "end" | "start" | "both" | "none" | "pair";
  length: number;
  /** 시각적 회전 (deg) */
  angle?: number;
  text?: string;
  /** 선 중심 ↔ 텍스트 중심 거리 */
  textGap?: number;
}

export interface SpacerItem extends ItemBase {
  type: "spacer";
}

export type DiagramItem = NodeItem | GroupItem | ArrowItem | SpacerItem;

/** 색 테마 — 루트에서 CSS 변수로 내려 자식 전체에 적용 */
export interface DiagramTheme {
  border: string;
  text: string;
  arrow: string;
  /** 없으면 그림자 없음 */
  shadow?: string;
  frameBg: string;
  panelBg: string;
}
