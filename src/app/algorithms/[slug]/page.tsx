/**
 * 작성자: KYD
 * 기능: 알고리즘 풀이 카테고리별 조회 페이지 SERVER SIDE 렌더링
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import { getFilteredAlgorithms } from "@/app/api/algorithms/api";
import React from "react";
import TagNavbar from "@/app/algorithms/components/tag-navbar/tag-navbar";
import PostCards from "@/app/shared/_components/post/post-cards/post-cards";

// params가 Promise 타입임
type Params = Promise<{ slug: string }>;

// 비동기 페이지 컴포넌트에서 타입 사용
const page = async (props: { params: Params }) => {
  // params 값을 await로 꺼내야 함
  const params = await props.params;
  const slug = params.slug;

  const filteredData = getFilteredAlgorithms(slug);

  return (
    <main className="mx-auto h-auto w-full md:max-w-container-md lg:max-w-container-lg">
      <div className="flex flex-col items-center justify-center">
        <TagNavbar />
        <PostCards posts={filteredData} domain="algorithms" />
      </div>
    </main>
  );
};

export default page;
