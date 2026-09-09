import type { Metadata } from "next";
import "../resume/print.css";

export const metadata: Metadata = {
  title: "김영덕 포트폴리오",
  robots: { index: false, follow: false },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="resume-root bg-background text-foreground">{children}</div>
  );
}
