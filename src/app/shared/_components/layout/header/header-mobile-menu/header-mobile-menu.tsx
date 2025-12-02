/**
 * 작성자: KYD
 * 기능:
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";

import Link from "next/link";

interface IHeaderMobileMenu {
  onClose: () => void;
}

const HeaderMobileMenu = ({ onClose }: IHeaderMobileMenu) => {
  //SECTION HOOK호출 영역

  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역
  const handleNavClick = () => {
    onClose();
  };

  //!SECTION 메서드 영역

  return (
    <div className="absolute left-0 top-[60px] h-auto w-full border-b-2 border-yellow bg-background px-4 py-2 sm:block md:hidden">
      <nav>
        <Link href="/blog" onClick={handleNavClick}>
          <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text text-[20px] font-medium text-transparent">
            Blog
          </span>
        </Link>
      </nav>
      <nav>
        <Link href="/algorithms" onClick={handleNavClick}>
          <span className="inline-block bg-gradient-to-r from-yellow to-[#8C6306] bg-clip-text text-[20px] font-medium text-transparent">
            Algorithms
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default HeaderMobileMenu;
