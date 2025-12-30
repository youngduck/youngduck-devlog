/**
 * 작성자: KYD
 * 기능: 여러 차트를 보여줄 Funnel 컴포넌트
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";

import PostingDataChart from "../posting-data-chart/posting-data-chart";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFunnel from "@/app/shared/_components/funnel/hooks/useFunnel";
import Funnel from "@/app/shared/_components/funnel/components/funnel";
import SideProjects from "../side-projects/side-projects";

const ChartsFunnel = () => {
  //SECTION HOOK호출 영역
  const { step, nextStep, prevStep, stepLength, currentStep } = useFunnel({
    steps: ["postingDataChart", "sideProjects", "barChart"],
    mode: "loop",
  });

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <div className="h-full w-full">
      <div className="flex h-9 items-center justify-between border-b-2 pb-2">
        <div className="text-xl font-bold italic pcHover:hover:scale-105">
          YD Datas
        </div>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {currentStep + 1} / {stepLength}
          </div>
          <div className="flex items-center justify-between">
            <button onClick={prevStep}>
              <ChevronLeft />
            </button>
            <button onClick={nextStep}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-36px)] w-full">
        <Funnel step={step}>
          <Funnel.Step name="postingDataChart">
            <PostingDataChart />
          </Funnel.Step>
          <Funnel.Step name="sideProjects">
            <SideProjects />
          </Funnel.Step>
          <Funnel.Step name="barChart">
            <div>준비중입니다.</div>
          </Funnel.Step>
        </Funnel>
      </div>
    </div>
  );
};

export default ChartsFunnel;
