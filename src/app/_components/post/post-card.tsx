import React from "react";
import Image from "next/image";

type IPostCard = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  category: string;
};

const PostCard: React.FC<IPostCard> = ({
  title,
  slug,
  coverImage,
  date,
  excerpt,
  category,
}) => {
  return (
    <div className="w-[296px] h-[325px] m-3 border-2  p-4 rounded-lg shadow-lg relative group">
      <a href={`/posts/${slug}`}>
        <div className="relative w-[260px] h-[180px]">
          <Image
            src={coverImage}
            alt={coverImage}
            fill
            priority={true}
            sizes="(max-width: 296px)"
            className="object-cover"
          />
        </div>
        <div className="flex items-center my-3">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold leading-5 text-white font-display mr-2 capitalize bg-[#E6B43F]">
            {category}
          </span>
          <p className="font-mono text-sm font-normal opacity-75 text-black">
            {date}
          </p>
        </div>
        <p className="font-display max-w-sm text-2xl font-bold leading-tight">
          <span className="link-underline link-underline-black text-black dark:text-gray-200">
            {title}
          </span>
        </p>
        <div className="absolute opacity-0 invisible group-hover:opacity-70 group-hover:visible  p-4 top-0 left-0 w-[296px] h-[325px] bg-black rounded-lg text-white">
          <p className="">{excerpt}</p>
        </div>
      </a>
    </div>
  );
};

export default PostCard;
