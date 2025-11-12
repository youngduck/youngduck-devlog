import GridBoxWrapper from "@/app/home/components/grid-box-wrapper/grid-box-wrapper";
import ScrapItem from "./home/components/scrap/scrap-item/scrap-item";
import ChartsFunnel from "./home/components/charts/charts-funnel/ChartsFunnel";

import Profile from "./home/components/profile/profile";
import PostCards from "./shared/_components/post/post-cards/post-cards";
import Link from "next/link";
import { Post } from "./shared/_components/post/interfaces/posts";
export default async function Home() {
  const posts = await fetchBlogData();
  const algorithms = await fetchAlgorithmsData();
  console.log(
    "process.env.NEXT_PUBLIC_SENTRY_DSN",
    process.env.NEXT_PUBLIC_SENTRY_DSN,
  );
  return (
    <main className="mx-auto h-auto w-full transform animate-fade-up duration-500 md:max-w-container-md lg:max-w-container-lg">
      {/* 첫 번째 행 */}
      <div className="grid w-full gap-[20px] px-4 sm:grid-cols-1 sm:grid-rows-1 sm:px-4 md:grid-cols-[250px_600px] md:grid-rows-[110px_350px_350px] md:px-0 lg:grid-cols-[250px_600px_310px] lg:grid-rows-[110px_350px]">
        <GridBoxWrapper className="rounded-t-none border-t-0 bg-contain sm:h-[350px] md:col-[1/2] md:row-[1/3] md:h-auto lg:col-[1/2] lg:row-[1/3] lg:h-auto">
          <Profile />
        </GridBoxWrapper>

        <GridBoxWrapper className="flex h-full flex-col justify-center border-transparent bg-transparent text-xl font-semibold md:col-[2/3] md:row-[1/2] lg:col-[2/3] lg:row-[1/2]">
          <p>
            사용자와 개발자 모두를 위한&nbsp;
            <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text text-transparent">
              경험을 설계하는
            </span>
          </p>
          <p>개발자 김영덕 입니다.</p>
        </GridBoxWrapper>
        <GridBoxWrapper className="border-2 md:col-[2/3] md:row-[2/3] lg:col-[2/3] lg:row-[2/3]">
          <ChartsFunnel />
        </GridBoxWrapper>
        <GridBoxWrapper className="border-2 sm:h-[350px] md:col-[1/3] md:row-[3/4] md:h-auto lg:col-[3/4] lg:row-[2/3] lg:h-auto">
          <ScrapItem />
        </GridBoxWrapper>
      </div>
      <div className="mx-auto h-auto w-full md:max-w-container-md lg:max-w-container-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="md:w-container-md lg:w-container-lg my-[20px] block w-full transform animate-fade-up border-y-[3px] p-3 font-[KCC] duration-500">
            <ul className="flex flex-wrap justify-between">
              <li className="mx-2 font-bold italic pcHover:hover:scale-105">
                <Link href="/blog">
                  <span className="text-xl">Blog Contents</span>
                </Link>
              </li>
              <li className="mx-2 font-bold italic pcHover:hover:scale-105">
                <Link href="/blog">
                  <span className="text-xl">more</span>
                </Link>
              </li>
            </ul>
          </div>
          <PostCards posts={posts.slice(0, 12)} domain="blog" />
        </div>
      </div>
      <div className="mx-auto h-auto w-full md:max-w-container-md lg:max-w-container-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="md:w-container-md lg:w-container-lg my-[20px] block w-full transform animate-fade-up border-y-[3px] p-3 font-[KCC] duration-500">
            <ul className="flex flex-wrap justify-between">
              <li className="mx-2 font-bold italic pcHover:hover:scale-105">
                <Link href="/algorithms">
                  <span className="text-xl">Algorithm Contents</span>
                </Link>
              </li>
              <li className="mx-2 font-bold italic pcHover:hover:scale-105">
                <Link href="/algorithms">
                  <span className="text-xl">more</span>
                </Link>
              </li>
            </ul>
          </div>
          <PostCards posts={algorithms.slice(0, 12)} domain="algorithms" />
        </div>
      </div>
    </main>
  );
}

const fetchBlogData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASED_URL}/api/blog`,
      {
        cache: "no-store",
      },
    );
    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
};

const fetchAlgorithmsData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASED_URL}/api/algorithms`,
      {
        cache: "no-store",
      },
    );
    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching algorithms data:", error);
    return [];
  }
};
