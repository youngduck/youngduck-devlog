"use client";
/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import React, { useEffect, useRef } from "react";
import Duck from "@public/assets/svg/duck.svg";
import gsap from "gsap";

interface ISvgProfile {}

const SvgProfile: React.FC<ISvgProfile> = () => {
  //SECTION HOOK호출 영역
  const duckRef = useRef<SVGSVGElement>(null);

  // 최초 마운트 시에만 실행되도록 수정
  useEffect(() => {
    if (duckRef.current) {
      const duckElement = duckRef.current;
      const { width, height } = duckElement.getBoundingClientRect();
      const paths = duckElement.querySelectorAll("path");
      console.log("paths", paths);
      // 개발 환경에서만 로그 출력
      if (process.env.NODE_ENV === "development") {
        console.log(`Duck width: ${width}, height: ${height}`);
      }
    }
  }, []); // 빈 의존성 배열
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <>
      <Duck ref={duckRef} />
    </>
  );
};

export default SvgProfile;
