import Calendar from "./_components/calendar";
import { getMonthTodos, getProjectOptions } from "./_lib/notion";
import { getMonthCommits } from "./_lib/github";
import { parseMonth, todayKST } from "./_lib/month";

export const dynamic = "force-dynamic";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const month = parseMonth((await searchParams).month);
  const [todos, commits, projectOptions] = await Promise.all([
    getMonthTodos(month),
    getMonthCommits(month),
    getProjectOptions(),
  ]);

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <Calendar
        month={month}
        today={todayKST()}
        todos={todos}
        commits={commits}
        projectOptions={projectOptions}
      />
    </div>
  );
}
