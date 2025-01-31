"use client";
import React, { useEffect, useState } from "react";
import { DarkModeToggle } from "../dark-mode-toggle";
import Link from "next/link";
import Image from "next/image";
import RssFeedButton from "../rss-feed-button/rss-feed-button";

const Header = () => {
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className="sticky pt-[0px] top-[0px] z-10 w-full lg:w-full mx-auto justify-between p-0 bg-background transform animate-fade-down">
        <div className="flex w-full h-[60px] lg:w-[1200px] mx-auto justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <div className="w-[250px] h-[60px] flex justify-center items-center bg-secondary">
                <div className="relative w-[200px] h-[40px]">
                  <Image
                    src="/assets/logo/logo.png"
                    alt="/assets/logo/logo.png"
                    fill
                    priority={true}
                    sizes="(max-width:192px)"
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
            <nav className="items-center hidden md:flex">
              <Link href="/blog">
                <span className="text-[20px] font-KCC px-[20px] pl-[30px] bg-gradient-to-r from-yellow to-[#8C6306] inline-block text-transparent bg-clip-text">
                  Blog
                </span>
              </Link>
              <Link href="/about">
                <span className="text-[20px] font-KCC px-[20px] bg-gradient-to-r from-yellow to-[#8C6306] inline-block text-transparent bg-clip-text">
                  About
                </span>
              </Link>
              <Link href="/project">
                <span className="text-[20px] font-KCC px-[20px] bg-gradient-to-r from-yellow to-[#8C6306] inline-block text-transparent bg-clip-text">
                  Project
                </span>
              </Link>
              <Link href="/ps">
                <span className="text-[20px] font-KCC px-[20px] bg-gradient-to-r from-yellow to-[#8C6306] inline-block text-transparent bg-clip-text">
                  PS
                </span>
              </Link>
            </nav>
          </div>
          <div className="flex">
            <RssFeedButton />
            <DarkModeToggle />
          </div>
        </div>
        <div className="w-full h-[3px] bg-gray-300">
          <div
            className="h-full bg-gradient-to-r from-yellow to-[#8C6306]"
            style={{ width: `${scrollPosition}%` }}
          ></div>
        </div>
      </header>
    </>
  );
};

export default Header;
