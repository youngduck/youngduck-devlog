import { getAllPosts } from "@/lib/api";
import TagNavbar from "@/app/home/components/tag-navbar/tag-navbar";
import PostCards from "@/app/shared/_components/post/post-cards/post-cards";

const page = () => {
  const posts = getAllPosts();

  return (
    <main className="mx-auto h-auto w-full lg:w-[1200px]">
      <div className="flex flex-col items-center justify-center">
        <TagNavbar />
        <PostCards posts={posts} domain="blog" />
      </div>
    </main>
  );
};

export default page;
