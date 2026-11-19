import Calendar from "./_components/calendar";
import QuickLinks from "./_components/quick-links";
import { getMonthTodos, getProjectOptions, rolloverOverdue } from "./_lib/notion";
import { getMonthCommits } from "./_lib/github";
import { parseMonth, todayKST } from "./_lib/month";

export const dynamic = "force-dynamic";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const month = parseMonth((await searchParams).month);
  const today = todayKST();
  // 지난 날 미완료 → 오늘로 이월 (조회보다 먼저 해야 이번 화면에 반영된다)
  await rolloverOverdue(today);
  const [todos, commits, projectOptions] = await Promise.all([
    getMonthTodos(month),
    getMonthCommits(month),
    getProjectOptions(),
  ]);

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <QuickLinks />
      <Calendar
        month={month}
        today={today}
        todos={todos}
        commits={commits}
        projectOptions={projectOptions}
      />
    </div>
  );
}
