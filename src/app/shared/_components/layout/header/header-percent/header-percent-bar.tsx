/**
 * 작성자: KYD
 * 기능: 헤더 퍼센트를 표현하는 컴포넌트
 * 1. client component,
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";
import React, { useEffect, useState } from "react";

const HeaderPercentBar = () => {
  //SECTION HOOK호출 영역
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const calculateScrollPercent = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      return (scrollTop / docHeight) * 100;
    };

    const handleScroll = () => {
      setScrollPosition(calculateScrollPercent());
    };

    // 컴포넌트가 마운트 될 때,새로고침 될 떄 초기 스크롤 퍼센티지 설정
    setScrollPosition(calculateScrollPercent());

    window.addEventListener("scroll", handleScroll);

    //언마운트시 이벤트 제거작업 (헤더라서 언마운트되는 상황이 없을것 같지만, 방어적으로 처리)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <div className="h-[3px] w-full bg-gray-300">
      <div
        className="h-full bg-gradient-to-r from-yellow to-[#8C6306]"
        style={{ width: `${scrollPosition}%` }}
      ></div>
    </div>
  );
};

export default HeaderPercentBar;
