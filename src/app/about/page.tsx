/**
 * 작성자: KYD
 * 기능: 소개 페이지 서버사이드 렌더링
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React from "react";
import PostBody from "@/app/shared/_components/post/post-body/post-body";
import GridBoxWrapper from "@layout/grid-box-wrapper/grid-box-wrapper";
interface Ipage {}

const page: React.FC<Ipage> = () => {
  //SECTION HOOK호출 영역
  const mdContent = "> About페이지는 현재 제작중입니다.";

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <main className="flex h-auto w-full lg:mx-auto lg:w-[1200px]">
      <div className="grid w-full grid-cols-1 grid-rows-1 gap-[20px] lg:h-[480px] lg:grid-cols-[250px_600px_310px] lg:grid-rows-[110px_350px]">
        <GridBoxWrapper className="rounded-t-none border-t-0 bg-contain lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
          목차, 인쇄
        </GridBoxWrapper>
        <GridBoxWrapper className="border-0 lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-3">
          <PostBody content={mdContent} />
        </GridBoxWrapper>
      </div>
    </main>
  );
};

export default page;
