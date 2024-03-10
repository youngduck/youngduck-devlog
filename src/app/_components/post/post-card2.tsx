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

const PostCard2: React.FC<IPostCard> = ({
  title,
  slug,
  coverImage,
  date,
  excerpt,
  category,
}) => {
  return (
    <div className="w-full h-[170px] my-8 relative group">
      <a href={`/posts/${slug}`} className="lg:flex">
        <div className="relative w-[170px] h-[170px] lg:mr-[45px]">
          <Image
            src={coverImage}
            alt={coverImage}
            fill
            priority={true}
            sizes="(max-width: 296px)"
            className="object-cover"
          />
        </div>
        <div>
          <span className="font-bold text-2xl leading-tight ">{title}</span>
        </div>
      </a>
    </div>
  );
};

export default PostCard2;
