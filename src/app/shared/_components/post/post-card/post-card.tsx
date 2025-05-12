import React from "react";
import Image from "next/image";

type IPostCard = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  category: string;
  domain: "blog" | "algorithms";
};

const getDomainUrl = (domain: string) => {
  switch (domain) {
    case "blog":
      return "blog/posts";
    case "algorithms":
      return "algorithms/ps";
    default:
      return "posts";
  }
};

// 카드의 고정 높이 상수 정의
const CARD_HEIGHT_PX = 350;
const IMAGE_HEIGHT_PX = 180;
const METADATA_HEIGHT_PX = 40; // 카테고리와 날짜를 위한 공간
const PADDING_PX = 16 * 2; // 상하 패딩

const PostCard: React.FC<IPostCard> = ({
  title,
  slug,
  coverImage,
  date,
  excerpt,
  category,
  domain,
}) => {
  const domainUrl = getDomainUrl(domain);

  return (
    <div className="group relative box-border h-[410px] w-[285px] transform animate-fade-up rounded-lg border-[3px] bg-background p-4 font-[KCC] duration-500">
      <a href={`/${domainUrl}/${slug}`} className="flex h-full flex-col">
        <div className="relative h-[180px] w-[249px] flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={coverImage}
            alt={coverImage}
            fill
            priority={true}
            sizes="(max-width: 249px)"
            className="rounded-lg object-cover transition-transform duration-300 ease-in-out pcHover:group-hover:scale-105"
          />
        </div>

        <div className="my-2 flex-shrink-0">
          <span className="mr-2 whitespace-normal break-normal text-sm font-bold capitalize text-yellow">
            # {category}
          </span>
          <p className="text-[10px] font-normal text-gray-400">
            {date.split("T")[0]}
          </p>
        </div>

        {/* title은 정확히 2줄, 넘치면 말줄임표 */}
        <p className="line-clamp-3 w-full text-[20px] text-xl font-bold leading-tight">
          {title}
        </p>

        {/* excerpt도 정확히 2줄, 넘치면 말줄임표 */}
        <p className="mt-1 line-clamp-2 w-full text-base text-[#939fb2]">
          {excerpt}
        </p>
      </a>
    </div>
  );
};

export default PostCard;
