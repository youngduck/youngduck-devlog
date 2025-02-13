/**
 * 작성자: KYD
 * 기능: 여러 차트를 보여줄 Funnel 컴포넌트
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";

import { useState } from "react";
import AreaChart from "../area-chart/area-chart";

interface IChartsFunnel {}

const ChartsFunnel: React.FC<IChartsFunnel> = () => {
  //SECTION HOOK호출 영역
  const [step, setStep] = useState<"areaChart" | "lineChart" | "barChart">(
    "areaChart",
  );

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  if (step === "areaChart") {
    return (
      <div>
        <AreaChart />
      </div>
    );
  }

  return <div></div>;
};

export default ChartsFunnel;
