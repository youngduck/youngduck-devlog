import type { Metadata } from "next";
import Link from "next/link";
import { FileText, FolderOpen, ArrowRight } from "lucide-react";
import { Button } from "@/app/shared/_components/layout/button/button";

export const metadata: Metadata = {
  title: "김영덕 문서",
  robots: { index: false, follow: false },
};

interface DocCard {
  ko: string;
  en: string;
  desc: string;
  icon: React.ReactNode;
  viewHref: string;
}

const CARDS: DocCard[] = [
  {
    ko: "이력서",
    en: "Resume",
    desc: "요약 이력서 + 경력 상세 (2페이지 · 세로)",
    icon: <FileText className="h-8 w-8" />,
    viewHref: "/resume",
  },
  {
    ko: "포트폴리오",
    en: "Portfolio",
    desc: "커버·프로필·프로젝트 상세 (8페이지 · 가로)",
    icon: <FolderOpen className="h-8 w-8" />,
    viewHref: "/portfolio",
  },
];

export default function PrivateHubPage() {
  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center bg-background px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">김영덕 문서함</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          보고 싶은 문서를 선택하세요. PDF는 문서 화면의 “PDF로 저장”으로 추출합니다.
        </p>
      </div>

      <div className="grid w-full max-w-[760px] grid-cols-1 gap-5 md:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.en}
            href={c.viewHref}
            className="group flex flex-col rounded-2xl border border-border bg-secondary p-7 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-background text-foreground">
                {c.icon}
              </span>
              <div>
                <p className="text-xl font-bold text-foreground">{c.ko}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {c.en}
                </p>
              </div>
            </div>

            <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
              {c.desc}
            </p>

            <Button asChild className="w-full">
              <span>
                보기
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
