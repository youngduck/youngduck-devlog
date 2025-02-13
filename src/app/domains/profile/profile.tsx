/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
import Image from "next/image";
import React from "react";
import { div } from "three/tsl";

interface Iprofile {}

const profile: React.FC<Iprofile> = () => {
  //SECTION HOOK호출 영역

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <div className="flex h-full w-full items-center justify-center [perspective:1000px]">
      <div className="relative flex h-[300px] w-[200px] flex-col items-center justify-center [transform:rotateY(45deg)]">
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
        <figure className="absolute left-10 top-10 flex h-10 w-10 flex-col items-center justify-center">
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
    </div>
  );
};

export default profile;
