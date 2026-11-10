import type { CSSProperties } from "react";
import type {
  ArrowItem,
  DiagramIcon,
  DiagramItem,
  DiagramTheme,
  GroupItem,
  NodeItem,
} from "./types";

/**
 * 재귀 다이어그램 렌더러 — 피그마 DD-Architecture 스펙(1920×1080, Inter Bold) 그대로.
 * <DiagramStage> 가 1920×1080 무대를 A4 가로(842px)에 맞춰 축소하고,
 * <Diagram> 이 그룹 → 그리드 → 노드/화살표를 재귀로 그린다.
 * 색은 루트의 CSS 변수(--dg-*)로만 참조하므로 테마 교체가 자유롭다.
 */

const STAGE_W = 1920;
const STAGE_H = 1080;
const PAGE_W = 842;
const PAGE_H = 595;

/** 1920×1080 무대를 A4 가로 캔버스(842×595)에 맞춰 축소. 레이아웃 높이가 남지 않도록 absolute 배치. */
export function DiagramStage({
  background,
  caption,
  children,
}: {
  background: string;
  caption: string;
  children: React.ReactNode;
}) {
  const scale = PAGE_W / STAGE_W;
  return (
    <div className="relative overflow-hidden" style={{ width: PAGE_W, height: PAGE_H, background }}>
      <p className="absolute right-[24px] top-[16px] z-10 whitespace-nowrap text-[10px] text-[#343a46]">
        {caption}
      </p>
      <div
        className="absolute left-0 flex items-center justify-center"
        style={{
          top: (PAGE_H - STAGE_H * scale) / 2,
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Diagram({ root, theme }: { root: DiagramItem; theme: DiagramTheme }) {
  const vars = {
    "--dg-border": theme.border,
    "--dg-text": theme.text,
    "--dg-arrow": theme.arrow,
    "--dg-shadow-frame": theme.shadow ? `6px 6px 12px 0 ${theme.shadow}` : "none",
    "--dg-shadow-node": theme.shadow ? `0 6px 12px 0 ${theme.shadow}` : "none",
    "--dg-frame-bg": theme.frameBg,
    "--dg-panel-bg": theme.panelBg,
    fontFamily: "Inter, sans-serif",
  } as CSSProperties;

  return (
    <div style={vars} className="font-bold leading-normal text-[color:var(--dg-text)]">
      <DiagramItemView item={root} />
    </div>
  );
}

/* ---------------------------------- 공통 ---------------------------------- */

const LINE_H = 1.21; // Inter line-height: normal
const lineHeight = (size: number) => Math.round(size * LINE_H);

/** md 노드의 라벨(14px → 17) + 라벨 간격(4) = 박스 시작 y */
const MD_LABEL_OFFSET = 21;
const MD_BOX = 100;

function DiagramItemView({ item }: { item: DiagramItem }) {
  const view = (() => {
    switch (item.type) {
      case "group":
        return <DiagramGroup group={item} />;
      case "node":
        return <DiagramNode node={item} />;
      case "arrow":
        return <DiagramArrow arrow={item} />;
      case "spacer":
        return <div style={item.style} />;
    }
  })();

  if (!item.alignToBox) return view;
  return (
    <div className="flex items-center justify-center" style={{ marginTop: MD_LABEL_OFFSET, height: MD_BOX }}>
      {view}
    </div>
  );
}

/* --------------------------------- 그룹 ---------------------------------- */

const GROUP_TONE: Record<NonNullable<GroupItem["tone"]>, CSSProperties> = {
  frame: {
    border: "4px solid var(--dg-border)",
    borderRadius: 30,
    background: "var(--dg-frame-bg)",
    boxShadow: "var(--dg-shadow-frame)",
  },
  panel: { border: "3px solid var(--dg-border)", borderRadius: 30, background: "var(--dg-panel-bg)" },
  box: { border: "3px solid var(--dg-border)", borderRadius: 30, background: "#ffffff" },
  bare: {},
};

const GROUP_TITLE_SIZE = 30;
const GROUP_TITLE_GAP = 8;

function DiagramGroup({ group }: { group: GroupItem }) {
  const { tone = "bare", title, w, h, padding, cols, rows, colGap = 0, rowGap = 0, align = "start", justify, items, style } = group;

  const box = (
    <div
      className="grid"
      style={{
        ...GROUP_TONE[tone],
        width: w,
        height: h,
        padding,
        gridTemplateColumns: cols,
        gridTemplateRows: rows,
        columnGap: colGap,
        rowGap,
        alignItems: align,
        justifyItems: justify,
        ...(title ? undefined : style),
      }}
    >
      {items.map((child, i) => (
        <DiagramItemView key={i} item={child} />
      ))}
    </div>
  );

  if (!title) return box;
  return (
    <div className="flex flex-col items-center" style={{ gap: GROUP_TITLE_GAP, ...style }}>
      <p className="whitespace-nowrap" style={{ fontSize: GROUP_TITLE_SIZE }}>
        {title}
      </p>
      {box}
    </div>
  );
}

/* --------------------------------- 노드 ---------------------------------- */

/** 피그마 실측: 박스 크기 / 라벨·이름 폰트 / 라벨-박스 간격 / 아이콘 영역 / 박스 내부 상하 여백(테두리 포함) */
const NODE_PRESET = {
  md: { box: 100, label: 14, name: 14, labelGap: 4, slot: 65, padTop: 11, padBottom: 7 },
  lg: { box: 130, label: 24, name: 20, labelGap: 2, slot: 75, padTop: 22, padBottom: 5 },
  xl: { box: 300, label: 28, name: 24, labelGap: 13, slot: 200, padTop: 21, padBottom: 23 },
};
const NODE_BORDER = 3;

function DiagramNode({ node }: { node: NodeItem }) {
  const p = NODE_PRESET[node.size ?? "md"];
  const w = node.box?.w ?? p.box;
  const h = node.box?.h ?? p.box;
  const icons: DiagramIcon[] = node.icon === undefined ? [] : Array.isArray(node.icon) ? node.icon : [node.icon];

  const iconImgs = icons.map((ic) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={ic.src} src={ic.src} alt="" className="block object-contain" style={{ width: ic.w, height: ic.h }} />
  ));

  return (
    // 셀 폭 = 박스 폭. 라벨이 더 길면 가운데 기준으로 양옆으로 넘친다(피그마와 동일).
    <div className="flex flex-col items-center" style={{ width: w, gap: p.labelGap, ...node.style }}>
      {node.label && (
        <p className="whitespace-nowrap" style={{ fontSize: p.label, lineHeight: `${lineHeight(p.label)}px` }}>
          {node.label}
        </p>
      )}
      <div
        className="flex shrink-0 flex-col items-center bg-white"
        style={{
          width: w,
          height: h,
          border: `${NODE_BORDER}px solid var(--dg-border)`,
          borderRadius: 10,
          boxShadow: "var(--dg-shadow-node)",
          ...(node.name
            ? { justifyContent: "space-between", paddingTop: p.padTop - NODE_BORDER, paddingBottom: p.padBottom - NODE_BORDER }
            : { justifyContent: "center", gap: 8 }),
        }}
      >
        {node.name ? (
          <>
            <div className="flex items-center justify-center" style={{ height: p.slot }}>
              {iconImgs}
            </div>
            <p className="whitespace-nowrap" style={{ fontSize: p.name, lineHeight: `${lineHeight(p.name)}px` }}>
              {node.name}
            </p>
          </>
        ) : (
          iconImgs
        )}
      </div>
    </div>
  );
}

/* -------------------------------- 화살표 --------------------------------- */

const ARROW_T = 22; // 화살촉 포함 두께 (피그마 22.09)
const HEAD = 10.6; // 꺾쇠 날개 길이
const STROKE = 3;
const PAIR_GAP = { h: 18, v: 26 }; // 나란한 두 화살표 중심 간격

/** 가로 기준 화살표 SVG (세로는 바깥에서 회전) */
function ArrowLine({ length, start, end }: { length: number; start: boolean; end: boolean }) {
  const c = ARROW_T / 2;
  const d = [
    `M0 ${c}H${length}`,
    end && `M${length - HEAD} ${c - HEAD}L${length} ${c}L${length - HEAD} ${c + HEAD}`,
    start && `M${HEAD} ${c - HEAD}L0 ${c}L${HEAD} ${c + HEAD}`,
  ]
    .filter(Boolean)
    .join("");
  return (
    <svg width={length} height={ARROW_T} viewBox={`0 0 ${length} ${ARROW_T}`} overflow="visible" className="block">
      <path d={d} stroke="var(--dg-arrow)" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function DiagramArrow({ arrow }: { arrow: ArrowItem }) {
  const { axis = "h", head = "end", length, angle, text, textGap = 18, style } = arrow;
  const vertical = axis === "v";

  // 가로 기준 화살표 하나(들)의 배치: [중심 오프셋, start, end]
  const lines: [number, boolean, boolean][] =
    head === "pair"
      ? [
          [-PAIR_GAP[axis] / 2, vertical, !vertical], // 가로: 위쪽 → / 세로: 왼쪽 ↑
          [PAIR_GAP[axis] / 2, !vertical, vertical], // 가로: 아래쪽 ← / 세로: 오른쪽 ↓
        ]
      : [[0, head === "start" || head === "both", head === "end" || head === "both"]];

  const thick = ARROW_T + (head === "pair" ? PAIR_GAP[axis] : 0);
  const [w, h] = vertical ? [thick, length] : [length, thick];

  return (
    <div
      className="relative shrink-0"
      style={{ width: w, height: h, transform: angle ? `rotate(${angle}deg)` : undefined, ...style }}
    >
      {lines.map(([offset, s, e], i) => (
        <div
          key={i}
          className="absolute"
          style={
            vertical
              ? {
                  left: thick / 2 + offset - length / 2,
                  top: length / 2 - ARROW_T / 2,
                  transform: "rotate(90deg)",
                }
              : { left: 0, top: thick / 2 + offset - ARROW_T / 2 }
          }
        >
          <ArrowLine length={length} start={s} end={e} />
        </div>
      ))}
      {text && (
        // 가로 화살표는 선 위, 세로 화살표는 선 오른쪽에 표기
        <p
          className="absolute whitespace-nowrap text-[14px]"
          style={
            vertical
              ? { top: "50%", left: `calc(50% + ${textGap}px)`, transform: "translateY(-50%)" }
              : { top: `calc(50% - ${textGap}px)`, left: "50%", transform: "translate(-50%, -50%)" }
          }
        >
          {text}
        </p>
      )}
    </div>
  );
}
