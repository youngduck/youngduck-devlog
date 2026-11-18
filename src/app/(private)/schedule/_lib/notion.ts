import "server-only";
import { monthRange } from "./month";

/**
 * yd-dev 워크스페이스의 일정 DB.
 * Notion DB 속성 이름이 다르면 PROP 만 고치면 된다.
 */
const PROP = {
  title: "이름", // title (Notion 기본 속성)
  date: "날짜", // date
  done: "완료", // checkbox
  project: "프로젝트", // select (GitHub 저장소 이름과 같게 쓰면 커밋과 함께 필터된다)
} as const;

const NOTION_VERSION = "2022-06-28";

export interface TodoItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  done: boolean;
  project: string | null;
}

function env() {
  const token = process.env.NOTION_SCHEDULE_TOKEN;
  const dbId = process.env.NOTION_SCHEDULE_DATABASE_ID;
  if (!token || !dbId) {
    throw new Error("NOTION_SCHEDULE_TOKEN / NOTION_SCHEDULE_DATABASE_ID 가 설정되지 않았습니다.");
  }
  return { token, dbId };
}

async function notion<T>(path: string, method: "GET" | "POST" | "PATCH", body?: unknown): Promise<T> {
  const { token } = env();
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Notion ${method} ${path} 실패: ${res.status} ${err.code ?? ""} ${err.message ?? ""}`);
  }
  return res.json();
}

interface NotionPage {
  id: string;
  properties: Record<
    string,
    {
      title?: { plain_text: string }[];
      date?: { start: string } | null;
      checkbox?: boolean;
      select?: { name: string } | null;
    }
  >;
}

function toItem(page: NotionPage): TodoItem {
  const p = page.properties;
  return {
    id: page.id,
    title: (p[PROP.title]?.title ?? []).map((t) => t.plain_text).join(""),
    date: (p[PROP.date]?.date?.start ?? "").slice(0, 10),
    done: Boolean(p[PROP.done]?.checkbox),
    project: p[PROP.project]?.select?.name ?? null,
  };
}

/** Notion 에 등록된 프로젝트 선택지 (Notion 에서 직접 추가·정리 가능) */
export async function getProjectOptions(): Promise<string[]> {
  const { dbId } = env();
  const db = await notion<{ properties: Record<string, { select?: { options: { name: string }[] } }> }>(
    `/databases/${dbId}`,
    "GET",
  );
  return (db.properties[PROP.project]?.select?.options ?? []).map((o) => o.name);
}

/** 한 달치 할 일 (페이지네이션 포함) */
export async function getMonthTodos(month: string): Promise<TodoItem[]> {
  const { dbId } = env();
  const { start, end } = monthRange(month);
  const items: TodoItem[] = [];
  let cursor: string | undefined;

  do {
    const data = await notion<{ results: NotionPage[]; has_more: boolean; next_cursor: string | null }>(
      `/databases/${dbId}/query`,
      "POST",
      {
        page_size: 100,
        start_cursor: cursor,
        filter: {
          and: [
            { property: PROP.date, date: { on_or_after: start } },
            { property: PROP.date, date: { on_or_before: end } },
          ],
        },
        sorts: [{ property: PROP.date, direction: "ascending" }],
      },
    );
    items.push(...data.results.map(toItem));
    cursor = data.has_more ? (data.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return items;
}

export async function createTodo(date: string, title: string, project: string | null): Promise<void> {
  const { dbId } = env();
  await notion("/pages", "POST", {
    parent: { database_id: dbId },
    properties: {
      [PROP.title]: { title: [{ text: { content: title } }] },
      [PROP.date]: { date: { start: date } },
      [PROP.done]: { checkbox: false },
      ...(project && { [PROP.project]: { select: { name: project } } }),
    },
  });
}

export async function setTodoDone(id: string, done: boolean): Promise<void> {
  await notion(`/pages/${id}`, "PATCH", {
    properties: { [PROP.done]: { checkbox: done } },
  });
}

export async function archiveTodo(id: string): Promise<void> {
  await notion(`/pages/${id}`, "PATCH", { archived: true });
}
