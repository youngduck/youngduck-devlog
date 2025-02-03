"use client";
import React, { useEffect, useState } from "react";
import { DarkModeToggle } from "../dark-mode-toggle";
import Link from "next/link";
import Image from "next/image";
import ListButton from "@layout/list-button/list-button";
import RssFeedButton from "@layout/rss-feed-button/rss-feed-button";

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
      <header className="sticky top-[0px] z-10 mx-auto w-full transform animate-fade-down justify-between bg-background p-0 pt-[0px] lg:w-full">
        <div className="mx-auto flex h-[60px] w-full items-center justify-between md:w-[870px] lg:w-[1200px]">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex h-[60px] w-[250px] items-center justify-center md:bg-secondary">
                <div className="relative h-[40px] w-[200px]">
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
            <nav className="hidden items-center md:flex">
              <Link href="/blog">
                <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text px-[20px] pl-[30px] font-KCC text-[20px] text-transparent">
                  Blog
                </span>
              </Link>
              <Link href="/about">
                <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text px-[20px] font-KCC text-[20px] text-transparent">
                  About
                </span>
              </Link>
              <Link href="/project">
                <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text px-[20px] font-KCC text-[20px] text-transparent">
                  Project
                </span>
              </Link>
              <Link href="/ps">
                <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text px-[20px] font-KCC text-[20px] text-transparent">
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
        <div className="h-[3px] w-full bg-gray-300">
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
