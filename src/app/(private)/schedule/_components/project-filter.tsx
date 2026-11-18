"use client";

import { cn } from "@/lib/utils";

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
  return project === NO_PROJECT ? "기타" : project;
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
    <fieldset className="flex flex-wrap items-center gap-1.5">
      <legend className="sr-only">프로젝트 필터</legend>
      <label
        className={cn(
          "flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs",
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
            "flex cursor-pointer select-none items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs transition-opacity",
            hidden.has(p) && "opacity-50",
          )}
        >
          <input
            type="checkbox"
            checked={!hidden.has(p)}
            onChange={() => toggle(p)}
            className="h-3.5 w-3.5 accent-primary"
          />
          <span className={cn("h-2 w-2 rounded-full", projectColor(p))} />
          {projectLabel(p)}
        </label>
      ))}
    </fieldset>
  );
}
