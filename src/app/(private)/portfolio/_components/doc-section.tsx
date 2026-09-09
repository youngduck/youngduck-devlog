/** 포트폴리오 상세페이지 우측 문서 섹션 — 검정 24px 제목 + 본문. */
export default function DocSection({
  title,
  children,
  border = true,
}: {
  title: string;
  children: React.ReactNode;
  border?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col items-start gap-[8px] p-[12px] ${
        border ? "border-b border-solid border-[var(--resume-border)]" : ""
      }`}
    >
      <p className="text-[24px] font-semibold leading-none text-black">{title}</p>
      <div className="w-full text-[14px] text-black">{children}</div>
    </div>
  );
}
