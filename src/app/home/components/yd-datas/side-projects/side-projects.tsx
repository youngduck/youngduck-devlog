/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React from "react";
import Image from "next/image";
import BdksPng from "./assets/bdks.png";
import YdsPng from "./assets/yds.png";
import DiagonalSvg from "./assets/diagonal.svg";
import Link from "next/link";

const SideProjects = () => {
  //SECTION HOOK호출 영역
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <div className="relative h-full w-full p-2">
      <DiagonalSvg className="sm:hidden md:absolute md:left-1/2 md:top-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2" />
      {/* 왼쪽 상단 - YDS */}
      <div className="gap-2 sm:flex md:absolute md:left-4 md:top-4 md:flex-col">
        <Image
          src={YdsPng}
          alt="Yds"
          className="sm:h-[70px] sm:w-[70px] md:h-[160px] md:w-[160px]"
        />
        <div className="flex flex-col">
          <h3 className="text-lg">@youngduck/yd-ui</h3>
          <Link
            href="https://github.com/youngduck/yd-ui"
            target="_blank"
            className="text-sm text-gray-400"
          >
            YDS 기반 UI라이브러리
          </Link>
        </div>
      </div>
      {/* 오른쪽 하단 - 보돌코스코어드 */}
      <div className="gap-2 sm:flex md:absolute md:bottom-4 md:right-4 md:flex-col md:items-end">
        <div className="flex shrink-0 sm:h-[70px] sm:w-[70px] sm:items-center sm:justify-center md:h-[130px] md:w-[130px]">
          <Image
            src={BdksPng}
            alt="Bdks"
            className="sm:h-[60px] sm:w-[60px] md:h-[120px] md:w-[120px]"
          />
        </div>
        <div className="flex flex-col md:items-end">
          <h3 className="text-lg">보돌코스코어드</h3>
          <Link
            href="https://bdks.vercel.app/"
            target="_blank"
            className="text-sm text-gray-400"
          >
            도르트문트팬들을 위한 실시간 평점 입력 서비스
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideProjects;
