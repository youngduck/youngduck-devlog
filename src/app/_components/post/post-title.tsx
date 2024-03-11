import Image from "next/image";
import React from "react";

type IPostTitle = {
  title: string;
  category: string;
  date: string;
  coverImage: string;
};

const PostTitle: React.FC<IPostTitle> = ({
  title,
  category,
  date,
  coverImage,
}) => {
  return (
    <div className="py-3 mt-[20px] lg:mt-[70px]">
      <span className="inline-flex items-center px-3 py-1 rounded-full font-bold leading-5 text-white font-display mr-2 capitalize bg-yellow">
        {category}
      </span>
      <h1 className="break-all text-[40px] font-bold">{title}</h1>
      <div className="flex justify-between py-3">
        <span className="ml-[10px] text-[16px] text-gray-500">{date}</span>
      </div>
      <Image
        src={coverImage || ""}
        alt={coverImage || ""}
        priority={true}
        width={960}
        height={0}
        className="my-4"
      />
    </div>
  );
};

export default PostTitle;
