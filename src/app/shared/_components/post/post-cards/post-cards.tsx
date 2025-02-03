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
};

const PostCards: React.FC<IPostCards> = ({ posts }) => {
  return (
    <div className="flex flex-wrap justify-center border-b-2 pb-6 lg:w-[1200px] lg:justify-normal">
      {posts.map((item, idx) => (
        <PostCard
          key={idx}
          slug={item.slug}
          title={item.title}
          coverImage={item.coverImage}
          date={item.date}
          excerpt={item.excerpt}
          category={item.category}
        />
      ))}
    </div>
  );
};

export default PostCards;
