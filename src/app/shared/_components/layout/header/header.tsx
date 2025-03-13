import { DarkModeToggle } from "../dark-mode-toggle";
import Link from "next/link";
import HeaderPercentBar from "./header-percent/header-percent-bar";
import Image from "next/image";
import RssFeedButton from "@layout/rss-feed-button/rss-feed-button";
import ListButton from "../list-button/list-button";

const Header = () => {
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
              <Link href="/algorithms">
                <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text px-[20px] font-KCC text-[20px] text-transparent">
                  Algorithms
                </span>
              </Link>
            </nav>
          </div>
          <div className="flex">
            <ListButton />
            <RssFeedButton />
            <DarkModeToggle />
          </div>
        </div>
        <HeaderPercentBar />
      </header>
    </>
  );
};

export default Header;
