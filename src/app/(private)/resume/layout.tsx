import type { Metadata } from "next";
import "./print.css";

export const metadata: Metadata = {
  title: "김영덕 이력서",
  robots: { index: false, follow: false }, // 검색엔진 비노출
};

/**
 * 이력서 전용 레이아웃.
 * 블로그 기본 레이아웃(Header/Footer) 안에 정상적으로 들어간다.
 * (알고리즘/블로그 글 화면과 동일한 흐름)
 * 인쇄 시에는 print.css가 Header/Footer/툴바를 숨기고 A4만 남긴다.
 */
export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="resume-root bg-background text-foreground">{children}</div>
  );
}
