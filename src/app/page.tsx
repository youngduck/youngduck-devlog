import GridBoxWrapper from "@layout/grid-box-wrapper/grid-box-wrapper";
import ScrapItem from "./home/components/scrap/scrap-item/scrap-item";
import ChartsFunnel from "./domains/charts/charts-funnel/ChartsFunnel";

import Profile from "./domains/profile/profile";
export default async function Home() {
  return (
    <main className="mx-auto h-auto w-full transform animate-fade-up duration-500 md:w-[870px] lg:w-[1200px]">
      {/* 첫 번째 행 */}
      <div className="grid w-full gap-[20px] sm:grid-cols-1 sm:grid-rows-1 md:grid-cols-[250px_600px] md:grid-rows-[110px_350px_350px] lg:grid-cols-[250px_600px_310px] lg:grid-rows-[110px_350px]">
        <GridBoxWrapper className="rounded-t-none border-t-0 bg-contain md:col-[1/2] md:row-[1/3] lg:col-[1/2] lg:row-[1/3]">
          <Profile />
        </GridBoxWrapper>
        <GridBoxWrapper className="border-transparent bg-transparent md:col-[2/3] md:row-[1/2] lg:col-[2/3] lg:row-[1/2]">
          <div className="text-[18px]">
            {/* <p>안녕하세요!</p>
            <p>시각화를 좋아하는 개발자 김영덕입니다.</p>
            <p>
              기록하며 성장하는 개발자가 되기위해 기술블로그를 운영중입니다.
            </p> */}
          </div>
        </GridBoxWrapper>
        <GridBoxWrapper className="border-2 md:col-[2/3] md:row-[2/3] lg:col-[2/3] lg:row-[2/3]">
          <ChartsFunnel />
        </GridBoxWrapper>
        <GridBoxWrapper
          title="최근 스크랩한 게시글"
          className="border-2 sm:h-[250px] md:col-[1/3] md:row-[3/4] md:h-auto lg:col-[3/4] lg:row-[2/3] lg:h-auto"
        >
          <ScrapItem />
        </GridBoxWrapper>
      </div>
    </main>
  );
}
