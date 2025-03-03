/**
 * 작성자: KYD
 * 기능: 알고리즘 풀이 카테고리별 조회 페이지 SERVER SIDE 렌더링
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import { getFilteredAlgorithms } from "@/app/api/algorithms/api";
import PostCard from "@/app/shared/_components/post/post-card/post-card";
import React from "react";
import TagNavbar from "@/app/algorithms/components/tag-navbar/tag-navbar";

interface Ipage {
  params: {
    slug: string;
  };
}

const page: React.FC<Ipage> = ({ params }) => {
  //SECTION HOOK호출 영역
  const filteredData = getFilteredAlgorithms(params.slug);
  //!SECTION HOOK호출 영역

  return (
    <main className="mx-auto lg:w-[1200px]">
      <div className="flex flex-col items-center justify-center">
        <TagNavbar />
        <div className="flex flex-wrap justify-center border-b-2 pb-6 lg:w-[1200px] lg:justify-normal">
          {filteredData.map((item, idx) => (
            <PostCard
              key={idx}
              slug={item.slug}
              title={item.title}
              coverImage={item.coverImage}
              date={item.date}
              excerpt={item.excerpt}
              category={item.category}
              domain="algorithms"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
