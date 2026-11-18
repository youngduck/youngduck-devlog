"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, GitCommitHorizontal, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TodoItem } from "../_lib/notion";
import type { CommitItem } from "../_lib/github";
import { monthCells, shiftMonth } from "../_lib/month";
import { addTodoAction, deleteTodoAction, toggleTodoAction } from "../actions";
import ProjectFilter, { NO_PROJECT, projectColor, projectLabel } from "./project-filter";

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

export default function Calendar({ month, today, todos, commits, projectOptions }: Props) {
  // 서버에서 새로 받은 목록으로 동기화 + 체크는 낙관적으로 먼저 반영
  const [items, setItems] = useState(todos);
  useEffect(() => setItems(todos), [todos]);

  const [selected, setSelected] = useState(today.startsWith(month) ? today : `${month}-01`);
  useEffect(() => setSelected(today.startsWith(month) ? today : `${month}-01`), [month, today]);

  const [pending, startTransition] = useTransition();
  const [draft, setDraft] = useState("");
  const [draftProject, setDraftProject] = useState("");

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

  const toggle = (id: string, done: boolean) => {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));
    startTransition(() => toggleTodoAction(id, done));
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    startTransition(() => deleteTodoAction(id));
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return;
    setDraft("");
    startTransition(() => addTodoAction(selected, title, draftProject.trim() || null));
  };

  const dayTodos = todosByDate.get(selected) ?? [];
  const dayCommits = commitsByDate.get(selected) ?? [];
  const [y, m] = month.split("-");
  const isCurrentMonth = today.startsWith(month);

  return (
    <>
      {/* 머리글: 제목 · 프로젝트 필터 · 월 이동(‹ 보고 있는 달 ›) */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="mr-auto text-2xl font-bold">일정관리</h1>
        <ProjectFilter projects={projects} hidden={hidden} onChange={changeHidden} />
        <nav className="flex items-center gap-1" aria-label="월 이동">
          <Link href={`/schedule?month=${shiftMonth(month, -1)}`} className="rounded-md p-2 hover:bg-secondary" aria-label="이전 달">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <span className="min-w-[110px] text-center text-lg font-bold tabular-nums" aria-live="polite">
            {y}년 {Number(m)}월
          </span>
          <Link href={`/schedule?month=${shiftMonth(month, 1)}`} className="rounded-md p-2 hover:bg-secondary" aria-label="다음 달">
            <ChevronRight className="h-5 w-5" />
          </Link>
          {!isCurrentMonth && (
            <Link
              href="/schedule"
              className="ml-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary"
            >
              이번 달로
            </Link>
          )}
        </nav>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
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
                return <div key={`empty-${i}`} className="min-h-[92px] border-b border-r border-border bg-secondary/40" />;
              const t = todosByDate.get(date) ?? [];
              const c = commitsByDate.get(date) ?? [];
              const doneCount = t.filter((x) => x.done).length;
              const commitProjects = [...new Set(c.map((x) => x.project))];
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelected(date)}
                  className={cn(
                    "flex min-h-[92px] flex-col items-start gap-1 border-b border-r border-border p-1.5 text-left transition-colors hover:bg-secondary",
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
                  {t.slice(0, 3).map((x) => (
                    <span
                      key={x.id}
                      className={cn(
                        "flex w-full items-center gap-1 truncate text-[11px]",
                        x.done && "text-muted-foreground line-through",
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", projectColor(todoProject(x)))} />
                      <span className="truncate">
                        {x.done ? "☑" : "☐"} {x.title}
                      </span>
                    </span>
                  ))}
                  {t.length > 3 && <span className="text-[11px] text-muted-foreground">+{t.length - 3}</span>}
                  <span className="mt-auto flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    {t.length > 0 && (
                      <span>
                        {doneCount}/{t.length}
                      </span>
                    )}
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

        {/* 선택한 날 상세 */}
        <aside className="rounded-xl border border-border p-4">
          <h2 className="mb-3 font-bold">
            {Number(selected.slice(5, 7))}월 {Number(selected.slice(8))}일
            {pending && <span className="ml-2 text-xs font-normal text-muted-foreground">저장 중…</span>}
          </h2>

          <ul className="mb-3 space-y-1.5">
            {dayTodos.map((t) => (
              <li key={t.id} className="group flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={(e) => toggle(t.id, e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                <span className={cn("flex-1", t.done && "text-muted-foreground line-through")}>
                  {t.title}
                  {t.project && <span className="ml-1.5 text-xs text-muted-foreground">{t.project}</span>}
                </span>
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="삭제"
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
                className="h-9 flex-1 rounded-md border border-input bg-background px-2 text-sm"
              />
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground"
                aria-label="추가"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <input
              list="schedule-projects"
              value={draftProject}
              onChange={(e) => setDraftProject(e.target.value)}
              placeholder="프로젝트 (선택 · 새 이름 입력 가능)"
              className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs"
            />
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
                    <a href={c.url} target="_blank" rel="noreferrer" className="hover:underline">
                      <span className="text-muted-foreground">{projectLabel(c.project)}</span> {c.message}
                    </a>
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
