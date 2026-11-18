/** "YYYY-MM" 문자열 기준 날짜 계산 (타임존 영향 없게 UTC 로만 계산) */

export function currentMonthKST(): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 7);
}

export function todayKST(): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export function parseMonth(raw: string | undefined): string {
  return raw && /^\d{4}-(0[1-9]|1[0-2])$/.test(raw) ? raw : currentMonthKST();
}

export function shiftMonth(month: string, diff: number): string {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + diff, 1)).toISOString().slice(0, 7);
}

/** 해당 월의 첫날·마지막날 ("YYYY-MM-DD") */
export function monthRange(month: string): { start: string; end: string } {
  const [y, m] = month.split("-").map(Number);
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return { start: `${month}-01`, end: `${month}-${String(last).padStart(2, "0")}` };
}

/** 달력 그리드 셀 (앞뒤 빈칸은 null, 일요일 시작) */
export function monthCells(month: string): (string | null)[] {
  const [y, m] = month.split("-").map(Number);
  const firstDow = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells: (string | null)[] = Array(firstDow).fill(null);
  for (let d = 1; d <= last; d++) cells.push(`${month}-${String(d).padStart(2, "0")}`);
  while (cells.length % 7) cells.push(null);
  return cells;
}

/** ISO 시각 → KST 날짜 */
export function toKSTDate(iso: string): string {
  return new Date(new Date(iso).getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
