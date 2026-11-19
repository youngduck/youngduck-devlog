"use server";

import { archiveTodo, createTodo, setTodoDone, type TodoItem } from "./_lib/notion";

/**
 * Server Action 은 /schedule 로 POST 되므로 middleware Basic Auth 가 함께 적용된다.
 * 화면 갱신은 클라이언트 React Query 캐시가 맡는다 — revalidatePath 로 페이지 전체를
 * 다시 그리지 않는다 (이월·Notion·GitHub 조회가 매번 다시 돌아 체크가 느려졌었다).
 */

export async function toggleTodoAction(id: string, done: boolean): Promise<void> {
  await setTodoDone(id, done);
}

export async function addTodoAction(date: string, title: string, project: string | null): Promise<TodoItem | null> {
  const trimmed = title.trim();
  if (!trimmed || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  // Notion select 이름에는 쉼표를 쓸 수 없다
  const proj = project?.replace(/,/g, " ").trim().slice(0, 100) || null;
  return createTodo(date, trimmed.slice(0, 200), proj);
}

export async function deleteTodoAction(id: string): Promise<void> {
  await archiveTodo(id);
}
