import { SKILL_ICONS, SkillIconGroup } from "../../_data/skill-icons";

/**
 * Skill — 피그마 원본 아이콘을 순서·치수 그대로 렌더(픽셀 일치).
 * 라벨 16px Medium, 아이콘 각 Figma 치수, gap 12.
 * groups 를 넘기면 다른 세트(포트폴리오 20px 등)로 재사용 가능.
 */
export default function SkillGroups({
  groups = SKILL_ICONS,
}: {
  groups?: SkillIconGroup[];
}) {
  return (
    <div className="flex flex-col gap-[12px]">
      {groups.map((row) => (
        <div key={row.category} className="flex flex-wrap items-center gap-[12px]">
          <span className="w-[67px] shrink-0 text-[16px] font-medium text-black">
            {row.category}
          </span>
          {row.icons.map((ic, i) =>
            ic.crop ? (
              <span
                key={i}
                className="relative block shrink-0 overflow-hidden"
                style={{ width: ic.w, height: ic.h }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ic.src}
                  alt=""
                  className="absolute left-0 top-0 h-full max-w-none"
                  style={{ width: ic.crop.w, left: ic.crop.left }}
                />
              </span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={ic.src}
                alt=""
                className="shrink-0 object-contain"
                style={{ width: ic.w, height: ic.h }}
              />
            ),
          )}
        </div>
      ))}
    </div>
  );
}
