import React from "react";
import PostCard from "../_components/post/post-card/post-card";
import { getAllPosts } from "@/lib/api";

const layout = ({ children }: { children: React.ReactNode }) => {
  const posts = getAllPosts();

  return (
    <div className="lg:w-[1200px] mx-auto">
      {children}
      <div className="lg:w-[1200px] border-y-2 py-6 px-4 text-[24px] font-[KCC]">
        Posts
      </div>
      <div className="flex lg:w-[1200px] flex-wrap lg:justify-normal justify-center border-b-2 py-6">
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
