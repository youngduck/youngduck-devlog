import React from "react";
import Image from "next/image";

type IPostCard = {
  title: string;
  coverImage: string;
  date: string;
};

const PostCard: React.FC<IPostCard> = ({ title, coverImage, date }) => {
  console.log(title, "???");
  return (
    <div className="w-[296px] h-[325px] m-3 border p-4 rounded-lg shadow-lg">
      <a href="/posts/lee">
        <div style={{ width: "260px", height: "180px", position: "relative" }}>
          <Image
            src={coverImage}
            alt={coverImage}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="flex items-center my-3">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold leading-5 text-white font-display mr-2 capitalize bg-red-500">
            News
          </span>
          <p className="font-mono text-xs font-normal opacity-75 text-black">
            September 28th, 20232
          </p>
        </div>
        <p className="font-display max-w-sm text-2xl font-bold leading-tight">
          <span className="link-underline link-underline-black text-black">
            {title}
          </span>
        </p>
      </a>
    </div>
  );
};

export default PostCard;
