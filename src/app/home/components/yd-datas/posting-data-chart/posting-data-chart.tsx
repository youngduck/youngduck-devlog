/**
 * 작성자: KYD
 * 기능: 년도+월별 알고리즘 풀이 개수를 Area Chart로 표시
 * 프로세스 설명: API에서 통계 데이터를 가져와서 Chart.js로 시각화
 * 아이디어: 최근 몇개월간 ps, 등등 지표를 보여줌 funnel을 통해
 * option, data 만들어주는 util 함수 만들어줄것
 */
"use client";
import React, { useEffect, useState } from "react";
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

interface MonthlyStats {
  year: number;
  month: number;
  count: number;
  label: string;
}

const PostingDataChart = () => {
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
  const [algorithmStats, setAlgorithmStats] = useState<MonthlyStats[]>([]);
  const [blogStats, setBlogStats] = useState<MonthlyStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // 차트 옵션
  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          padding: 0,
          boxWidth: 12,
          boxHeight: 8,
        },
      },
      title: {
        display: false,
        text: "",
      },
      devicePixelRatio: 5,
    },
  };

  // 모든 라벨을 합치고 정렬
  const allLabels = Array.from(
    new Set([
      ...algorithmStats.map((stat) => stat.label),
      ...blogStats.map((stat) => stat.label),
    ]),
  ).sort();

  // 각 라벨에 대한 데이터 맵핑
  const algorithmData = allLabels.map((label) => {
    const stat = algorithmStats.find((s) => s.label === label);
    return stat ? stat.count : 0;
  });

  const blogData = allLabels.map((label) => {
    const stat = blogStats.find((s) => s.label === label);
    return stat ? stat.count : 0;
  });

  const data = {
    labels: allLabels,
    datasets: [
      {
        fill: true,
        label: "Algorithm Posts ",
        data: algorithmData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
      },
      {
        fill: true,
        label: "Blog Posts",
        data: blogData,
        borderColor: "hsl(42.2, 78.6%, 57.3%)",
        backgroundColor: "hsla(42.2, 78.6%, 57.3%, 0.3)",
      },
    ],
  };

  //!SECTION 상태값 영역

  //SECTION 메서드 영역
  const fetchStats = async (): Promise<void> => {
    try {
      setIsLoading(true);

      // 알고리즘과 블로그 통계를 병렬로 가져오기
      const [algorithmResponse, blogResponse] = await Promise.all([
        fetch("/api/algorithms/stats"),
        fetch("/api/blog/stats"),
      ]);

      if (!algorithmResponse.ok || !blogResponse.ok) {
        throw new Error("Failed to fetch stats");
      }

      const [algorithmStats, blogStats] = await Promise.all([
        algorithmResponse.json(),
        blogResponse.json(),
      ]);

      setAlgorithmStats(algorithmStats);
      setBlogStats(blogStats);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  //!SECTION 메서드 영역

  if (isLoading) {
    return (
      <div className="flex h-auto w-full items-center justify-center p-8">
        <div className="text-gray-500">게시글 통계 가져오는 중...</div>
      </div>
    );
  }

  if (algorithmStats.length === 0 && blogStats.length === 0) {
    return (
      <div className="flex h-auto w-full items-center justify-center p-8">
        <div className="text-gray-500">통계 데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="h-auto w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default PostingDataChart;
