/**
 * 작성자: KYD
 * 기능: 여러 차트를 보여줄 Funnel 컴포넌트
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";

import { useState } from "react";
import AreaChart from "../area-chart/area-chart";
import useFunnel from "@/app/shared/funnel/hooks/useFunnel";
import Funnel from "@/app/shared/funnel/components/funnel";
import Step from "@/app/shared/funnel/components/step/components/step";

interface IChartsFunnel {}

const ChartsFunnel: React.FC<IChartsFunnel> = () => {
  //SECTION HOOK호출 영역
  const { step, nextStep, prevStep } = useFunnel({
    steps: ["areaChart", "lineChart", "barChart"],
  });

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  if (step === "areaChart") {
    return (
      <Funnel step={step}>
        <Funnel.Step name="areaChart">
          <AreaChart />
          <button onClick={prevStep}>이전</button>
          <button onClick={nextStep}>다음</button>
        </Funnel.Step>
      </Funnel>
    );
  }
  if (step === "lineChart") {
    return (
      <div>
        하하
        <button onClick={prevStep}>이전</button>
        <button onClick={nextStep}>다음</button>
      </div>
    );
  }
  if (step === "barChart") {
    return (
      <div>
        호호
        <button onClick={prevStep}>이전</button>
        <button onClick={nextStep}>다음</button>
      </div>
    );
  }
};

export default ChartsFunnel;
