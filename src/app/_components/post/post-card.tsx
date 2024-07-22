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
    <div className="w-[296px] h-[350px] m-3 p-4 border-2 font-[KCC] box-border rounded-lg relative group transform animate-fade-up pcHover:hover:scale-105">
      <a href={`/posts/${slug}`}>
        <div className="relative rounded-lg w-[260px] h-[180px] ">
          <Image
            src={coverImage}
            alt={coverImage}
            fill
            priority={true}
            sizes="(max-width: 296px)"
            className="object-cover rounded-lg"
          />
        </div>
        <div className=" my-3">
          <span className="text-sm font-bold mr-2 capitalize text-yellow">
            # {category}
          </span>
          <p className="text-[10px] font-normal text-gray-400">
            {date.split("T")[0]}
          </p>
        </div>
        <p className="font-display max-w-sm text-xl font-bold leading-tight">
          <span className="text-dd dark:text-gray-200 ">{title}</span>
        </p>
        <div className="absolute opacity-0 translate-x-[-50%] translate-y-[-50%] box-border invisible group-hover:opacity-70 group-hover:visible  p-4 top-[50%] left-[50%] w-[296px] h-[350px] bg-black rounded-lg text-white">
          <p>{excerpt}</p>
        </div>
      </a>
    </div>
  );
};

export default PostCard;
