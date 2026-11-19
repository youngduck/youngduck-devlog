import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import { QUICK_PROJECTS } from "../_data/quick-links";

/** 외부 링크는 모두 새 탭으로 연다 */
const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * 달력 위 바로가기 카드 — 프로젝트별 로고·홈 버튼 + 운영 도구 아이콘.
 * 휴대폰: 1열(카드 3행) · md(870px~): 3열
 */
export default function QuickLinks() {
  return (
    <section aria-label="바로가기" className="mb-6 grid grid-cols-1 gap-3 md:mb-8 md:grid-cols-3 md:gap-4">
      {QUICK_PROJECTS.map((p) => (
        <article key={p.name} className="rounded-2xl border border-border bg-secondary/40 p-4 shadow-sm md:p-5">
          <header className="mb-3 flex items-center gap-3 md:mb-5">
            <Image
              src={p.logo}
              alt=""
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 rounded-lg object-contain md:h-11 md:w-11"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-bold">{p.name}</h2>
              <p className="truncate text-xs text-muted-foreground">{p.desc}</p>
            </div>
            <Link
              href={p.home}
              {...NEW_TAB}
              aria-label={`${p.name} 사이트 열기`}
              title="사이트 열기"
              className="flex h-9 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-background hover:bg-secondary"
            >
              <Home className="h-4 w-4" />
            </Link>
          </header>

          <ul className="flex flex-wrap gap-2 md:gap-2.5">
            {p.tools.map((t) => (
              <li key={t.name}>
                <Link
                  href={t.href}
                  {...NEW_TAB}
                  aria-label={`${p.name} ${t.name}`}
                  title={t.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white transition-transform active:scale-95 pcHover:hover:-translate-y-0.5 pcHover:hover:shadow-md md:h-11 md:w-11"
                >
                  {/* 아이콘은 브랜드 색 그대로 — 어두운 모드에서도 보이도록 흰 타일 위에 둔다 */}
                  <Image src={t.icon} alt="" width={24} height={24} className="h-5 w-5 md:h-6 md:w-6" />
                </Link>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
