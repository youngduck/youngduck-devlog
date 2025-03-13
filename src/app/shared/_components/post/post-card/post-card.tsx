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
    <div className="group relative m-3 box-border h-[350px] w-[296px] transform animate-fade-up rounded-lg border-2 bg-background p-4 font-[KCC] duration-500 pcHover:hover:scale-105">
      <a href={`/${domainUrl}/${slug}`}>
        <div className="relative h-[180px] w-[260px] rounded-lg">
          <Image
            src={coverImage}
            alt={coverImage}
            fill
            priority={true}
            sizes="(max-width: 296px)"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="my-3">
          <span className="mr-2 whitespace-normal break-normal text-sm font-bold capitalize text-yellow">
            # {category}
          </span>
          <p className="text-[10px] font-normal text-gray-400">
            {date.split("T")[0]}
          </p>
        </div>
        <p className="font-display max-w-sm text-xl font-bold leading-tight">
          <span className="text-dd dark:text-gray-200">{title}</span>
        </p>
        <div className="invisible absolute left-[50%] top-[50%] box-border h-[350px] w-[296px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-black p-4 text-white opacity-0 pcHover:group-hover:visible pcHover:group-hover:opacity-70">
          <p>{excerpt}</p>
        </div>
      </a>
    </div>
  );
};

export default PostCard;
