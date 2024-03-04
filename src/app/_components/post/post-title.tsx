import React from "react";

type IPostTitle = {
  title: string;
  category: string;
  date: string;
};

const PostTitle: React.FC<IPostTitle> = ({ title, category, date }) => {
  return (
    <>
      <h1 className="text-[40px] font-bold">{title}</h1>
      <div>
        {category}
        {date}
      </div>
    </>
  );
};

export default PostTitle;
