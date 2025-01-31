import { getAllPosts } from "@/lib/api";
import GridBoxWrapper from "./_components/layout/grid-box-wrapper/grid-box-wrapper";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="w-full lg:w-[1200px] h-auto mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_600px_310px] gap-[20px] w-full h-[480px] grid-rows-4">
        {/* 첫 번째 행 */}
        <GridBoxWrapper className=" lg:row-span-4 lg:col-span-1 rounded-t-none">
          1-1
        </GridBoxWrapper>
        <GridBoxWrapper className=" lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3 border-transparent bg-transparent">
          2-1
        </GridBoxWrapper>
        <GridBoxWrapper className=" lg:row-start-3 lg:row-end-5 lg:col-start-2 lg:col-end-3 border-2">
          2-2
        </GridBoxWrapper>

        {/* <div className="rounded-md bg-gradient-to-r from-yellow to-[#8C6306] p-[3px] lg:col-span-6 ">
          <div className="flex h-full w-full p-2 bg-background back">1-2</div>
        </div> */}
        {/* <div className="lg:col-span-6 full border border-gray-300 rounded-lg">
          1-2
        </div> */}
        <div className="lg:col-start-3 lg:col-end-4 full border border-gray-300 rounded-lg">
          1-3
        </div>
      </div>
    </main>
  );
}
