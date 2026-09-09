import { WorkEntry } from "../../_data/types";

/**
 * Work Experience 한 회사 블록 (피그마 이력서2 exact).
 * 회사라인 14px Medium → 번호목록(제목 14px) → 서브라인 "- ..." 12px Medium.
 * 모두 leading-22.
 */
export default function ExperienceItem({ data }: { data: WorkEntry }) {
  return (
    <>
      <p className="text-[14px] font-medium leading-[22px] text-black">
        {data.company} | {data.role} | {data.period}
      </p>
      <div className="flex flex-col pb-[8px]">
        {data.achievements.map((ach, i) => (
          <div key={i} className="mb-[12px] last:mb-0">
            <p className="text-[14px] font-medium leading-[22px] text-black">
              {i + 1}. {ach.title}
            </p>
            {ach.lines.map((l, j) => (
              <p
                key={j}
                className="whitespace-pre-wrap pl-[16px] text-[12px] font-medium leading-[22px] text-black"
              >
                - {l}
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
