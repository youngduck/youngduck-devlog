/**
 * 작성자: KYD
 * 기능: 알고리즘 풀이 카테고리별 조회 페이지 SERVER SIDE 렌더링
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import { getFilteredAlgorithms } from "@/app/api/algorithms/api";
import React from "react";
import TagNavbar from "@/app/algorithms/components/tag-navbar/tag-navbar";
import PostCards from "@/app/shared/_components/post/post-cards/post-cards";

interface Ipage {
  params: {
    slug: string;
  };
}

const page: React.FC<Ipage> = ({ params }) => {
  const filteredData = getFilteredAlgorithms(params.slug);

  return (
    <main className="md:max-w-container-md lg:max-w-container-lg mx-auto h-auto w-full">
      <div className="flex flex-col items-center justify-center">
        <TagNavbar />
        <PostCards posts={filteredData} domain="algorithms" />
      </div>
    </main>
  );
};

export default page;
