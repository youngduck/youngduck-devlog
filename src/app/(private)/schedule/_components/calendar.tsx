"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import Link from "next/link";
import { Ban, ChevronLeft, ChevronRight, GitCommitHorizontal, Plus, Undo2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TodoItem } from "../_lib/notion";
import type { CommitItem } from "../_lib/github";
import { monthCells, shiftMonth } from "../_lib/month";
import { isTempId, useAddTodo, useDeleteTodo, useMissTodo, useTodos, useToggleTodo } from "../_lib/use-todos";
import ProjectFilter, { NO_PROJECT, ProjectMark, projectColor, projectLabel } from "./project-filter";

const DOW = ["일", "월", "화", "수", "목", "금", "토"];
const HIDDEN_KEY = "schedule:hidden-projects";

interface Props {
  month: string;
  today: string;
  todos: TodoItem[];
  commits: CommitItem[];
  projectOptions: string[];
}

function groupBy<T extends { date: string }>(list: T[]) {
  const map = new Map<string, T[]>();
  for (const it of list) map.set(it.date, [...(map.get(it.date) ?? []), it]);
  return map;
}

const todoProject = (t: TodoItem) => t.project ?? NO_PROJECT;

/** "2026-11-19" → "2026-11-22" = 3 (일) */
const daysBetween = (from: string, to: string) => Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);

/** 남은 기한 표시 — 완료·놓침이면 표시하지 않는다 */
function DueBadge({ t, today }: { t: TodoItem; today: string }) {
  if (!t.due || t.done || t.missed) return null;
  const left = daysBetween(today, t.due);
  return (
    <span
      title={`기한 ${Number(t.due.slice(5, 7))}/${Number(t.due.slice(8))} — 지나면 이월하지 않고 놓침 처리`}
      className={cn(
        "ml-1.5 whitespace-nowrap rounded px-1 text-[10px] font-medium",
        left <= 1 ? "bg-red-500/15 text-red-600" : "bg-secondary text-muted-foreground",
      )}
    >
      {left <= 0 ? "오늘 마감" : `D-${left}`}
    </span>
  );
}

