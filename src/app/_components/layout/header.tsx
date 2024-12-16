"use client";
import React from "react";
import { DarkModeToggle } from "./dark-mode-toggle";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RssFeedButton from "./rss-feed-button";
import Lottie from "react-lottie-player";
// import euro from "../../../../public/assets/lottie/euro.json";
import euro from "@public/assets/lottie/euro.json";
import CustomLottie from "../lottie/CustomLottie";

import { lottieData } from "../lottie/lottieData";

const Header = () => {
  return (
    <header className="sticky pt-[20px] top-[-20px] z-10 w-full bg-background transform animate-fade-down">
      <div className="flex lg:w-[1150px] h-[55px] mx-auto justify-between p-2">
        <Link href="/">
          <div className="relative w-[200px] h-[50px]">
            <Image
              src="/assets/logo/logo.png"
              alt="/assets/logo/logo.png"
              fill
              priority={true}
              sizes="(max-width:192px)"
              className="object-cover"
            />
          </div>
        </Link>
        <div className="flex">
          {/* <Lottie loop animationData={euro} play />
          <CustomLottie animationData={lottieData.euro} /> */}
          <RssFeedButton />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
