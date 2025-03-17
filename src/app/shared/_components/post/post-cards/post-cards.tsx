import React from "react";
import Image from "next/image";
import PostCard from "../post-card/post-card";

type IPostCards = {
  posts: {
    title: string;
    coverImage: string;
    date: string;
    excerpt: string;
    slug: string;
    category: string;
  }[];
  domain: "blog" | "algorithms";
};

const PostCards: React.FC<IPostCards> = ({ posts, domain }) => {
  return (
    <div className="flex flex-wrap justify-center gap-5 border-b-2 pb-6 sm:w-full md:w-[870px] md:justify-normal md:gap-[7.5px] lg:w-[1200px] lg:justify-normal lg:gap-5">
      {posts.map((item, idx) => (
        <PostCard
          key={idx}
          slug={item.slug}
          title={item.title}
          coverImage={item.coverImage}
          date={item.date}
          excerpt={item.excerpt}
          category={item.category}
          domain={domain}
        />
      ))}
    </div>
  );
};

export default PostCards;
