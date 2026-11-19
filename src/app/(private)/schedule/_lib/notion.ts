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
  carried: "이월", // number (미완료로 다음 날로 넘어간 횟수)
  due: "기한", // date (선택 — 이 날이 지나면 이월하지 않고 "놓침" 처리)
  missed: "놓침", // checkbox (기한을 넘겼거나 직접 포기한 할 일 — 더는 이월하지 않는다)
} as const;

const NOTION_VERSION = "2022-06-28";

export interface TodoItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  done: boolean;
  project: string | null;
  carried: number;
  due: string | null; // YYYY-MM-DD
  missed: boolean;
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
      number?: number | null;
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
    carried: p[PROP.carried]?.number ?? 0,
    due: p[PROP.due]?.date?.start?.slice(0, 10) ?? null,
    missed: Boolean(p[PROP.missed]?.checkbox),
  };
}

type QueryResult = { results: NotionPage[]; has_more: boolean; next_cursor: string | null };

/** 조건에 맞는 페이지 전부 (100건씩 페이지네이션) */
async function queryAll(body: Record<string, unknown>): Promise<NotionPage[]> {
  const { dbId } = env();
  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const data = await notion<QueryResult>(`/databases/${dbId}/query`, "POST", {
      ...body,
      page_size: 100,
      start_cursor: cursor,
    });
    pages.push(...data.results);
    cursor = data.has_more ? (data.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return pages;
}

/**
 * 오늘 이전 날짜인데 완료·놓침 둘 다 아닌 할 일을 정리한다. 화면을 열 때마다 호출된다.
 * - 기한이 없거나 아직 안 지났으면 → 오늘로 옮기고 이월 +1 (며칠 만에 열어도 이월은 1만 오른다)
 * - 기한이 지났으면 → 이월하지 않고 "놓침" 체크, 날짜는 기한 날로 둔다 (그 주에 못 한 기록이 남도록)
 */
export async function rolloverOverdue(today: string): Promise<number> {
  const overdue = await queryAll({
    filter: {
      and: [
        { property: PROP.date, date: { before: today } },
        { property: PROP.done, checkbox: { equals: false } },
        { property: PROP.missed, checkbox: { equals: false } },
      ],
    },
  });
  // Notion API 평균 3req/s 제한 → 순차 처리
  for (const page of overdue) {
    const item = toItem(page);
    const expired = item.due !== null && item.due < today;
    await notion(`/pages/${page.id}`, "PATCH", {
      properties: expired
        ? {
            [PROP.missed]: { checkbox: true },
            // 기한 전 날짜에 멈춰 있었다면 기한 날로 옮겨 마지막 기회였던 날에 표시
            ...(item.date < item.due! && { [PROP.date]: { date: { start: item.due } } }),
          }
        : {
            [PROP.date]: { date: { start: today } },
            [PROP.carried]: { number: item.carried + 1 },
          },
    });
  }
  return overdue.length;
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
  const { start, end } = monthRange(month);
  const pages = await queryAll({
    filter: {
      and: [
        { property: PROP.date, date: { on_or_after: start } },
        { property: PROP.date, date: { on_or_before: end } },
      ],
    },
    sorts: [{ property: PROP.date, direction: "ascending" }],
  });
  return pages.map(toItem);
}

export async function createTodo(
  date: string,
  title: string,
  project: string | null,
  due: string | null,
): Promise<TodoItem> {
  const { dbId } = env();
  const page = await notion<NotionPage>("/pages", "POST", {
    parent: { database_id: dbId },
    properties: {
      [PROP.title]: { title: [{ text: { content: title } }] },
      [PROP.date]: { date: { start: date } },
      [PROP.done]: { checkbox: false },
      ...(project && { [PROP.project]: { select: { name: project } } }),
      ...(due && { [PROP.due]: { date: { start: due } } }),
    },
  });
  return toItem(page);
}

/** 완료 체크. 놓친 할 일을 늦게라도 끝냈으면 놓침은 풀린다. */
export async function setTodoDone(id: string, done: boolean): Promise<void> {
  await notion(`/pages/${id}`, "PATCH", {
    properties: { [PROP.done]: { checkbox: done }, ...(done && { [PROP.missed]: { checkbox: false } }) },
  });
}

/** 못 함(포기) 표시 / 되돌리기. 놓친 할 일은 이월되지 않는다. */
export async function setTodoMissed(id: string, missed: boolean): Promise<void> {
  await notion(`/pages/${id}`, "PATCH", {
    properties: { [PROP.missed]: { checkbox: missed }, ...(missed && { [PROP.done]: { checkbox: false } }) },
  });
}

export async function archiveTodo(id: string): Promise<void> {
  await notion(`/pages/${id}`, "PATCH", { archived: true });
}
