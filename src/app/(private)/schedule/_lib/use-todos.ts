"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TodoItem } from "./notion";
import { addTodoAction, deleteTodoAction, setMissedAction, toggleTodoAction } from "../actions";

export const todosKey = (month: string) => ["schedule", "todos", month] as const;
export const isTempId = (id: string) => id.startsWith("temp-");

async function fetchTodos(month: string): Promise<TodoItem[]> {
  const res = await fetch(`/schedule/api/todos?month=${month}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`할 일 조회 실패 (${res.status})`);
  return res.json();
}

/** 한 달치 할 일. 첫 데이터는 서버 렌더에서 받은 값을 그대로 쓴다. */
export function useTodos(month: string, initial: TodoItem[]) {
  return useQuery({
    queryKey: todosKey(month),
    queryFn: () => fetchTodos(month),
    initialData: initial,
    initialDataUpdatedAt: Date.now(),
  });
}

/**
 * 낙관적 업데이트 공통 틀:
 * onMutate 에서 진행 중 조회 취소 → 이전 값 보관 → 캐시 먼저 수정,
 * 실패하면 onError 에서 보관값으로 되돌린다.
 * 성공 시 재조회하지 않는다 (서버 결과가 캐시와 같으므로 — 연타해도 옛 응답이 덮어쓰지 않음).
 */
function useOptimisticHandlers<V>(month: string, apply: (list: TodoItem[], vars: V) => TodoItem[]) {
  const qc = useQueryClient();
  const key = todosKey(month);
  return {
    onMutate: async (vars: V) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<TodoItem[]>(key);
      qc.setQueryData<TodoItem[]>(key, (list = []) => apply(list, vars));
      return { prev };
    },
    onError: (_e: unknown, _v: V, ctx?: { prev?: TodoItem[] }) => {
      if (ctx?.prev) qc.setQueryData(key, ctx.prev);
      alert("Notion 저장에 실패해서 되돌렸습니다. 잠시 후 다시 시도해 주세요.");
    },
  };
}

export function useToggleTodo(month: string) {
  return useMutation({
    mutationKey: ["schedule", "toggle"],
    mutationFn: ({ id, done }: { id: string; done: boolean }) => toggleTodoAction(id, done),
    ...useOptimisticHandlers<{ id: string; done: boolean }>(month, (list, { id, done }) =>
      list.map((t) => (t.id === id ? { ...t, done, missed: done ? false : t.missed } : t)),
    ),
  });
}

/** 못 함(포기) ↔ 되돌리기 */
export function useMissTodo(month: string) {
  return useMutation({
    mutationKey: ["schedule", "miss"],
    mutationFn: ({ id, missed }: { id: string; missed: boolean }) => setMissedAction(id, missed),
    ...useOptimisticHandlers<{ id: string; missed: boolean }>(month, (list, { id, missed }) =>
      list.map((t) => (t.id === id ? { ...t, missed, done: missed ? false : t.done } : t)),
    ),
  });
}

export function useDeleteTodo(month: string) {
  return useMutation({
    mutationKey: ["schedule", "delete"],
    mutationFn: (id: string) => deleteTodoAction(id),
    ...useOptimisticHandlers<string>(month, (list, id) => list.filter((t) => t.id !== id)),
  });
}

interface AddVars {
  tempId: string;
  date: string;
  title: string;
  project: string | null;
  due: string | null;
}

export function useAddTodo(month: string) {
  const qc = useQueryClient();
  const key = todosKey(month);
  return useMutation({
    mutationKey: ["schedule", "add"],
    mutationFn: ({ date, title, project, due }: AddVars) => addTodoAction(date, title, project, due),
    ...useOptimisticHandlers<AddVars>(month, (list, v) => [
      ...list,
      { id: v.tempId, title: v.title, date: v.date, done: false, project: v.project, carried: 0, due: v.due, missed: false },
    ]),
    // 임시 항목을 Notion 이 준 실제 항목(id)으로 교체
    onSuccess: (created: TodoItem | null, v: AddVars) => {
      qc.setQueryData<TodoItem[]>(key, (list: TodoItem[] | undefined) => {
        const cur: TodoItem[] = list ?? [];
        return created ? cur.map((t) => (t.id === v.tempId ? created : t)) : cur.filter((t) => t.id !== v.tempId);
      });
    },
  });
}
