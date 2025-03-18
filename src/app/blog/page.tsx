import { getAllPosts } from "@/lib/api";
import TagNavbar from "@/app/home/components/tag-navbar/tag-navbar";
import PostCards from "@/app/shared/_components/post/post-cards/post-cards";

const page = () => {
  const posts = getAllPosts();

  return (
    <main className="md:max-w-container-md lg:max-w-container-lg mx-auto h-auto w-full">
      <div className="flex flex-col items-center justify-center">
        <TagNavbar />
        <PostCards posts={posts} domain="blog" />
      </div>
    </main>
  );
};

export default page;
