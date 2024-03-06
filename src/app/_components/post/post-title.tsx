import React from "react";

type IPostTitle = {
  title: string;
  category: string;
  date: string;
};

const PostTitle: React.FC<IPostTitle> = ({ title, category, date }) => {
  return (
    <div className="py-3 lg:mt-[70px]">
      <h1 className="text-[48px] font-bold">{title}</h1>
      <div className="flex justify-between py-3">
        <span className="ml-[10px] text-[16px] text-gray-500">{date}</span>
        <span className="inline-flex items-center px-3 py-1 rounded-full font-bold leading-5 text-white font-display mr-2 capitalize bg-[#E6B43F]">
          {category}
        </span>
      </div>
    </div>
  );
};

export default PostTitle;
