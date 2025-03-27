import { getAllPosts } from "@/app/api/blog/api";
import TagNavbar from "@/app/blog/components/tag-navbar/tag-navbar";
import PostCards from "@/app/shared/_components/post/post-cards/post-cards";

const page = () => {
  const posts = getAllPosts();

  return (
    <main className="mx-auto h-auto w-full md:max-w-container-md lg:max-w-container-lg">
      <div className="flex flex-col items-center justify-center">
        <TagNavbar />
        <PostCards posts={posts} domain="blog" />
      </div>
    </main>
  );
};

export default page;
