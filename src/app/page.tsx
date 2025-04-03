import GridBoxWrapper from "@/app/home/components/grid-box-wrapper/grid-box-wrapper";
import ScrapItem from "./home/components/scrap/scrap-item/scrap-item";
import ChartsFunnel from "./home/components/charts/charts-funnel/ChartsFunnel";

import Profile from "./home/components/profile/profile";
import PostCards from "./shared/_components/post/post-cards/post-cards";
import Link from "next/link";
export default async function Home() {
  // 두 API를 병렬로 호출
  const [posts, algorithms] = await Promise.all([
    fetchBlogData(),
    fetchAlgorithmsData(),
  ]);

  return (
    <main className="mx-auto h-auto w-full transform animate-fade-up duration-500 md:max-w-container-md lg:max-w-container-lg">
      {/* 첫 번째 행 */}
      <div className="grid w-full gap-[20px] sm:grid-cols-1 sm:grid-rows-1 md:grid-cols-[250px_600px] md:grid-rows-[110px_350px_350px] lg:grid-cols-[250px_600px_310px] lg:grid-rows-[110px_350px]">
        <GridBoxWrapper className="rounded-t-none border-t-0 bg-contain sm:h-[350px] md:col-[1/2] md:row-[1/3] md:h-auto lg:col-[1/2] lg:row-[1/3] lg:h-auto">
          <Profile />
        </GridBoxWrapper>
        <GridBoxWrapper className="border-transparent bg-transparent md:col-[2/3] md:row-[1/2] lg:col-[2/3] lg:row-[1/2]">
          <div className="text-xl italic">
            <p>안녕하세요!</p>
            {/* <p>시각화를 좋아하는 개발자 김영덕입니다.</p>
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
          className="border-2 sm:h-[350px] md:col-[1/3] md:row-[3/4] md:h-auto lg:col-[3/4] lg:row-[2/3] lg:h-auto"
        >
          <ScrapItem />
        </GridBoxWrapper>
      </div>
      <div className="mx-auto h-auto w-full md:max-w-container-md lg:max-w-container-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="md:w-container-md lg:w-container-lg my-[20px] block w-full transform animate-fade-up border-y-[3px] p-3 font-[KCC] duration-500">
            <ul className="flex flex-wrap justify-between">
              <li className="mx-2 font-bold italic pcHover:hover:scale-105">
                <Link href="/blog">
                  <span className="text-xl">최근 작성한 Blog 콘텐츠</span>
                </Link>
              </li>
              <li className="mx-2 font-bold italic pcHover:hover:scale-105">
                <Link href="/blog">
                  <span className="text-xl">더보기</span>
                </Link>
              </li>
            </ul>
          </div>
          <PostCards posts={posts.slice(0, 4)} domain="blog" />
        </div>
      </div>
      <div className="mx-auto h-auto w-full md:max-w-container-md lg:max-w-container-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="md:w-container-md lg:w-container-lg my-[20px] block w-full transform animate-fade-up border-y-[3px] p-3 font-[KCC] duration-500">
            <ul className="flex flex-wrap justify-between">
              <li className="mx-2 font-bold italic pcHover:hover:scale-105">
                <Link href="/algorithms">
                  <span className="text-xl">최근 작성한 알고리즘 풀이</span>
                </Link>
              </li>
              <li className="mx-2 font-bold italic pcHover:hover:scale-105">
                <Link href="/algorithms">
                  <span className="text-xl">더보기</span>
                </Link>
              </li>
            </ul>
          </div>
          <PostCards posts={algorithms.slice(0, 4)} domain="algorithms" />
        </div>
      </div>
    </main>
  );
}

const fetchBlogData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASED_URL}/api/blog`,
    {
      cache: "force-cache",
    },
  );
  const data = await response.json();
  return data;
};

const fetchAlgorithmsData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASED_URL}/api/algorithms`,
    {
      cache: "force-cache",
    },
  );
  const data = await response.json();
  return data;
};
