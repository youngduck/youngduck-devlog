"use client";

import { Printer, LayoutGrid } from "lucide-react";
import { Button } from "@/app/shared/_components/layout/button/button";

/**
 * 포트폴리오 상단 툴바(블로그 버튼 재사용). .no-print 이라 인쇄물엔 안 나옴.
 */
export default function PrintToolbar() {
  return (
    <div className="no-print sticky top-[60px] z-[5] flex items-center justify-between border-b border-border bg-background/80 px-5 py-3 backdrop-blur">
      <span className="text-sm font-semibold text-foreground">김영덕 포트폴리오</span>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" asChild>
          <a href="/private">
            <LayoutGrid className="mr-1.5 h-4 w-4" />
            메뉴
          </a>
        </Button>
        <Button size="sm" onClick={() => window.print()}>
          <Printer className="mr-1.5 h-4 w-4" />
          PDF로 저장
        </Button>
      </div>
    </div>
  );
}
