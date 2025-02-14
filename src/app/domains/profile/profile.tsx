/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";
import Image from "next/image";
import React, { useState } from "react";

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
    console.log(x, y);

    setRotation({ x: x * 10, y: y * 30 });
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
      <div className="flex h-[300px] w-[200px] transform animate-three-d items-center justify-center [transform-style:preserve-3d]">
        <div className="relative flex h-full w-full items-center justify-center bg-blue-500 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <figure className="absolute h-36 w-36 rounded-full border-2 border-yellow">
            <Image
              src="/assets/blog/authors/youngduck.png"
              alt="/assets/blog/authors/youngduck.png"
              fill
              priority={true}
              sizes="(max-width:144px)"
              className="rounded-full object-cover"
            />
          </figure>
          <figure className="left-30 absolute bottom-10 flex h-10 w-10 flex-col items-center justify-center">
            <Image
              src="/assets/profile/next.png"
              alt="/assets/profile/next.png"
              fill
              priority={true}
              sizes="(max-width:40px)"
              className="object-cover"
            />
          </figure>
          {/* <figure className="absolute left-10 top-10 flex h-10 w-10 flex-col items-center justify-center [transform:translateZ(100px)]"> */}
          <figure className="absolute left-10 top-10 flex h-10 w-10 transform animate-three-d2 flex-col items-center justify-center">
            <Image
              src="/assets/profile/ts.png"
              alt="/assets/profile/ts.png"
              fill
              priority={true}
              sizes="(max-width:40px)"
              className="object-cover"
            />
          </figure>
        </div>
        <div className="absolute h-full w-full bg-red-500 [backface-visibility:hidden]">
          back{" "}
          <figure className="absolute h-36 w-36 rounded-full border-2 border-yellow">
            <Image
              src="/assets/blog/authors/youngduck.png"
              alt="/assets/blog/authors/youngduck.png"
              fill
              priority={true}
              sizes="(max-width:144px)"
              className="rounded-full object-cover"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Profile;
