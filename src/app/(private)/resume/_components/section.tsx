/**
 * 공통 섹션 래퍼 — 피그마 exact: p-12, gap-12, 하단 구분선(#d9d9d9), 보라 제목.
 * headingSize 로 제목 크기(기본 20px, Career·Certificate는 24px)를 조절.
 */
export default function Section({
  title,
  children,
  headingSize = 20,
  borderTop = false,
  border = true,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  headingSize?: number;
  borderTop?: boolean;
  border?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`flex flex-col gap-[12px] border-solid border-[var(--resume-border)] p-[12px] ${
        border ? "border-b" : ""
      } ${borderTop ? "border-t" : ""} ${className}`}
    >
      {title && (
        <h2
          className="resume-heading font-semibold leading-none"
          style={{ fontSize: `${headingSize}px` }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
