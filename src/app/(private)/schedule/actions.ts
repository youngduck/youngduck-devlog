"use server";

import { revalidatePath } from "next/cache";
import { archiveTodo, createTodo, setTodoDone } from "./_lib/notion";

/** Server Action 은 /schedule 로 POST 되므로 middleware Basic Auth 가 함께 적용된다. */

export async function toggleTodoAction(id: string, done: boolean) {
  await setTodoDone(id, done);
  revalidatePath("/schedule");
}

export async function addTodoAction(date: string, title: string, project: string | null) {
  const trimmed = title.trim();
  if (!trimmed || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
  // Notion select 이름에는 쉼표를 쓸 수 없다
  const proj = project?.replace(/,/g, " ").trim().slice(0, 100) || null;
  await createTodo(date, trimmed.slice(0, 200), proj);
  revalidatePath("/schedule");
}

export async function deleteTodoAction(id: string) {
  await archiveTodo(id);
  revalidatePath("/schedule");
}
