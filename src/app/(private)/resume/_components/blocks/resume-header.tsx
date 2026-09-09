/**
 * 이력서 상단 히어로 — 원형 프로필 사진(보라 링) + 이름 | Strong Point.
 * 피그마 exact: 사진 110px/border-2, gap-2/이름 14px, 강점블록 gap-12, 제목 20px,
 * 불릿 13px SemiBold leading-18, 불릿간 gap-10.
 */
export default function ResumeHeader({
  name,
  photoSrc,
  strongTitle = "Strong Point",
  strongPoints,
}: {
  name: string;
  photoSrc: string;
  strongTitle?: string;
  strongPoints: string[];
}) {
  return (
    <header className="flex items-start gap-[10px] px-[22px] pt-[23px]">
      {/* 좌: 사진 + 이름 */}
      <div className="flex shrink-0 flex-col items-center gap-[2px]">
        <div className="rounded-full border-2 border-solid border-[var(--resume-accent)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={name}
            className="h-[110px] w-[110px] rounded-full object-cover"
          />
        </div>
        <span className="text-[14px] font-medium leading-[14px] text-black">
          {name}
        </span>
      </div>

      {/* 우: Strong Point */}
      <div className="flex w-[423px] flex-col gap-[12px] pt-[2px]">
        <h2 className="resume-heading text-[20px] font-semibold leading-none">
          {strongTitle}
        </h2>
        <div className="flex flex-col gap-[10px]">
          {strongPoints.map((it, i) => (
            <p
              key={i}
              className="text-[13px] font-semibold leading-[18px] text-black"
            >
              {it}
            </p>
          ))}
        </div>
      </div>
    </header>
  );
}
