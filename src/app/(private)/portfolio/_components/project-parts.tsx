/** 프로젝트 상세페이지(6~8) 사이드바 공용 조각들 */

export interface Icon {
  src: string;
  w: number;
  h: number;
  crop?: { w: string; left: string };
}

export interface LinkItem {
  icon: string;
  w: number;
  h: number;
  label: string;
  href: string;
}

export function SideBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[12px] border-t border-solid border-[var(--resume-border)] px-[12px] pt-[12px]">
      <p className="text-[20px] font-semibold leading-none text-black">{title}</p>
      {children}
    </div>
  );
}

export function SkillWrap({ icons }: { icons: Icon[] }) {
  return (
    <div className="flex w-full flex-wrap items-center gap-[12px]">
      {icons.map((ic, i) =>
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
  );
}

export function LinkWrap({ links }: { links: LinkItem[] }) {
  return (
    <div className="flex w-full flex-wrap items-start gap-[12px]">
      {links.map((l, i) => (
        <a
          key={i}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-[5px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.icon} alt="" className="shrink-0 object-contain" style={{ width: l.w, height: l.h }} />
          <span className="text-[12px] font-medium leading-[14px] text-black underline">
            {l.label}
          </span>
        </a>
      ))}
    </div>
  );
}