export default function Calendar({ month, today, todos, commits, projectOptions }: Props) {
  // 할 일 = React Query 캐시 (첫 값은 서버 렌더 결과). 체크·추가·삭제는 낙관적 업데이트.
  const { data: items } = useTodos(month, todos);
  const toggleMutation = useToggleTodo(month);
  const deleteMutation = useDeleteTodo(month);
  const addMutation = useAddTodo(month);
  const missMutation = useMissTodo(month);
  const pending = useIsMutating({ mutationKey: ["schedule"] }) > 0;

  const [selected, setSelected] = useState(today.startsWith(month) ? today : `${month}-01`);
  useEffect(() => setSelected(today.startsWith(month) ? today : `${month}-01`), [month, today]);

  // 패널이 달력 아래에 있는 화면(lg 1280px 미만)에선 날짜를 누르면 패널로 스크롤
  const panelRef = useRef<HTMLElement>(null);
  const selectDate = (date: string) => {
    setSelected(date);
    if (!window.matchMedia("(min-width: 1280px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  const [draft, setDraft] = useState("");
  const [draftProject, setDraftProject] = useState("");
  const [draftDue, setDraftDue] = useState("");

  // 프로젝트 필터 — 숨긴 프로젝트만 기억 (이 브라우저에만 저장)
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HIDDEN_KEY);
      if (saved) setHidden(new Set(JSON.parse(saved)));
    } catch {
      /* 저장소 사용 불가 시 기본값(전체 표시) */
    }
  }, []);
  const changeHidden = (next: Set<string>) => {
    setHidden(next);
    try {
      localStorage.setItem(HIDDEN_KEY, JSON.stringify([...next]));
    } catch {
      /* noop */
    }
  };

  const projects = useMemo(() => {
    const set = new Set<string>(projectOptions);
    items.forEach((t) => t.project && set.add(t.project));
    commits.forEach((c) => set.add(c.project));
    const list = [...set].sort((a, b) => a.localeCompare(b));
    if (items.some((t) => !t.project)) list.push(NO_PROJECT);
    return list;
  }, [projectOptions, items, commits]);

  const visibleTodos = useMemo(() => items.filter((t) => !hidden.has(todoProject(t))), [items, hidden]);
  const visibleCommits = useMemo(() => commits.filter((c) => !hidden.has(c.project)), [commits, hidden]);

  const todosByDate = useMemo(() => groupBy(visibleTodos), [visibleTodos]);
  const commitsByDate = useMemo(() => groupBy(visibleCommits), [visibleCommits]);
  const cells = useMemo(() => monthCells(month), [month]);

  // 프로젝트 하나만 보고 있으면 새 할 일도 그 프로젝트로
  const shownProjects = projects.filter((p) => p !== NO_PROJECT && !hidden.has(p));
  useEffect(() => {
    if (shownProjects.length === 1) setDraftProject(shownProjects[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownProjects.join("|")]);

  const toggle = (id: string, done: boolean) => toggleMutation.mutate({ id, done });
  const remove = (id: string) => deleteMutation.mutate(id);
  const setMissed = (id: string, missed: boolean) => missMutation.mutate({ id, missed });

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return;
    setDraft("");
    addMutation.mutate({
      tempId: `temp-${Date.now()}`,
      date: selected,
      title,
      project: draftProject.trim() || null,
      due: draftDue && draftDue >= selected ? draftDue : null,
    });
    setDraftDue("");
  };

  const dayTodos = todosByDate.get(selected) ?? [];
  const dayCommits = commitsByDate.get(selected) ?? [];
  const [y, m] = month.split("-");
  const isCurrentMonth = today.startsWith(month);

  return (
    <>
      {/* 머리글 — 1줄: 제목 · 월 이동 / 2줄: 프로젝트 필터 (휴대폰에선 가로 스크롤) */}
      <div className="mb-4 flex items-center gap-2 md:mb-3">
        <h1 className="mr-auto text-xl font-bold md:text-2xl">일정관리</h1>
        <nav className="flex items-center" aria-label="월 이동">
          {!isCurrentMonth && (
            <Link
              href="/schedule"
              className="mr-1 whitespace-nowrap rounded-md border border-border px-2 py-1 text-xs hover:bg-secondary md:px-3 md:py-1.5 md:text-sm"
            >
              이번 달
            </Link>
          )}
          <Link href={`/schedule?month=${shiftMonth(month, -1)}`} className="rounded-md p-2 hover:bg-secondary" aria-label="이전 달">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <span className="whitespace-nowrap text-center font-bold tabular-nums md:min-w-[110px] md:text-lg" aria-live="polite">
            {y}년 {Number(m)}월
          </span>
          <Link href={`/schedule?month=${shiftMonth(month, 1)}`} className="rounded-md p-2 hover:bg-secondary" aria-label="다음 달">
            <ChevronRight className="h-5 w-5" />
          </Link>
        </nav>
      </div>
      <div className="mb-4 md:mb-5">
        <ProjectFilter projects={projects} hidden={hidden} onChange={changeHidden} />
      </div>

      {/* grid-cols-1(= minmax(0,1fr)): 안쪽 입력창 기본 폭 때문에 휴대폰에서 페이지가 넓어지지 않도록 */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1fr_320px]">
        {/* 월 달력 */}
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-7 border-b border-border bg-secondary text-center text-xs font-medium">
            {DOW.map((d, i) => (
              <div key={d} className={cn("py-2", i === 0 && "text-red-500", i === 6 && "text-blue-500")}>
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((date, i) => {
              if (!date)
                return (
                  <div
                    key={`empty-${i}`}
                    className="min-h-[56px] border-b border-r border-border bg-secondary/40 md:min-h-[92px]"
                  />
                );
              const t = todosByDate.get(date) ?? [];
              const c = commitsByDate.get(date) ?? [];
              const doneCount = t.filter((x) => x.done).length;
              const missedCount = t.filter((x) => x.missed).length;
              const commitProjects = [...new Set(c.map((x) => x.project))];
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => selectDate(date)}
                  aria-label={`${Number(date.slice(5, 7))}월 ${Number(date.slice(8))}일, 할 일 ${t.length}개 중 ${doneCount}개 완료${missedCount ? `, ${missedCount}개 놓침` : ""}, 커밋 ${c.length}개`}
                  className={cn(
                    "flex min-h-[56px] flex-col items-center gap-1 border-b border-r border-border p-1 text-left transition-colors pcHover:hover:bg-secondary md:min-h-[92px] md:items-start md:p-1.5",
                    selected === date && "bg-secondary ring-2 ring-inset ring-primary",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                      date === today && "bg-primary text-primary-foreground",
                    )}
                  >
                    {Number(date.slice(8))}
                  </span>

                  {/* 휴대폰: 제목 대신 점 — 할 일은 프로젝트 색(완료는 흐리게), 커밋은 초록 숫자 */}
                  {(t.length > 0 || c.length > 0) && (
                    <span className="flex flex-col items-center gap-0.5 md:hidden">
                      {t.length > 0 && (
                        <span className="flex flex-wrap justify-center gap-0.5">
                          {t.slice(0, 4).map((x) => (
                            <span
                              key={x.id}
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                // 놓침은 빨간 테두리 빈 점
                                x.missed ? "ring-1 ring-inset ring-red-500" : projectColor(todoProject(x)),
                                x.done && "opacity-30",
                              )}
                            />
                          ))}
                        </span>
                      )}
                      {c.length > 0 && (
                        <span className="text-[9px] font-medium leading-none text-emerald-600">+{c.length}</span>
                      )}
                    </span>
                  )}

                  {/* md~: 제목 목록 */}
                  {t.slice(0, 3).map((x) => (
                    <span
                      key={x.id}
                      className={cn(
                        "hidden w-full items-center gap-1 truncate text-[11px] md:flex",
                        x.done && "text-muted-foreground line-through",
                        x.missed && "text-red-500/70 line-through",
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", projectColor(todoProject(x)))} />
                      <span className="truncate">
                        {x.done ? "☑" : x.missed ? "☒" : "☐"} {x.title}
                      </span>
                    </span>
                  ))}
                  {t.length > 3 && <span className="hidden text-[11px] text-muted-foreground md:inline">+{t.length - 3}</span>}
                  <span className="mt-auto hidden items-center gap-1.5 whitespace-nowrap text-[10px] text-muted-foreground md:flex">
                    {t.length > 0 && (
                      <span>
                        {doneCount}/{t.length}
                      </span>
                    )}
                    {missedCount > 0 && <span className="text-red-500">✕{missedCount}</span>}
                    {c.length > 0 && (
                      <span className="flex items-center gap-0.5">
                        {commitProjects.map((p) => (
                          <span key={p} className={cn("h-1.5 w-1.5 rounded-full", projectColor(p))} />
                        ))}
                        <span className="ml-0.5">{c.length}커밋</span>
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 선택한 날 상세 (lg 미만에선 달력 아래 — 날짜를 누르면 여기로 스크롤) */}
        <aside ref={panelRef} className="scroll-mt-4 rounded-xl border border-border p-4">
          <h2 className="mb-3 font-bold">
            {Number(selected.slice(5, 7))}월 {Number(selected.slice(8))}일
            {pending && <span className="ml-2 text-xs font-normal text-muted-foreground">저장 중…</span>}
          </h2>

          <ul className="mb-3 space-y-1.5">
            {dayTodos.map((t) => (
              <li
                key={t.id}
                className={cn("group flex items-center gap-2.5 py-0.5 text-sm md:gap-2 md:py-0", isTempId(t.id) && "opacity-60")}
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  title={t.missed ? "늦게라도 했으면 체크 — 놓침이 풀립니다" : undefined}
                  disabled={isTempId(t.id)}
                  onChange={(e) => toggle(t.id, e.target.checked)}
                  aria-label={`${t.title} 완료`}
                  className="h-5 w-5 shrink-0 accent-primary md:h-4 md:w-4"
                />
                <span
                  className={cn(
                    "flex-1",
                    t.done && "text-muted-foreground line-through",
                    t.missed && "text-muted-foreground line-through decoration-red-500",
                  )}
                >
                  {t.title}
                  {t.project && (
                    <span className="ml-1.5 inline-flex items-center gap-1 align-middle text-xs text-muted-foreground">
                      <ProjectMark project={t.project} size={12} />
                      {projectLabel(t.project)}
                    </span>
                  )}
                  {t.carried > 0 && !t.done && (
                    <span
                      title={`미완료로 ${t.carried}번 이월됨`}
                      className="ml-1.5 rounded bg-amber-500/15 px-1 text-[10px] font-medium text-amber-600"
                    >
                      ↻{t.carried}
                    </span>
                  )}
                  <DueBadge t={t} today={today} />
                  {t.missed && (
                    <span className="ml-1.5 inline-block whitespace-nowrap rounded bg-red-500/15 px-1 text-[10px] font-medium text-red-600">
                      놓침
                    </span>
                  )}
                </span>
                {/* 못 함 — 이월을 멈추고 놓침으로 기록. 놓친 항목은 되돌리기 */}
                {!t.done && (
                  <button
                    type="button"
                    onClick={() => setMissed(t.id, !t.missed)}
                    disabled={isTempId(t.id)}
                    title={t.missed ? "놓침 되돌리기" : "못 함 — 이월하지 않고 놓침으로 기록"}
                    className="-m-1.5 shrink-0 p-1.5 transition-opacity disabled:hidden pcHover:opacity-0 pcHover:group-hover:opacity-100"
                    aria-label={t.missed ? `${t.title} 놓침 되돌리기` : `${t.title} 못 함으로 표시`}
                  >
                    {t.missed ? (
                      <Undo2 className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Ban className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  disabled={isTempId(t.id)}
                  // 터치 기기는 hover 가 없으니 항상 보이고, 마우스 기기에서만 hover 시 노출
                  className="-m-1.5 shrink-0 p-1.5 transition-opacity disabled:hidden pcHover:opacity-0 pcHover:group-hover:opacity-100"
                  aria-label={`${t.title} 삭제`}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </li>
            ))}
            {dayTodos.length === 0 && <li className="text-sm text-muted-foreground">할 일이 없습니다.</li>}
          </ul>

          <form onSubmit={add} className="mb-5 space-y-2">
            <div className="flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="할 일 추가"
                // 휴대폰 16px — iOS 는 16px 미만 입력창을 누르면 화면을 확대한다
                className="h-10 w-0 min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-base md:h-9 md:text-sm"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground md:h-9 md:w-9"
                aria-label="추가"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <input
                list="schedule-projects"
                value={draftProject}
                onChange={(e) => setDraftProject(e.target.value)}
                placeholder="프로젝트 (선택)"
                className="h-10 w-0 min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-base md:h-8 md:text-xs"
              />
              {/* 기한 — 지나면 이월하지 않고 놓침 처리 (비우면 끝날 때까지 계속 이월) */}
              <label className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                기한
                <input
                  type="date"
                  value={draftDue}
                  min={selected}
                  onChange={(e) => setDraftDue(e.target.value)}
                  className="h-10 w-[132px] rounded-md border border-input bg-background px-1.5 text-base text-foreground md:h-8 md:w-[120px] md:text-xs"
                />
              </label>
            </div>
            <datalist id="schedule-projects">
              {projects
                .filter((p) => p !== NO_PROJECT)
                .map((p) => (
                  <option key={p} value={p} />
                ))}
            </datalist>
          </form>

          {dayCommits.length > 0 && (
            <>
              <h3 className="mb-2 text-xs font-medium text-muted-foreground">GitHub 커밋 (자동 완료)</h3>
              <ul className="space-y-1.5">
                {dayCommits.map((c) => (
                  <li key={c.sha} className="flex items-start gap-2 text-sm">
                    <GitCommitHorizontal className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <Link href={c.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      <span className="text-muted-foreground">{projectLabel(c.project)}</span> {c.message}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
