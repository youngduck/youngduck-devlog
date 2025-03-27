import React from "react";
import PostCards from "@/app/shared/_components/post/post-cards/post-cards";
import { getAllPosts } from "@/app/api/blog/api";

const layout = ({ children }: { children: React.ReactNode }) => {
  const posts = getAllPosts();

  return (
    <div className="mx-auto h-auto w-full md:max-w-container-md lg:max-w-container-lg">
      {children}
      <div className="lg:w-container-lg border-y-2 px-4 py-6 font-[KCC] text-[24px]">
        Posts
      </div>

      <PostCards posts={posts.slice(0, 4)} domain="blog" />
    </div>
  );
};

export default layout;
