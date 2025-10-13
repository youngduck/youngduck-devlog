/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import GithubIcon from "@public/assets/svg/github.svg";
import NotionIcon from "@public/assets/svg/notion.svg";
import Link from "next/link";

interface Iprofile {}

const Profile: React.FC<Iprofile> = () => {
  //SECTION HOOK호출 영역
  const [rotation, setRotation] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = -(clientY - top - height / 2) / 25;
    const y = (clientX - left - width / 2) / 25;

    setRotation({ x: x * 4, y: y * 4 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };
  //!SECTION 메서드 영역

  return (
    <div
      className="flex h-full w-full items-center justify-center [perspective:1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        className="flex h-[300px] w-[200px] transform animate-change-scale items-center justify-center [transform-style:preserve-3d]"
      >
        {/* 앞면카드 */}
        <div className="relative flex h-full w-full animate-card-front items-center justify-center rounded-sm border-2 border-yellow bg-secondary [backface-visibility:hidden] [transform-style:preserve-3d]">
          <figure className="absolute top-5 h-36 w-36 rounded-full border-2 border-yellow bg-border [transform:translateZ(20px)]">
            <Image
              src="/assets/blog/authors/youngduck.png"
              alt="/assets/blog/authors/youngduck.png"
              fill
              priority={true}
              sizes="(max-width:144px)"
              className="rounded-full object-cover"
            />
          </figure>
          <p className="absolute left-4 top-[180px] text-xl font-bold [transform:translateZ(40px)]">
            김영덕
          </p>
          <p className="absolute left-4 top-[210px] text-lg [transform:translateZ(30px)]">
            Fullstack Developer
          </p>
          <p className="text-md absolute left-4 top-[240px] [transform:translateZ(35px)]">
            React, Next, Spring
          </p>
          {/* <div className="absolute top-[240px] flex w-full items-center justify-center [transform-style:preserve-3d]">
            <Link
              href="https://github.com/youngduck"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-[55px] text-gray-400 [transform:translateZ(30px)] hover:text-black"
            >
              <GithubIcon width={20} height={20} />
            </Link>
            <Link
              href="https://dev-youngduck.notion.site/ec16c2874ca74ea5b023b8e7ef2384e5?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-[85px] text-gray-400 [transform:translateZ(28px)] hover:text-black"
            >
              <NotionIcon width={20} height={20} />
            </Link>
          </div> */}
        </div>
        {/* 뒷면카드 */}
        <div className="absolute h-full w-full animate-card-back rounded-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Image
            src="/assets/blog/posts/test.png"
            alt="/assets/blog/posts/test.png"
            fill
            priority={true}
            sizes="(max-width:200px)"
            className="rounded-sm border-2 border-yellow"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
