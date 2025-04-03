/**
 * 작성자: KYD
 * 기능: 홈페이지에 쓰일 스크랩 목록 (RSC)
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 * 아이디어: 테이블 형태, 소팅, 노션으로 링크이동?
 * TODO: 추후 노션 API 조회 갯수 최적화
 */

import { IScrapItem } from "@/app/api/scrap/apis";
import React, { memo } from "react";
import Link from "next/link";

const ScrapItem = async () => {
  try {
    const scrapList = await fetchData();

    if (!scrapList || scrapList.length === 0) {
      return <div>스크랩된 항목이 없습니다.</div>;
    }

    return (
      <>
        {scrapList.map((item: IScrapItem, index: number) => (
          <Link
            href={item.link}
            target="_blank"
            key={item.id}
            className={`block p-2 ${index === 0 ? "border-t-2" : "border-t-2"}`}
          >
            <h3 className="text-sm hover:underline">{item.name}</h3>
            {item.tags.length > 0 && (
              <div className="text-xs text-gray-600">
                {item.tags.join(", ")}
              </div>
            )}
          </Link>
        ))}
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
};

export default memo(ScrapItem);

const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASED_URL}/api/scrap`,
    {
      cache: "force-cache",
    },
  );
  const data = await response.json();
  return data;
};
