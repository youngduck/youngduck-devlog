import React from "react";
import PostCard from "@/app/shared/_components/post/post-card/post-card";
import { getAllPosts } from "@/lib/api";

const layout = ({ children }: { children: React.ReactNode }) => {
  const posts = getAllPosts();

  return (
    <div className="mx-auto lg:w-[1200px]">
      {children}
      <div className="border-y-2 px-4 py-6 font-[KCC] text-[24px] lg:w-[1200px]">
        Posts
      </div>
      <div className="flex flex-wrap justify-center border-b-2 py-6 lg:w-[1200px] lg:justify-normal">
        {posts.slice(0, 3).map((item, idx) => (
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
    </div>
  );
};

export default layout;
