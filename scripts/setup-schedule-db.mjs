/**
 * yd-dev "일정,업무관리" 페이지 안의 인라인 DB를 찾아 일정관리용 속성을 맞춘다.
 *   node scripts/setup-schedule-db.mjs
 * - 필요: .env 의 NOTION_SCHEDULE_TOKEN (연동이 해당 페이지에 연결돼 있어야 함)
 * - 하는 일: 페이지 하위 DB 찾기 → 날짜(date)·완료(checkbox)·프로젝트(select)·이월(number)·기한(date)·놓침(checkbox) 속성 추가
 *            → .env 에 NOTION_SCHEDULE_DATABASE_ID 가 없으면 추가
 * - 여러 번 실행해도 안전하다 (이미 있으면 건너뜀).
 */
import "dotenv/config";
import { appendFileSync, readFileSync } from "node:fs";

const PAGE_ID = process.env.NOTION_SCHEDULE_PAGE_ID ?? "41c36376d73680ae8f81fc08362792d2";
const TOKEN = process.env.NOTION_SCHEDULE_TOKEN;
if (!TOKEN) {
  console.error("✖ .env 에 NOTION_SCHEDULE_TOKEN 을 먼저 넣어 주세요.");
  process.exit(1);
}

async function notion(path, method = "GET", body) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${json.code}: ${json.message}`);
  return json;
}

try {
  // 1) 페이지 하위 블록에서 인라인 DB 찾기
  const children = await notion(`/blocks/${PAGE_ID}/children?page_size=100`);
  const dbBlock = children.results.find((b) => b.type === "child_database");
  if (!dbBlock) throw new Error("페이지 안에서 데이터베이스를 찾지 못했습니다.");
  const dbId = dbBlock.id.replace(/-/g, "");
  console.log(`✔ DB 발견: ${dbId}`);

  // 2) 속성 맞추기
  const db = await notion(`/databases/${dbId}`);
  const props = db.properties;
  const titleName = Object.keys(props).find((k) => props[k].type === "title");
  const patch = {};
  if (!props["날짜"]) patch["날짜"] = { date: {} };
  if (!props["완료"]) patch["완료"] = { checkbox: {} };
  if (!props["프로젝트"]) patch["프로젝트"] = { select: {} };
  if (!props["이월"]) patch["이월"] = { number: {} };
  if (!props["기한"]) patch["기한"] = { date: {} };
  if (!props["놓침"]) patch["놓침"] = { checkbox: {} };
  const needsTitle = !db.title?.length;

  if (Object.keys(patch).length || needsTitle) {
    await notion(`/databases/${dbId}`, "PATCH", {
      ...(Object.keys(patch).length && { properties: patch }),
      ...(needsTitle && { title: [{ text: { content: "할 일" } }] }),
    });
    console.log(`✔ 추가: ${[...Object.keys(patch), needsTitle && "DB 제목(할 일)"].filter(Boolean).join(", ")}`);
  } else {
    console.log("✔ 속성이 이미 맞춰져 있습니다.");
  }
  if (titleName !== "이름") {
    console.warn(`! 제목 속성 이름이 "${titleName}" 입니다. _lib/notion.ts 의 PROP.title 을 맞춰 주세요.`);
  }

  // 3) .env 에 DB ID 기록 (비밀값 아님)
  const envText = readFileSync(".env", "utf8");
  if (!/^NOTION_SCHEDULE_DATABASE_ID=/m.test(envText)) {
    appendFileSync(".env", `${envText.endsWith("\n") ? "" : "\n"}NOTION_SCHEDULE_DATABASE_ID=${dbId}\n`);
    console.log("✔ .env 에 NOTION_SCHEDULE_DATABASE_ID 추가");
  }
} catch (e) {
  console.error(`✖ ${e.message}`);
  if (String(e.message).includes("object_not_found")) {
    console.error("  → 노션 페이지 우측 상단 ··· → 연결 → 만든 연동을 추가했는지 확인해 주세요.");
  }
  process.exit(1);
}
