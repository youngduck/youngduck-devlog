import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "일정관리",
  robots: { index: false, follow: false },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-background text-foreground">{children}</div>;
}
