import Image from "next/image";
import { Home } from "lucide-react";
import { QUICK_PROJECTS } from "../_data/quick-links";

/** 달력 위 바로가기 카드 — 프로젝트별 로고·홈 버튼 + 운영 도구 아이콘 */
export default function QuickLinks() {
  return (
    <section aria-label="바로가기" className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {QUICK_PROJECTS.map((p) => (
        <article key={p.name} className="rounded-2xl border border-border bg-secondary/40 p-5 shadow-sm">
          <header className="mb-5 flex items-start gap-3">
            <Image src={p.logo} alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg object-contain" />
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-bold">{p.name}</h2>
              <p className="truncate text-xs text-muted-foreground">{p.desc}</p>
            </div>
            <a
              href={p.home}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} 사이트 열기`}
              title="사이트 열기"
              className="flex h-9 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-background hover:bg-secondary"
            >
              <Home className="h-4 w-4" />
            </a>
          </header>

          <ul className="flex flex-wrap gap-2.5">
            {p.tools.map((t) => (
              <li key={t.name}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name} ${t.name}`}
                  title={t.name}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* 아이콘은 브랜드 색 그대로 — 어두운 모드에서도 보이도록 흰 타일 위에 둔다 */}
                  <Image src={t.icon} alt="" width={24} height={24} className="h-6 w-6" />
                </a>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
