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
    <div className="mt-[20px] transform animate-fade-up py-3 font-[KCC] duration-500 lg:mt-[70px]">
      <span className="font-display mr-2 inline-flex items-center rounded-full bg-yellow px-3 py-1 font-bold capitalize leading-5 text-white">
        {category}
      </span>
      <h1 className="break-all text-[40px] font-bold">{title}</h1>
      <div className="flex justify-between py-3">
        <span className="ml-[10px] text-[16px] text-gray-500">
          {date.split("T")[0]}
        </span>
      </div>
      <Image
        src={coverImage || ""}
        alt={coverImage || ""}
        priority={true}
        width={860}
        height={0}
        className="my-4"
      />
    </div>
  );
};

export default PostTitle;
