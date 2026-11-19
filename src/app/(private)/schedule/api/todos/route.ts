import { NextResponse, type NextRequest } from "next/server";
import { getMonthTodos } from "../../_lib/notion";
import { parseMonth } from "../../_lib/month";

/** React Query 재조회용 — 한 달치 할 일만 (/schedule/* 라 middleware Basic Auth 적용) */
export async function GET(req: NextRequest) {
  const month = parseMonth(req.nextUrl.searchParams.get("month") ?? undefined);
  return NextResponse.json(await getMonthTodos(month));
}

export const dynamic = "force-dynamic";
