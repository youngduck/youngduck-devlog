"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { PROJECT_META } from "../_data/projects";

export const NO_PROJECT = "__none__";

const DOT_COLORS = [
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-fuchsia-500",
];

/** 프로젝트 이름 → 항상 같은 색 */
export function projectColor(project: string): string {
  if (project === NO_PROJECT) return "bg-muted-foreground";
  let h = 0;
  for (const ch of project) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return DOT_COLORS[h % DOT_COLORS.length];
}

export function projectLabel(project: string): string {
  if (project === NO_PROJECT) return "기타";
  return PROJECT_META[project]?.label ?? project;
}

/** 로고가 있으면 로고, 없으면 색 점 (달력 칸의 점과 같은 색) */
export function ProjectMark({ project, size = 16 }: { project: string; size?: number }) {
  const logo = PROJECT_META[project]?.logo;
  if (!logo) return <span className={cn("h-2 w-2 shrink-0 rounded-full", projectColor(project))} />;
  return <Image src={logo} alt="" width={size} height={size} className="shrink-0 rounded-sm object-contain" />;
}

interface Props {
  projects: string[];
  hidden: Set<string>;
  onChange: (hidden: Set<string>) => void;
}

/** 프로젝트별 표시 체크박스. "숨긴 것" 을 기억하므로 새 프로젝트는 기본으로 보인다. */
export default function ProjectFilter({ projects, hidden, onChange }: Props) {
  const allVisible = projects.every((p) => !hidden.has(p));

  const toggle = (p: string) => {
    const next = new Set(hidden);
    if (next.has(p)) next.delete(p);
    else next.add(p);
    onChange(next);
  };

  /** 이 프로젝트만 보기 */
  const only = (p: string) => onChange(new Set(projects.filter((x) => x !== p)));

  if (projects.length === 0) return null;

  return (
    // 휴대폰: 한 줄 가로 스크롤 (화면 끝까지 붙도록 -mx-4) · md~: 줄바꿈
    // min-w-0: fieldset 기본값 min-inline-size:min-content 가 가로 스크롤 대신 페이지를 넓히는 것을 막는다
    <fieldset className="-mx-4 flex min-w-0 items-center gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
      <legend className="sr-only">프로젝트 필터</legend>
      <label
        className={cn(
          "flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs md:py-1",
          allVisible && "bg-secondary",
        )}
      >
        <input
          type="checkbox"
          checked={allVisible}
          onChange={() => onChange(allVisible ? new Set(projects) : new Set())}
          className="h-3.5 w-3.5 accent-primary"
        />
        전체
      </label>
      {projects.map((p) => (
        <label
          key={p}
          title="더블클릭하면 이 프로젝트만 봅니다"
          onDoubleClick={(e) => {
            e.preventDefault();
            only(p);
          }}
          className={cn(
            "flex shrink-0 cursor-pointer select-none items-center gap-1.5 whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs transition-opacity md:py-1",
            hidden.has(p) && "opacity-50",
          )}
        >
          <input
            type="checkbox"
            checked={!hidden.has(p)}
            onChange={() => toggle(p)}
            className="h-3.5 w-3.5 accent-primary"
          />
          <ProjectMark project={p} />
          {projectLabel(p)}
          {/* 달력 칸의 점 색과 짝을 맞추는 표시 */}
          <span className={cn("h-1.5 w-1.5 rounded-full", projectColor(p))} aria-hidden />
        </label>
      ))}
    </fieldset>
  );
}
