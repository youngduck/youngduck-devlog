/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 * 아이디어: 최근 몇개월간 ps, 등등 지표를 보여줌 funnel을 통해
 * option, data 만들어주는 util 함수 만들어줄것
 */
"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

interface IAreaChart {}

const AreaChart: React.FC<IAreaChart> = () => {
  //SECTION HOOK호출 영역
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  );
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "하하",
      },
      devicePixelRatio: 5,
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  //   const dataNumber = labels.map(() => Math.floor(Math.random() * 1000));
  const dataNumber = [1, 2, 10, 13, 5, 8, 7];
  const dataNumber2 = [1, 5, 10, 13, 5, 8, 7];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: dataNumber,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        fill: true,
        label: "Dataset 3",
        data: dataNumber2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <div className="h-auto w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default AreaChart;
