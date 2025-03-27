/**
 * 작성자: KYD
 * 기능: 여러 차트를 보여줄 Funnel 컴포넌트
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";

import { useState } from "react";
import AreaChart from "../area-chart/area-chart";
import useFunnel from "@/app/shared/_components/funnel/hooks/useFunnel";
import Funnel from "@/app/shared/_components/funnel/components/funnel";
import Step from "@/app/shared/_components/funnel/components/step/components/step";

interface IChartsFunnel {}

const ChartsFunnel: React.FC<IChartsFunnel> = () => {
  //SECTION HOOK호출 영역
  const { step, nextStep, prevStep } = useFunnel({
    steps: ["areaChart", "lineChart", "barChart"],
    mode: "loop",
  });

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <button onClick={prevStep}>이전</button>
          <button onClick={nextStep}>다음</button>
        </div>
      </div>
      <Funnel step={step}>
        <Funnel.Step name="areaChart">
          <AreaChart />
        </Funnel.Step>
        <Funnel.Step name="lineChart">
          <div>라인차트</div>
        </Funnel.Step>
        <Funnel.Step name="barChart">
          <div>barChart</div>
        </Funnel.Step>
      </Funnel>
    </div>
  );
};

export default ChartsFunnel;
