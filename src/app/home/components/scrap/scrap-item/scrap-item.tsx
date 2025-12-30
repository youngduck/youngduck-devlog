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

// 헤더 컴포넌트 분리
const ScrapHeader = () => (
  <div className={`inline-block h-auto w-full pb-2`}>
    <ul className="flex flex-wrap justify-between">
      <li className="mx-0 font-bold italic pcHover:hover:scale-105">
        <Link
          href="https://dev-youngduck.notion.site/Scrap-List-18163698869f80069053db560e082004?pvs=4"
          target="_blank"
        >
          <span className="text-xl">Scrap Contents</span>
        </Link>
      </li>
    </ul>
  </div>
);

// 스크랩 목록 컴포넌트 분리
const ScrapList = ({ scrapList }: { scrapList: IScrapItem[] }) => (
  <div className="h-[calc(100%-40px)] w-full overflow-y-auto">
    {scrapList.map((item: IScrapItem) => (
      <Link
        href={item.link}
        target="_blank"
        key={item.id}
        className="block border-t-2 p-2"
      >
        <h3 className="text-md font-bold hover:underline">{item.name}</h3>
        {item.tags.length > 0 && (
          <div className="text-sm text-[#939fb2]">{item.tags.join(", ")}</div>
        )}
      </Link>
    ))}
  </div>
);

// 비어있는 상태 컴포넌트
const EmptyScrapState = () => <div>스크랩된 항목이 없습니다.</div>;

// 에러 상태 컴포넌트
const ErrorState = () => <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

// API 호출 함수 개선 - 명확한 반환 타입 정의
async function fetchScrapList(): Promise<IScrapItem[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASED_URL}/api/scrap`,
    {
      cache: "force-cache",
    },
  );

  if (!response.ok) {
    throw new Error("스크랩 데이터를 불러오는데 실패했습니다");
  }

  return response.json();
}

const ScrapItem = async () => {
  try {
    const scrapList = await fetchScrapList();
    const isEmpty = !scrapList || scrapList.length === 0;

    return (
      <>
        <ScrapHeader />
        {isEmpty ? <EmptyScrapState /> : <ScrapList scrapList={scrapList} />}
      </>
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (
      <>
        <ScrapHeader />
        <ErrorState />
      </>
    );
  }
};

export default memo(ScrapItem);
