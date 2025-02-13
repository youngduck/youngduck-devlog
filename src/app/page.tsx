import GridBoxWrapper from "@layout/grid-box-wrapper/grid-box-wrapper";
import ScrapItem from "./home/components/scrap/scrap-item/scrap-item";
import RenderModel from "./domains/render-model/components/render-model";
import ChartsFunnel from "./domains/charts/charts-funnel/ChartsFunnel";
export default async function Home() {
  return (
    <main className="mx-auto h-auto w-full lg:w-[1200px]">
      {/* 첫 번째 행 */}
      <div className="grid w-full grid-cols-1 grid-rows-1 gap-[20px] lg:h-[480px] lg:grid-cols-[250px_600px_310px] lg:grid-rows-[110px_370px]">
        <GridBoxWrapper className="rounded-t-none border-t-0 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
          <RenderModel />
        </GridBoxWrapper>
        <GridBoxWrapper className="border-transparent bg-transparent lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
          <div className="text-[20px]">
            <p>안녕하세요</p>
            <p>
              <strong className="text-yellow">UX</strong>,{" "}
              <strong className="text-yellow">DX</strong>,{" "}
              <strong className="text-yellow">TDD</strong>,{" "}
              <strong className="text-yellow">최적화</strong> 에 관심이
              많습니다만
            </p>
            <p>
              Trade Off를 고려하며 좋은 코드를 작성하기위해 항상 노력합니다.
            </p>
          </div>
        </GridBoxWrapper>
        <GridBoxWrapper
          title="최근 스크랩한 게시글"
          className="border-2 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3"
        >
          <ChartsFunnel />
        </GridBoxWrapper>
        <GridBoxWrapper
          title="최근 스크랩한 게시글"
          className="h-[500px] border-2 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 lg:h-auto"
        >
          <ScrapItem />
        </GridBoxWrapper>
      </div>
    </main>
  );
}
