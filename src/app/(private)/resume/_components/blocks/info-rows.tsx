/**
 * 라벨-값 나열용 범용 블록. Profile, Career, 자격증, 사이드프로젝트 등에 재사용.
 * cells[0] 는 강조(제목), 이후 셀은 부가정보. icon 으로 좌측 아이콘을 붙일 수 있다.
 */
export default function InfoRows({
  rows,
  columns = 1,
}: {
  rows: { cells: React.ReactNode[]; href?: string; icon?: React.ReactNode }[];
  columns?: 1 | 2 | 3;
}) {
  const gridCls =
    columns === 3
      ? "grid grid-cols-3 gap-x-5 gap-y-3"
      : columns === 2
        ? "grid grid-cols-2 gap-x-5 gap-y-3"
        : "space-y-2";

  return (
    <div className={gridCls}>
      {rows.map((row, i) => {
        const inner = (
          <div className="flex items-start gap-2">
            {row.icon && <span className="mt-[1px] shrink-0">{row.icon}</span>}
            <div className="min-w-0">
              <div className="text-[12.5px] font-bold text-neutral-900">
                {row.cells[0]}
              </div>
              {row.cells.slice(1).map((c, j) => (
                <div key={j} className="text-[11.5px] leading-snug text-neutral-600">
                  {c}
                </div>
              ))}
            </div>
          </div>
        );
        return row.href ? (
          <a key={i} href={row.href} className="block hover:opacity-70">
            {inner}
          </a>
        ) : (
          <div key={i}>{inner}</div>
        );
      })}
    </div>
  );
}
