/**
 * 작성자: KYD
 * 기능: 알고리즘 풀이 리스트 페이지 SERVER SIDE 렌더링
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React from "react";
import { getAllAlgorithms } from "../api/algorithms/api";
import PostCards from "@/app/shared/_components/post/post-cards/post-cards";
import TagNavbar from "@/app/algorithms/components/tag-navbar/tag-navbar";

interface Ipage {}

const page: React.FC<Ipage> = () => {
  const algorithms = getAllAlgorithms();

  return (
    <main className="md:max-w-container-md lg:max-w-container-lg mx-auto h-auto w-full">
      <div className="flex flex-col items-center justify-center">
        <TagNavbar />
        <PostCards posts={algorithms} domain="algorithms" />
      </div>
    </main>
  );
};

export default page;
