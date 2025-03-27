"use client";
import { DarkModeToggleButton } from "../button/dark-mode-toggle-button/dark-mode-toggle-button";
import Link from "next/link";
import HeaderPercentBar from "./header-percent/header-percent-bar";
import Image from "next/image";
import RssFeedButton from "@/app/shared/_components/layout/button/rss-feed-button/rss-feed-button";
import ListButton from "../button/list-button/list-button";
import { useState } from "react";
import HeaderMobileMenu from "./header-mobile-menu/header-mobile-menu";

const Header = () => {
  const [mobileMenuToggle, setMobileMenuToggle] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-[0px] z-10 mx-auto w-full transform animate-fade-down justify-between bg-background p-0 pt-[0px] lg:w-full">
        <div className="relative mx-auto flex h-[60px] w-full items-center justify-between sm:px-2 md:max-w-container-md md:px-0 lg:max-w-container-lg">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex h-[60px] items-center justify-center sm:w-[200px] md:w-[250px] md:bg-secondary">
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
              {/* <Link href="/about">
                <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text px-[20px] font-KCC text-[20px] text-transparent">
                  About
                </span>
              </Link> */}
              <Link href="/algorithms">
                <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text px-[20px] font-KCC text-[20px] text-transparent">
                  Algorithms
                </span>
              </Link>
            </nav>
          </div>
          <div className="flex">
            <ListButton
              onClick={() => setMobileMenuToggle((prevState) => !prevState)}
            />
            <RssFeedButton />
            <DarkModeToggleButton />
          </div>
          {mobileMenuToggle && <HeaderMobileMenu />}
        </div>
        <HeaderPercentBar />
      </header>
    </>
  );
};

export default Header;
